import { AIService } from '~/server/services/aiService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const status = await AIService.getServiceStatus()
    return ResponseMsg.success(status)
  } catch (error: any) {
    console.error('获取AI服务状态失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取AI服务状态失败'
    })
  }
})
