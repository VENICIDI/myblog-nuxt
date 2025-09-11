<script setup>
import caritem from '@/assets/caritem.jpg'
import { Picture, View, User, Calendar } from '@element-plus/icons-vue'

const props = defineProps({
    picture : {
        type : String,
        default : caritem
    },
    title : {
        type : String,
        default : "一篇文章彻底理解Javascript闭包"
    },
    abstract : {
        type : String,
        default : "闭包简单理解就是内嵌函数，也即在函数中嵌套函数。"
    }
})

</script>


<template>
    <div class="blog-card">
        <!-- 图片容器 -->
        <div class="image-container">
            <el-image :src="picture" alt="blog cover" class="blog-image" loading="lazy">
                <template #error>
                    <img :src="caritem" alt="default cover" class="blog-image"></img>
                </template>
                <template #placeholder>
                    <div class="image-placeholder">
                        <el-icon size="40"><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
            <div class="image-overlay">
                <div class="read-more-btn">
                    <el-icon><View /></el-icon>
                    <span>阅读全文</span>
                </div>
            </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="content-area">
            <div class="blog-meta">
                <span class="category-tag">技术分享</span>
                <span class="read-time">5分钟阅读</span>
            </div>
            
            <h3 class="blog-title">{{ title }}</h3>
            <p class="blog-abstract">{{ abstract }}</p>
            
            <div class="blog-footer">
                <div class="author-info">
                    <div class="author-avatar">
                        <img src="@/assets/Myavatar.jpg" alt="author avatar"/>
                    </div>
                    <span class="author-name">杨文杰</span>
                </div>
                <div class="publish-date">
                    <el-icon><Calendar /></el-icon>
                    <span>最近更新</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.blog-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    border: 1px solid rgba(108, 181, 152, 0.1);

    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--litterdarkcolor);
        
        .image-overlay {
            opacity: 1;
        }
        
        .blog-image {
            transform: scale(1.05);
        }
    }
}

// 图片容器
.image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: linear-gradient(135deg, var(--lightcolor), var(--darkercolor));
    
    .blog-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }
    
    .image-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--verydarkcolor);
        background: var(--lightcolor);
    }
    
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(64, 121, 99, 0.8), rgba(83, 156, 127, 0.8));
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        .read-more-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: white;
            border-radius: 25px;
            color: var(--mostdarkcolor);
            font-weight: 600;
            font-size: 0.9rem;
            transform: translateY(10px);
            transition: transform 0.3s ease;
            
            .blog-card:hover & {
                transform: translateY(0);
            }
        }
    }
}

// 内容区域
.content-area {
    padding: 1.5rem;
    
    .blog-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        
        .category-tag {
            background: linear-gradient(45deg, var(--litterdarkcolor), var(--verydarkcolor));
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .read-time {
            color: var(--verydarkcolor);
            font-size: 0.8rem;
            opacity: 0.7;
        }
    }
    
    .blog-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--mostdarkcolor);
        margin-bottom: 0.75rem;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.3s ease;
        
        .blog-card:hover & {
            color: var(--verydarkcolor);
        }
    }
    
    .blog-abstract {
        color: #666;
        line-height: 1.6;
        font-size: 0.95rem;
        margin-bottom: 1.25rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .blog-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid #f0f0f0;
        
        .author-info, .publish-date {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--verydarkcolor);
            font-size: 0.85rem;
            opacity: 0.8;
        }
        
        .author-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--litterdarkcolor), var(--verydarkcolor));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .blog-card {
        margin-bottom: 1rem;
    }
    
    .image-container {
        height: 160px;
    }
    
    .content-area {
        padding: 1.25rem;
        
        .blog-title {
            font-size: 1.1rem;
        }
        
        .blog-abstract {
            font-size: 0.9rem;
        }
    }
}

@media (max-width: 480px) {
    .content-area {
        padding: 1rem;
        
        .blog-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .blog-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }
    }
}
</style>
