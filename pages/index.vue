<script setup>
import { onMounted, ref } from 'vue';
import CarouselItem from '@/components/firstpage/carousel-item.vue';
import Timeline from '@/components/firstpage/timeline.vue';
import apocalypse from '@/assets/apocalypse.png';
import { useRouter } from 'vue-router';
import { useLanguageStore } from '@/stores/languageStore';

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

const languageStore = useLanguageStore();
const { t } = languageStore;

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

</script>

<template>
    <div class="content">
        <div class="container">
            <div class="sss">{{ sss }}</div>
            <p>{{ t('home.welcome') }}</p>
            <div class="discribe">
                <div class="dis2">
                    <img src="@/assets/Myavatar.jpg" class="avatar">
                    <RouterLink class="name" to="/mine">{{ t('home.learnMore') }}</RouterLink>
                    <!-- <div class="name" ></div> -->
                </div>
            </div>
            <el-carousel trigger="click" indicator-position="none" class="carousel">
                <el-carousel-item>
                    <carouselItem :content="t('home.carousel.aiChat')" @click="swiperTo" />
                </el-carousel-item>
                <el-carousel-item>
                    <carouselItem :imageSrc="apocalpse" :content="t('home.carousel.apocalypse')" @click="swiperTo"/>
                </el-carousel-item>
                <el-carousel-item>
                    <carouselItem :content="t('home.carousel.eventLoop')" @click="swiperTo"/>
                </el-carousel-item>
            </el-carousel>
            
            <!-- 网站更新计划时间轴 -->
            <timeline />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: auto;
    background-color: var(--backgroundcolor);
    display: flex;
}

.container {
    margin: auto;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .sss {
        margin-top: 180px;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
        font-size: 15px;
        color: rgb(94, 94, 94);
    }


    p {
        font-size: 95px;
        color: black;
        margin-top: 5px;
        margin-left: auto;
        margin-right: auto;
        font-weight: 800;
        text-align: center;
        letter-spacing: 1px;
        font-family: 'Playfair Display', 'Times New Roman', serif;
        text-transform: uppercase;
        position: relative;
        overflow: visible;
        text-shadow: 
            1px 1px 0 rgba(0,0,0,0.3),
            2px 2px 0 rgba(0,0,0,0.2),
            3px 3px 0 rgba(0,0,0,0.1),
            5px 5px 10px rgba(0,0,0,0.1),
            10px 10px 20px rgba(0,0,0,0.05);
        animation: 
            fadeInUp 1.2s ease-out forwards,
            titleFloat 6s ease-in-out infinite 1.2s,
            letterSpacing 8s ease-in-out infinite 1.2s;
        transform-origin: center;
    }

}

.discribe {
    display: flex;
    align-items: center;
    margin-top: 50px;

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
    margin-top: 60px;
    border-radius: 10px;
    width: min(60vw, 800px);
    max-width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: aqua;
}

// 新增全局动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titleFloat {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(0.5deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  75% {
    transform: translateY(5px) rotate(-0.5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes letterSpacing {
  0%, 100% {
    letter-spacing: 1px;
  }
  50% {
    letter-spacing: 2px;
  }
}

// 修改容器动画
.container {
  animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  opacity: 0;
}

// 优化头像动画
.avatar {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), 
              box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.75);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
}

</style>