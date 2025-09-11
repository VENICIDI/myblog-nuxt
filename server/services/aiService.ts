interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * AI服务层
 * 负责处理AI聊天相关的业务逻辑
 */
export class AIService {
  
  /**
   * 验证和处理聊天历史记录
   * @param history 历史记录
   * @returns 处理后的消息列表
   */
  static processHistory(history: string | string[] | ChatMessage[]): ChatMessage[] {
    const messages: ChatMessage[] = []
    
    try {
      let historyList: ChatMessage[] = []
      
      if (typeof history === 'string') {
        // 如果是字符串，尝试解码和解析
        const decodedHistory = decodeURIComponent(history)
        historyList = JSON.parse(decodedHistory)
      } else if (Array.isArray(history)) {
        // 如果已经是数组，直接使用
        historyList = history as ChatMessage[]
      }
      
      // 验证和过滤历史记录
      historyList.forEach(entry => {
        if (entry && 
            (entry.role === 'user' || entry.role === 'assistant') && 
            entry.content && 
            typeof entry.content === 'string') {
          messages.push({
            role: entry.role,
            content: entry.content.trim()
          })
        }
      })
      
      // 限制历史记录长度，避免token过多
      const maxHistoryLength = 20
      if (messages.length > maxHistoryLength) {
        return messages.slice(-maxHistoryLength)
      }
      
    } catch (error: any) {
      console.warn('解析历史记录失败:', error.message)
    }
    
    return messages
  }

  /**
   * 验证用户输入
   * @param prompt 用户输入
   * @returns 验证后的输入
   */
  static validatePrompt(prompt: string): string {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('问题不能为空')
    }
    
    const trimmedPrompt = prompt.trim()
    if (trimmedPrompt.length === 0) {
      throw new Error('问题不能为空')
    }
    
    if (trimmedPrompt.length > 2000) {
      throw new Error('问题长度不能超过2000个字符')
    }
    
    return trimmedPrompt
  }

  /**
   * 构建AI请求消息
   * @param prompt 用户问题
   * @param history 历史记录
   * @returns 消息列表
   */
  static buildMessages(prompt: string, history: string | string[] | ChatMessage[] = []): ChatMessage[] {
    const messages = this.processHistory(history)
    const validatedPrompt = this.validatePrompt(prompt)
    
    // 添加当前用户问题
    messages.push({
      role: 'user',
      content: validatedPrompt
    })
    
    return messages
  }


  /**
   * 调用AI API（同步响应）
   * @param messages 消息列表
   * @returns AI回复
   */
  static async getChatResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const config = useRuntimeConfig()
      
      const response = await $fetch(`${config.ai.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.ai.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          model: config.ai.model,
          messages: messages,
          stream: false,
          max_tokens: 2000,
          temperature: 0.7
        }
      }) as any

      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error('AI服务返回数据格式错误')
      }

      const reply = response.choices[0].message?.content
      if (!reply) {
        throw new Error('AI服务未返回有效回复')
      }

      return reply.trim()
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status
        
        if (status === 401) {
          throw new Error('AI服务认证失败，请检查API密钥')
        } else if (status === 429) {
          throw new Error('AI服务请求频率过高，请稍后重试')
        } else if (status === 500) {
          throw new Error('AI服务内部错误，请稍后重试')
        } else {
          throw new Error(`AI服务响应错误: ${status}`)
        }
      } else if (error.request) {
        throw new Error('AI服务连接超时，请稍后重试')
      } else {
        throw new Error(`AI服务调用失败: ${error.message}`)
      }
    }
  }


  /**
   * 获取AI服务状态
   * @returns 服务状态
   */
  static async getServiceStatus(): Promise<any> {
    try {
      const testMessages: ChatMessage[] = [
        { role: 'user', content: 'Hello' }
      ]
      
      const startTime = Date.now()
      await this.getChatResponse(testMessages)
      const responseTime = Date.now() - startTime
      
      return {
        status: 'healthy',
        responseTime: responseTime,
        timestamp: new Date().toISOString()
      }
    } catch (error: any) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }
}
