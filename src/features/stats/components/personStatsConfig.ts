// src/features/stats/components/personStatsConfig.ts
import type { PersonStatsRow } from '@/api/types/stats'

export type SortKey = keyof Omit<PersonStatsRow, 'id' | 'name' | 'department' | 'position'>
export type SortDir = 'asc' | 'desc'

export interface ColDef {
  key: SortKey
  label: string
  unit?: string
  color: string
}

export const COLS: ColDef[] = [
  { key: 'totalPosts',    label: '총게시글',      unit: '건',  color: '#6366f1' },
  { key: 'comments',      label: '댓글',          unit: '개',  color: '#8b5cf6' },
  { key: 'ideaCount',     label: '아이디어상상',  unit: '건',  color: '#0ea5e9' },
  { key: 'completeCount', label: '실행완료상상',  unit: '건',  color: '#10b981' },
  { key: 'executionCount',label: '실행건수',      unit: '건',  color: '#f59e0b' },
  { key: 'expectedAmount',label: '기대성과금액',  unit: '만원',color: '#ef4444' },
  { key: 'mileage',       label: '마일리지',      unit: '🐟',  color: '#06b6d4' },
]
