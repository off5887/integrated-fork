// judge 피처 전용 결정(승인/반려) 색상 설정

import type { DecisionType } from '@/api/types/judge'

export const decisionConfig: Record<DecisionType, {
  color:    string
  bg:       string
  border:   string
  bgLight:  string
}> = {
  승인: {
    color:   '#6366f1',
    bg:      'rgba(99,102,241,0.1)',
    border:  'rgba(99,102,241,0.3)',
    bgLight: 'rgba(99,102,241,0.06)',
  },
  반려: {
    color:   '#ef4444',
    bg:      'rgba(239,68,68,0.1)',
    border:  'rgba(239,68,68,0.3)',
    bgLight: 'rgba(239,68,68,0.06)',
  },
  승인회수: {
    color:   '#f97316',
    bg:      'rgba(249,115,22,0.1)',
    border:  'rgba(249,115,22,0.3)',
    bgLight: 'rgba(249,115,22,0.06)',
  },
  반려회수: {
    color:   '#0d9488',
    bg:      'rgba(13,148,136,0.1)',
    border:  'rgba(13,148,136,0.3)',
    bgLight: 'rgba(13,148,136,0.06)',
  },
} as const
