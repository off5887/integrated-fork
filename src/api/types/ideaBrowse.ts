// src/api/types/ideaBrowse.ts

export type IdeaStatus = '심사대기' | '승인' | '반려' | '실행중' | '완료'
export type SortKey = 'latest' | 'likes' | 'views' | 'comments'

export interface IdeaItem {
  id: number
  title: string
  categoryId: number   // API categoryId — 필터 매칭 기준
  category: string     // 표시용 단축 라벨 (예: '절감', '혁신')
  problem: string
  solution: string
  author: string       // 작성자 이름 (표시용)
  submittedBy: string  // 작성자 사번 (본인 여부 판단용)
  bizArea: string
  department: string
  deptCd: string
  status: IdeaStatus
  submittedAt: string
  security: 'public' | 'private'
  likes: number
  comments: number
  views: number
  /** 승인·실행중·완료 상태일 때만 존재. 100점 만점 아이디어 평가 점수 */
  ideaScore?: number
  /** 승인·실행중·완료 상태일 때만 존재. 지급된 마일리지 포인트 */
  mileageScore?: number
}

export interface CategoryConfig {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  border: string
}