// src/routes/Settings/components/specialMileage/SpecialMileage.tsx
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { MileageMember, MileageEntry } from '@/api/types/settings'
import MileageOrgPanel from './MileageOrgPanel'
import MileageRecipientPanel from './MileageRecipientPanel'

export default function SpecialMileage() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<MileageEntry[]>([])

  const handleAdd = (member: MileageMember) => {
    if (selected.some((s) => s.id === member.id)) return
    setSelected((prev) => [
      ...prev,
      { ...member, score: '', mileage: '', reason: '' },
    ])
  }

  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== id))
  }

  const handleFieldChange = (
    id: string,
    field: 'score' | 'mileage' | 'reason',
    value: string,
  ) => {
    setSelected((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    )
  }

  const handleSave = () => {
    const incomplete = selected.filter(
      (s) => s.score === '' && s.mileage === '',
    )
    if (incomplete.length > 0) {
      alert('점수 또는 마일리지를 하나 이상 입력해주세요.')
      return
    }
    alert(`${selected.length}명에게 특별 마일리지/점수가 지급되었습니다.`)
  }

  return (
    <Box>
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: st.primaryColor, color: st.primaryBtnColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CardGiftcardIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              특별 마일리지 지급
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              조직도에서 인원을 선택하고 점수·마일리지를 개별 입력 후 저장하세요
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleSave}
          disabled={selected.length === 0}
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.8,
            fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
            bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none', flexShrink: 0,
            '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
            '&.Mui-disabled': { bgcolor: st.chipBg, color: st.avatarBorder },
            transition: 'all 0.2s ease',
          }}
        >
          저장하기 {selected.length > 0 && `(${selected.length}명)`}
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* 왼쪽: 조직도 패널 */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <MileageOrgPanel
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAdd={handleAdd}
            selectedIds={selected.map(s => s.id)}
          />
        </Grid>

        {/* 오른쪽: 지급 대상 및 입력 */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <MileageRecipientPanel
            selected={selected}
            onRemove={handleRemove}
            onFieldChange={handleFieldChange}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
