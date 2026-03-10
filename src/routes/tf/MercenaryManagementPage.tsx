// src/pages/MercenaryManagementPage.tsx
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import GroupsIcon from '@mui/icons-material/Groups'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonIcon from '@mui/icons-material/Person'
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
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
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

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'
  const rowBg = isDarkMode ? 'rgba(30,41,59,0.6)' : '#f8fafc'
  const rowHoverBg = isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)'

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
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
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
              sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              용병 관리
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              지원자를 검토하고, 아이디어에 팀원을 초대하세요
            </Typography>
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
            <Chip
              icon={<GroupsIcon sx={{ fontSize: '0.9rem !important' }} />}
              label={`지원자 ${applicants.length}명`}
              size="small"
              sx={{
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
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
              color: textSecondary,
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'none',
              minWidth: 0,
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#6366f1',
              height: 2,
              borderRadius: 1,
            },
            '& .MuiTabs-root': {
              borderBottom: `1px solid ${borderColor}`,
            },
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Tab label="지원 확인" />
          <Tab label="용병 초대하기" />
        </Tabs>

        {/* 탭 0: 용병 지원 확인 */}
        {tab === 0 && (
          <Box
            sx={{
              bgcolor: cardBg,
              borderRadius: 3,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* 상단 그라디언트 스트립 */}
            <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                <Box
                  sx={{
                    width: 26, height: 26, borderRadius: '50%',
                    bgcolor: '#6366f1', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                  }}
                >
                  <PersonIcon sx={{ fontSize: '0.9rem' }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
                  지원 온 용병 목록
                </Typography>
                {applicants.length > 0 && (
                  <Chip
                    label={`${applicants.length}명`}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.08)',
                      color: isDarkMode ? '#fbbf24' : '#92400e',
                      border: `1px solid ${isDarkMode ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)'}`,
                      fontWeight: 700,
                      fontSize: '0.72rem',
                    }}
                  />
                )}
              </Box>

              <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {applicants.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 10,
                      borderRadius: 2,
                      border: `1px dashed ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.03)' : 'rgba(99,102,241,0.02)',
                    }}
                  >
                    <GroupsIcon sx={{ fontSize: '2.5rem', color: textSecondary, opacity: 0.3, mb: 1.5 }} />
                    <Typography sx={{ color: textSecondary, fontSize: '0.9rem' }}>
                      아직 지원 온 용병이 없습니다
                    </Typography>
                  </Box>
                ) : (
                  applicants.map((app) => (
                    <ListItem
                      key={app.id}
                      sx={{
                        bgcolor: rowBg,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        px: 3,
                        py: 1.75,
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          bgcolor: rowHoverBg,
                          borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: 38, height: 38,
                            bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                            color: isDarkMode ? '#a5b4fc' : '#4338ca',
                            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                          }}
                        >
                          <PersonIcon sx={{ fontSize: '1.1rem' }} />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={app.name}
                        secondary={app.dept}
                        slotProps={{
                          primary: { style: { fontWeight: 700, fontSize: '0.92rem', color: textPrimary } },
                          secondary: { style: { fontSize: '0.78rem', color: textSecondary } },
                        }}
                      />

                      <Stack direction="row" spacing={1.5}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleAccept(app.id)}
                          sx={{
                            borderRadius: 9999,
                            px: 2.5,
                            py: 0.7,
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            textTransform: 'none',
                            borderColor: isDarkMode ? 'rgba(16,185,129,0.4)' : 'rgba(16,185,129,0.35)',
                            color: isDarkMode ? '#34d399' : '#059669',
                            '&:hover': {
                              bgcolor: isDarkMode ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.07)',
                              borderColor: isDarkMode ? '#34d399' : '#10b981',
                            },
                            transition: 'all 0.15s ease',
                          }}
                        >
                          수락
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleReject(app.id)}
                          sx={{
                            borderRadius: 9999,
                            px: 2.5,
                            py: 0.7,
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            textTransform: 'none',
                            borderColor: isDarkMode ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.3)',
                            color: isDarkMode ? '#f87171' : '#dc2626',
                            '&:hover': {
                              bgcolor: isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)',
                              borderColor: isDarkMode ? '#f87171' : '#ef4444',
                            },
                            transition: 'all 0.15s ease',
                          }}
                        >
                          거절
                        </Button>
                      </Stack>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          </Box>
        )}

        {/* 탭 1: 용병 초대하기 */}
        {tab === 1 && (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', lg: '5fr 7fr' }}
            gap={3}
          >
            {/* 왼쪽: 조직도 (드래그 소스) */}
            <Box
              sx={{
                bgcolor: cardBg,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
                boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                height: 'fit-content',
              }}
            >
              <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ color: textPrimary, mb: 3, letterSpacing: '-0.01em' }}
                >
                  조직도에서 선택
                </Typography>

                <TextField
                  fullWidth
                  placeholder="이름 또는 부서 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="small"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                      fontSize: '0.875rem',
                      '& fieldset': {
                        borderColor: borderColor,
                      },
                      '&:hover fieldset': {
                        borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: textPrimary,
                      '&::placeholder': { color: textSecondary, opacity: 1 },
                    },
                  }}
                />

                <List disablePadding sx={{ maxHeight: 560, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                          bgcolor: isDarkMode ? 'rgba(30,41,59,0.6)' : '#f8fafc',
                          borderRadius: 2,
                          border: `1px solid ${borderColor}`,
                          px: 2,
                          py: 1.25,
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            bgcolor: rowHoverBg,
                            borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                          },
                        }}
                      >
                        <ListItemAvatar sx={{ minWidth: 42 }}>
                          <Avatar
                            sx={{
                              width: 34, height: 34,
                              bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                              color: isDarkMode ? '#a5b4fc' : '#4338ca',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'}`,
                            }}
                          >
                            {emp.name[0]}
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={emp.name}
                          secondary={`${emp.dept} · ${emp.position}`}
                          slotProps={{
                            primary: { style: { fontWeight: 700, fontSize: '0.875rem', color: textPrimary } },
                            secondary: { style: { fontSize: '0.75rem', color: textSecondary } },
                          }}
                        />

                        <DragIndicatorIcon sx={{ color: textSecondary, opacity: 0.5, fontSize: '1.1rem' }} />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Box>

            {/* 오른쪽: 아이디어별 용병 초대 영역 */}
            <Box
              sx={{
                bgcolor: cardBg,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
                boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ color: textPrimary, mb: 1, letterSpacing: '-0.01em' }}
                >
                  내 아이디어에 용병 초대하기
                </Typography>
                <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 3.5 }}>
                  왼쪽 목록에서 팀원을 드래그해서 아이디어 카드에 놓으세요
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {myIdeas.map((idea) => (
                    <Box
                      key={idea.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, idea.id)}
                      sx={{
                        p: { xs: 2.5, md: 3 },
                        border: `1.5px dashed`,
                        borderColor: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)',
                        borderRadius: 2.5,
                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
                        minHeight: 110,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: isDarkMode ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.4)',
                          bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Chip
                          label={idea.field}
                          size="small"
                          sx={{
                            bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                            color: isDarkMode ? '#a5b4fc' : '#4338ca',
                            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{ color: textPrimary, fontSize: '0.875rem', flex: 1 }}
                        >
                          {idea.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: textSecondary,
                            flexShrink: 0,
                            bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(100,116,139,0.06)',
                            px: 1.25, py: 0.4,
                            borderRadius: 9999,
                            fontSize: '0.72rem',
                            fontWeight: 600,
                          }}
                        >
                          {idea.mercenaries.length}명
                        </Typography>
                      </Box>

                      {idea.mercenaries.length === 0 ? (
                        <Typography
                          sx={{
                            color: textSecondary,
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            py: 2,
                            opacity: 0.7,
                          }}
                        >
                          여기에 팀원을 드래그하세요
                        </Typography>
                      ) : (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {idea.mercenaries.map((emp) => (
                            <Chip
                              key={emp.id}
                              avatar={
                                <Avatar
                                  sx={{
                                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.15)',
                                    color: isDarkMode ? '#c7d2fe' : '#4338ca',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                  }}
                                >
                                  {emp.name[0]}
                                </Avatar>
                              }
                              label={`${emp.name} · ${emp.dept}`}
                              onDelete={() => removeMercenary(idea.id, emp.id)}
                              size="small"
                              sx={{
                                bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                                color: isDarkMode ? '#c7d2fe' : '#4338ca',
                                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)'}`,
                                fontWeight: 600,
                                fontSize: '0.78rem',
                                '& .MuiChip-deleteIcon': {
                                  color: isDarkMode ? 'rgba(248,113,113,0.7)' : 'rgba(220,38,38,0.6)',
                                  '&:hover': {
                                    color: isDarkMode ? '#f87171' : '#dc2626',
                                  },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}
