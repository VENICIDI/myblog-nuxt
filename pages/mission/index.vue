<script setup>
import { ref, onMounted } from 'vue';
import { baseMission } from '@/data/missions';

// 保留基础响应式布局逻辑
const missionContainer = ref(null);

const updateLayout = () => {
  if (!missionContainer.value) return;

  const containerWidth = missionContainer.value.clientWidth;
  const cardWidth = Math.min(containerWidth / 4, 300); // 改为4列布局
  const cardHeight = cardWidth * 1.33;

  document.documentElement.style.setProperty('--card-width', `${cardWidth}px`);
  document.documentElement.style.setProperty('--card-height', `${cardHeight}px`);
};

onMounted(() => {
  window.addEventListener('resize', updateLayout);
  updateLayout();
});
</script>

<template>
  <div class="mission-container" ref="missionContainer">
    <div class="mission-grid">
      <div v-for="mission in baseMission" :key="mission.id" class="mission-item">
        <NuxtLink :to= "`/mission/${mission.name}`" class="mission-link">
          <div class="mission-header">
            <h3>{{ mission.name }}</h3>
          </div>
          <div class="mission-content">
            <p>{{ mission.describe }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mission-container {
  width: 100%;
  padding: 40px 20px;
  background-color: var(--backgroundcolor);
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
  gap: 30px;
  max-width: 1440px;
  margin: 0 auto;
  justify-items: center;
}

.mission-item {
  width: var(--card-width);
  height: var(--card-height);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  .mission-header {
    h3 {
      font-size: clamp(16px, 1.4vw, 20px);
      margin-bottom: 15px;
      color: #2c3e50;
      text-align: center;
    }
  }

  .mission-content {
    p {
      font-size: clamp(12px, 1.1vw, 14px);
      line-height: 1.6;
      color: #4a5568;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

.mission-link {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
  
  // 确保点击区域有效
  &:deep() {
    > div {
      pointer-events: none; /* 允许点击穿透到链接 */
    }
  }
}
</style>
