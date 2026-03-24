// src/api/types/idea.ts
import type { SvgIconComponent } from '@mui/icons-material'

export interface VisibilityOption {
  value: 'public' | 'private'
  icon: SvgIconComponent
  label: string
  description: string
  accentColor: string
  accentBg: string
  accentBorder: string
  accentBgDark: string
  accentBorderDark: string
}

export type CategoryOption = {
  id: string
  label: string
  description?: string
  emoji: string
  color: string
  bg: string
  border: string
  active?: boolean
}

export type Reviewer = {
  id: number
  name: string
  dept: string
  position: string
}

export type OrgMember = {
  id: number
  name: string
  dept: string
  position: string
}

export type OrgTeam = {
  id: string
  name: string
  members: OrgMember[]
}

export type OrgDivision = {
  id: string
  name: string
  teams: OrgTeam[]
}

export interface DraftData {
  ideaType: 'idea' | 'complete'
  title: string
  categories: string[]
  problem: string
  solution: string
  reviewer: string[]
  coProposers: string[]
  security: 'public' | 'private'
  plan: string
  startDate: string
  endDate: string
  expectedOutcome: string
  savedAt: string
}