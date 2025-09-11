export default defineEventHandler(async (event) => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  }
})
