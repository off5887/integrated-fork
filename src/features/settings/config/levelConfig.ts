// 심사자 레벨(1·2·3차)별 색상·레이블 설정
// SelectedReviewersPanel과 ReviewChange에서 공통으로 사용합니다.

export const levelConfig = {
  1: {
    label: '1차 심사자',
    accent: '#6366f1',
    bg: (d: boolean) => (d ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)'),
    border: (d: boolean) => (d ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'),
    avatarBg: (d: boolean) => (d ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)'),
    avatarColor: (d: boolean) => (d ? '#a5b4fc' : '#4338ca'),
    chipBg: (d: boolean) => (d ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)'),
    chipColor: (d: boolean) => (d ? '#a5b4fc' : '#4338ca'),
  },
  2: {
    label: '2차 심사자',
    accent: '#8b5cf6',
    bg: (d: boolean) => (d ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.04)'),
    border: (d: boolean) => (d ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'),
    avatarBg: (d: boolean) => (d ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'),
    avatarColor: (d: boolean) => (d ? '#c4b5fd' : '#6d28d9'),
    chipBg: (d: boolean) => (d ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)'),
    chipColor: (d: boolean) => (d ? '#c4b5fd' : '#6d28d9'),
  },
  3: {
    label: '3차 심사자',
    accent: '#f59e0b',
    bg: (d: boolean) => (d ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.04)'),
    border: (d: boolean) => (d ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)'),
    avatarBg: (d: boolean) => (d ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.1)'),
    avatarColor: (d: boolean) => (d ? '#fde68a' : '#92400e'),
    chipBg: (d: boolean) => (d ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)'),
    chipColor: (d: boolean) => (d ? '#fbbf24' : '#92400e'),
  },
} as const
