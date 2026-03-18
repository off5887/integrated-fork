// src/api/types/dashboard.ts

import type { SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

// ─── 컴포넌트 Props ───────────────────────────────────────────────────────────

export type DashboardCardProps = {
  children: ReactNode
  delay?: number
  sx?: SxProps<Theme>
}

export type MyGomgomiCardProps = {
  fishTotal: number
  fishToNextLevel: number
}

export type ExecutionCompletionRateProps = {
  completionRate: number
}

// ─── 데이터 모델 ──────────────────────────────────────────────────────────────

export type KpiStat = {
  label: string
  value: string
  icon: string
  color: string
}

export type RecentActivity = {
  user: string
  action: string
  time: string
  icon: string
  color: string
}

export type ApprovalStage = {
  label: string
  value: number
  color: string
}

export type DepartmentData = {
  department: string
  value: number
  color: string
}

export type PopularItem = {
  title: string
  likes: number
}

export type MiniStat = {
  label: string
  value: string
  color: string
}

export type MyGomgomi = {
  fishTotal: number
  fishToNextLevel: number
  level: number
  rankName: string
  miniStats: MiniStat[]
}