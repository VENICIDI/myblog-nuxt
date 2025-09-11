<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useLanguageStore } from '@/stores/languageStore';

const languageStore = useLanguageStore();

// 在客户端挂载后初始化语言
onMounted(() => {
  languageStore.initLanguage();
});

const currentLocale = computed(() => languageStore.currentLanguage);
const currentLanguageName = computed(() => languageStore.currentLanguageName);

// 动画状态
const isAnimating = ref(false);
const startAnimation = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500); // 动画持续500ms
};

// 切换语言并触发动画
const switchLanguage = () => {
  startAnimation();
  languageStore.toggleLanguage();
};
</script>

<template>
  <div 
    class="language-switch" 
    @click="switchLanguage"
    :class="{ 'animating': isAnimating }"
    :title="currentLocale === 'zh' ? 'Switch to English' : '切换到中文'"
  >
    <div class="switch-container" :class="{ 'flip': currentLocale === 'en' }">
      <div class="language-icon zh">
        <span>中</span>
      </div>
      <div class="language-icon en">
        <span>En</span>
      </div>
    </div>
    <div class="tooltip">{{ currentLocale === 'zh' ? 'English' : '中文' }}</div>
  </div>
</template>

<style lang="scss" scoped>
.language-switch {
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0px);
  }
  
  &.animating {
    transform: scale(1.1);
  }
}

.switch-container {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;

  &.flip {
    transform: rotateY(180deg);
  }
}

.language-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  
  &.zh {
    color: #333;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  }
  
  &.en {
    transform: rotateY(180deg);
    color: #333;
    background: linear-gradient(135deg, #e4e8ec 0%, #f5f7fa 100%);
  }
}

.tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
  }
}

.language-switch:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
