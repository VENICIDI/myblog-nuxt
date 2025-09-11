import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { translate, type Locale, isValidLocale, getAvailableLocales } from '@/utils/i18n';

export const useLanguageStore = defineStore('language', () => {
  // 初始化语言状态
  // 注意：在Nuxt的SSR环境中，localStorage在服务器端不可用
  // 使用ref初始化，但实际值会在客户端挂载后设置
  const currentLanguage = ref<Locale>('en');
  const availableLanguages = ref<Locale[]>(getAvailableLocales());

  // 计算当前语言名称
  const currentLanguageName = computed(() => {
    return translate(`lang.${currentLanguage.value}`, currentLanguage.value);
  });

  // 翻译函数
  const t = (key: string) => {
    return translate(key, currentLanguage.value);
  };

  // 初始化函数，在客户端环境中调用
  function initLanguage() {
    if (process.client) {
      const storedLang = localStorage.getItem('language') || 'en';
      if (isValidLocale(storedLang)) {
        currentLanguage.value = storedLang;
      }
      document.documentElement.setAttribute('lang', currentLanguage.value);
    }
  }
  
  // 切换语言
  function changeLanguage(lang: string) {
    if (isValidLocale(lang) && availableLanguages.value.includes(lang)) {
      currentLanguage.value = lang;
      
      // 客户端环境才操作localStorage和DOM
      if (process.client) {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
      }
      
      return true;
    }
    return false;
  }
  
  // 切换到下一个语言
  function toggleLanguage() {
    const currentIndex = availableLanguages.value.indexOf(currentLanguage.value);
    const nextIndex = (currentIndex + 1) % availableLanguages.value.length;
    const nextLanguage = availableLanguages.value[nextIndex];
    return changeLanguage(nextLanguage);
  }
  
  return {
    currentLanguage,
    availableLanguages,
    currentLanguageName,
    t,
    initLanguage,
    changeLanguage,
    toggleLanguage
  };
});
