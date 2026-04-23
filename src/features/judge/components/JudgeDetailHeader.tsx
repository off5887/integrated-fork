// src/routes/Judge/components/JudgeDetailHeader.tsx
import CloseIcon from '@mui/icons-material/Close'
import GavelIcon from '@mui/icons-material/Gavel'
import { Box, IconButton, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'
import { useCategories } from '@/api/queries/useCategories'
import { statusConfig } from '../config/judgeStatusConfig'

interface Props {
  title: string
  onClose: () => void
  ideaType?: 'idea' | 'complete'
  categories?: string[]
  status?: keyof typeof statusConfig
}

export default function JudgeDetailHeader({ title, onClose, ideaType, categories, status }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()
  const { categories: allCategories } = useCategories()
  const catMap = new Map(allCategories.map((c) => [c.label, c]))

  const stat = status ? statusConfig[status] : null

  return (
    <>
      <Box sx={{ height: 3, background: theme.accentGradientExtended }} />
      <Box
        sx={{
          px: { xs: 3, md: 5 },
          pt: 2.5, pb: (ideaType || categories?.length || stat) ? 1.75 : 2.5,
          borderBottom: `1px solid ${theme.sectionDividerBg}`,
        }}
      >
        {/* 제목 행 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              background: theme.accentGradientDiag,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
            }}
          >
            <GavelIcon sx={{ color: theme.modalIconColor, fontSize: '1.1rem' }} />
          </Box>
          <Typography
            id="judge-detail-dialog-title"
            variant="h6"
            fontWeight={700}
            sx={{ color: colors.textPrimary, letterSpacing: '-0.01em', lineHeight: 1.3, flex: 1, minWidth: 0 }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              ml: 'auto',
              color: colors.textSecondary,
              width: 32, height: 32,
              '&:hover': {
                bgcolor: theme.closeIconHoverBg,
                color: theme.closeIconHoverColor,
              },
              transition: 'all 0.15s ease',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 구분 · 카테고리 · 상태 chip 행 */}
        {(ideaType || (categories && categories.length > 0) || stat) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mt: 1.25, ml: '52px' }}>
            {/* 구분 */}
            {ideaType && (
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  px: 1.1, py: 0.4, borderRadius: 1.5,
                  bgcolor: ideaType === 'idea' ? 'rgba(99,102,241,0.08)' : 'rgba(14,165,233,0.1)',
                  border: `1px solid ${ideaType === 'idea' ? 'rgba(99,102,241,0.25)' : 'rgba(14,165,233,0.35)'}`,
                }}
              >
                <Typography sx={{ fontSize: '0.82rem', lineHeight: 1 }}>
                  {ideaType === 'idea' ? '💡' : '🏁'}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: ideaType === 'idea' ? '#6366f1' : '#0ea5e9', lineHeight: 1 }}>
                  {ideaType === 'idea' ? '아이디어' : '실행완료'}
                </Typography>
              </Box>
            )}

            {/* 카테고리 */}
            {categories?.map((catName) => {
              const cat = catMap.get(catName)
              return (
                <Box
                  key={catName}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    px: 1.1, py: 0.4, borderRadius: 1.5,
                    bgcolor: cat?.bg ?? 'rgba(148,163,184,0.12)',
                    border: `1px solid ${cat?.border ?? 'rgba(148,163,184,0.4)'}`,
                  }}
                >
                  <Typography sx={{ fontSize: '0.82rem', lineHeight: 1 }}>{cat?.emoji ?? '🏷️'}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: cat?.color ?? colors.textSecondary, lineHeight: 1 }}>
                    {catName}
                  </Typography>
                </Box>
              )
            })}

            {/* 심사 상태 */}
            {stat && (
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center',
                  px: 1.1, py: 0.4, borderRadius: 1.5,
                  bgcolor: stat.bg, border: `1px solid ${stat.border}`,
                }}
              >
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  {stat.label}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
