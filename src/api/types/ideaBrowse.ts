// src/api/types/ideaBrowse.ts

export type IdeaCategory = '절감' | '혁신' | '안전' | '복지' | '품질' | '환경' | '기타'
export type IdeaStatus = '심사대기' | '심사중' | '승인' | '반려' | '실행중' | '완료'
export type SortKey = 'latest' | 'likes' | 'views' | 'comments'

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
  likes: number
  comments: number
  views: number
}

export interface CategoryConfig {
  id: IdeaCategory
  label: string
  emoji: string
  color: string
  bg: string
  border: string
}