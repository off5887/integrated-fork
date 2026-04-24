import type { IdeaStatus } from '@/api/types/settings'

export const statusConfig: Record<
  IdeaStatus,
  { color: string; bg: (d: boolean) => string; border: (d: boolean) => string }
> = {
  '심사대기': {
    color: '#6366f1',
    bg: (d) => (d ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'),
    border: (d) => (d ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'),
  },
  '승인': {
    color: '#22c55e',
    bg: (d) => (d ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.07)'),
    border: (d) => (d ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.2)'),
  },
  '반려': {
    color: '#ef4444',
    bg: (d) => (d ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)'),
    border: (d) => (d ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.2)'),
  },
  '실행중': {
    color: '#f97316',
    bg: (d) => (d ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.07)'),
    border: (d) => (d ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'),
  },
  '완료': {
    color: '#14b8a6',
    bg: (d) => (d ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.07)'),
    border: (d) => (d ? 'rgba(20,184,166,0.3)' : 'rgba(20,184,166,0.2)'),
  },
}

export const ALL_STATUSES = Object.keys(statusConfig) as IdeaStatus[]
