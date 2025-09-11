# 自定义 i18n 实现

本项目使用自定义的轻量级 i18n 实现，支持中英文切换。

## 文件结构

```
utils/
├── translations.ts    # 翻译数据
├── i18n.ts           # 翻译工具函数
└── README.md         # 使用说明
stores/
└── languageStore.ts  # 语言状态管理
```

## 使用方法

### 1. 在组件中使用翻译

```vue
<script setup>
import { useLanguageStore } from '@/stores/languageStore';

const languageStore = useLanguageStore();
const { t } = languageStore;
</script>

<template>
  <div>
    <h1>{{ t('nav.first') }}</h1>
    <p>{{ t('home.welcome') }}</p>
  </div>
</template>
```

### 2. 添加新的翻译文本

在 `utils/translations.ts` 中添加新的翻译键值对：

```typescript
export const translations = {
  zh: {
    // 现有翻译...
    newSection: {
      title: '新标题',
      description: '新描述'
    }
  },
  en: {
    // 现有翻译...
    newSection: {
      title: 'New Title',
      description: 'New Description'
    }
  }
}
```

### 3. 语言切换

使用 `LanguageSwitcher` 组件或通过 store 方法：

```vue
<script setup>
const languageStore = useLanguageStore();

// 切换到指定语言
languageStore.changeLanguage('zh');

// 切换到下一个语言
languageStore.toggleLanguage();
</script>
```

### 4. 获取当前语言信息

```vue
<script setup>
const languageStore = useLanguageStore();

// 当前语言代码 ('zh' | 'en')
const currentLanguage = languageStore.currentLanguage;

// 当前语言名称 ('中文' | 'English')
const currentLanguageName = languageStore.currentLanguageName;

// 可用语言列表
const availableLanguages = languageStore.availableLanguages;
</script>
```

## 特性

- ✅ 轻量级：无外部依赖
- ✅ 类型安全：TypeScript 支持
- ✅ 自动持久化：使用 localStorage 保存语言偏好
- ✅ SSR 友好：支持服务端渲染
- ✅ 嵌套翻译：支持多层级翻译键
- ✅ 后备翻译：当翻译缺失时自动回退到英语

## 迁移说明

从 `@nuxtjs/i18n` 迁移到自定义实现：

1. ❌ 移除 `useI18n()` 和 `$t()`
2. ✅ 使用 `useLanguageStore()` 和 `t()`
3. ❌ 移除 `@nuxtjs/i18n` 配置
4. ✅ 使用新的翻译数据结构

## 注意事项

- 翻译键使用点号分隔的路径，如 `'nav.first'`
- 所有翻译数据在构建时静态包含，无法动态加载
- 语言切换是即时的，无需刷新页面
- 在组件中确保调用 `languageStore.initLanguage()` 进行初始化（通常在 `onMounted` 中）
