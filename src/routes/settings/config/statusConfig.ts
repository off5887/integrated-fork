import type { IdeaStatus } from '../types'

export const statusConfig: Record<
  IdeaStatus,
  { color: string; bg: (d: boolean) => string; border: (d: boolean) => string }
> = {
  임시저장: {
    color: '#94a3b8',
    bg: (d) => (d ? 'rgba(148,163,184,0.1)' : 'rgba(148,163,184,0.08)'),
    border: (d) => (d ? 'rgba(148,163,184,0.25)' : 'rgba(148,163,184,0.18)'),
  },
  '1차 심사 대기': {
    color: '#6366f1',
    bg: (d) => (d ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'),
    border: (d) => (d ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'),
  },
  '2차 심사 대기': {
    color: '#8b5cf6',
    bg: (d) => (d ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)'),
    border: (d) => (d ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'),
  },
  '3차 심사 대기': {
    color: '#f59e0b',
    bg: (d) => (d ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.07)'),
    border: (d) => (d ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)'),
  },
  '실행자 선택': {
    color: '#f97316',
    bg: (d) => (d ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.07)'),
    border: (d) => (d ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'),
  },
  결과등록: {
    color: '#22c55e',
    bg: (d) => (d ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.07)'),
    border: (d) => (d ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.2)'),
  },
  결과심사: {
    color: '#14b8a6',
    bg: (d) => (d ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.07)'),
    border: (d) => (d ? 'rgba(20,184,166,0.3)' : 'rgba(20,184,166,0.2)'),
  },
}

// statusConfig 키 순서를 보장하는 배열 — Select 드롭다운 등에 사용
export const ALL_STATUSES = Object.keys(statusConfig) as IdeaStatus[]
