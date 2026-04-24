// src/components/ui/PageHeader.tsx
// 페이지 상단 헤더 공통 컴포넌트 (아이콘 박스 + 제목 + 부제목 + 오른쪽 슬롯)
import { Box, Typography } from '@mui/material'
import type { ReactNode, ElementType } from 'react'
import { usePageColors } from '@/theme/pageColors'

interface PageHeaderProps {
  /** MUI SvgIcon 컴포넌트 (e.g. DashboardIcon) */
  icon: ElementType
  title: string
  subtitle?: string
  /** 헤더 오른쪽에 표시할 요소 (버튼, 뱃지 등) */
  right?: ReactNode
}

export default function PageHeader({ icon: Icon, title, subtitle, right }: PageHeaderProps) {
  const colors = usePageColors()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
      {/* 아이콘 박스 */}
      <Box
        sx={{
          width: { xs: 38, sm: 44 },
          height: { xs: 38, sm: 44 },
          borderRadius: 2.5,
          background: colors.pageIconGradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: colors.pageIconShadow,
        }}
      >
        <Icon sx={{ color: colors.pageIconColor, fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </Box>

      {/* 제목 + 부제목 */}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          fontWeight={800}
          sx={{
            color: colors.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontSize: { xs: '1.15rem', sm: '1.5rem' },
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{ color: colors.textSecondary, display: { xs: 'none', sm: 'block' } }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* 오른쪽 슬롯 */}
      {right && <Box sx={{ flexShrink: 0 }}>{right}</Box>}
    </Box>
  )
}
