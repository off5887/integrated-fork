// src/pages/Settings.tsx
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Box, Chip, Container, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import ReviewerAssignment from './components/sectionReviewers/ReviewerAssignment'
import SpecialMileage from './components/specialMileage/SpecialMileage'
import UserManagement from './components/user/UserManagement'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  )
}

export default function Settings() {
  const { isDarkMode } = useThemeMode()
  const [tabValue, setTabValue] = useState(0)

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

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
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
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
            <AdminPanelSettingsIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                시스템 설정
              </Typography>
              <Chip
                label="ADMIN"
                size="small"
                sx={{
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
                  fontWeight: 800,
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  height: 20,
                  fontFamily: 'monospace',
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              시스템 관리 및 사용자 권한 설정 — 관리자 전용
            </Typography>
          </Box>
        </Box>

        {/* 탭 네비게이션 */}
        <Box
          sx={{
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',
            borderRadius: 3,
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {/* 상단 그라디언트 스트립 */}
          <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

          <Box sx={{ borderBottom: `1px solid ${borderColor}` }}>
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
              sx={{
                px: { xs: 2, md: 4 },
                '& .MuiTab-root': {
                  color: textSecondary,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  minHeight: 56,
                  px: 3,
                  gap: 1,
                  '&.Mui-selected': {
                    color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#6366f1',
                  height: 2,
                  borderRadius: 1,
                },
              }}
            >
              <Tab
                label="심사자 배정"
                id="settings-tab-0"
                aria-controls="settings-tabpanel-0"
                icon={<SupervisorAccountIcon sx={{ fontSize: '1rem' }} />}
                iconPosition="start"
              />
              <Tab
                label="사용자 관리"
                id="settings-tab-1"
                aria-controls="settings-tabpanel-1"
                icon={<ManageAccountsIcon sx={{ fontSize: '1rem' }} />}
                iconPosition="start"
              />
              <Tab
                label="특별 마일리지"
                id="settings-tab-2"
                aria-controls="settings-tabpanel-2"
                icon={<CardGiftcardIcon sx={{ fontSize: '1rem' }} />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <TabPanel value={tabValue} index={0}>
              <ReviewerAssignment isDarkMode={isDarkMode} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UserManagement isDarkMode={isDarkMode} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <SpecialMileage isDarkMode={isDarkMode} />
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
