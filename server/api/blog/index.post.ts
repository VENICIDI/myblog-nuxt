import { BlogService } from '~/server/services/blogService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const blog = await BlogService.createBlog(body)
    
    return ResponseMsg.success(blog, '博客创建成功')
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '创建博客失败'
    })
  }
})
