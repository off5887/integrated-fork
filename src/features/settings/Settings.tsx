import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CategoryIcon from '@mui/icons-material/Category'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Chip, Container, Tab, Tabs, Typography } from '@mui/material'
import { type ComponentType, type ReactNode, useState } from 'react'
import { type SvgIconProps } from '@mui/material/SvgIcon'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import CategoryManagement from './components/category/CategoryManagement'
import ReviewChange from './components/reviewChange/ReviewChange'
import ReviewerAssignment from './components/sectionReviewers/ReviewerAssignment'
import SpecialMileage from './components/specialMileage/SpecialMileage'
import UserManagement from './components/user/UserManagement'

// ─── 탭 설정 ──────────────────────────────────────────────────────────────────
// 새 탭 추가 시 이 배열에만 항목을 추가하면 됩니다.

interface TabConfig {
  id: string
  label: string
  Icon: ComponentType<SvgIconProps>
  Component: ComponentType
}

const TABS: TabConfig[] = [
  { id: 'reviewers',      label: '심사자 배정',   Icon: SupervisorAccountIcon, Component: ReviewerAssignment },
  { id: 'users',          label: '사용자 관리',   Icon: ManageAccountsIcon,    Component: UserManagement },
  { id: 'special-mile',   label: '특별 마일리지', Icon: CardGiftcardIcon,      Component: SpecialMileage },
  { id: 'review-change',  label: '심사변경',      Icon: SwapHorizIcon,         Component: ReviewChange },
  { id: 'categories',     label: '카테고리',      Icon: CategoryIcon,          Component: CategoryManagement },
]

// ─── TabPanel ─────────────────────────────────────────────────────────────────

interface TabPanelProps {
  children: ReactNode
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

// ─── Settings ─────────────────────────────────────────────────────────────────

export default function Settings() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, bgBase, cardBg, cardShadow, accentColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const [tabValue, setTabValue] = useState(0)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: bgBase,
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
              background: st.iconGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(99,102,241,0.38)',
              flexShrink: 0,
            }}
          >
            <AdminPanelSettingsIcon sx={{ color: st.primaryBtnColor, fontSize: '1.6rem' }} />
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
                  bgcolor: st.adminChipBg,
                  color: accentColor,
                  border: `1px solid ${st.adminChipBorder}`,
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
            bgcolor: cardBg,
            borderRadius: 3,
            border: `1px solid ${borderColor}`,
            boxShadow: cardShadow,
            overflow: 'hidden',
          }}
        >
          {/* 상단 그라디언트 스트립 */}
          <Box sx={{ height: 3, background: st.headerGradient }} />

          <Box sx={{ borderBottom: `1px solid ${borderColor}` }}>
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                px: { xs: 0, sm: 1, md: 4 },
                minHeight: { xs: 48, md: 56 },
                '& .MuiTab-root': {
                  color: textSecondary,
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  textTransform: 'none',
                  minHeight: { xs: 48, md: 56 },
                  minWidth: { xs: 'auto', md: 120 },
                  px: { xs: 1.5, sm: 2, md: 3 },
                  gap: { xs: 0.5, md: 1 },
                  '&.Mui-selected': { color: accentColor },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: st.primaryColor,
                  height: 2,
                  borderRadius: 1,
                },
                '& .MuiTabScrollButton-root': {
                  color: textSecondary,
                  opacity: 0.8,
                  width: 28,
                  '&.Mui-disabled': { opacity: 0 },
                },
              }}
            >
              {TABS.map((tab, index) => (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  id={`settings-tab-${index}`}
                  aria-controls={`settings-tabpanel-${index}`}
                  icon={<tab.Icon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {TABS.map((tab, index) => (
              <TabPanel key={tab.id} value={tabValue} index={index}>
                <tab.Component />
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
