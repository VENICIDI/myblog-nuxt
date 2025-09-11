import { testConnection } from '~/server/utils/database'
import { ResponseMsg } from '~/server/utils/ResponseMsg'

export default defineEventHandler(async (event) => {
  try {
    const isConnected = await testConnection()
    
    const dbConfig = {
      host: process.env.DB_HOST || '39.96.170.159',
      port: process.env.DB_PORT || '3306',
      database: process.env.DB_NAME || 'myblog',
      username: process.env.DB_USERNAME || 'myblog'
      // 不显示密码
    }
    
    return ResponseMsg.success({
      connected: isConnected,
      config: dbConfig,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return ResponseMsg.fail(`数据库连接检查失败: ${error.message}`)
  }
})
