/**
 * 持久化SSE连接端点
 * 建立长连接，等待消息推送
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const connectionId = query.connectionId as string
    
    if (!connectionId) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少连接ID'
      })
    }

    // 设置SSE响应头
    setHeader(event, 'Content-Type', 'text/event-stream')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Access-Control-Allow-Headers', 'Cache-Control')

    console.log(`建立持久化SSE连接: ${connectionId}`)

    // 创建可读流
    return new ReadableStream({
      start(controller) {
        // 发送连接确认
        const welcomeMessage = JSON.stringify({
          id: 'system',
          type: 'connected',
          data: `连接已建立: ${connectionId}`
        })
        controller.enqueue(new TextEncoder().encode(`data: ${welcomeMessage}\n\n`))

        // 存储控制器，用于后续消息推送
        // 在实际应用中，这里应该使用Redis或其他持久化存储
        global.sseConnections = global.sseConnections || new Map()
        global.sseConnections.set(connectionId, controller)

        console.log(`SSE连接已注册: ${connectionId}`)

        // 定期发送心跳
        const heartbeat = setInterval(() => {
          try {
            const heartbeatMessage = JSON.stringify({
              id: 'heartbeat',
              type: 'ping',
              data: Date.now()
            })
            controller.enqueue(new TextEncoder().encode(`data: ${heartbeatMessage}\n\n`))
          } catch (error) {
            clearInterval(heartbeat)
          }
        }, 30000) // 每30秒发送心跳

        // 连接关闭清理
        event.node.req.on('close', () => {
          console.log(`SSE连接已关闭: ${connectionId}`)
          clearInterval(heartbeat)
          if (global.sseConnections) {
            global.sseConnections.delete(connectionId)
          }
          try {
            controller.close()
          } catch (error) {
            // 连接可能已经关闭
          }
        })
      }
    })

  } catch (error: any) {
    console.error('建立SSE连接失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'SSE连接建立失败'
    })
  }
})
