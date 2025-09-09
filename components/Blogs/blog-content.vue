<script setup>
import { getBlogByID } from "@/utils/apis/blogAPI";
import Markdownit from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // 更换为更美观的高亮主题
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus';

const route = useRoute();
const blogContent = ref("");
const result = ref("");
const loading = ref(true);
const blogTitle = ref("");
const blogDate = ref("");
const blogAuthor = ref("");

const getContent = async () => {
    loading.value = true;
    try {
        const res = await getBlogByID(route.params.id);
        blogContent.value = res.data.data.content;
        blogTitle.value = res.data.data.title || "无标题博客";
        blogDate.value = res.data.data.createTime ? new Date(res.data.data.createTime).toLocaleDateString() : "未知日期";
        blogAuthor.value = res.data.data.author || "匿名作者";

        // 为文章添加标题，如果内容中没有 h1 标签
        if (!blogContent.value.trim().startsWith('# ')) {
            blogContent.value = `# ${blogTitle.value}\n\n${blogContent.value}`;
        }
    } catch (error) {
        console.error('获取博客内容失败:', error);
        ElMessage.error('获取博客内容失败，请稍后再试');
        blogContent.value = '# 获取内容失败\n\n很抱歉，无法加载博客内容。请稍后再试。';
    } finally {
        loading.value = false;
    }
};

const markdown = Markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<div class="code-header">' +
                    '<span class="lang-label">' + lang + '</span>' +
                    '<div class="code-dots"><span></span><span></span><span></span></div>' +
                    '</div>' +
                    hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }
        return '<div class="code-header">' +
            '<div class="code-dots"><span></span><span></span><span></span></div>' +
            '<span class="lang-label">code</span>' +
            '</div>' +
            hljs.highlightAuto(str).value;
    }
});

// 添加锚点功能
markdown.renderer.rules.heading_open = function (tokens, idx) {
    const token = tokens[idx];
    const level = token.markup.length;
    const nextToken = tokens[idx + 1];
    const title = nextToken.content;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return `<h${level} id="${slug}">`;
};

watch(blogContent, (newContent) => {
    if (newContent) {
        result.value = markdown.render(newContent);
    }
});

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
    if (newId) {
        result.value = "";  // 清空内容，显示加载状态
        getContent();
    }
}, { immediate: true });
</script>

<template>
    <div class="bloggg">
        <div class="blogcontent">
            <div v-if="!result" class="loading-container">
                <el-skeleton :rows="10" animated />
            </div>
            <div v-else class="blog-article" v-html="result"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bloggg {
    background-color: var(--backgroundcolor);
    display: flex;
    justify-content: center;
    padding: 3rem 2rem;
    height: auto;
    min-height: 95vh;
}

.blogcontent {
    width: 60vmax;
    max-width: 800px;
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    line-height: 1.7;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        transform: translateY(-3px);
    }

    .loading-container {
        padding: 2rem 0;
        min-height: 60vh;
    }

    .blog-article {
        position: relative;
    }

    // 美化内容样式
    :deep(h1) {
        color: var(--mostdarkcolor);
        margin-bottom: 1.5rem;
        font-size: 2.2rem;
        border-bottom: 2px solid var(--litterdarkcolor);
        padding-bottom: 0.5rem;
    }

    :deep(h2) {
        color: var(--verydarkcolor);
        margin: 1.8rem 0 1rem;
        font-size: 1.8rem;
    }

    :deep(h3) {
        color: var(--verydarkcolor);
        margin: 1.5rem 0 0.8rem;
        font-size: 1.5rem;
    }

    :deep(p) {
        margin-bottom: 1.2rem;
        text-align: justify;
    }

    :deep(ul),
    :deep(ol) {
        padding-left: 2rem;
        margin: 1rem 0;
    }

    :deep(li) {
        margin-bottom: 0.5rem;
    }

    :deep(blockquote) {
        border-left: 4px solid var(--litterdarkcolor);
        padding-left: 1rem;
        margin: 1.5rem 0;
        color: #555;
        font-style: italic;
        background-color: var(--lightcolor);
        padding: 1rem;
        border-radius: 4px;
    }

    :deep(a) {
        color: var(--verydarkcolor);
        text-decoration: none;
        border-bottom: 1px solid var(--litterdarkcolor);
        transition: all 0.2s;

        &:hover {
            color: var(--mostdarkcolor);
            border-bottom-width: 2px;
        }
    }

    :deep(img) {
        max-width: 100%;
        border-radius: 6px;
        margin: 1.5rem 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    :deep(code) {
        font-family: 'Consolas', 'Monaco', monospace;
        background-color: var(--lightcolor);
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-size: 0.9em;
    }

    :deep(pre) {
        background-color: #f7f9fc;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        margin: 1.5rem 0;
        border: 1px solid #e6e9ef;
        position: relative;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

        code {
            background-color: transparent;
            padding: 0.5rem 1rem;
            border-radius: 0;
            display: block;
            font-size: 0.9em;
        }

        .code-header {
            background-color: #f0f3f8;
            padding: 0.5rem 0.5rem;
            border-bottom: 1px solid #e6e9ef;
            font-family: 'Segoe UI', 'Arial', sans-serif;
            font-size: 0.85em;
            color: #5a6270;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 18px;
            margin-bottom: 10px;

            .code-dots {
                display: flex;
                gap: 6px;

                span {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;

                    &:nth-child(1) {
                        background-color: #ff5f56;
                    }

                    &:nth-child(2) {
                        background-color: #ffbd2e;
                    }

                    &:nth-child(3) {
                        background-color: #27c93f;
                    }
                }
            }

            .lang-label {
                background-color: rgba(var(--litterdarkcolor), 0.2);
                color: var(--verydarkcolor);
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 1.2rem;
                min-width: 30px;
                text-align: center;
                font-weight: 500;
                text-transform: lowercase;
                letter-spacing: 0.5px;
                margin-left: 10px;
                line-height: 1;
            }
        }
    }

    :deep(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;

        th,
        td {
            padding: 0.75rem;
            border: 1px solid #e0e0e0;
        }

        th {
            background-color: var(--lightcolor);
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #fafafa;
        }
    }
}
</style>
