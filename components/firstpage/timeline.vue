<script setup>
/**
 * 时间轴组件 - 展示网站更新计划
 */
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const timelineItems = computed(() => [
  {
    id: 0,
    title: t('home.timeline.localization'),
    description: t('home.timeline.localizationDesc'),
    time: t('home.timeline.completed'),
    status: 'completed',
  },
  {
    id: 1,
    title: t('home.timeline.aiChat'),
    description: t('home.timeline.aiChatDesc'),
    time: t('home.timeline.inProgress'),
    status: 'current',
  },
  {
    id: 2,
    title: t('home.timeline.serverRefactor'),
    description: t('home.timeline.serverRefactorDesc'),
    time: t('home.timeline.completed'),
    status: 'completed',
  },
  {
    id: 3,
    title: t('home.timeline.permission'),
    description: t('home.timeline.permissionDesc'),
    time: t('home.timeline.planned'),
    status: 'planned',
  },
  {
    id: 4,
    title: t('home.timeline.richText'),
    description: t('home.timeline.richTextDesc'),
    time: t('home.timeline.planned'),
    status: 'planned',
  },
  {
    id: 5,
    title: t('home.timeline.minecraft'),
    description: t('home.timeline.minecraftDesc'),
    time: t('home.timeline.planned'),
    status: 'planned',
  }
]);
</script>

<template>
  <div class="timeline-container">
    <h2 class="timeline-title">{{ t('home.timeline.title') }}</h2>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div v-for="item in timelineItems" :key="item.id" class="timeline-item" :class="item.status">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-time">{{ item.time }}</div>
          <h3 class="timeline-item-title">{{ item.title }}</h3>
          <p class="timeline-description">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- 未完待续效果 - 移至时间轴外部 -->
    <div class="timeline-continue">
      <div class="timeline-continue-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="timeline-continue-text">{{ t('home.timeline.more') }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-container {
  margin-top: 80px;
  margin-bottom: 60px;
  padding: 30px;
  animation: fadeIn 1s ease-out;
}

.timeline-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: 600;
  color: var(--mostdarkcolor, #333);
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: var(--verydarkcolor, #555);
    border-radius: 2px;
  }
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: linear-gradient(to bottom, var(--litterdarkcolor, #777), var(--verydarkcolor, #555), rgba(var(--verydarkcolor, #555), 0.4));
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 60px;
  opacity: 0;
  animation: slideIn 0.6s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.2s;
  }

  &:nth-child(2) {
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.8s;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--darkercolor, #666);
    border: 3px solid var(--backgroundcolor, #fff);
    z-index: 2;
  }

  .timeline-content {
    width: 42%;
    padding: 20px;
    background: var(--lightcolor, #f5f5f5);
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(83, 156, 127, 0.08);
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(var(--darkercolor, #666), 0.2);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(83, 156, 127, 0.15);
    }

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      width: 16px;
      height: 16px;
      background: var(--lightcolor, #f5f5f5);
      border-top: 1px solid rgba(var(--darkercolor, #666), 0.2);
      border-left: 1px solid rgba(var(--darkercolor, #666), 0.2);
      transform: rotate(45deg);
    }
  }

  &:nth-child(odd) .timeline-content {
    margin-left: auto;

    &::after {
      left: -8px;
    }
  }

  &:nth-child(even) .timeline-content {
    margin-right: auto;

    &::after {
      right: -8px;
    }
  }

  .timeline-time {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    background-color: rgba(var(--darkercolor, #666), 0.3);
    color: var(--mostdarkcolor, #333);
  }

  .timeline-item-title {
    margin: 0 0 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .timeline-description {
    margin: 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }

  // 状态样式
  &.current {
    .timeline-dot {
      background-color: var(--verydarkcolor, #555);
      border-color: var(--backgroundcolor, #fff);
      box-shadow: 0 0 0 4px rgba(83, 156, 127, 0.3);
    }

    .timeline-time {
      background-color: var(--verydarkcolor, #555);
      color: white;
    }
  }

  &.upcoming {
    .timeline-dot {
      background-color: var(--litterdarkcolor, #777);
    }

    .timeline-time {
      background-color: var(--litterdarkcolor, #777);
      color: white;
    }
  }

  &.planned {
    .timeline-dot {
      background-color: var(--darkercolor, #666);
    }

    .timeline-time {
      background-color: var(--darkercolor, #666);
      color: #333;
    }
  }
}

// 动画定义
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 未完待续样式
.timeline-continue {
  position: relative;
  margin-top: 60px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards 1.2s;
  padding: 20px;

  .timeline-continue-dots {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;

    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      border-radius: 50%;
      background-color: var(--verydarkcolor, #555);
      opacity: 0.7;
      animation: pulseAnimation 1.5s infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }

  .timeline-continue-text {
    color: #666;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    opacity: 0.8;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 0;
      height: 2px;
      transition: width 0.6s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
}

@keyframes pulseAnimation {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.3);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .timeline-line {
    left: 30px;
  }

  .timeline-item {
    .timeline-dot {
      left: 30px;
    }

    .timeline-content {
      width: calc(100% - 60px);
      margin-left: 60px !important;

      &::after {
        left: -8px !important;
        right: auto !important;
      }
    }
  }
}
</style>
