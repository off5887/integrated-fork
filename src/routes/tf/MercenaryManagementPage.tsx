// src/routes/tf/MercenaryManagementPage.tsx
import GroupsIcon from '@mui/icons-material/Groups'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import {
  Box,
  Chip,
  Container,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import {
  mockApplicants,
  mockEmployees,
  mockIdeas,
} from '@/api/mock/mercenary'
import {
  type Applicant,
  type Employee,
  type ExtendedIdea,
} from '@/api/types/mercenary'
import { usePageColors } from '@/theme/pageColors'
import ApplicantList from './components/ApplicantList'
import MercenaryInvitePanel from './components/MercenaryInvitePanel'

export default function MercenaryManagementPage() {
  const colors = usePageColors()
  const [tab, setTab] = useState(0)
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [myIdeas, setMyIdeas] = useState<ExtendedIdea[]>(
    mockIdeas.map((idea) => ({ ...idea, mercenaries: [] as Employee[] })),
  )
  const [employees] = useState<Employee[]>(mockEmployees)
  const [search, setSearch] = useState('')

  const handleAccept = (id: number) => {
    alert('용병 수락 완료!')
    setApplicants((prev) => prev.filter((a) => a.id !== id))
  }

  const handleReject = (id: number) => {
    alert('거절 완료')
    setApplicants((prev) => prev.filter((a) => a.id !== id))
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    emp: Employee,
  ) => {
    e.dataTransfer.setData('employee', JSON.stringify(emp))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, ideaId: number) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('employee')
    if (!data) return

    const emp = JSON.parse(data) as Employee

    setMyIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId && !idea.mercenaries.some((m) => m.id === emp.id)
          ? { ...idea, mercenaries: [...idea.mercenaries, emp] }
          : idea,
      ),
    )
  }

  const removeMercenary = (ideaId: number, empId: number) => {
    setMyIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId
          ? {
              ...idea,
              mercenaries: idea.mercenaries.filter((m) => m.id !== empId),
            }
          : idea,
      ),
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.bgBase,
        pt: { xs: 6, md: 8 },
        pb: 14,
        px: { xs: 2, sm: 3, md: 4 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {/* 페이지 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: { xs: 5, md: 6 },
          }}
        >
          <Box
            sx={{
              width: 48, height: 48, borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(99,102,241,0.38)',
              flexShrink: 0,
            }}
          >
            <ManageAccountsIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: colors.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              용병 관리
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              지원자를 검토하고, 아이디어에 팀원을 초대하세요
            </Typography>
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
            <Chip
              icon={<GroupsIcon sx={{ fontSize: '0.9rem !important' }} />}
              label={`지원자 ${applicants.length}명`}
              size="small"
              sx={{
                bgcolor: colors.accentBg,
                color: colors.accentColor,
                border: `1px solid ${colors.accentBorder}`,
                fontWeight: 600,
                fontSize: '0.78rem',
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          </Box>
        </Box>

        {/* 탭 */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              color: colors.textSecondary,
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'none',
              minWidth: 0,
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                color: colors.accentColor,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#6366f1',
              height: 2,
              borderRadius: 1,
            },
            '& .MuiTabs-root': {
              borderBottom: `1px solid ${colors.borderColor}`,
            },
            borderBottom: `1px solid ${colors.borderColor}`,
          }}
        >
          <Tab label="지원 확인" />
          <Tab label="용병 초대하기" />
        </Tabs>

        {/* 탭 0: 용병 지원 확인 */}
        {tab === 0 && (
          <ApplicantList
            applicants={applicants}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

        {/* 탭 1: 용병 초대하기 */}
        {tab === 1 && (
          <MercenaryInvitePanel
            employees={employees}
            myIdeas={myIdeas}
            search={search}
            onSearchChange={setSearch}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onRemoveMercenary={removeMercenary}
          />
        )}
      </Container>
    </Box>
  )
}
