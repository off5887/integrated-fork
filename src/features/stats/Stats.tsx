// src/features/stats/Stats.tsx
import BarChartIcon from '@mui/icons-material/BarChart'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { personStatsData, teamStatsData, STAT_PERIOD_MIN, STAT_PERIOD_MAX } from '@/api/mock/stats'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import {
  aggregatePersonStats,
  aggregateTeamStats,
  exportPersonStatsExcel,
  exportTeamStatsExcel,
} from './utils'
import PersonStatsTable from './components/PersonStatsTable'
import TeamStatsTable from './components/TeamStatsTable'

type TabValue = 'person' | 'team'

export default function Stats() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, bgBase, cardBg, cardShadow, accentColor, accentBg, accentBorder } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

  const [tab, setTab] = useState<TabValue>('person')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState<string>(STAT_PERIOD_MIN)
  const [dateTo, setDateTo] = useState<string>(STAT_PERIOD_MAX)

  // 기간 필터 + 검색 + 집계
  const filteredPersonData = useMemo(() => {
    const filtered = personStatsData.filter((r) => {
      const inRange = r.period >= dateFrom && r.period <= dateTo
      const term = searchTerm.trim().toLowerCase()
      const matchSearch = !term || r.name.toLowerCase().includes(term) || r.department.toLowerCase().includes(term) || r.position.toLowerCase().includes(term)
      return inRange && matchSearch
    })
    return aggregatePersonStats(filtered)
  }, [searchTerm, dateFrom, dateTo])

  const filteredTeamData = useMemo(() => {
    const filtered = teamStatsData.filter((r) => {
      const inRange = r.period >= dateFrom && r.period <= dateTo
      const term = searchTerm.trim().toLowerCase()
      const matchSearch = !term || r.team.toLowerCase().includes(term)
      return inRange && matchSearch
    })
    return aggregateTeamStats(filtered)
  }, [searchTerm, dateFrom, dateTo])

  const periodLabel = dateFrom === dateTo ? dateFrom : `${dateFrom}~${dateTo}`

  const handleExcel = () => {
    if (tab === 'person') exportPersonStatsExcel(filteredPersonData, periodLabel)
    else exportTeamStatsExcel(filteredTeamData, periodLabel)
  }

  // 요약 수치 — 탭별로 다른 카드
  const summaryCards = useMemo(() => {
    if (tab === 'person') {
      const n = filteredPersonData.length
      return [
        { label: '참여 인원',     value: n,                                                                         unit: '명',  color: '#6366f1' },
        { label: '총 게시글',     value: filteredPersonData.reduce((s, r) => s + r.totalPosts, 0),                  unit: '건',  color: '#0ea5e9' },
        { label: '아이디어 상상', value: filteredPersonData.reduce((s, r) => s + r.ideaCount, 0),                   unit: '건',  color: '#8b5cf6' },
        { label: '실행완료 상상', value: filteredPersonData.reduce((s, r) => s + r.completeCount, 0),               unit: '건',  color: '#10b981' },
        { label: '실행건수',      value: filteredPersonData.reduce((s, r) => s + r.executionCount, 0),              unit: '건',  color: '#f59e0b' },
        { label: '기대성과금액',  value: filteredPersonData.reduce((s, r) => s + r.expectedAmount, 0).toLocaleString(), unit: '만원', color: '#ef4444' },
      ]
    }
    const n = filteredTeamData.length
    const avgRate = (key: 'participationRate' | 'reviewRate') =>
      n > 0 ? Math.round(filteredTeamData.reduce((s, r) => s + r[key], 0) / n) : 0
    return [
      { label: '참여 팀',       value: n,                                                            unit: '팀',  color: '#6366f1' },
      { label: '총 게시글',     value: filteredTeamData.reduce((s, r) => s + r.totalPosts, 0),      unit: '건',  color: '#0ea5e9' },
      { label: '아이디어 상상', value: filteredTeamData.reduce((s, r) => s + r.ideaCount, 0),       unit: '건',  color: '#8b5cf6' },
      { label: '실행완료 상상', value: filteredTeamData.reduce((s, r) => s + r.completeCount, 0),   unit: '건',  color: '#10b981' },
      { label: '평균 참여율',   value: avgRate('participationRate'),                                unit: '%',   color: '#f59e0b' },
      { label: '평균 심사율',   value: avgRate('reviewRate'),                                       unit: '%',   color: '#ef4444' },
    ]
  }, [tab, filteredPersonData, filteredTeamData])

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: cardBg,
      fontSize: '0.82rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: accentColor },
      '&.Mui-focused fieldset': { borderColor: accentColor },
    },
    '& .MuiInputBase-input': {
      color: textPrimary,
      colorScheme: isDarkMode ? 'dark' : 'light',
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: textSecondary },
    '& .MuiInputLabel-root': { fontSize: '0.82rem', color: textSecondary },
    '& .MuiInputLabel-root.Mui-focused': { color: accentColor },
  }

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
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: 48, height: 48, borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isDarkMode
                ? '0 4px 16px rgba(99,102,241,0.45)'
                : '0 4px 16px rgba(99,102,241,0.3)',
              flexShrink: 0,
            }}
          >
            <BarChartIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                사업소별 그리드 통계
              </Typography>
              <Chip
                label="STATS"
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
              개인별·팀별 아이디어 참여 현황 및 성과 지표
            </Typography>
          </Box>
        </Box>

        {/* 필터 바 */}
        <Box
          sx={{
            bgcolor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
            p: { xs: 1.5, sm: 2 },
            mb: 3,
          }}
        >
          {/* 모바일: 3줄 / 데스크톱: 1줄 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr auto auto auto' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            {/* 검색 */}
            <TextField
              size="small"
              placeholder={tab === 'person' ? '이름·부서·직급 검색' : '팀명 검색'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* 날짜 범위 — 모바일에서 두 칸 나란히 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1.5,
                gridColumn: { xs: '1', sm: 'auto' },
              }}
            >
              <TextField
                size="small"
                label="시작 월"
                type="month"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                sx={{ ...inputSx, minWidth: { xs: 0, sm: 148 } }}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                size="small"
                label="종료 월"
                type="month"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                sx={{ ...inputSx, minWidth: { xs: 0, sm: 148 } }}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>

            {/* 엑셀 버튼 */}
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadIcon />}
              onClick={handleExcel}
              fullWidth={false}
              sx={{
                borderColor: accentBorder,
                color: accentColor,
                bgcolor: accentBg,
                '&:hover': { borderColor: accentColor, bgcolor: 'rgba(99,102,241,0.14)' },
                fontWeight: 700,
                fontSize: '0.82rem',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                height: 40,
                width: { xs: '100%', sm: 'auto' },
                gridColumn: { xs: '1', sm: 'auto' },
              }}
            >
              엑셀 다운로드
            </Button>
          </Box>
        </Box>

        {/* 요약 카드 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
            gap: { xs: 1.5, md: 2 },
            mb: 4,
          }}
        >
          {summaryCards.map((card) => (
            <Box
              key={card.label}
              sx={{
                bgcolor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 2,
                boxShadow: cardShadow,
                p: { xs: 1.5, md: 2 },
                textAlign: 'center',
              }}
            >
              <Typography
                fontWeight={800}
                sx={{ color: card.color, fontSize: { xs: '1.3rem', md: '1.5rem' }, lineHeight: 1.2 }}
              >
                {card.value}
                <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>
                  {card.unit}
                </Typography>
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary, display: 'block' }}>
                {card.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 탭 컨테이너 */}
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
              value={tab}
              onChange={(_, v: TabValue) => setTab(v)}
              sx={{
                px: { xs: 1, md: 3 },
                minHeight: { xs: 48, md: 52 },
                '& .MuiTab-root': {
                  color: textSecondary,
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                  textTransform: 'none',
                  minHeight: { xs: 48, md: 52 },
                  gap: 0.8,
                  '&.Mui-selected': { color: accentColor },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: st.primaryColor,
                  height: 2,
                  borderRadius: 1,
                },
              }}
            >
              <Tab
                value="person"
                label="개인통계"
                icon={<PersonIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
                iconPosition="start"
              />
              <Tab
                value="team"
                label="팀통계"
                icon={<GroupsIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {tab === 'person' && (
              <Box>
                <Typography variant="body2" sx={{ color: textSecondary, mb: 2 }}>
                  {filteredPersonData.length}명 · 컬럼 클릭으로 정렬
                </Typography>
                <PersonStatsTable data={filteredPersonData} />
              </Box>
            )}
            {tab === 'team' && (
              <Box>
                <Typography variant="body2" sx={{ color: textSecondary, mb: 2 }}>
                  {filteredTeamData.length}개 팀 · 컬럼 클릭으로 정렬
                </Typography>
                <TeamStatsTable data={filteredTeamData} />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
