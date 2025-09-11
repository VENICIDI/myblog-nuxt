import { Sequelize } from 'sequelize'

// 获取数据库配置
const getDbConfig = () => {
  // 在服务器端，我们需要直接使用环境变量
  return {
    host: process.env.DB_HOST || '39.96.170.159',
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME || 'myblog',
    username: process.env.DB_USERNAME || 'myblog',
    password: process.env.DB_PASSWORD || '123456',
    dialect: 'mysql' as const,
    timezone: '+08:00',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
}

// 创建Sequelize实例
export const sequelize = new Sequelize(getDbConfig())

// 数据库连接测试
export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ 数据库连接成功')
    return true
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    return false
  }
}

// 同步数据库表结构
export const syncDatabase = async () => {
  try {
    await testConnection()
    
    // 在开发环境下同步表结构
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true })
      console.log('✅ 数据库表结构同步完成')
    }
  } catch (error) {
    console.error('❌ 数据库同步失败:', error)
    throw error
  }
}
