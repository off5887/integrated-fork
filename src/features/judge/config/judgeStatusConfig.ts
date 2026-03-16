// judge 피처 전용 상태 설정

export const statusConfig = {
  심사대기: {
    label: '심사대기',
    bg: 'rgba(245,158,11,0.1)',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.25)',
  },
  심사중: {
    label: '심사중',
    bg: 'rgba(99,102,241,0.1)',
    color: '#6366f1',
    border: 'rgba(99,102,241,0.25)',
  },
  승인: {
    label: '승인',
    bg: 'rgba(16,185,129,0.1)',
    color: '#10b981',
    border: 'rgba(16,185,129,0.25)',
  },
  반려: {
    label: '반려',
    bg: 'rgba(239,68,68,0.1)',
    color: '#ef4444',
    border: 'rgba(239,68,68,0.25)',
  },
} as const

export type StatusFilter = '전체' | '심사대기' | '심사중' | '승인' | '반려'
