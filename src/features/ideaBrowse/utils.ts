import { CATEGORY_CONFIG } from '@/api/mock/ideaBrowse'
import type { CategoryConfig, IdeaItem } from '@/api/types/ideaBrowse'

/** 텍스트에서 의미 있는 키워드(2자 이상 토큰)를 추출합니다. */
export function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.\-!?/()[\]]+/)
    .filter((w) => w.length >= 2)
}

/** 내 아이디어 목록에서 미리 추출한 키워드 캐시 항목 */
export interface MyIdeaKeywords {
  id: number
  title: string
  author: string
  keywords: string[]
}

/** 내 아이디어 목록에서 키워드를 미리 추출합니다. useMemo로 한 번만 계산합니다. */
export function buildMyIdeaKeywords(myIdeas: IdeaItem[]): MyIdeaKeywords[] {
  return myIdeas.map((m) => ({
    id:       m.id,
    title:    m.title,
    author:   m.author,
    keywords: extractKeywords(`${m.title} ${m.problem} ${m.solution}`),
  }))
}

/**
 * 사전 추출된 내 아이디어 키워드와 비교해 유사한 내 아이디어 제목 목록을 반환합니다.
 * 내 아이디어에서 추출한 키워드가 2개 이상 일치하면 유사로 판단합니다.
 * 단, 동일 id이거나 작성자가 같으면 제외합니다.
 */
export function getSimilarity(idea: IdeaItem, myKeywords: MyIdeaKeywords[]): string[] {
  const text = `${idea.title} ${idea.problem} ${idea.solution}`.toLowerCase()
  const matched: string[] = []
  for (const mine of myKeywords) {
    if (mine.id === idea.id) continue          // 자기 자신 제외
    if (idea.author === mine.author) continue  // 같은 작성자 제외
    if (mine.keywords.filter((k) => text.includes(k)).length >= 2) matched.push(mine.title)
  }
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
