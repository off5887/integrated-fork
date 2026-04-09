// src/theme/judgeTheme.ts

const judgeLight = {
  // ── 그라디언트 (light/dark 동일) ──────────────────────────────────────────
  accentGradient:          'linear-gradient(90deg, #6366f1, #8b5cf6)',
  accentGradientExtended:  'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  accentGradientDiag:      'linear-gradient(135deg, #6366f1, #8b5cf6)',
  rejectGradient:          'linear-gradient(90deg, #ef4444, #f97316)',
  withdrawApproveGradient: 'linear-gradient(90deg, #f97316, #fb923c)',
  withdrawRejectGradient:  'linear-gradient(90deg, #0d9488, #14b8a6)',

  // ── 섹션 번호 뱃지 (light/dark 동일) ─────────────────────────────────────
  sectionNumBg:    '#6366f1',
  sectionNumColor: '#fff',

  // ── Primary 버튼 (승인·변경 등, light/dark 동일) ──────────────────────────
  primaryBtnBg:      '#6366f1',
  primaryBtnHoverBg: '#4f46e5',
  primaryBtnColor:   '#fff',

  // ── 모달 헤더 아이콘 원형 (light/dark 동일) ────────────────────────────────
  modalIconBg:    '#6366f1',
  modalIconColor: '#fff',

  // ── 시맨틱 아이콘 색상 (light/dark 동일) ─────────────────────────────────
  primaryIconColor:  '#6366f1',
  proposerIconColor: '#8b5cf6',
  warningIconColor:  '#f59e0b',

  // ── 시맨틱 액션 색상 (light/dark 동일) ───────────────────────────────────
  withdrawApproveColor: '#f97316',
  withdrawRejectColor:  '#0d9488',
  rejectColor:          '#ef4444',

  // ── 인풋 상호작용 색상 (light/dark 동일) ─────────────────────────────────
  inputErrorColor:  '#ef4444',
  inputFocusColor:  '#6366f1',
  inputHoverBorder: '#6366f166',

  // ── 닫기 아이콘 hover 텍스트 색 (light/dark 동일) ─────────────────────────
  closeIconHoverColor: '#ef4444',

  // ── 텍스트 ────────────────────────────────────────────────────────────────
  textBody: '#334155',

  // ── 배경 ──────────────────────────────────────────────────────────────────
  dialogBg:        '#ffffff',

  // ── 모달 / 폼 ─────────────────────────────────────────────────────────────
  inputBg:         '#f8fafc',
  footerBg:        'rgba(248,250,252,0.8)',
  footerBgActions: 'rgba(248,250,252,0.8)',
  backdropBg:      'rgba(0,0,0,0.45)',

  // ── 스크롤바 ──────────────────────────────────────────────────────────────
  scrollThumbColor: '#d8c7ff',
  scrollTrackColor: 'rgba(241,245,249,0.7)',
  scrollThumbHover: '#a78bfa',
  scrollbarThumb:   'rgba(99,102,241,0.2)',
  scrollbarColor:   'rgba(99,102,241,0.2) transparent',

  // ── 섹션 구분선 / 헤더 보더 ──────────────────────────────────────────────
  sectionDividerBg: 'rgba(203,213,225,0.4)',

  // ── 섹션 패널 (BasicInfo, ExecutionPlan, etc.) ───────────────────────────
  panelBg:     'rgba(99,102,241,0.03)',
  panelBorder: 'rgba(99,102,241,0.09)',

  // ── 문제점 패널 (amber tint) ──────────────────────────────────────────────
  problemPanelBg:     'rgba(245,158,11,0.04)',
  problemPanelBorder: 'rgba(245,158,11,0.12)',

  // ── 패널 내 라벨 색상 ─────────────────────────────────────────────────────
  panelLabelColor:   '#1e293b',
  problemLabelColor: '#92400e',
  solutionLabelColor: '#4338ca',

  // ── 심사자 / 공동제안자 패널 ─────────────────────────────────────────────
  reviewerPanelBg:     'rgba(99,102,241,0.03)',
  reviewerPanelBorder: 'rgba(99,102,241,0.1)',
  reviewerChipBg:      'rgba(99,102,241,0.07)',
  reviewerChipColor:   '#4338ca',
  reviewerChipBorder:  'rgba(99,102,241,0.18)',

  proposerPanelBg:     'rgba(139,92,246,0.03)',
  proposerPanelBorder: 'rgba(139,92,246,0.1)',
  proposerChipBg:      'rgba(139,92,246,0.07)',
  proposerChipColor:   '#6d28d9',
  proposerChipBorder:  'rgba(139,92,246,0.18)',

  // ── 첨부파일 패널 ─────────────────────────────────────────────────────────
  attachmentPanelBg:     'rgba(99,102,241,0.03)',
  attachmentPanelBorder: 'rgba(99,102,241,0.18)',
  attachmentBtnBorder:   'rgba(99,102,241,0.3)',
  attachmentBtnColor:    '#4338ca',
  attachmentBtnHoverBg:  'rgba(99,102,241,0.06)',

  // ── 헤더 아이콘 박스 그림자 ──────────────────────────────────────────────
  iconBoxShadow: '0 4px 16px rgba(99,102,241,0.35)',

  // ── StatCard ──────────────────────────────────────────────────────────────
  statCardInactiveBg:     '#ffffff',
  statCardInactiveBorder: 'rgba(203,213,225,0.5)',
  statCardActiveShadow:   '0 4px 16px rgba(0,0,0,0.06)',
  statCardLabelColor:     '#64748b',

  // ── 이관 배지 ─────────────────────────────────────────────────────────────
  transferredColor:      '#06b6d4',
  transferredBadgeBg:    'rgba(6,182,212,0.08)',
  transferredBadgeBorder: 'rgba(6,182,212,0.3)',
  transferredRowBg:      'rgba(6,182,212,0.02)',
  transferredRowHover:   'rgba(6,182,212,0.04)',
  transferredRowShadow:  'inset 3px 0 0 rgba(6,182,212,0.7)',

  // ── 결재자 변경 버튼 ─────────────────────────────────────────────────────
  reviewerBtnColor:       '#6366f1',
  reviewerBtnBg:          'rgba(99,102,241,0.06)',
  reviewerBtnBorder:      'rgba(99,102,241,0.2)',
  reviewerBtnHoverBg:     'rgba(99,102,241,0.1)',
  reviewerBtnHoverBorder: '#6366f1',
  viewBtnHoverBg:         'rgba(99,102,241,0.08)',

  // ── 전체 카운트 칩 ───────────────────────────────────────────────────────
  totalChipBg:     'rgba(99,102,241,0.08)',
  totalChipColor:  '#4338ca',
  totalChipBorder: 'rgba(99,102,241,0.18)',

  // ── ReviewerChangeModal 후보 목록 ────────────────────────────────────────
  candidateBg:         '#ffffff',
  candidateHoverBg:    'rgba(99,102,241,0.04)',
  candidateHoverBorder: 'rgba(99,102,241,0.2)',
  candidateSelectedBg: 'rgba(99,102,241,0.05)',
  candidateSelectedBorder: 'rgba(99,102,241,0.3)',
  candidateCurrentBg:  'rgba(248,250,252,0.8)',
  candidateAvatarBg:   'rgba(241,245,249,0.9)',
  candidateAvatarSelectedBg: 'rgba(99,102,241,0.12)',
  candidateSelectedTextColor: '#4338ca',
  candidateSelectedAvatarColor: '#4338ca',
  candidateSelectedAvatarBorder: 'rgba(99,102,241,0.2)',
  candidateSelectedBorderDark: 'rgba(99,102,241,0.3)',
  currentChipBg:   'rgba(148,163,184,0.08)',
  changeChipBg:    'rgba(16,185,129,0.07)',
  changeChipColor: '#047857',
  changeChipBorder: 'rgba(16,185,129,0.2)',
  previewBg:       'rgba(248,250,252,0.8)',

  // ── ReviewerChangeModal 검색창 ───────────────────────────────────────────
  searchBg:          '#f8fafc',
  searchHoverBorder: 'rgba(99,102,241,0.3)',

  // ── DialogContent 박스 shadow ─────────────────────────────────────────────
  dialogShadow:  '0 24px 64px rgba(0,0,0,0.12)',
  backdropDetail: 'rgba(0,0,0,0.45)',

  // ── Actions / Prev-Next 버튼 hover ───────────────────────────────────────
  navBtnHoverBg: 'rgba(203,213,225,0.4)',
  closeBtnBorder: 'rgba(203,213,225,0.7)',
  closeBtnHoverBorder: 'rgba(148,163,184,0.5)',

  // ── ExecutionPlanSection ─────────────────────────────────────────────────
  outcomeBoxBg:     'rgba(16,185,129,0.05)',
  outcomeBoxBorder: 'rgba(16,185,129,0.25)',

  // ── JudgeDecisionModal ───────────────────────────────────────────────────
  rewardBoxBg:           'rgba(99,102,241,0.06)',
  decisionModalFooterBg: 'rgba(248,250,252,0.8)',
  decisionInputBg:       '#f8fafc',
  decisionCancelBorder:  'rgba(203,213,225,0.7)',
  decisionBannerText:    '#334155',

  // ── 1차 심사 점수/마일리지 입력 패널 ─────────────────────────────────────
  scoreFieldsBg:     'rgba(99,102,241,0.04)',
  scoreFieldsBorder: 'rgba(99,102,241,0.2)',

  // ── 반려(reject) 버튼 ─────────────────────────────────────────────────────
  rejectBtnBg:     'rgba(239,68,68,0.08)',
  rejectBtnBorder: 'rgba(239,68,68,0.2)',

  // ── 회수(withdraw) 버튼 ───────────────────────────────────────────────────
  withdrawApproveBtnBg:     'rgba(249,115,22,0.08)',
  withdrawApproveBtnBorder: 'rgba(249,115,22,0.2)',
  withdrawRejectBtnBg:      'rgba(13,148,136,0.08)',
  withdrawRejectBtnBorder:  'rgba(13,148,136,0.2)',

  // ── 닫기 버튼 hover (JudgeDetailHeader) ──────────────────────────────────
  closeIconHoverBg: 'rgba(239,68,68,0.08)',
} as const

// ── Judge 내 결재 현황 StatCard 상태별 색상 (light/dark 동일) ────────────────
export const JUDGE_STAT_CONFIG = [
  { key: '심사대기', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',    border: 'rgba(245,158,11,0.25)' },
  { key: '승인',     color: '#10b981', bg: 'rgba(16,185,129,0.08)',    border: 'rgba(16,185,129,0.25)' },
  { key: '반려',     color: '#ef4444', bg: 'rgba(239,68,68,0.08)',     border: 'rgba(239,68,68,0.25)'  },
] as const

const judgeDark = {
  accentGradient:          'linear-gradient(90deg, #6366f1, #8b5cf6)',
  accentGradientExtended:  'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  accentGradientDiag:      'linear-gradient(135deg, #6366f1, #8b5cf6)',
  rejectGradient:          'linear-gradient(90deg, #ef4444, #f97316)',
  withdrawApproveGradient: 'linear-gradient(90deg, #f97316, #fb923c)',
  withdrawRejectGradient:  'linear-gradient(90deg, #0d9488, #14b8a6)',

  sectionNumBg:    '#6366f1',
  sectionNumColor: '#fff',

  primaryBtnBg:      '#6366f1',
  primaryBtnHoverBg: '#4f46e5',
  primaryBtnColor:   '#fff',

  modalIconBg:    '#6366f1',
  modalIconColor: '#fff',

  primaryIconColor:  '#6366f1',
  proposerIconColor: '#8b5cf6',
  warningIconColor:  '#f59e0b',

  withdrawApproveColor: '#f97316',
  withdrawRejectColor:  '#0d9488',
  rejectColor:          '#ef4444',

  inputErrorColor:  '#ef4444',
  inputFocusColor:  '#6366f1',
  inputHoverBorder: '#6366f166',

  closeIconHoverColor: '#ef4444',

  textBody: '#cbd5e1',

  dialogBg:        'rgba(22,30,46,0.98)',

  inputBg:         'rgba(15,23,42,0.5)',
  footerBg:        'rgba(15,23,42,0.3)',
  footerBgActions: 'rgba(15,23,42,0.5)',
  backdropBg:      'rgba(0,0,0,0.65)',

  scrollThumbColor: '#6366f1',
  scrollTrackColor: 'rgba(30,41,59,0.4)',
  scrollThumbHover: '#7c7ff2',
  scrollbarThumb:   'rgba(99,102,241,0.25)',
  scrollbarColor:   'rgba(99,102,241,0.25) transparent',

  sectionDividerBg: 'rgba(148,163,184,0.08)',

  panelBg:     'rgba(99,102,241,0.04)',
  panelBorder: 'rgba(99,102,241,0.12)',

  problemPanelBg:     'rgba(245,158,11,0.05)',
  problemPanelBorder: 'rgba(245,158,11,0.15)',

  panelLabelColor:    '#e2e8f0',
  problemLabelColor:  '#fde68a',
  solutionLabelColor: '#c7d2fe',

  reviewerPanelBg:     'rgba(99,102,241,0.05)',
  reviewerPanelBorder: 'rgba(99,102,241,0.14)',
  reviewerChipBg:      'rgba(99,102,241,0.12)',
  reviewerChipColor:   '#c7d2fe',
  reviewerChipBorder:  'rgba(99,102,241,0.25)',

  proposerPanelBg:     'rgba(139,92,246,0.05)',
  proposerPanelBorder: 'rgba(139,92,246,0.14)',
  proposerChipBg:      'rgba(139,92,246,0.12)',
  proposerChipColor:   '#c4b5fd',
  proposerChipBorder:  'rgba(139,92,246,0.25)',

  attachmentPanelBg:     'rgba(99,102,241,0.04)',
  attachmentPanelBorder: 'rgba(99,102,241,0.2)',
  attachmentBtnBorder:   'rgba(99,102,241,0.35)',
  attachmentBtnColor:    '#a5b4fc',
  attachmentBtnHoverBg:  'rgba(99,102,241,0.1)',

  iconBoxShadow: '0 4px 16px rgba(99,102,241,0.35)',

  statCardInactiveBg:     'rgba(22,30,46,0.6)',
  statCardInactiveBorder: 'rgba(148,163,184,0.1)',
  statCardActiveShadow:   '0 4px 16px rgba(0,0,0,0.3)',
  statCardLabelColor:     '#94a3b8',

  transferredColor:      '#22d3ee',
  transferredBadgeBg:    'rgba(6,182,212,0.15)',
  transferredBadgeBorder: 'rgba(6,182,212,0.35)',
  transferredRowBg:      'rgba(6,182,212,0.04)',
  transferredRowHover:   'rgba(6,182,212,0.07)',
  transferredRowShadow:  'inset 3px 0 0 rgba(6,182,212,0.7)',

  reviewerBtnColor:       '#a5b4fc',
  reviewerBtnBg:          'rgba(99,102,241,0.1)',
  reviewerBtnBorder:      'rgba(99,102,241,0.25)',
  reviewerBtnHoverBg:     'rgba(99,102,241,0.18)',
  reviewerBtnHoverBorder: '#6366f1',
  viewBtnHoverBg:         'rgba(99,102,241,0.15)',

  totalChipBg:     'rgba(99,102,241,0.15)',
  totalChipColor:  '#a5b4fc',
  totalChipBorder: 'rgba(99,102,241,0.25)',

  candidateBg:         'rgba(30,41,59,0.5)',
  candidateHoverBg:    'rgba(99,102,241,0.08)',
  candidateHoverBorder: 'rgba(99,102,241,0.25)',
  candidateSelectedBg: 'rgba(99,102,241,0.1)',
  candidateSelectedBorder: 'rgba(99,102,241,0.4)',
  candidateCurrentBg:  'rgba(148,163,184,0.05)',
  candidateAvatarBg:   'rgba(30,41,59,0.8)',
  candidateAvatarSelectedBg: 'rgba(99,102,241,0.25)',
  candidateSelectedTextColor: '#a5b4fc',
  candidateSelectedAvatarColor: '#a5b4fc',
  candidateSelectedAvatarBorder: 'rgba(99,102,241,0.3)',
  candidateSelectedBorderDark: 'rgba(99,102,241,0.4)',
  currentChipBg:   'rgba(148,163,184,0.1)',
  changeChipBg:    'rgba(16,185,129,0.12)',
  changeChipColor: '#6ee7b7',
  changeChipBorder: 'rgba(16,185,129,0.25)',
  previewBg:       'rgba(15,23,42,0.4)',

  searchBg:          'rgba(15,23,42,0.5)',
  searchHoverBorder: 'rgba(99,102,241,0.35)',

  dialogShadow:  '0 24px 64px rgba(0,0,0,0.6)',
  backdropDetail: 'rgba(0,0,0,0.65)',

  navBtnHoverBg: 'rgba(148,163,184,0.08)',
  closeBtnBorder: 'rgba(148,163,184,0.25)',
  closeBtnHoverBorder: 'rgba(148,163,184,0.4)',

  outcomeBoxBg:     'rgba(16,185,129,0.06)',
  outcomeBoxBorder: 'rgba(16,185,129,0.2)',

  rewardBoxBg:           'rgba(99,102,241,0.08)',
  decisionModalFooterBg: 'rgba(15,23,42,0.3)',
  decisionInputBg:       'rgba(15,23,42,0.5)',
  decisionCancelBorder:  'rgba(148,163,184,0.25)',
  decisionBannerText:    '#cbd5e1',

  scoreFieldsBg:     'rgba(99,102,241,0.06)',
  scoreFieldsBorder: 'rgba(99,102,241,0.25)',

  rejectBtnBg:     'rgba(239,68,68,0.15)',
  rejectBtnBorder: 'rgba(239,68,68,0.3)',

  withdrawApproveBtnBg:     'rgba(249,115,22,0.15)',
  withdrawApproveBtnBorder: 'rgba(249,115,22,0.3)',
  withdrawRejectBtnBg:      'rgba(13,148,136,0.15)',
  withdrawRejectBtnBorder:  'rgba(13,148,136,0.3)',

  closeIconHoverBg: 'rgba(239,68,68,0.12)',
} as const

export type JudgeTheme = typeof judgeLight
export const getJudgeTheme = (isDarkMode: boolean): JudgeTheme =>
  isDarkMode ? (judgeDark as unknown as JudgeTheme) : judgeLight
