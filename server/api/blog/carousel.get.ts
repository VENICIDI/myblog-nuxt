import { BlogService } from '~/server/services/blogService'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const carouselData = await BlogService.getCarouselBlogs(3)
    return ResponseMsg.success(carouselData)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取轮播图数据失败'
    })
  }
})
