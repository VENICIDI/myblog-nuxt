<script setup>
import { ref, onMounted, computed } from "vue";
import BlogItem from "@/components/Blogs/blog-item.vue";
import { getBlogList } from "@/utils/apis/blogAPI";

const blogList = ref([]);
const loading = ref(true);
const searchQuery = ref('');

const pageRequest = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页大小
});

// 过滤后的博客列表
const filteredBlogs = computed(() => {
  if (!searchQuery.value.trim()) {
    return blogList.value;
  }
  
  const query = searchQuery.value.toLowerCase().trim();
  return blogList.value.filter(blog => 
    blog.title?.toLowerCase().includes(query) ||
    blog.describe?.toLowerCase().includes(query)
  );
});

// 搜索处理函数
const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
};

const BlogList = async () => {
  loading.value = true;
  try {
    const res = await getBlogList(pageRequest.value);
    console.log('API Response:', res);
    blogList.value = res.data.blogs || [];
    console.log('Blog List:', blogList.value);
  } catch (error) {
    console.error('获取博客列表失败:', error);
    blogList.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => BlogList())
</script>


<template>
  <div class="blogs-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">📝 博客文章</h1>
      <p class="page-subtitle">分享技术见解与心得体会</p>
    </div>
    
    <!-- 搜索和筛选区域 -->
    <div class="search-section">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章标题或内容..."
          prefix-icon="Search"
          size="large"
          clearable
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="blogs-grid" v-if="blogList.length > 0">
      <div 
        v-for="(blog, index) in filteredBlogs" 
        :key="blog.blogId" 
        class="blog-content"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <NuxtLink :to="`/blogs/${blog.blogId}`">
          <BlogItem 
            :title="blog.title" 
            :abstract="blog.describe"
            :picture="blog.blogCover"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!loading" class="empty-state">
      <div class="empty-icon">📚</div>
      <h3>暂无文章</h3>
      <p>敬请期待更多精彩内容</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-grid">
      <div v-for="i in 6" :key="i" class="skeleton-item">
        <el-skeleton :rows="3" animated />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.blogs-container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--backgroundcolor) 0%, var(--lightcolor) 100%);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

// 页面标题区域
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--mostdarkcolor);
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--verydarkcolor), var(--mostdarkcolor));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--verydarkcolor);
    opacity: 0.8;
  }
}

// 搜索区域
.search-section {
  margin-bottom: 2.5rem;
  
  .search-box {
    max-width: 500px;
    margin: 0 auto;
    
    :deep(.el-input__wrapper) {
      border-radius: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      
      &:hover, &.is-focus {
        border-color: var(--litterdarkcolor);
        box-shadow: 0 6px 20px rgba(108, 181, 152, 0.2);
      }
    }
    
    :deep(.el-input__inner) {
      padding: 12px 20px;
      font-size: 1rem;
    }
  }
}

// 博客网格布局
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.blog-content {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  
  a {
    text-decoration: none;
    display: block;
    transition: transform 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}

// 空状态
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--verydarkcolor);
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.6;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--mostdarkcolor);
  }
  
  p {
    font-size: 1rem;
    opacity: 0.7;
  }
}

// 加载状态
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  .skeleton-item {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

// 动画
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 全局链接样式重置
a {
  text-decoration: none;
}
</style>
