<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { baseMission } from '@/data/missions'

const route = useRoute()
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

// 响应式任务数据
const state = reactive({
  mission: null,
  loading: true
})

// 查找任务
const findMission = () => {
  const missionName = decodeURIComponent(route.params.name)
  const found = baseMission.find(m => m.name === missionName)
  if (found) {
    // 创建响应式副本
    state.mission = reactive({
      ...found,
      explore: {
        red: [...found.explore.red],
        green: [...found.explore.green],
        blue: [...found.explore.blue]
      }
    })
  }
  state.loading = false
}

// 难度显示
const difficulty = computed(() => {
  const levels = ['特别简单', '简单', '正常', '困难', '特别困难', '疯狂']
  return state.mission ? levels[state.mission.level] : ''
})

// 随机拾荒方法
const scavenge = (color) => {
  if (!state.mission) return
  
  const items = state.mission.explore[color]
  if (items.length === 0) {
    showToast('牌库已空', 'warning')
    return
  }

  // 随机选择
  const randomIndex = Math.floor(Math.random() * items.length)
  const [removedItem] = items.splice(randomIndex, 1)
  
  showToast(`获得 ${color} 物品: ${removedItem}`, 'success')
  saveState()
}

// 显示提示
const showToast = (message, type) => {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => toast.show = false, 2000)
}

// 保存状态
const saveState = () => {
  localStorage.setItem('missionState', JSON.stringify(state.mission))
}

onMounted(() => {
  findMission()
  const saved = localStorage.getItem('missionState')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.name === state.mission?.name) {
        Object.assign(state.mission.explore, parsed.explore)
      }
    } catch (e) {
      console.error('读取保存状态失败', e)
    }
  }
})
</script>

<template>
  <div class="mission-container">
    <!-- 加载状态 -->
    <div v-if="state.loading" class="loading">
      <div class="spinner"></div>
      加载任务中...
    </div>

    <!-- 内容 -->
    <template v-else-if="state.mission">
      <!-- Toast提示 -->
      <div v-if="toast.show" :class="['toast', toast.type]">
        {{ toast.message }}
      </div>

      <header class="header">
        <h1 class="title">{{ state.mission.name }}</h1>
        <div class="meta">
          <span class="id">#{{ state.mission.id }}</span>
          <span class="difficulty">{{ difficulty }}</span>
        </div>
      </header>

      <main class="content">
        <section class="card info-card">
          <h2>任务详情</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>任务描述</label>
              <p>{{ state.mission.describe }}</p>
            </div>
            <div class="info-item">
              <label>任务目标</label>
              <p>{{ state.mission.target }}</p>
            </div>
            <div class="info-item">
              <label>其他设置</label>
              <p>{{ state.mission.else }}</p>
            </div>
            <div class="info-item">
              <label>相关地图</label>
              <div class="map-tags">
                <span 
                  v-for="(area, index) in state.mission.map" 
                  :key="index"
                  class="tag"
                >
                  {{ area }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="card scavenge-section">
          <h2>拾荒行动</h2>
          <div class="deck-controls">
            <button
              v-for="color in ['red', 'green', 'blue']"
              :key="color"
              :class="['scavenge-btn', color]"
              @click="scavenge(color)"
              :disabled="state.mission.explore[color].length === 0"
            >
              <span class="label">{{ { red: '红', green: '绿', blue: '蓝' }[color] }}色牌库</span>
              <span class="count">{{ state.mission.explore[color].length }}</span>
            </button>
          </div>

          <div class="deck-status">
            <div 
              v-for="color in ['red', 'green', 'blue']"
              :key="color"
              class="deck"
            >
              <h3>{{ color.toUpperCase() }} 牌库</h3>
              <ul v-if="state.mission.explore[color].length > 0">
                <li v-for="(item, index) in state.mission.explore[color]" :key="index">
                  {{ item }}
                </li>
              </ul>
              <div v-else class="empty">
                牌库已空
              </div>
            </div>
          </div>
        </section>
      </main>
    </template>

    <div v-else class="not-found">
      任务未找到
    </div>
  </div>
</template>

<style scoped>
.mission-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--backgroundcolor);
}

/* 加载动画 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #666;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #eee;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  .title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .meta {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    color: #666;
  }
}

/* 卡片通用样式 */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

/* 信息网格布局 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  .info-item {
    label {
      display: block;
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }
  }
}

/* 地图标签 */
.map-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    background: #f0f4f8;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9em;
    color: #4a5568;
  }
}

/* 拾荒按钮 */
.scavenge-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .count {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &.red {
    background: linear-gradient(145deg, #fee2e2, #fecaca);
    color: #dc2626;
  }

  &.green {
    background: linear-gradient(145deg, #dcfce7, #bbf7d0);
    color: #16a34a;
  }

  &.blue {
    background: linear-gradient(145deg, #dbeafe, #bfdbfe);
    color: #2563eb;
  }
}

/* 牌库状态 */
.deck-status {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  .deck {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1rem;

    h3 {
      margin: 0 0 1rem;
      color: #4a5568;
      font-size: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 200px;
      overflow-y: auto;

      li {
        padding: 0.5rem;
        margin: 0.25rem 0;
        background: white;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    }

    .empty {
      text-align: center;
      color: #94a3b8;
      padding: 1rem;
    }
  }
}

/* Toast提示 */
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  animation: slideIn 0.3s ease;

  &.success {
    background: #10b981;
  }

  &.warning {
    background: #f59e0b;
  }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.not-found {
  text-align: center;
  padding: 4rem;
  color: #666;
}
</style>
