// src/api/types/ideaBrowse.ts

export type IdeaCategory = '절감' | '혁신' | '안전' | '복지' | '품질' | '환경' | '기타'
export type IdeaStatus = '심사대기' | '심사중' | '승인' | '반려' | '실행중' | '완료'
export type SortKey = 'latest' | 'likes' | 'views' | 'comments'

export interface IdeaComment {
  id: number
  author: string
  content: string
  createdAt: string
}

export interface IdeaItem {
  id: number
  title: string
  category: IdeaCategory
  problem: string
  solution: string
  author: string
  division: string
  department: string
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
  commentsData?: IdeaComment[]
  likesData?: string[]
}

export interface CategoryConfig {
  id: IdeaCategory
  label: string
  emoji: string
  color: string
  bg: string
  border: string
}