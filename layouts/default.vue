<script setup>
// 主布局组件 - 包含导航栏和内容区
import { onMounted, ref } from 'vue';
import { useLanguageStore } from '@/stores/languageStore';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const languageStore = useLanguageStore();
const { t } = languageStore;

// 为导航项添加进场动画
const isLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="layout-container">
    <!-- 导航栏 -->
    <header class="header">
      <div class="navbox" :class="{ 'loaded': isLoaded }">
        <NuxtLink to="/" class="navitem" exact-active-class="active">{{ t('nav.first') }}</NuxtLink>
        <NuxtLink to="/blogs" class="navitem" active-class="active">{{ t('nav.blogs') }}</NuxtLink>
        <NuxtLink to="/mine" class="navitem" active-class="active">{{ t('nav.about') }}</NuxtLink>
        <div class="nav-indicator"></div>
        <LanguageSwitcher class="language-switcher" />
      </div>
    </header>
    
    <!-- 内容区 -->
    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--backgroundcolor, #fff);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content {
  flex: 1;
}

.navbox {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  perspective: 1000px;
  position: relative;
  
  // 导航项进场动画
  &.loaded .navitem {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-indicator {
    position: absolute;
    bottom: -2px;
    height: 3px;
    background: linear-gradient(90deg, var(--verydarkcolor, #333), var(--litterdarkcolor, #666));
    border-radius: 4px;
    transition: all 0.4s cubic-bezier(0.64, 0.04, 0.35, 1);
    opacity: 0;
  }
  
  .navitem {
    position: relative;
    font-size: 18px;
    font-weight: 500;
    padding: 12px 28px;
    margin: 0 16px;
    color: black;
    text-decoration: none;
    transition: all 0.4s ease;
    letter-spacing: 0.5px;
    opacity: 0;
    transform: translateY(-15px);
    
    // 主要下划线效果
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--verydarkcolor, #333), var(--litterdarkcolor, #666));
      transition: width 0.4s ease, left 0.4s ease;
      border-radius: 4px;
      transform-origin: center;
      opacity: 0;
    }
    
    // 悬停和激活状态
    &:hover {
      color: var(--verydarkcolor, #333);
      transform: translateY(-2px);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      
      &::after {
        width: 80%;
        left: 10%;
        opacity: 1;
      }
    }
    
    // 激活状态
    &.active {
      color: var(--verydarkcolor, #333);
      font-weight: 600;
      
      &::after {
        width: 100%;
        left: 0;
        opacity: 1;
        height: 4px;
      }
      
      &::before {
        transform: translateX(-50%) scale(1.2);
        opacity: 1;
      }
    }
    
    // 点击效果
    &:active {
      transform: translateY(0);
      transition: all 0.1s ease;
    }
    
    // 交错动画延迟
    &:nth-child(1) { transition-delay: 0s; }
    &:nth-child(2) { transition-delay: 0.05s; }
    &:nth-child(3) { transition-delay: 0.1s; }
    &:nth-child(4) { transition-delay: 0.15s; }
    &:nth-child(5) { transition-delay: 0.2s; }
  }
}

.language-switcher {
  position: absolute;
  right: 20px;
}

/* 页面过渡效果 - 在CSS变量中定义 */
:root {
  --page-transition-duration: 0.4s;
}
</style>
