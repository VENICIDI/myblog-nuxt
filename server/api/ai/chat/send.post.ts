import { AIService } from '~/server/services/aiService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

/**
 * 通过持久化连接发送聊天消息
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messageId, connectionId, messages } = body
    
    if (!messageId || !connectionId || !messages) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要参数'
      })
    }

    // 获取SSE连接控制器
    const controller = global.sseConnections?.get(connectionId)
    if (!controller) {
      throw createError({
        statusCode: 404,
        statusMessage: 'SSE连接不存在或已断开'
      })
    }

    console.log(`处理消息: ${messageId} on connection: ${connectionId}`)

    // 构建消息列表
    const validatedMessages = AIService.buildMessages(
      messages[messages.length - 1].content, 
      messages.slice(0, -1)
    )

    // 异步处理AI响应，避免阻塞HTTP请求
    processAIResponse(messageId, connectionId, validatedMessages, controller)

    // 立即返回成功响应
    return ResponseMsg.success({ 
      messageId,
      status: 'processing'
    })

  } catch (error: any) {
    console.error('发送消息失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '发送消息失败'
    })
  }
})

/**
 * 异步处理AI响应并通过SSE推送
 */
async function processAIResponse(
  messageId: string, 
  connectionId: string, 
  messages: any[], 
  controller: ReadableStreamDefaultController
) {
  try {
    // 获取AI回复
    const reply = await AIService.getChatResponse(messages)
    
    // 模拟流式响应，将回复分块发送
    const chunks = reply.split(' ')
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      
      // 检查连接是否仍然存在
      if (!global.sseConnections?.has(connectionId)) {
        console.log(`连接已断开，停止发送: ${connectionId}`)
        return
      }

      const messageEvent = JSON.stringify({
        id: messageId,
        type: 'message',
        data: i === 0 ? chunk : ` ${chunk}` // 第一个词前面不加空格
      })

      try {
        controller.enqueue(new TextEncoder().encode(`data: ${messageEvent}\n\n`))
        
        // 模拟逐字输出的延迟
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 50))
        }
      } catch (error) {
        console.error(`发送消息块失败: ${error}`)
        break
      }
    }

    // 发送完成信号
    const completeEvent = JSON.stringify({
      id: messageId,
      type: 'complete',
      data: 'Message completed'
    })

    try {
      controller.enqueue(new TextEncoder().encode(`data: ${completeEvent}\n\n`))
    } catch (error) {
      console.error(`发送完成信号失败: ${error}`)
    }

  } catch (error: any) {
    console.error(`AI响应处理失败: ${error.message}`)
    
    // 发送错误信号
    const errorEvent = JSON.stringify({
      id: messageId,
      type: 'error',
      data: error.message || '处理失败'
    })

    try {
      controller.enqueue(new TextEncoder().encode(`data: ${errorEvent}\n\n`))
    } catch (controllerError) {
      console.error(`发送错误信号失败: ${controllerError}`)
    }
  }
}
