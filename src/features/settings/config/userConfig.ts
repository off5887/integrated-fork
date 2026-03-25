export const ROLE_OPTIONS = [
  { value: 'user',     label: '일반 사용자' },
  { value: 'reviewer', label: '심사자' },
  { value: 'admin',    label: '관리자' },
] as const

export const POSITION_OPTIONS = [
  '사원', '주임', '대리', '과장', '차장', '부장', '팀장', '부문장', '임원',
] as const
