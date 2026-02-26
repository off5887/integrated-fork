// src/routes/Judge/components/JudgeDetailActions.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button } from '@mui/material'
import { judgeData } from '../JudgeData'

interface Props {
  proposalId: number
  onClose: () => void
  isDarkMode: boolean
}

export default function JudgeDetailActions({
  proposalId,
  onClose,
  isDarkMode,
}: Props) {
  const currentIndex = judgeData.findIndex((p) => p.id === proposalId)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === judgeData.length - 1

  // 실제 구현 시 부모 컴포넌트에서 다음/이전 proposal로 이동하는 로직 필요
  const handlePrev = () => {
    onClose() /* + 이전 proposal 선택 */
  }
  const handleNext = () => {
    onClose() /* + 다음 proposal 선택 */
  }

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'divider'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          disabled={isFirst}
          onClick={handlePrev}
          sx={{
            borderRadius: 2,
            color: isDarkMode ? 'grey.300' : 'text.primary',
            minWidth: 110,
          }}
        >
          이전
        </Button>

        <Button
          endIcon={<ArrowForwardIcon />}
          disabled={isLast}
          onClick={handleNext}
          sx={{
            borderRadius: 2,
            color: isDarkMode ? 'grey.300' : 'text.primary',
            minWidth: 110,
          }}
        >
          다음
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            minWidth: 100,
            ...(isDarkMode && { borderColor: 'grey.600', color: 'grey.300' }),
          }}
        >
          닫기
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{
            minWidth: 100,
            borderRadius: 2,
            boxShadow: isDarkMode
              ? '0 6px 20px rgba(34,197,94,0.4)'
              : undefined,
          }}
        >
          승인
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{
            minWidth: 100,
            borderRadius: 2,
            boxShadow: isDarkMode
              ? '0 6px 20px rgba(239,68,68,0.4)'
              : undefined,
          }}
        >
          반려
        </Button>
      </Box>
    </Box>
  )
}
