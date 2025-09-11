// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-10',
  devtools: { enabled: true },
  
  // CSS文件配置
  css: ['@/assets/theme.scss'],
  
  // 模块配置
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
  ],

  // Element Plus 配置 - 使用 CSS 避免 SCSS 冲突
  elementPlus: {
    importStyle: 'css'
  },

  // 应用配置
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },
  
  // Vite 配置
  vite: {
    define: {
      'process.env.NODE_DEBUG': 'false',
      'global.crypto': 'crypto'
    },
    resolve: {
      alias: {
        crypto: 'crypto-browserify'
      }
    },
    optimizeDeps: {
      include: ['dayjs', 'lodash-unified'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    }
  },
})
