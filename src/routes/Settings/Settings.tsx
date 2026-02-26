// src/pages/Settings.tsx
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import ReviewerAssignment from './components/sectionReviewers/ReviewerAssignment'
import UserManagement from './components/user/UserManagement'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  }
}

export default function Settings() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: { xs: 2, md: 3 },
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 1.5, md: 2 },
            bgcolor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>
            설정
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            시스템 관리 및 사용자 권한 설정
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="settings tabs"
            variant="fullWidth"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                py: { xs: 1.5, md: 2.5 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' },
                fontWeight: 600,
                textTransform: 'none',
                minHeight: { xs: 48, md: 64 },
              },
            }}
          >
            <Tab label="심사자 배정" {...a11yProps(0)} />
            <Tab label="사용자 추가 및 관리" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <TabPanel value={tabValue} index={0}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              gutterBottom
              sx={{ mb: 2 }}
            >
              부문별 심사자 배정
            </Typography>
            <ReviewerAssignment />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              gutterBottom
              sx={{ mb: 2 }}
            >
              사용자 관리
            </Typography>
            <UserManagement />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  )
}
