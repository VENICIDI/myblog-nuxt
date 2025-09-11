import { AIService } from '~/server/services/aiService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { prompt, history } = body
    
    // 构建消息列表
    const messages = AIService.buildMessages(prompt, history)
    
    // 获取AI回复
    const reply = await AIService.getChatResponse(messages)
    
    return ResponseMsg.success({ reply })
  } catch (error: any) {
    console.error('AI聊天同步接口错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'AI服务出现错误'
    })
  }
})
