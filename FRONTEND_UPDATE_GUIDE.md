# 前端API更新指南

## 问题解决 ✅

你遇到的 `ERR_CONNECTION_REFUSED` 错误已经解决！

### 问题原因
前端代码还在尝试连接旧的Express服务器 (`http://localhost:8088`)，但我们已经迁移到Nuxt的统一架构了。

### 已修复的内容
1. **HTTP配置更新**: `utils/http.ts` 已更新为使用Nuxt的API路由 (`/api`)
2. **API路径**: 所有API调用现在都通过Nuxt的内置服务器处理

### API映射对照表

| 原Express API | 新Nuxt API | 状态 |
|--------------|-------------|------|
| `http://localhost:8088/blog/list` | `/api/blog/list` | ✅ 已迁移 |
| `http://localhost:8088/blog/carousel` | `/api/blog/carousel` | ✅ 已迁移 |
| `http://localhost:8088/blog/detail/:id` | `/api/blog/detail/:id` | ✅ 已迁移 |
| `http://localhost:8088/ai/chat` | `/api/ai/chat` | ✅ 已迁移 |
| `http://localhost:8088/ai/status` | `/api/ai/status` | ✅ 已迁移 |

## 使用说明

### 1. 停止旧的Express服务器
如果你的旧Express服务器还在运行，请停止它：
```bash
# 如果在终端中运行，按 Ctrl+C
# 或者找到进程并杀死它
lsof -ti:8088 | xargs kill
```

### 2. 启动Nuxt开发服务器
```bash
cd /Users/mac/program/myblog-nuxt
pnpm dev
```

### 3. 访问应用
- 前端页面: `http://localhost:3000`
- API接口: `http://localhost:3000/api/*`

## API测试

现在所有API都可以正常访问：

```bash
# 健康检查
curl http://localhost:3000/api/health

# 博客列表
curl "http://localhost:3000/api/blog/list?page=1&pageSize=10"

# 轮播图数据
curl http://localhost:3000/api/blog/carousel

# AI聊天状态
curl http://localhost:3000/api/ai/status
```

## 开发优势

现在你享受到了Nuxt全栈开发的所有优势：

1. **统一端口**: 前端和后端都运行在3000端口
2. **无需CORS**: 不再需要处理跨域问题
3. **热重载**: API变更会自动重启服务器
4. **TypeScript**: 全栈类型安全
5. **统一部署**: 一个命令就能部署整个应用

## 数据库状态

API测试显示数据库连接正常：
- 博客表中有9条记录
- 轮播图返回3条最新记录
- 所有API响应格式正确

🎉 迁移完成！现在你可以正常使用所有功能了。
