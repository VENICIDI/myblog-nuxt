import { initDatabase, closeDatabase } from '~/server/utils/database'

export default async () => {
  // 在服务器启动时初始化数据库连接（仅连接，不同步表结构）
  try {
    await initDatabase()
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error)
  }

  // 注册进程退出时的清理函数
  process.on('SIGINT', async () => {
    console.log('🔄 收到 SIGINT 信号，正在关闭数据库连接...')
    await closeDatabase()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('🔄 收到 SIGTERM 信号，正在关闭数据库连接...')
    await closeDatabase()
    process.exit(0)
  })

  process.on('beforeExit', async () => {
    console.log('🔄 应用即将退出，正在关闭数据库连接...')
    await closeDatabase()
  })
}
