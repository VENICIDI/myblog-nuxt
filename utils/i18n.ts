// 简单的 i18n 工具函数
import { translations } from './translations';

export type Locale = 'zh' | 'en';

// 根据路径获取嵌套对象的值
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// 翻译函数
export function translate(key: string, locale: Locale): string {
  const translation = getNestedValue(translations[locale], key);
  if (translation === undefined) {
    console.warn(`Translation key "${key}" not found for locale "${locale}"`);
    // 如果当前语言没有找到，尝试使用英语作为后备
    const fallback = getNestedValue(translations.en, key);
    return fallback || key;
  }
  return translation;
}

// 获取可用的语言列表
export function getAvailableLocales(): Locale[] {
  return ['zh', 'en'];
}

// 验证语言代码是否有效
export function isValidLocale(locale: string): locale is Locale {
  return getAvailableLocales().includes(locale as Locale);
}
