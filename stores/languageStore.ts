import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLanguageStore = defineStore('language', () => {
  const i18n = useI18n();

  // 初始化语言状态
  // 注意：在Nuxt的SSR环境中，localStorage在服务器端不可用
  // 使用ref初始化，但实际值会在客户端挂载后设置
  const currentLanguage = ref('en');
  const availableLanguages = ref(['zh', 'en']);
  const currentLanguageName = ref('');

  // 初始化函数，在客户端环境中调用
  function initLanguage() {
    if (process.client) {
      const storedLang = localStorage.getItem('language') || 'en';
      currentLanguage.value = storedLang;
      currentLanguageName.value = i18n.t(`lang.${storedLang}`);
      i18n.locale.value = storedLang as 'zh' | 'en';
      document.documentElement.setAttribute('lang', storedLang);
    }
  }
  
  // 切换语言
  function changeLanguage(lang: string) {
    if (availableLanguages.value.includes(lang)) {
      currentLanguage.value = lang;
      
      // 客户端环境才操作localStorage和DOM
      if (process.client) {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
      }
      
      i18n.locale.value = lang as 'zh' | 'en';
      currentLanguageName.value = i18n.t(`lang.${lang}`);
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
    initLanguage,
    changeLanguage,
    toggleLanguage
  };
});
