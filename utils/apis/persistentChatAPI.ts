import httpInstance from '../http';

/**
 * 聊天消息类型定义
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * 消息事件类型
 */
interface MessageEvent {
  id: string;
  type: 'message' | 'error' | 'complete';
  data: any;
}

/**
 * 持久化SSE连接管理器
 * 建立一次连接，复用整个会话周期
 */
class PersistentChatManager {
  private eventSource: EventSource | null = null;
  private connectionId: string | null = null;
  private messageHandlers: Map<string, {
    onMessage: (text: string) => void;
    onError: (error: any) => void;
    onComplete: () => void;
  }> = new Map();
  private connectionState: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 1000;

  /**
   * 建立持久化连接
   */
  async connect(): Promise<void> {
    if (this.connectionState === 'connected' || this.connectionState === 'connecting') {
      return;
    }

    this.connectionState = 'connecting';
    
    try {
      // 生成新的连接ID
      this.connectionId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // 只在客户端建立连接
      if (!process.client) {
        throw new Error('SSE connections only available on client side');
      }

      const baseURL = httpInstance.defaults.baseURL || '';
      const url = `${baseURL}/ai/chat/stream?connectionId=${this.connectionId}`;
      
      this.eventSource = new EventSource(url);
      
      this.eventSource.onopen = () => {
        console.log('持久化SSE连接已建立');
        this.connectionState = 'connected';
        this.reconnectAttempts = 0;
      };

      this.eventSource.onmessage = (event) => {
        try {
          const messageEvent: MessageEvent = JSON.parse(event.data);
          const handler = this.messageHandlers.get(messageEvent.id);
          
          if (!handler) return;

          switch (messageEvent.type) {
            case 'message':
              handler.onMessage(messageEvent.data);
              break;
            case 'error':
              handler.onError(new Error(messageEvent.data));
              this.messageHandlers.delete(messageEvent.id);
              break;
            case 'complete':
              handler.onComplete();
              this.messageHandlers.delete(messageEvent.id);
              break;
          }
        } catch (error) {
          console.error('解析SSE消息失败:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error('SSE连接错误:', error);
        this.connectionState = 'error';
        
        // 自动重连
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
          
          setTimeout(() => {
            this.disconnect();
            this.connect();
          }, this.reconnectDelay * this.reconnectAttempts);
        } else {
          // 通知所有等待的处理器
          this.messageHandlers.forEach(handler => {
            handler.onError(new Error('连接失败，已超过最大重试次数'));
          });
          this.messageHandlers.clear();
        }
      };

    } catch (error) {
      this.connectionState = 'error';
      throw error;
    }
  }

  /**
   * 断开连接
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.connectionState = 'disconnected';
    this.connectionId = null;
    this.messageHandlers.clear();
  }

  /**
   * 发送聊天消息
   */
  async sendMessage(
    messages: ChatMessage[],
    onMessage: (text: string) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): Promise<{ cancel: () => void }> {
    
    // 确保连接已建立
    if (this.connectionState !== 'connected') {
      await this.connect();
    }

    // 生成消息ID
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // 注册消息处理器
    this.messageHandlers.set(messageId, {
      onMessage,
      onError,
      onComplete
    });

    try {
      // 通过POST发送消息到服务器
      await httpInstance.post('/ai/chat/send', {
        messageId,
        connectionId: this.connectionId,
        messages
      });

    } catch (error) {
      // 发送失败，移除处理器
      this.messageHandlers.delete(messageId);
      onError(error);
    }

    // 返回取消函数
    return {
      cancel: () => {
        this.messageHandlers.delete(messageId);
        // 可以选择通知服务器取消这个消息
        httpInstance.post('/ai/chat/cancel', {
          messageId,
          connectionId: this.connectionId
        }).catch(console.error);
      }
    };
  }

  /**
   * 获取连接状态
   */
  getConnectionState(): string {
    return this.connectionState;
  }

  /**
   * 重置连接（用于新会话）
   */
  reset(): void {
    this.disconnect();
    setTimeout(() => this.connect(), 100);
  }
}

// 创建全局单例
const chatManager = new PersistentChatManager();

/**
 * 使用持久化连接发送聊天消息
 */
export const chatWithAIPersistent = (messages: ChatMessage[]) => {
  return {
    stream: (
      onMessage: (text: string) => void,
      onError: (error: any) => void,
      onComplete: () => void
    ) => {
      return chatManager.sendMessage(messages, onMessage, onError, onComplete);
    }
  };
};

/**
 * 获取连接管理器（用于手动控制）
 */
export const getChatManager = () => chatManager;

export default chatManager;
