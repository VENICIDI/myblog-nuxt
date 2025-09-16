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
export const sequelize = new Sequelize({
  ...getDbConfig(),
  pool: {
    max: 10,          // 最大连接数
    min: 2,           // 最小连接数
    acquire: 30000,   // 获取连接的最大时间（毫秒）
    idle: 10000,      // 连接空闲时间（毫秒）后释放
    evict: 1000       // 检查和移除空闲连接的间隔时间
  },
  retry: {
    max: 3            // 最大重试次数
  },
  dialectOptions: {
    connectTimeout: 20000,  // 连接超时时间
    acquireTimeout: 20000,  // 获取连接超时时间
    timeout: 20000          // 查询超时时间
  }
})

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

// 初始化数据库连接（仅测试连接，不同步表结构）
export const initDatabase = async () => {
  try {
    await testConnection()
    console.log('✅ 数据库连接初始化完成 - 使用现有数据库表结构')
  } catch (error) {
    console.error('❌ 数据库连接初始化失败:', error)
    throw error
  }
}

// 优雅关闭数据库连接
export const closeDatabase = async () => {
  try {
    await sequelize.close()
    console.log('✅ 数据库连接已关闭')
  } catch (error) {
    console.error('❌ 关闭数据库连接失败:', error)
    throw error
  }
}

// 获取连接池配置信息
export const getPoolStatus = () => {
  return {
    maxConnections: 10,
    minConnections: 2,
    acquireTimeout: 30000,
    idleTimeout: 10000,
    evictInterval: 1000,
    retryMax: 3,
    status: 'configured'
  }
}
