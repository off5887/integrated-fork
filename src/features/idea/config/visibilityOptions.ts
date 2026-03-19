// src/features/idea/config/visibilityOptions.ts
// 공개/비공개 선택 옵션 설정 (ParticipantsSection, ScheduleAndVisibilitySection 공용)
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import type { VisibilityOption } from '@/api/types/idea'

export type { VisibilityOption }

export const VISIBILITY_OPTIONS: VisibilityOption[] = [
  {
    value: 'public',
    icon: PublicIcon,
    label: '전체 공개',
    description: '모든 구성원이 이 제안을 열람할 수 있습니다',
    accentColor: '#6366f1',
    accentBg: 'rgba(99,102,241,0.1)',
    accentBorder: 'rgba(99,102,241,0.35)',
    accentBgDark: 'rgba(99,102,241,0.12)',
    accentBorderDark: 'rgba(99,102,241,0.4)',
  },
  {
    value: 'private',
    icon: LockIcon,
    label: '비공개',
    description: '제안자와 담당 심사자만 확인할 수 있습니다',
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.1)',
    accentBorder: 'rgba(139,92,246,0.35)',
    accentBgDark: 'rgba(139,92,246,0.12)',
    accentBorderDark: 'rgba(139,92,246,0.4)',
  },
]
