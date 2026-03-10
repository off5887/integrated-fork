// src/routes/ideaBrowse/utils.ts
import { CATEGORY_CONFIG, MY_IDEA_KEYWORDS, MY_IDEA_TITLES } from '../../api/mock/ideaBrowse'
import type { CategoryConfig, IdeaItem } from '../../api/types/ideaBrowse'

/** idea 텍스트와 내 아이디어 키워드를 비교해 유사한 내 아이디어 제목 목록을 반환합니다. */
export function getSimilarity(idea: IdeaItem): string[] {
  const text = `${idea.title} ${idea.problem} ${idea.solution}`.toLowerCase()
  const matched: string[] = []
  MY_IDEA_KEYWORDS.forEach((keywords, idx) => {
    const count = keywords.filter((k) => text.includes(k.toLowerCase())).length
    if (count >= 2) matched.push(MY_IDEA_TITLES[idx])
  })
  return matched
}

/** "YYYY-MM-DD" → "MM/DD" */
export function fmtDate(s: string): string {
  const [, m, d] = s.split('-')
  return `${m}/${d}`
}

/** id에 해당하는 CategoryConfig를 반환합니다. 없으면 마지막(기타)을 반환합니다. */
export function getCatConfig(id: string): CategoryConfig {
  return CATEGORY_CONFIG.find((c) => c.id === id) ?? CATEGORY_CONFIG[CATEGORY_CONFIG.length - 1]
}
