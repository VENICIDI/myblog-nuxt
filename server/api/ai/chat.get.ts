import { AIService } from '~/server/services/aiService'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const prompt = query.prompt as string
    const history = query.history as string | string[]
    
    // 构建消息列表
    const messages = AIService.buildMessages(prompt, history)

    // 设置响应头为流式传输
    setHeader(event, 'Content-Type', 'text/event-stream')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Access-Control-Allow-Headers', 'Cache-Control')

    // 获取AI响应流并直接返回文本流
    const response = await AIService.getChatResponse(messages)
    
    // 模拟流式响应
    return new ReadableStream({
      start(controller) {
        // 将响应分块发送
        const chunks = response.split(' ')
        let index = 0
        
        const sendChunk = () => {
          if (index < chunks.length) {
            const chunk = `data: ${chunks[index]}\n\n`
            controller.enqueue(new TextEncoder().encode(chunk))
            index++
            setTimeout(sendChunk, 50) // 模拟流式延迟
          } else {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
            controller.close()
          }
        }
        
        sendChunk()
      }
    })
  } catch (error: any) {
    console.error('AI聊天流式接口错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'AI服务出现错误'
    })
  }
})
