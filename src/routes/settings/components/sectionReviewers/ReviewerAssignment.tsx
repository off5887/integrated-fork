import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import SaveIcon from '@mui/icons-material/Save'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { OrgMember, SelectedReviewer } from '@/api/types/reviewer'
import { usePageColors } from '@/theme/pageColors'
import { mockOrganization } from '@/routes/settings/data/mockOrganization'
import OrgPanel from './OrgPanel'
import SelectedReviewersPanel from './SelectedReviewersPanel'

const ReviewerAssignment: React.FC = () => {
  const { isDarkMode, textPrimary, textSecondary, borderColor, accentColor, accentBg, accentBorder } = usePageColors()

  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<SelectedReviewer[]>([])

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetLevel: 1 | 2 | 3,
  ) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/json')
    const member: OrgMember = JSON.parse(data)
    if (selected.some((s) => s.id === member.id)) return
    setSelected((prev) => [...prev, { ...member, level: targetLevel }])
  }

  const handleLevelChange = (id: string, newLevel: 1 | 2 | 3) => {
    setSelected((prev) =>
      prev.map((r) => (r.id === id ? { ...r, level: newLevel } : r)),
    )
  }

  const handleDelete = (id: string) => {
    setSelected((prev) => prev.filter((r) => r.id !== id))
  }

  const handleAutoAssignTeamLeaders = () => {
    const teamLeaders = mockOrganization
      .filter(
        (m) => m.position.includes('팀장') || m.position.includes('부문장'),
      )
      .filter((m) => !selected.some((s) => s.id === m.id))
      .map((m) => ({ ...m, level: 1 as const }))
    setSelected((prev) => [...prev, ...teamLeaders])
  }

  const handleSave = () => {
    console.log('저장할 심사자:', selected)
    alert(`총 ${selected.length}명 심사자 저장 완료!`)
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
              bgcolor: '#6366f1', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SupervisorAccountIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              부문별 심사자 배정
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              조직도에서 드래그해 심사 단계별로 배정하세요
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AutoFixHighIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={handleAutoAssignTeamLeaders}
            sx={{
              borderRadius: 9999,
              px: 2.5,
              py: 0.8,
              fontWeight: 700,
              fontSize: '0.82rem',
              textTransform: 'none',
              borderColor: isDarkMode ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.35)',
              color: accentColor,
              '&:hover': {
                bgcolor: accentBg,
                borderColor: '#6366f1',
              },
              transition: 'all 0.15s ease',
            }}
          >
            팀장급 자동 배정
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={handleSave}
            sx={{
              borderRadius: 9999,
              px: 2.5,
              py: 0.8,
              fontWeight: 700,
              fontSize: '0.82rem',
              textTransform: 'none',
              bgcolor: '#6366f1',
              color: '#fff',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <OrgPanel
            members={mockOrganization}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SelectedReviewersPanel
            selected={selected}
            onLevelChange={handleLevelChange}
            onDelete={handleDelete}
            onDrop={handleDrop}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ReviewerAssignment
