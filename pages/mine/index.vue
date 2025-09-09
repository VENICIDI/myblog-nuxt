<script setup>

</script>

<template>
  <div class="back">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <div class="container">
      <div class="left">
        <h1>Hi,I'm</h1>
        <h1>杨文杰</h1>
        <div class="frontend">Frontend developer</div>
        <div class="introduce">Actively seeking internships to enhance practical skills and lay a foundation for my
          career. while keeping up with the latest trends in front-end development.</div>
      </div>
      <img src="@/assets/证件照.jpg">
    </div>
    <div class="skills">
      <h2 class="skills-title">Skills</h2>
      <h3 class="didiao">这里的百分比是指相对掌握的程度，不是绝对掌握的程度，本人还是小菜鸡一枚，正在积极寻求实习</h3>
      <div class="skills-categories">
        <!-- 前端开发技能 -->
        <div class="skill-category">
          <h3 class="category-title">Frontend Development</h3>
          <div class="skill-items">
            <div class="skill-item">
              <span class="skill-name">HTML5</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 80%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">CSS3</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 80%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">JavaScript</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 75%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Vue.js</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 70%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">TS</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 55%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 设计工具技能 -->
        <div class="skill-category">
          <h3 class="category-title">Tools</h3>
          <div class="skill-items">
            <div class="skill-item">
              <span class="skill-name">Git</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 60%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Webpack</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 50%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Vite</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 50%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Linux</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 30%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他技能 -->
        <div class="skill-category">
          <h3 class="category-title">Else</h3>
          <div class="skill-items">
            <div class="skill-item">
              <span class="skill-name">Java</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 60%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Spring</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 40%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <span class="skill-name">Python</span>
              <div class="skill-level">
                <div class="level-fill" style="width: 30%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-info">
    <h2 class="contact-title">Contact Me</h2>
    <div class="contact-items">
      <div class="contact-item">
        <svg class="contact-icon" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        <a href="https://github.com/VENICIDI" target="_blank">GitHub</a>
      </div>
      <div class="contact-item">
        <svg t="1743139757588" class="contact-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3128" width="32" height="32"><path d="M217.856 94.677333c-36.608 14.762667-60.928 38.485333-96.597333 83.2-88.618667 111.232-9.386667 332.8 194.730666 535.210667l10.581334 10.368c192 184.576 434.986667 264.533333 527.701333 184.064l3.029333-2.816-1.450666 1.194667a249.301333 249.301333 0 0 0 64.042666-77.994667c33.152-64 24.149333-130.858667-41.173333-182.954667-94.037333-75.008-157.184-77.568-219.434667-20.48l-6.997333 6.570667-18.005333 17.834667c-7.808-1.621333-19.882667-7.338667-34.730667-16.896-29.610667-19.114667-66.517333-50.901333-108.586667-92.586667-41.941333-41.642667-74.069333-78.208-93.312-107.605333l-3.882666-6.101334a120.448 120.448 0 0 1-12.245334-24.832l-0.938666-3.413333 18.133333-17.92 6.613333-6.954667c57.472-61.738667 54.912-124.373333-20.650666-217.642666-51.328-63.36-109.653333-83.328-166.826667-60.245334z m99.925333 113.493334l11.221334 14.08c37.546667 48.682667 37.888 64.853333 16.384 89.258666l-8.32 8.874667-21.12 20.821333c-45.482667 45.056-25.258667 102.314667 41.856 181.205334l14.08 16.085333 15.232 16.682667 8.106666 8.533333 16.981334 17.621333 18.176 18.261334 9.258666 9.130666 18.090667 17.450667 17.408 16.298667c5.717333 5.205333 11.306667 10.24 16.810667 15.104l16.213333 13.909333c79.616 66.56 137.216 86.570667 182.698667 41.685333l21.034666-20.992 5.546667-5.248c24.277333-22.186667 39.296-25.301333 80.725333 3.968l12.586667 9.258667 14.250667 11.093333c31.232 24.917333 34.261333 47.573333 18.602666 77.781334a165.845333 165.845333 0 0 1-26.88 36.608l-7.253333 7.338666-5.546667 5.12-5.333333 4.650667c-14.421333 14.293333-69.888 15.658667-141.184-7.722667-90.709333-29.781333-189.994667-92.074667-280.746667-182.101333-177.109333-175.658667-241.408-355.413333-188.16-422.272 26.453333-33.194667 43.648-49.92 61.653334-57.173333 19.285333-7.808 38.570667-1.194667 67.626666 34.688z" fill="#539c7f" p-id="3129"></path></svg>
        <span>+86 186-4291-4820</span>
      </div>
      <div class="contact-item">
        <svg t="1743139655134" class="contact-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2026" width="32" height="32"><path d="M767.818667 409.173333C867.338667 444.266667 938.666667 539.136 938.666667 650.666667c0 42.709333-10.496 83.978667-30.261334 120.842666-1.792 3.338667-4.992 8.928-9.696 16.96l14.613334 53.557334c6.506667 23.893333-15.402667 45.813333-39.296 39.296l-53.642667-14.634667-6.229333 3.669333A254.933333 254.933333 0 0 1 682.666667 906.666667c-77.994667 0-147.84-34.88-194.805334-89.888a352.608 352.608 0 0 1-56.64 4.554666c-63.338667 0-124.266667-16.853333-177.472-48.298666-1.834667-1.088-6.410667-3.733333-13.632-7.893334l-80.544 21.653334c-23.914667 6.432-45.76-15.573333-39.146666-39.434667l21.792-78.752a961.205333 961.205333 0 0 1-15.904-27.317333A336.384 336.384 0 0 1 85.333333 480c0-188.618667 154.965333-341.333333 345.888-341.333333 159.914667 0 297.984 108.010667 335.818667 259.296 0.949333 3.765333 1.173333 7.552 0.778667 11.2z m-68.106667-13.952C662.88 282.037333 555.178667 202.666667 431.221333 202.666667 275.434667 202.666667 149.333333 326.933333 149.333333 480c0 46.272 11.498667 90.837333 33.194667 130.698667 2.88 5.290667 10.176 17.706667 21.621333 36.746666a32 32 0 0 1 3.413334 25.013334l-10.517334 37.994666 39.232-10.549333a32 32 0 0 1 24.234667 3.146667c14.272 8.192 22.773333 13.098667 25.802667 14.890666A283.882667 283.882667 0 0 0 431.221333 757.333333c6.154667 0 12.288-0.192 18.389334-0.576A255.061333 255.061333 0 0 1 426.666667 650.666667c0-141.386667 114.613333-256 256-256 5.728 0 11.413333 0.192 17.045333 0.554666z m133.706667 397.056a32 32 0 0 1 3.338666-24.725333 996.672 996.672 0 0 0 15.242667-26.293333A190.997333 190.997333 0 0 0 874.666667 650.666667c0-106.037333-85.962667-192-192-192s-192 85.962667-192 192 85.962667 192 192 192a190.933333 190.933333 0 0 0 98.570666-27.2c2.208-1.322667 8.288-4.874667 18.517334-10.837334a32 32 0 0 1 24.522666-3.210666l12.565334 3.424-3.424-12.565334zM330.666667 426.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m192 0a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m85.333333 202.666666a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m149.333333 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64z" fill="#539c7f" p-id="2027"></path></svg>
        <span>WeChat: 18941878977</span>
      </div>
    </div>
  </div>
  </div>
</template>


<style lang="scss" scoped>
body {
  font-family: 'Inter', sans-serif;
}

.back {
  background-color: var(--backgroundcolor);
  display: flex;
  flex-direction: column;
}

/* 基础布局样式 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // max-width: 1200px;
  width: 70vw;
  margin: 0 auto;
  padding: 4rem 2rem;
  padding-bottom: 1rem;
  height: 80vh;
}

/* 左侧内容区 */
.left {
  flex: 0 1 600px;
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  color: #424b4e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

h1:first-child {
  color: var(--mostdarkcolor);
  margin-bottom: -1rem;
}

/* 职位样式 */
.frontend {
  font-size: 1.8rem;
  color: #636e72;
  margin: 1.5rem 0;
  padding-left: 0.5rem;
  border-left: 4px solid var(--backgroundcolor);
}

/* 自我介绍文本 */
.introduce {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #636e72;
  width: 30vw;
  margin-top: 2rem;
  padding: 1.5rem;
  // background: var(--lightcolor);
  border-radius: 12px;
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 证件照样式 */
img {
  width: 380px;
  height: 500px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 4px solid white;
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

img:hover {
  transform: rotate(0) scale(1.02);
}

.skills {
  flex: 0 1;
  padding: 120px;
  padding-top: 0%;
  border-radius: 12px;
  width: 60vw;
  margin: auto;
  overflow: hidden;
  height: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.skills-title {
  font-size: 2rem;
  font-weight: 700;
  color: #424b4e;
  margin-bottom: 2rem;
  text-align: center;
  padding-bottom: 1rem;
}

.didiao {
  font-size: 1rem;
  font-weight: 700;
  color: #424b4e;
  margin-bottom: 2rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-category {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #424b4e;
  margin-bottom: 1.5rem;
  text-align: center;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #424b4e;
  min-width: 100px;
}

.skill-level {
  flex: 1;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background-color: var(--verydarkcolor);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.contact-info {
  padding: 4rem 2rem;
  text-align: center;
  // background: rgba(255, 255, 255, 0.9);
  margin: 2rem auto;
  border-radius: 12px;
  width: 80vw;
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.contact-title {
  font-size: 2rem;
  color: var(--mostdarkcolor);
  margin-bottom: 2rem;
}

.contact-items {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  color: #424b4e;
  
  a {
    color: var(--verydarkcolor);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--mostdarkcolor);
      text-decoration: underline;
    }
  }
}

.contact-icon {
  width: 24px;
  height: 24px;
  color: var(--verydarkcolor);
  flex-shrink: 0;
}
</style>
