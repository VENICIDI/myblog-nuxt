<script setup>
import { ref, onMounted } from "vue";
import BlogItem from "@/components/Blogs/blog-item.vue";
import { getBlogList } from "@/utils/apis/blogAPI";

const blogList = ref([]);
const pageRequest = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页大小
});

const BlogList = async () => {
  const res = await getBlogList(pageRequest.value)
  console.log(res)
  blogList.value = res.data.data.blogs
  console.log(blogList.value)
}
onMounted(() => BlogList())
</script>


<template>
  <div class="blogs-container">
    <div v-for="(blog, index) in blogList" :key="index" class="blog-content">
      <NuxtLink :to="`/blogs/${blog.blogId}`">
        <BlogItem :title="blog.title" :abstract="blog.describe" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.blogs-container {
  padding: 20px;
  min-height: 100vh;
  background-color: var(--backgroundcolor);
}

.blog-content {
  margin-bottom: 15px;
}

a {
  text-decoration: none;
}
</style>
