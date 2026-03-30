import { useMemo } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'

interface Props {
  formDeptCd: string
  formDeptNm: string
  formEmployeeId: string
  formEmployeeName: string
  editing: boolean
  isSaving: boolean
  onSave: () => void
  onCancel: () => void
}

export default function SelectionSummary({
  formDeptCd,
  formDeptNm,
  formEmployeeId,
  formEmployeeName,
  editing,
  isSaving,
  onSave,
  onCancel,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
      {/* 선택된 부서 */}
      <Box>
        <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
          선택된 부서
        </Typography>
        {formDeptCd ? (
          <Box sx={{ p: 1.2, borderRadius: 2, border: `1px solid ${st.avatarBorder}`, bgcolor: `${st.primaryColor}0d` }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}>{formDeptNm}</Typography>
            <Typography sx={{ fontSize: '0.7rem', color: textSecondary, fontFamily: 'monospace' }}>{formDeptCd}</Typography>
          </Box>
        ) : (
          <Box sx={{ p: 1.5, borderRadius: 2, border: `1px dashed ${borderColor}`, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              배정 부서를 선택하세요
            </Typography>
          </Box>
        )}
      </Box>

      {/* 선택된 심사자 */}
      <Box>
        <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
          선택된 심사자
        </Typography>
        {formEmployeeId ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.2, borderRadius: 2, border: `1px solid ${st.avatarBorder}`, bgcolor: `${st.primaryColor}0d` }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.72rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}` }}>
              {formEmployeeName[0]}
            </Avatar>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}>
              {formEmployeeName}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: 1.5, borderRadius: 2, border: `1px dashed ${borderColor}`, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              심사자를 선택하세요
            </Typography>
          </Box>
        )}
      </Box>

      {/* 버튼 */}
      <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          variant="contained"
          size="small"
          onClick={onSave}
          disabled={isSaving}
          sx={{ flex: 1, borderRadius: 9999, fontWeight: 700, fontSize: '0.82rem', textTransform: 'none', bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none', '&:hover': { bgcolor: st.primaryHoverBg } }}
        >
          {editing ? '수정' : '추가'}
        </Button>
        <Button
          size="small"
          onClick={onCancel}
          sx={{ flex: 1, borderRadius: 9999, fontWeight: 600, fontSize: '0.82rem', textTransform: 'none', color: textSecondary, '&:hover': { bgcolor: st.cancelBtnHoverBg } }}
        >
          취소
        </Button>
      </Box>
    </Box>
  )
}
