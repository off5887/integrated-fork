// src/pages/MercenaryManagementPage.tsx
import {
  DragIndicator as DragIndicatorIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import CommonHeader from './components/CommonHeader'
import {
  mockApplicants,
  mockEmployees,
  mockIdeas,
  type Applicant,
  type Employee,
  type Idea,
} from './mocks/mercenaryData'

interface ExtendedIdea extends Idea {
  mercenaries: Employee[]
}

export default function MercenaryManagementPage() {
  const { isDarkMode } = useThemeMode()
  const [tab, setTab] = useState(0)
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [myIdeas, setMyIdeas] = useState<ExtendedIdea[]>(
    mockIdeas.map((idea) => ({ ...idea, mercenaries: [] as Employee[] })),
  )
  const [employees] = useState<Employee[]>(mockEmployees)
  const [search, setSearch] = useState('')

  const handleAccept = (id: number) => {
    alert('✅ 용병 수락 완료!')
    setApplicants((prev) => prev.filter((a) => a.id !== id))
  }

  const handleReject = (id: number) => {
    alert('❌ 거절 완료')
    setApplicants((prev) => prev.filter((a) => a.id !== id))
  }

  // Drag & Drop 핸들러
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
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
      sx={{ minHeight: '100vh', bgcolor: isDarkMode ? '#0f172a' : '#f8fafc' }}
    >
      <CommonHeader />

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight={800}
          mb={6}
          sx={{ color: isDarkMode ? '#e2e8f0' : '#0f172a' }}
        >
          🐟 용병 관리
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 6,
            '& .MuiTab-root': {
              color: isDarkMode ? '#94a3b8' : '#475569',
              '&.Mui-selected': {
                color: isDarkMode ? '#60a5fa' : '#2563eb',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: isDarkMode ? '#60a5fa' : '#2563eb',
            },
          }}
        >
          <Tab label="📥 용병 지원 확인" />
          <Tab label="📨 용병 초대하기" />
        </Tabs>

        {/* 탭 0: 용병 지원 확인 */}
        {tab === 0 && (
          <Paper
            sx={{
              p: 5,
              bgcolor: isDarkMode ? '#1e293b' : '#ffffff',
              borderRadius: 6,
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(99,102,241,0.15)'
                : '0 8px 32px rgba(59,130,246,0.15)',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: isDarkMode ? '#e2e8f0' : '#0f172a', mb: 4 }}
            >
              지원 온 용병 목록
            </Typography>

            <List disablePadding>
              {applicants.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                  }}
                >
                  아직 지원 온 용병이 없습니다.
                </Typography>
              ) : (
                applicants.map((app) => (
                  <ListItem
                    key={app.id}
                    sx={{
                      bgcolor: isDarkMode ? '#334155' : '#f8fafc',
                      mb: 2,
                      borderRadius: 4,
                      border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`,
                      px: 3,
                      py: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={app.name}
                      secondary={app.dept}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: isDarkMode ? '#e2e8f0' : '#0f172a',
                      }}
                      secondaryTypographyProps={{
                        color: isDarkMode ? '#94a3b8' : '#475569',
                      }}
                    />

                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => handleAccept(app.id)}
                        sx={{
                          borderColor: isDarkMode ? '#34d399' : '#10b981',
                          color: isDarkMode ? '#34d399' : '#10b981',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: isDarkMode
                              ? 'rgba(52,211,153,0.12)'
                              : 'rgba(16,185,129,0.08)',
                            borderColor: isDarkMode ? '#6ee7b7' : '#059669',
                          },
                        }}
                      >
                        수락
                      </Button>

                      <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => handleReject(app.id)}
                        sx={{
                          borderColor: isDarkMode ? '#f87171' : '#ef4444',
                          color: isDarkMode ? '#f87171' : '#ef4444',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: isDarkMode
                              ? 'rgba(248,113,113,0.12)'
                              : 'rgba(239,68,68,0.08)',
                            borderColor: isDarkMode ? '#fca5a5' : '#dc2626',
                          },
                        }}
                      >
                        거절
                      </Button>
                    </Stack>
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        )}

        {/* 탭 1: 용병 초대하기 */}
        {tab === 1 && (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', lg: '5fr 7fr' }}
            gap={4}
          >
            {/* 왼쪽: 조직도 (드래그 소스) */}
            <Paper
              sx={{
                p: 5,
                height: 'fit-content',
                bgcolor: isDarkMode ? '#1e293b' : '#ffffff',
                borderRadius: 6,
                boxShadow: isDarkMode
                  ? '0 8px 32px rgba(99,102,241,0.15)'
                  : '0 8px 32px rgba(59,130,246,0.15)',
              }}
            >
              <TextField
                fullWidth
                label="이름 또는 부서 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: isDarkMode ? '#334155' : '#f1f5f9',
                    '& fieldset': {
                      borderColor: isDarkMode ? '#475569' : '#cbd5e1',
                    },
                  },
                }}
              />

              <List sx={{ maxHeight: 620, overflow: 'auto' }}>
                {employees
                  .filter(
                    (e) => e.name.includes(search) || e.dept.includes(search),
                  )
                  .map((emp) => (
                    <ListItem
                      key={emp.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, emp)}
                      sx={{
                        cursor: 'grab',
                        '&:active': { cursor: 'grabbing' },
                        bgcolor: isDarkMode ? '#334155' : '#f8fafc',
                        mb: 1.5,
                        borderRadius: 4,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: isDarkMode ? '#475569' : '#e2e8f0',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: isDarkMode ? '#60a5fa' : '#42a5f5' }}
                        >
                          👤
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={emp.name}
                        secondary={`${emp.dept} · ${emp.position}`}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: isDarkMode ? '#e2e8f0' : '#0f172a',
                        }}
                        secondaryTypographyProps={{
                          color: isDarkMode ? '#94a3b8' : '#475569',
                        }}
                      />

                      <DragIndicatorIcon color="disabled" />
                    </ListItem>
                  ))}
              </List>
            </Paper>

            {/* 오른쪽: 아이디어별 용병 초대 영역 */}
            <Paper
              sx={{
                p: 5,
                minHeight: 620,
                border: '3px dashed',
                borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                bgcolor: isDarkMode ? '#1e293b' : '#ffffff',
                borderRadius: 6,
                boxShadow: isDarkMode
                  ? '0 8px 32px rgba(99,102,241,0.15)'
                  : '0 8px 32px rgba(59,130,246,0.15)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: isDarkMode ? '#e2e8f0' : '#0f172a', mb: 4 }}
              >
                📌 내 아이디어에 용병 초대하기
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {myIdeas.map((idea) => (
                  <Box
                    key={idea.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, idea.id)}
                    sx={{
                      p: 4,
                      border: '2px dashed',
                      borderColor: isDarkMode ? '#93c5fd' : '#3b82f6',
                      borderRadius: 4,
                      bgcolor: isDarkMode ? '#334155' : '#eff6ff',
                      minHeight: 140,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                        bgcolor: isDarkMode ? '#475569' : '#dbeafe',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 2, color: isDarkMode ? '#e2e8f0' : '#0f172a' }}
                    >
                      {idea.title} ({idea.mercenaries.length}명)
                    </Typography>

                    {idea.mercenaries.length === 0 ? (
                      <Typography
                        sx={{
                          color: isDarkMode ? '#94a3b8' : '#64748b',
                          textAlign: 'center',
                          py: 4,
                        }}
                      >
                        직원을 드래그해서 이 아이디어에 초대하세요 🐟
                      </Typography>
                    ) : (
                      <Box display="flex" flexWrap="wrap" gap={2}>
                        {idea.mercenaries.map((emp) => (
                          <Chip
                            key={emp.id}
                            avatar={<Avatar>🐻</Avatar>}
                            label={`${emp.name} (${emp.dept})`}
                            onDelete={() => removeMercenary(idea.id, emp.id)}
                            sx={{
                              px: 3,
                              py: 3,
                              fontSize: '1.05rem',
                              bgcolor: isDarkMode ? '#475569' : '#dbeafe',
                              color: isDarkMode ? '#e2e8f0' : '#1d4ed8',
                              '& .MuiChip-deleteIcon': {
                                color: isDarkMode ? '#f87171' : '#ef4444',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  )
}
