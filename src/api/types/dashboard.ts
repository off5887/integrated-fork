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
  ideaId: number
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

// ─── 역할별 패널 데이터 ─────────────────────────────────────────────────────

/** 일반 사용자: 내가 최근에 올린 아이디어 */
export type RoleIdeaItem = {
  id: number
  title: string
  status: string
  statusColor: string
  date: string
  likes: number
}

/** 심사자: 내가 심사해야 하는 아이디어 */
export type RoleJudgeItem = {
  id: number
  title: string
  proposer: string
  dueDate: string
  urgent: boolean
}

/** 관리자: 마일리지 현금전환 신청 */
export type RoleMileageRequest = {
  id: number
  name: string
  fish: number
  cashAmount: number
  requestDate: string
}