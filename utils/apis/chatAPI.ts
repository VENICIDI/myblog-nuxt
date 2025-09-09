import httpInstance from '../http';

/**
 * 聊天消息类型定义
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * 创建SSE连接并获取聊天响应流
 * @param messages 聊天历史记录数组
 * @returns 一个对象，包含stream方法来处理流数据
 */
export const chatWithAI = (messages: ChatMessage[]) => {
  // 取消控制器
  const controller = new AbortController();
  
  return {
    /**
     * 启动SSE连接
     * @param onMessage 接收消息的回调
     * @param onError 接收错误的回调
     * @param onComplete 完成时的回调
     */
    stream: (
      onMessage: (text: string) => void,
      onError: (error: any) => void,
      onComplete: () => void
    ) => {
      // 在客户端才能使用EventSource
      if (process.client) {
        // 使用http.ts中的统一配置而非硬编码URL
        const baseURL = httpInstance.defaults.baseURL || '';
        
        // 构建URL，使用最后一条用户消息作为prompt参数
        const latestUserMessage = messages[messages.length - 1];
        const url = `${baseURL}/ai/chat?prompt=${encodeURIComponent(latestUserMessage.content)}&history=${encodeURIComponent(JSON.stringify(messages.slice(0, -1)))}`;
        
        // 使用EventSource API建立SSE连接
        const eventSource = new EventSource(url);
        
        // 标记是否已经正常完成
        let isCompleted = false;
        
        // 消息处理
        eventSource.onmessage = (event) => {
          try {
            // 检查是否是结束信号
            if (event.data === '[DONE]') {
              isCompleted = true;
              eventSource.close();
              onComplete();
              return;
            }
            
            onMessage(event.data);
          } catch (err) {
            onError(err);
          }
        };
        
        // 错误处理
        eventSource.onerror = (err) => {
          eventSource.close();
          // 只有在没有正常完成的情况下才报告错误
          if (!isCompleted) {
            onError(err);
          }
        };
        
        // 返回取消函数
        return {
          cancel: () => {
            eventSource.close();
            controller.abort();
          }
        };
      } else {
        // 服务器端不支持EventSource
        onError(new Error('EventSource API is not available on server side'));
        return {
          cancel: () => {}
        };
      }
    }
  };
};
