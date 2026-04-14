import { describe, it, expect } from 'vitest'
import { fmtDate, getCatConfig, getSimilarity, buildMyIdeaKeywords } from './utils'
import type { IdeaItem } from '@/api/types/ideaBrowse'

// ─── fmtDate ──────────────────────────────────────────────────────────────────

describe('fmtDate', () => {
  it('"YYYY-MM-DD" 포맷을 "MM/DD"로 변환한다', () => {
    expect(fmtDate('2024-03-15')).toBe('03/15')
    expect(fmtDate('2024-12-01')).toBe('12/01')
    expect(fmtDate('2025-01-09')).toBe('01/09')
  })
})

// ─── getCatConfig ──────────────────────────────────────────────────────────────

describe('getCatConfig', () => {
  it('유효한 카테고리 ID에 해당하는 config를 반환한다', () => {
    const config = getCatConfig('혁신')
    expect(config.id).toBe('혁신')
    expect(config.label).toBe('혁신')
    expect(config.emoji).toBe('🚀')
  })

  it('절감 카테고리 config를 반환한다', () => {
    const config = getCatConfig('절감')
    expect(config.id).toBe('절감')
    expect(config.emoji).toBe('💰')
  })

  it('존재하지 않는 ID 입력 시 마지막(기타) config를 반환한다', () => {
    const config = getCatConfig('없는카테고리')
    expect(config.id).toBe('기타')
    expect(config.label).toBe('기타')
  })
})

// ─── getSimilarity ─────────────────────────────────────────────────────────────

const baseIdea: IdeaItem = {
  id: 999,
  title: '테스트 아이디어',
  categoryId: 2,
  category: '혁신',
  problem: '문제 설명',
  solution: '해결 방안',
  author: '테스터',
  bizArea: '본사',
  department: '개발팀',
  status: '심사대기',
  security: 'public',
  submittedAt: '2024-01-01',
  likes: 0,
  views: 0,
  comments: 0,
}

const makeMyIdea = (id: number, title: string, problem: string, solution: string): IdeaItem => ({
  ...baseIdea,
  id,
  title,
  problem,
  solution,
})

const myIdeas: IdeaItem[] = [
  makeMyIdea(1, '사내 점심시간 30분 연장', '점심시간이 짧고 배달 음식을 먹기 어렵습니다', '점심시간을 30분 연장합니다'),
  makeMyIdea(2, '주 1회 재택근무 의무화', '재택근무 제도가 없어 유연근무가 불가합니다', '재택근무를 의무화합니다'),
]
const myKeywords = buildMyIdeaKeywords(myIdeas)

describe('getSimilarity', () => {
  it('키워드 2개 이상 매치 시 해당 내 아이디어 제목을 반환한다', () => {
    const idea: IdeaItem = {
      ...baseIdea,
      id: 100,
      author: '다른사람',
      title: '점심 식사 환경 개선',
      problem: '점심시간이 짧고 배달 음식을 먹기 어렵습니다',
      solution: '점심시간을 30분 연장합니다',
    }
    const result = getSimilarity(idea, myKeywords)
    expect(result).toContain('사내 점심시간 30분 연장')
  })

  it('재택근무 관련 키워드 매치 시 해당 제목을 반환한다', () => {
    const idea: IdeaItem = {
      ...baseIdea,
      id: 101,
      author: '다른사람',
      title: '원격근무 도입',
      problem: '재택근무 및 유연근무 제도가 없습니다',
      solution: '재택근무를 활성화합니다',
    }
    const result = getSimilarity(idea, myKeywords)
    expect(result).toContain('주 1회 재택근무 의무화')
  })

  it('키워드 매치가 1개 이하인 경우 빈 배열을 반환한다', () => {
    const idea: IdeaItem = {
      ...baseIdea,
      id: 102,
      title: '완전히 관련없는 아이디어',
      problem: '아무런 문제도 없음',
      solution: '특별히 할 것이 없음',
    }
    const result = getSimilarity(idea, myKeywords)
    expect(result).toHaveLength(0)
  })

  it('자기 자신(id 일치)은 유사 목록에 포함되지 않는다', () => {
    const idea: IdeaItem = { ...myIdeas[0], id: 1 }
    const result = getSimilarity(idea, myKeywords)
    expect(result).not.toContain('사내 점심시간 30분 연장')
  })

  it('내 아이디어와 작성자가 같은 아이디어는 유사 목록에 표시되지 않는다', () => {
    const idea: IdeaItem = {
      ...baseIdea,
      id: 100,
      author: '테스터',
      title: '점심 식사 환경 개선',
      problem: '점심시간이 짧고 배달 음식을 먹기 어렵습니다',
      solution: '점심시간을 30분 연장합니다',
    }
    const result = getSimilarity(idea, myKeywords)
    expect(result).toHaveLength(0)
  })

  it('작성자가 다르면 키워드 매치 시 유사 목록에 포함된다', () => {
    const idea: IdeaItem = {
      ...baseIdea,
      id: 100,
      author: '다른사람',
      title: '점심 식사 환경 개선',
      problem: '점심시간이 짧고 배달 음식을 먹기 어렵습니다',
      solution: '점심시간을 30분 연장합니다',
    }
    const result = getSimilarity(idea, myKeywords)
    expect(result).toContain('사내 점심시간 30분 연장')
  })

  it('반환값은 항상 배열이다', () => {
    const result = getSimilarity(baseIdea, [])
    expect(Array.isArray(result)).toBe(true)
  })
})
