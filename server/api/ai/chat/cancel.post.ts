import { ResponseMsg } from '~/server/utils/ResponseMsg'

/**
 * 取消消息处理
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messageId, connectionId } = body
    
    if (!messageId || !connectionId) {
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

    console.log(`取消消息: ${messageId} on connection: ${connectionId}`)

    // 发送取消信号
    const cancelEvent = JSON.stringify({
      id: messageId,
      type: 'complete',
      data: 'Message cancelled'
    })

    try {
      controller.enqueue(new TextEncoder().encode(`data: ${cancelEvent}\n\n`))
    } catch (error) {
      console.error(`发送取消信号失败: ${error}`)
    }

    return ResponseMsg.success({ 
      messageId,
      status: 'cancelled'
    })

  } catch (error: any) {
    console.error('取消消息失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '取消消息失败'
    })
  }
})
