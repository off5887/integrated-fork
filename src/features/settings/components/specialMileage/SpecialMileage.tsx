// src/features/settings/components/specialMileage/SpecialMileage.tsx
// 특별 마일리지 지급 페이지 — 조직도 선택 → 마일리지 입력 → 저장 → 지급 내역 확인
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import HistoryIcon from '@mui/icons-material/History'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { toDateOnly } from '@/utils/dateUtils'
import { useSnackbar } from '@/context/SnackbarContext'
import { useSettingsTheme } from '@/theme/settingsTheme'
import type { MileageMember, MileageEntry } from '@/api/types/settings'
import { useAllMileages, useGrantMileage } from '@/api/queries/useMileage'
import { useUsers } from '@/api/queries/useUsers'
import MileageOrgPanel from './MileageOrgPanel'
import MileageRecipientPanel from './MileageRecipientPanel'
import MileageHistoryPanel from './MileageHistoryPanel'

export default function SpecialMileage() {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()
  const { showSnackbar } = useSnackbar()

  const { data: allMileageRecords = [] } = useAllMileages()
  const { data: users = [] } = useUsers()
  const grantMutation = useGrantMileage()

  const [tab, setTab] = useState<0 | 1>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<MileageEntry[]>([])

  // API 데이터에서 특별 마일리지 지급 내역 조합 (type === 'special')
  const history = useMemo(() => {
    const userMap = new Map(users.map((u) => [u.id, u]))
    return allMileageRecords
      .filter((r) => r.type === 'special')
      .map((r) => {
        const user = userMap.get(r.employeeId)
        return {
          id: r.mileageId,
          grantedAt: toDateOnly(r.awardDate),
          name: user?.name ?? r.employeeId,
          department: user?.department ?? '',
          position: user?.position ?? '',
          employeeNumber: user?.employeeNumber ?? r.employeeId,
          mileage: r.points,
          reason: r.reason,
        }
      })
  }, [allMileageRecords, users])

  const handleAdd = (member: MileageMember) => {
    if (selected.some((s) => s.id === member.id)) return
    setSelected((prev) => [...prev, { ...member, mileage: '', reason: '' }])
  }

  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== id))
  }

  const handleFieldChange = (id: string, field: 'mileage' | 'reason', value: string) => {
    setSelected((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = async () => {
    const incomplete = selected.filter((s) => s.mileage === '')
    if (incomplete.length > 0) {
      showSnackbar('마일리지를 입력해주세요.', 'warning')
      return
    }

    try {
      await Promise.all(
        selected.map((s) =>
          grantMutation.mutateAsync({
            employeeId: s.id,
            points: Number(s.mileage),
            reason: s.reason || '특별 마일리지 지급',
          }),
        ),
      )
      setSelected([])
      showSnackbar(`${selected.length}명에게 특별 마일리지가 지급되었습니다.`, 'success')
    } catch {
      showSnackbar('마일리지 지급 중 오류가 발생했습니다.', 'error')
    }
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
              조직도에서 인원을 선택하고 마일리지를 입력 후 저장하세요
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleSave}
          disabled={selected.length === 0 || grantMutation.isPending}
          sx={{
            display: tab === 1 ? 'none' : undefined,
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

      {/* 탭 */}
      <Box sx={{ borderBottom: `1px solid ${borderColor}`, mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40, fontSize: '0.82rem', fontWeight: 600,
              textTransform: 'none', color: textSecondary,
              '&.Mui-selected': { color: st.primaryColor, fontWeight: 700 },
            },
            '& .MuiTabs-indicator': { bgcolor: st.primaryColor },
          }}
        >
          <Tab icon={<CardGiftcardIcon sx={{ fontSize: '0.95rem' }} />} iconPosition="start" label="마일리지 부여" />
          <Tab icon={<HistoryIcon sx={{ fontSize: '0.95rem' }} />} iconPosition="start" label={`지급 내역 ${history.length > 0 ? `(${history.length})` : ''}`} />
        </Tabs>
      </Box>

      {/* 탭 컨텐츠 */}
      {tab === 0 && (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <MileageOrgPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAdd={handleAdd}
              selectedIds={selected.map((s) => s.id)}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <MileageRecipientPanel
              selected={selected}
              onRemove={handleRemove}
              onFieldChange={handleFieldChange}
            />
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <MileageHistoryPanel history={history} />
      )}
    </Box>
  )
}
