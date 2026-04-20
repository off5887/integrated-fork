import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AssessmentIcon from '@mui/icons-material/Assessment'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CategoryIcon from '@mui/icons-material/Category'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PaidIcon from '@mui/icons-material/Paid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Chip, Container, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { type ComponentType, useState } from 'react'
import { type SvgIconProps } from '@mui/material/SvgIcon'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import CategoryManagement from './components/category/CategoryManagement'
import ExchangeRequestsManagement from './components/exchangeRequests/ExchangeRequestsManagement'
import ReviewChange from './components/reviewChange/ReviewChange'
import SectionReviewerManagement from './components/reviewChange/SectionReviewerManagement'
import ReviewerStatsPanel from './components/reviewerStats/ReviewerStatsPanel'
import SpecialMileage from './components/specialMileage/SpecialMileage'
import UserManagement from './components/user/UserManagement'

// ─── 탭 설정 ──────────────────────────────────────────────────────────────────

interface TabConfig {
  id: string
  label: string
  description: string
  Icon: ComponentType<SvgIconProps>
  Component: ComponentType
}

const TABS: TabConfig[] = [
  {
    id: 'reviewers',
    label: '심사자 배정',
    description: '아이디어 심사자를 배정하고 관리합니다',
    Icon: SupervisorAccountIcon,
    Component: SectionReviewerManagement,
  },
  {
    id: 'users',
    label: '사용자 관리',
    description: '시스템 사용자와 권한을 관리합니다',
    Icon: ManageAccountsIcon,
    Component: UserManagement,
  },
  {
    id: 'special-mile',
    label: '특별 마일리지',
    description: '특별 마일리지를 부여하고 내역을 조회합니다',
    Icon: CardGiftcardIcon,
    Component: SpecialMileage,
  },
  {
    id: 'review-change',
    label: '심사변경',
    description: '심사자 변경 요청을 처리합니다',
    Icon: SwapHorizIcon,
    Component: ReviewChange,
  },
  {
    id: 'categories',
    label: '카테고리',
    description: '아이디어 카테고리를 추가·수정합니다',
    Icon: CategoryIcon,
    Component: CategoryManagement,
  },
  {
    id: 'exchanges',
    label: '현금전환 신청',
    description: '마일리지 현금전환 신청을 처리합니다',
    Icon: PaidIcon,
    Component: ExchangeRequestsManagement,
  },
  {
    id: 'reviewer-stats',
    label: '심사자 현황',
    description: '심사자별 처리 현황을 확인합니다',
    Icon: AssessmentIcon,
    Component: ReviewerStatsPanel,
  },
]

// ─── Settings ─────────────────────────────────────────────────────────────────

export default function Settings() {
  const { textPrimary, textSecondary, borderColor, bgBase, cardBg, cardShadow, accentColor } = usePageColors()
  const st = useSettingsTheme()
  const [activeTab, setActiveTab] = useState(0)

  const ActiveComponent = TABS[activeTab].Component

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

        {/* 모바일 드롭다운 (xs ~ sm) */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
          <FormControl fullWidth size="small">
            <Select
              value={activeTab}
              onChange={(e) => setActiveTab(Number(e.target.value))}
              inputProps={{ 'aria-label': '설정 메뉴 선택' }}
              sx={{
                bgcolor: cardBg,
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                color: textPrimary,
              }}
            >
              {TABS.map((tab, index) => (
                <MenuItem key={tab.id} value={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <tab.Icon sx={{ fontSize: '1.1rem', color: accentColor }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>
                        {tab.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: textSecondary, lineHeight: 1.3 }}>
                        {tab.description}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* 본문 레이아웃: 사이드바 + 콘텐츠 */}
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

          <Box sx={{ display: 'flex', minHeight: 600 }}>
            {/* 왼쪽 사이드바 (md+) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                width: 240,
                flexShrink: 0,
                borderRight: `1px solid ${borderColor}`,
                p: 1.5,
                gap: 0.5,
              }}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === index
                return (
                  <Box
                    key={tab.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActiveTab(index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab(index) }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      bgcolor: isActive ? st.avatarBg : 'transparent',
                      border: `1px solid ${isActive ? st.adminChipBorder : 'transparent'}`,
                      '&:hover': {
                        bgcolor: isActive ? st.avatarBg : st.memberRowHoverBg,
                      },
                    }}
                  >
                    {/* 아이콘 박스 */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: isActive ? st.iconGradient : st.iconInactiveBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <tab.Icon
                        sx={{
                          fontSize: '1.1rem',
                          color: isActive ? '#fff' : accentColor,
                        }}
                      />
                    </Box>

                    {/* 텍스트 */}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.82rem',
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? accentColor : textPrimary,
                          lineHeight: 1.3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {tab.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.68rem',
                          color: textSecondary,
                          lineHeight: 1.3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {tab.description}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
            </Box>

            {/* 오른쪽 콘텐츠 영역 */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: { xs: 2, sm: 3, md: 4 },
              }}
            >
              {/* 콘텐츠 헤더 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                <Box
                  sx={{
                    width: 48, height: 48, borderRadius: 3,
                    background: st.iconGradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(99,102,241,0.28)',
                    flexShrink: 0,
                  }}
                >
                  {(() => {
                    const ActiveIcon = TABS[activeTab].Icon
                    return <ActiveIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
                  })()}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
                  >
                    {TABS[activeTab].label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: textSecondary }}>
                    {TABS[activeTab].description}
                  </Typography>
                </Box>
              </Box>

              <ActiveComponent />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
