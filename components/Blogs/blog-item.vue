<script setup>
import caritem from '@/assets/caritem.jpg'

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
    <div class="contain">
        <img :src="picture">
        <div class="contain2">
            <div class="title"> {{ title }} </div>
            <div class="abstract"> {{ abstract }} </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}

.contain {
    display: flex;
    align-items: center;  
    gap: 16px;  
    padding: 16px;
    border: 1px solid #eaeaea;  
    border-radius: 8px;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
    background-color: var(--lightcolor);  
    width: 100%;  // 响应式宽度
    max-width: 1000px;  // 最大宽度
    margin: 0 auto;  
    transition: transform 0.3s ease;  // 鼠标悬停时的动画效果
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        transform: translateY(-5px);  // 鼠标悬停时稍微上移
    }

    img {
        min-width: 240px;  
        height: 120px;  
        object-fit: cover;  // 保证图片填充整个区域
        border-radius: 8px; 
    }

    .contain2 {

        .title {
            font-size: 1.2rem;  
            color: #333;  
            font-weight: bold;  
            margin-bottom: 8px;  
        }

        .abstract {
            font-size: 1rem;  
            color: #666;  
            line-height: 1.5;  
        }
    }
}
</style>
