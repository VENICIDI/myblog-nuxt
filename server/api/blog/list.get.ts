import { BlogService } from '~/server/services/blogService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const category = query.category as string
    const keyword = query.keyword as string

    const result = await BlogService.getBlogList({
      page,
      pageSize,
      category,
      keyword
    })

    return ResponseMsg.success(result)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取博客列表失败'
    })
  }
})
