import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { OrgMember, SelectedReviewer } from '../../../../api/types/reviewer'
import { mockOrganization } from './Organization'
import OrgPanel from './OrgPanel'
import SelectedReviewersPanel from './SelectedReviewersPanel'

const ReviewerAssignment: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

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
    <Paper
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={700}>
          심사자 배정 - 디지털전략부문
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'stretch', sm: 'flex-end' },
          }}
        >
          <Button
            variant="outlined"
            size={isMobile ? 'medium' : 'medium'}
            fullWidth={isMobile}
            onClick={handleAutoAssignTeamLeaders}
          >
            팀장급 자동 1차 배정
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'medium'}
            fullWidth={isMobile}
            onClick={handleSave}
          >
            저장하기
          </Button>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* 왼쪽: 조직도 */}
        <Grid item xs={12} md={5} lg={4}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            조직도에서 선택
          </Typography>
          <OrgPanel
            members={mockOrganization}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Grid>

        {/* 오른쪽: 선택된 심사자 */}
        <Grid item xs={12} md={7} lg={8}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            배정된 심사자
          </Typography>
          <SelectedReviewersPanel
            selected={selected}
            onLevelChange={handleLevelChange}
            onDelete={handleDelete}
            onDrop={handleDrop}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ReviewerAssignment
