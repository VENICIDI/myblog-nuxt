import { BlogService } from '~/server/services/blogService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const blogId = parseInt(getRouterParam(event, 'id') || '0')
    
    if (!blogId || isNaN(blogId)) {
      throw createError({
        statusCode: 400,
        statusMessage: '博客ID无效'
      })
    }

    await BlogService.deleteBlog(blogId)
    
    return ResponseMsg.success(null, '博客删除成功')
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '删除博客失败'
    })
  }
})
