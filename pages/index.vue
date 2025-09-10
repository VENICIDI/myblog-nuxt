<script setup>
import { onMounted, ref } from 'vue';
import CarouselItem from '@/components/firstpage/carousel-item.vue';
import Timeline from '@/components/firstpage/timeline.vue';
import apocalypse from '@/assets/apocalypse.png';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

function getNowTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    const need_month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const need_day = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Satuerday']
    return need_day[day] + ' - ' + need_month[month] + ' ' + date + ',' + year;
}

const sss = ref();

const apocalpse = ref(apocalypse);

onMounted(() => {
    sss.value = getNowTime()
})

const { t } = useI18n();

const router = useRouter();
const swiperTo = (content) => {
    switch(content) {
        case t('home.carousel.apocalypse'):
            router.push('/mission')
            break;
        case t('home.carousel.aiChat'):
            router.push('/deepseek')
            break;
        case t('home.carousel.eventLoop'):
            router.push('/blogs/2')
            break;
    }
}

definePageMeta({
  layout: 'default'
});
</script>

<template>
    <div class="index">
        <div class="container">
            <div class="sss">{{ sss }}</div>
            <p>{{ t('home.welcome') }}</p>
            <div class="discribe">
                <div class="dis2">
                    <img src="@/assets/Myavatar.jpg" class="avatar">
                    <NuxtLink class="name" to="/mine">{{ t('home.learnMore') }}</NuxtLink>
                </div>
            </div>
            <el-carousel trigger="click" indicator-position="none" class="carousel">
                <el-carousel-item>
                    <CarouselItem 
                        :imageSrc="apocalpse" 
                        :content="t('home.carousel.apocalypse')" 
                        @click="swiperTo"
                    />
                </el-carousel-item>
                <el-carousel-item>
                    <CarouselItem 
                        :content="t('home.carousel.aiChat')" 
                        @click="swiperTo"
                    />
                </el-carousel-item>
                <el-carousel-item>
                    <CarouselItem 
                        :content="t('home.carousel.eventLoop')" 
                        @click="swiperTo"
                    />
                </el-carousel-item>
            </el-carousel>
        </div>
        <Timeline />
    </div>
</template>

<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--backgroundcolor);
    
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 40px 20px;
        max-width: 1200px;
        margin: 0 auto;
        
        .sss {
            font-size: 18px;
            color: var(--litterdarkcolor, #666);
            margin-bottom: 16px;
            font-weight: 300;
            letter-spacing: 1px;
            text-align: center;
            opacity: 0.8;
        }
        
        > p {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            background: linear-gradient(135deg, var(--verydarkcolor, #333) 0%, var(--litterdarkcolor, #666) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 40px;
            text-align: center;
            line-height: 1.2;
            letter-spacing: -0.02em;
        }
        
        .discribe {
            margin-bottom: 60px;
            
            .dis2 {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 24px;
                
                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    
                    &:hover {
                        transform: scale(1.05);
                        box-shadow: 
                            0 12px 40px rgba(0, 0, 0, 0.15),
                            0 0 0 1px rgba(255, 255, 255, 0.3);
                    }
                }
                
                .name {
                    font-size: 18px;
                    color: var(--verydarkcolor, #333);
                    text-decoration: none;
                    padding: 12px 32px;
                    border: 2px solid var(--verydarkcolor, #333);
                    border-radius: 50px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    position: relative;
                    overflow: hidden;
                    
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, var(--verydarkcolor, #333), var(--litterdarkcolor, #666));
                        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        z-index: -1;
                    }
                    
                    &:hover {
                        color: white;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                        
                        &::before {
                            left: 0;
                        }
                    }
                }
            }
        }
        
        .carousel {
            width: 100%;
            max-width: 900px;
            height: 400px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            
            :deep(.el-carousel__container) {
                border-radius: 20px;
            }
            
            :deep(.el-carousel__item) {
                border-radius: 20px;
                overflow: hidden;
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .index .container {
        padding: 20px 16px;
        
        .discribe .dis2 {
            .avatar {
                width: 100px;
                height: 100px;
            }
            
            .name {
                font-size: 16px;
                padding: 10px 24px;
            }
        }
        
        .carousel {
            height: 300px;
            max-width: 100%;
        }
    }
}

@media (max-width: 480px) {
    .index .container {
        padding: 20px 12px;
        
        .carousel {
            height: 250px;
        }
    }
}
</style>
