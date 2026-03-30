import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState , useMemo } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { CategoryOption } from '@/api/types/idea'
import EmojiPickerPopover from './EmojiPickerPopover'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (category: CategoryOption) => void
  initial?: CategoryOption | null
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0,0,0,${alpha})`
  return `rgba(${r},${g},${b},${alpha})`
}

const DEFAULT_COLOR = '#6366f1'

export default function CategoryFormDialog({ open, onClose, onSave, initial }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])
  const isEditing = Boolean(initial)

  const [label, setLabel] = useState('')
  const [description, setDescription] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [active, setActive] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [emojiAnchor, setEmojiAnchor] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      setLabel(initial?.label ?? '')
      setDescription(initial?.description ?? '')
      setEmoji(initial?.emoji ?? '')
      setColor(initial?.color ?? DEFAULT_COLOR)
      setActive(initial?.active ?? true)
      setErrors({})
      setEmojiAnchor(null)
    }
  }, [open, initial])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!label.trim()) e.label = '카테고리 이름을 입력해주세요'
    if (!emoji.trim()) e.emoji = '아이콘을 선택해주세요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({
      id: initial?.id ?? '',
      label: label.trim(),
      description: description.trim() || undefined,
      emoji: emoji.trim(),
      color,
      bg: hexToRgba(color, 0.1),
      border: hexToRgba(color, 0.35),
      active,
    })
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: st.inputBg,
      '&:hover fieldset': { borderColor: st.inputHoverBorder },
      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: st.primaryColor },
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: { bgcolor: st.dialogBg, backgroundImage: 'none', borderRadius: 3 },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography fontWeight={700} sx={{ color: textPrimary }}>
            {isEditing ? '카테고리 수정' : '카테고리 추가'}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          {/* 미리보기 */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: 2,
              border: `1px solid ${hexToRgba(color, 0.35)}`,
              bgcolor: hexToRgba(color, 0.1),
              alignSelf: 'flex-start',
              opacity: active ? 1 : 0.45,
            }}
          >
            <Typography sx={{ fontSize: '1rem' }}>{emoji || '?'}</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color }}>
              {label || '미리보기'}
            </Typography>
          </Box>

          <TextField
            label="표시 이름"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            error={Boolean(errors.label)}
            helperText={errors.label ?? '예: 절감 아이디어'}
            size="small"
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="카테고리 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="카테고리에 대한 간략한 설명을 입력하세요 (선택)"
            size="small"
            fullWidth
            multiline
            rows={2}
            sx={inputSx}
          />

          {/* 아이콘 선택 */}
          <Box>
            <Typography variant="caption" sx={{ color: textSecondary, mb: 0.5, display: 'block' }}>
              아이콘
            </Typography>
            <Box
              onClick={(e) => setEmojiAnchor(e.currentTarget)}
              role="button"
              tabIndex={0}
              aria-label="아이콘 선택"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEmojiAnchor(e.currentTarget as HTMLElement) } }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                border: `1px solid ${errors.emoji ? st.deleteHoverColor : borderColor}`,
                bgcolor: st.inputBg,
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                '&:hover': { borderColor: st.inputHoverBorder },
                '&:focus-visible': { outline: `2px solid ${st.primaryColor}`, outlineOffset: 1 },
              }}
            >
              <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>
                {emoji || '➕'}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: emoji ? textPrimary : textSecondary }}>
                {emoji ? `${emoji} 선택됨` : '아이콘을 선택하세요'}
              </Typography>
            </Box>
            {errors.emoji && (
              <Typography sx={{ fontSize: '0.75rem', color: st.deleteHoverColor, mt: 0.5, ml: 0.5 }}>
                {errors.emoji}
              </Typography>
            )}
          </Box>

          {/* 색상 선택 */}
          <Box>
            <Typography variant="caption" sx={{ color: textSecondary, mb: 0.5, display: 'block' }}>
              대표 색상
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="input"
                type="color"
                value={color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
                sx={{
                  width: 40,
                  height: 36,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  padding: '2px',
                }}
              />
              <Typography sx={{ fontSize: '0.85rem', color: textPrimary, fontFamily: 'monospace' }}>
                {color}
              </Typography>
            </Box>
          </Box>

          {/* 활성화 토글 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.5,
              py: 1,
              borderRadius: 1.5,
              border: `1px solid ${borderColor}`,
              bgcolor: st.inputBg,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}>
                카테고리 활성화
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                비활성화 시 아이디어 작성에서 선택되지 않습니다
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: st.primaryColor },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: st.primaryColor },
                  }}
                />
              }
              label=""
              sx={{ m: 0 }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
            gap: 1,
            bgcolor: st.dialogFooterBg,
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <Button
            onClick={onClose}
            sx={{ color: textSecondary, '&:hover': { bgcolor: st.cancelBtnHoverBg } }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: st.primaryColor,
              color: st.primaryBtnColor,
              fontWeight: 700,
              '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
            }}
          >
            {isEditing ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>

      <EmojiPickerPopover
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
        onSelect={(em) => { setEmoji(em); setErrors((prev) => ({ ...prev, emoji: '' })) }}
      />
    </>
  )
}
