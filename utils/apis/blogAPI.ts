import httpInstance from '../http'

export const getBlogByID = (blogId: string) => {
  console.log('发送请求获取博客内容，ID:', blogId);
  return httpInstance({
    url: `/blog/detail/${blogId}`,
    method: 'GET'
  })
}

/**
 * @description: 获取导航数据
 * @data {
 *   page: 1,
 *   pageSize: 10
 * }
 * @return {*}
 */
export const getBlogList = (data: any) => {
  return httpInstance({
    url: '/blog/list',
    method: 'GET',
    params: data
  })
}

export const getCarousel = () => {
  return httpInstance({
    url: '/blog/carousel'
  })
}
