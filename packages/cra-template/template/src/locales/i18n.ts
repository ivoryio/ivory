import { I18n } from '@aws-amplify/core'

import { i18nKeys, en } from 'locales'

export { t, i18nKeys, initializeTranslations, setLanguage }

/**
 * Simple function to replace keys with translated text
 * It uses I18n from amplify by default, but it can be easily
 * replaced with an other library, such as i18next
 *
 * It supports basic interpolation and pluralization.
 *
 * @param {string} key the translation key that will be matched in the json
 * @param options specify a `defaultValue` or a `count` for the translation
 * or a `replace` dictionary
 */
function t(key: string, options?: TranslationOptions): string {
  if (!options) {
    return I18n.get(key)
  }

  const { defaultValue, count, replace } = options
  const hasCount = typeof count === 'number'
  const isPlural = hasCount && count !== 1

  let val: string = I18n.get(isPlural ? `${key}_plural` : key, defaultValue)
  if (hasCount) {
    val = val.replace('{{count}}', `${count}`)
  }

  if (!replace) {
    return val
  }

  return Object.keys(replace).reduce<string>(
    (prev, key) => prev.replace(`{{${key}}}`, replace[key]),
    val
  )
}

function initializeTranslations() {
  I18n.putVocabularies({
    en: flatten(en),
  })
}

function setLanguage(lang: string) {
  I18n.setLanguage(lang)
}

interface TranslationOptions {
  count?: number
  defaultValue?: string
  replace?: InterpolationOptions
}

interface InterpolationOptions {
  [key: string]: string
}

function flatten(data: JsonTranslations) {
  const result: FlatTranslations = {}
  flattenLevel(data, '')
  return result

  function flattenLevel(level: string | JsonTranslations, prop: string) {
    if (typeof level === 'string') {
      result[prop] = level
      return
    }
    for (const p in level) {
      flattenLevel(level[p], prop ? prop + '.' + p : p)
    }
  }
}

interface FlatTranslations {
  [key: string]: string
}

interface JsonTranslations {
  [key: string]: string | JsonTranslations
}
