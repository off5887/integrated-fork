import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SaveIcon from '@mui/icons-material/Save'
import StarIcon from '@mui/icons-material/Star'
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import { useSnackbar } from '@/context/SnackbarContext'
import { useLevelConfigs, useUpdateLevelConfig } from '@/api/queries/useLevelConfigs'
import type { LevelConfig } from '@/api/types/settings'

const LEVEL_IMAGES: Record<number, string> = {
  0: '🐣',
  1: '🐻',
  2: '⚔️',
  3: '🏆',
  4: '🌟',
}

interface RowState {
  levelName: string
  minMileage: string
  dirty: boolean
}

export default function LevelManagement() {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()
  const { showSnackbar } = useSnackbar()

  const { data: levels = [], isLoading } = useLevelConfigs()
  const { mutateAsync: updateLevel, isPending } = useUpdateLevelConfig()

  const [rows, setRows] = useState<RowState[]>([])

  useEffect(() => {
    if (levels.length > 0) {
      setRows(
        levels.map((l) => ({
          levelName: l.levelName,
          minMileage: l.minMileage.toString(),
          dirty: false,
        })),
      )
    }
  }, [levels])

  const handleChange = (index: number, field: keyof Omit<RowState, 'dirty'>, value: string) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value, dirty: true } : r)),
    )
  }

  const handleSave = async (level: LevelConfig, index: number) => {
    const row = rows[index]
    const minMileage = parseInt(row.minMileage, 10)
    if (!row.levelName.trim()) {
      showSnackbar('레벨 이름을 입력해주세요', 'error')
      return
    }
    if (isNaN(minMileage) || minMileage < 0) {
      showSnackbar('최소 마일리지는 0 이상의 숫자여야 합니다', 'error')
      return
    }
    await updateLevel({ level: level.level, body: { levelName: row.levelName.trim(), minMileage } })
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, dirty: false } : r)))
    showSnackbar('레벨 설정이 수정되었습니다', 'success')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={32} />
      </Box>
    )
  }

  return (
    <Box>
      {/* 섹션 헤더 */}
      <Box sx={{ mt: 5, mb: 3, pb: 3, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: st.primaryColor, color: st.primaryBtnColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              곰곰이 레벨 설정
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              각 레벨의 이름과 최소 마일리지 기준을 수정합니다 (레벨 0~4 고정)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 레벨 카드 목록 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {levels.map((level, index) => {
          const row = rows[index]
          if (!row) return null
          return (
            <Box
              key={level.level}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                border: `1px solid ${row.dirty ? st.primaryColor : borderColor}`,
                bgcolor: st.panelBg,
                transition: 'border-color 0.15s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {/* 레벨 뱃지 */}
                <Box
                  sx={{
                    width: 48, height: 48, flexShrink: 0,
                    borderRadius: 2,
                    bgcolor: st.chipBg,
                    border: `1px solid ${st.avatarBorder}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 0.25,
                  }}
                >
                  <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>
                    {LEVEL_IMAGES[level.level] ?? '🐻'}
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: st.primaryColor, fontFamily: 'monospace' }}>
                    Lv.{level.level}
                  </Typography>
                </Box>

                {/* 레벨 이름 입력 */}
                <TextField
                  label="레벨 이름"
                  size="small"
                  value={row.levelName}
                  onChange={(e) => handleChange(index, 'levelName', e.target.value)}
                  sx={{
                    flex: '1 1 160px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2, bgcolor: st.inputBg, fontSize: '0.875rem',
                      '& fieldset': { borderColor },
                      '&:hover fieldset': { borderColor: st.inputHoverBorder },
                      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
                    },
                    '& .MuiInputBase-input': { color: textPrimary },
                    '& .MuiInputLabel-root': { color: textSecondary, fontSize: '0.82rem' },
                  }}
                />

                {/* 최소 마일리지 입력 */}
                <TextField
                  label="최소 마일리지"
                  size="small"
                  type="number"
                  value={row.minMileage}
                  onChange={(e) => handleChange(index, 'minMileage', e.target.value)}
                  disabled={level.level === 0}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <StarIcon sx={{ fontSize: '0.9rem', color: textSecondary }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    flex: '1 1 140px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2, bgcolor: level.level === 0 ? 'transparent' : st.inputBg, fontSize: '0.875rem',
                      '& fieldset': { borderColor },
                      '&:hover fieldset': { borderColor: level.level === 0 ? borderColor : st.inputHoverBorder },
                      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
                    },
                    '& .MuiInputBase-input': { color: textPrimary },
                    '& .MuiInputLabel-root': { color: textSecondary, fontSize: '0.82rem' },
                  }}
                />

                {/* 저장 버튼 */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={isPending ? <CircularProgress size={12} color="inherit" /> : <SaveIcon />}
                  disabled={!row.dirty || isPending}
                  onClick={() => handleSave(level, index)}
                  sx={{
                    flexShrink: 0,
                    borderRadius: 2,
                    bgcolor: st.primaryColor,
                    color: st.primaryBtnColor,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    px: 2,
                    '&:hover': { bgcolor: st.primaryHoverBg },
                    '&.Mui-disabled': { opacity: 0.45 },
                  }}
                >
                  저장
                </Button>
              </Box>

              {level.level === 0 && (
                <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mt: 1, opacity: 0.6 }}>
                  레벨 0은 최소 마일리지가 항상 0으로 고정됩니다
                </Typography>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
