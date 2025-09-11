import { BlogService } from '~/server/services/blogService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const stats = await BlogService.getBlogStats()
    return ResponseMsg.success(stats)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取博客统计信息失败'
    })
  }
})
