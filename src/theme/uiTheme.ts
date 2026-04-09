// src/theme/uiTheme.ts
// 공통 UI 컴포넌트 전용 색상 토큰 (Button, LoadingSpinner, ConfirmDialog)

// ─── Button ───────────────────────────────────────────────────────────────────

export const getButtonTheme = (isDark: boolean) => ({
  primary: {
    bgcolor:   '#6366f1',
    color:     '#fff',
    hoverBg:   '#4f46e5',
    activeBg:  '#4338ca',
    shadow:    isDark ? '0 2px 12px rgba(99,102,241,0.35)' : '0 2px 8px rgba(99,102,241,0.28)',
  },
  secondary: {
    bgcolor:      isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
    color:        isDark ? '#a5b4fc'               : '#4f46e5',
    border:       isDark ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)',
    hoverBg:      isDark ? 'rgba(99,102,241,0.2)'  : 'rgba(99,102,241,0.14)',
    hoverBorder:  isDark ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.4)',
  },
  ghost: {
    color:        isDark ? '#94a3b8'                : '#64748b',
    border:       isDark ? 'rgba(148,163,184,0.2)'  : 'rgba(203,213,225,0.6)',
    hoverBg:      isDark ? 'rgba(148,163,184,0.08)' : 'rgba(241,245,249,0.8)',
    hoverColor:   isDark ? '#cbd5e1'                : '#475569',
    hoverBorder:  isDark ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.5)',
  },
  danger: {
    bgcolor:      isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
    color:        isDark ? '#fca5a5'               : '#dc2626',
    border:       isDark ? 'rgba(239,68,68,0.35)' : 'rgba(239,68,68,0.25)',
    hoverBg:      isDark ? 'rgba(239,68,68,0.2)'  : 'rgba(239,68,68,0.14)',
    hoverBorder:  isDark ? 'rgba(239,68,68,0.55)' : 'rgba(239,68,68,0.45)',
  },
})

// ─── LoadingSpinner ────────────────────────────────────────────────────────────

export const getSpinnerTheme = (isDark: boolean) => ({
  spinnerColor: isDark ? '#818cf8' : '#6366f1',
  textColor:    isDark ? '#94a3b8' : '#64748b',
  fullPageBg:   isDark ? '#0b121f' : '#f1f5f9',
})

// ─── ConfirmDialog ─────────────────────────────────────────────────────────────

export const CONFIRM_DIALOG_VARIANTS = {
  warning: {
    emoji:         '⚠️',
    lightColor:    '#d97706',
    darkColor:     '#fbbf24',
    lightBg:       'rgba(245,158,11,0.08)',
    darkBg:        'rgba(245,158,11,0.12)',
    lightBorder:   'rgba(245,158,11,0.2)',
    darkBorder:    'rgba(245,158,11,0.25)',
    lightGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    darkGradient:  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  error: {
    emoji:         '🗑️',
    lightColor:    '#dc2626',
    darkColor:     '#f87171',
    lightBg:       'rgba(239,68,68,0.07)',
    darkBg:        'rgba(239,68,68,0.12)',
    lightBorder:   'rgba(239,68,68,0.18)',
    darkBorder:    'rgba(239,68,68,0.25)',
    lightGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    darkGradient:  'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  info: {
    emoji:         '💡',
    lightColor:    '#4338ca',
    darkColor:     '#a5b4fc',
    lightBg:       'rgba(99,102,241,0.07)',
    darkBg:        'rgba(99,102,241,0.12)',
    lightBorder:   'rgba(99,102,241,0.18)',
    darkBorder:    'rgba(99,102,241,0.25)',
    lightGradient: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
    darkGradient:  'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
  },
} as const

export const getConfirmDialogTheme = (isDark: boolean) => ({
  backdropBg:  isDark ? 'rgba(0,0,0,0.6)'    : 'rgba(15,23,42,0.3)',
  boxShadow:   isDark ? '0 24px 64px rgba(0,0,0,0.6)' : '0 24px 64px rgba(0,0,0,0.12)',
  cancelHoverBg:     isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
  cancelHoverBorder: isDark ? 'rgba(255,255,255,0.2)'  : 'rgba(0,0,0,0.2)',
})
