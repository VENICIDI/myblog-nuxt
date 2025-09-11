import { syncDatabase } from '~/server/utils/database'

export default async () => {
  // 在服务器启动时初始化数据库连接
  try {
    await syncDatabase()
    console.log('✅ 数据库初始化完成')
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error)
  }
}
