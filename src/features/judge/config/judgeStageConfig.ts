// judge 피처 전용 심사 단계 설정
// 상태 색상(amber/indigo/green/red)과 겹치지 않도록 sky/pink/orange 계열 사용

export const stageConfig = {
  1: {
    bg:       'rgba(14,165,233,0.1)',
    color:    '#0ea5e9',
    border:   'rgba(14,165,233,0.3)',
    activeBg: 'rgba(14,165,233,0.18)',
  },
  2: {
    bg:       'rgba(236,72,153,0.1)',
    color:    '#ec4899',
    border:   'rgba(236,72,153,0.3)',
    activeBg: 'rgba(236,72,153,0.18)',
  },
  3: {
    bg:       'rgba(249,115,22,0.1)',
    color:    '#f97316',
    border:   'rgba(249,115,22,0.3)',
    activeBg: 'rgba(249,115,22,0.18)',
  },
} as const
