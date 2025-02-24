import type { Dictionary, DictionaryResource } from '@/typings/index'
import { calcChapterCount } from '@/utils'

// 德语词典
const germanExam: DictionaryResource[] = [
  {
    id: 'obst',
    name: 'obst',
    description: 'Obst in Deutsch',
    category: 'Deutsches Substantiv',
    tags: ['Basic'],
    url: '/dicts/obst.json',
    length: 33,
    language: 'de',
    languageCategory: 'de',
  },
]

/**
 * Built-in dictionaries in an array.
 * Why arrays? Because it keeps the order across browsers.
 */
export const dictionaryResources: DictionaryResource[] = [
  ...germanExam,
]

export const dictionaries: Dictionary[] = dictionaryResources.map((resource) => ({
  ...resource,
  chapterCount: calcChapterCount(resource.length),
}))

/**
 * An object-map from dictionary IDs to dictionary themselves.
 */
export const idDictionaryMap: Record<string, Dictionary> = Object.fromEntries(dictionaries.map((dict) => [dict.id, dict]))
