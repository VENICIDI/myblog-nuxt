import axios from 'axios';

// 创建HTTP客户端实例
export const createHttpClient = (baseURL: string, timeout: number = 5000) => {
  const httpInstance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  httpInstance.interceptors.request.use(
    (config) => {
      // 可以在这里添加身份验证令牌等
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  httpInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return httpInstance;
};

// 根据环境变量动态设置基础URL
const baseURL = process.env.NODE_ENV === 'production'
  ? '/api'  // 生产环境使用相对路径
  : '/api';  // 开发环境也使用Nuxt的API路由

// 创建HTTP实例
const httpInstance = createHttpClient(baseURL, 5000);

export default httpInstance;
