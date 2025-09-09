export default defineEventHandler(async (event) => {
  return {
    message: 'API测试成功',
    data: {
      time: new Date().toISOString(),
      status: 'ok'
    }
  }
})
