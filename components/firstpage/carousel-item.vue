<script setup>
import caritem from '@/assets/caritem.jpg';

const props = defineProps({
    imageSrc: {
        type: String,
        default: caritem
    },
    content: {
        type: String,
        default: '默认文章标题'
    }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  // 手动触发 click 事件并携带 content
  emit('click', props.content);
};

</script>

<template>
    <div class="carousel-item" @click="handleClick">
        <img :src="imageSrc" class="carousel-image">
        <div class="title-container">
            <div class="title">{{ content }}</div>
        </div>
    </div>
</template>

<style lang="scss">
.carousel-item {
    overflow: hidden;
    position: relative; 
    width: 100%;
    height: 100%;
    min-height: 30vh; 
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .carousel-image {
        width: 100%; 
        height: 100%; 
        object-fit: cover; /* 保持图片比例并覆盖整个容器 */
    }

    .title-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7)); /* 渐变遮罩 */
        text-align: center;
    }

    .title {
        color: white;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* 文字阴影 */
        z-index: 10;
        transition: transform 0.3s ease;
    }

    &:hover .title {
    transform: translateY(-5px); // 悬停效果
  }
}
</style>
