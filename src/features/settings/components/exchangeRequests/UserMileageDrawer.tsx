// src/features/settings/components/exchangeRequests/UserMileageDrawer.tsx
import CloseIcon from '@mui/icons-material/Close'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import { useUserMileages } from '@/api/queries/useMileage'
import { toUserAwardItem } from '@/api/types/mileage'
import type { AdminExchangeItem, UserAwardItem } from '@/api/types/mileage'

const INITIAL_LIMIT = 5

interface Props {
  user: AdminExchangeItem | null
  onClose: () => void
}

const REASON_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  '제안 채택':   { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)' },
  '실행 완료':   { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)' },
  '팀 기여':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)' },
  '부문장 결재': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
  '아이디어 등록': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
}

function AwardRow({ item, colors, st }: { item: UserAwardItem; colors: ReturnType<typeof usePageColors>; st: ReturnType<typeof useSettingsTheme> }) {
  const reasonStyle = REASON_COLOR[item.reason] ?? { color: colors.textSecondary, bg: 'transparent', border: colors.borderColor }
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'flex-start', gap: 1.5,
        p: 1.75, borderRadius: 2,
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.borderColor}`,
        transition: 'background 0.15s',
        '&:hover': { bgcolor: colors.rowHoverBg },
      }}
    >
      <Box
        sx={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          bgcolor: `${reasonStyle.color}18`,
          border: `1px solid ${reasonStyle.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: '1rem', color: reasonStyle.color }} />
      </Box>

      <Box flex={1} minWidth={0}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ color: colors.textPrimary, lineHeight: 1.4, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {item.ideaTitle}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Chip
            label={item.reason}
            size="small"
            sx={{
              height: 18, fontSize: '0.62rem', fontWeight: 700,
              bgcolor: reasonStyle.bg, color: reasonStyle.color,
              border: `1px solid ${reasonStyle.border}`,
              '& .MuiChip-label': { px: 0.75 },
            }}
          />
          <Typography variant="caption" sx={{ color: colors.textSecondary, fontFamily: 'monospace' }}>
            {item.awardedAt}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography
          fontWeight={800}
          sx={{ fontSize: '1rem', color: st.primaryColor, lineHeight: 1 }}
        >
          +{item.fish.toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.textSecondary }}>마리</Typography>
      </Box>
    </Box>
  )
}

function DrawerContent({ user, onClose }: { user: AdminExchangeItem; onClose: () => void }) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const st = useSettingsTheme()

  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showAll, setShowAll] = useState(false)

  const { data: mileageRecords = [] } = useUserMileages(user.employeeId)
  const awards: UserAwardItem[] = useMemo(() => mileageRecords.map(toUserAwardItem), [mileageRecords])

  const hasFilter = search || startDate || endDate

  const filtered = useMemo(() => {
    return awards.filter((item) => {
      if (startDate && item.awardedAt < startDate) return false
      if (endDate && item.awardedAt > endDate) return false
      if (search) {
        const q = search.toLowerCase()
        if (!item.ideaTitle.toLowerCase().includes(q) && !item.reason.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [awards, search, startDate, endDate])

  const displayed = hasFilter || showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)
  const hasMore = !hasFilter && !showAll && filtered.length > INITIAL_LIMIT

  const totalFish = awards.reduce((sum, i) => sum + i.fish, 0)

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: colors.cardBg,
      fontSize: '0.82rem',
      '& fieldset': { borderColor: colors.borderColor },
      '&:hover fieldset': { borderColor: colors.accentColor },
      '&.Mui-focused fieldset': { borderColor: colors.accentColor },
    },
    '& .MuiInputBase-input': { color: colors.textPrimary, WebkitTextFillColor: colors.textPrimary, py: '7px' },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      opacity: isDarkMode ? 0.6 : 0.4,
      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none',
      cursor: 'pointer',
    },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 헤더 */}
      <Box
        sx={{
          px: 2.5, py: 2,
          borderBottom: `1px solid ${colors.borderColor}`,
          bgcolor: colors.cardBg,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            bgcolor: `${st.primaryColor}18`,
            border: `1px solid ${st.primaryColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 700, color: st.primaryColor,
          }}
        >
          {user.name[0]}
        </Box>
        <Box flex={1} minWidth={0}>
          <Typography fontWeight={700} sx={{ color: colors.textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>
            {user.department} · {user.position} · <Box component="span" sx={{ fontFamily: 'monospace' }}>{user.employeeNumber}</Box>
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: colors.textSecondary }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      {/* 요약 */}
      <Box
        sx={{
          mx: 2.5, mt: 2, mb: 0, px: 2, py: 1.25, borderRadius: 2,
          bgcolor: `${st.primaryColor}10`,
          border: `1px solid ${st.primaryColor}30`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          총 수령 마일리지
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography fontWeight={800} sx={{ fontSize: '1.2rem', color: st.primaryColor }}>
            {totalFish.toLocaleString()}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>마리</Typography>
        </Box>
      </Box>

      {/* 필터 */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          size="small"
          placeholder="아이디어명, 지급 사유 검색"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowAll(false) }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '0.95rem', color: colors.textSecondary }} />
                </InputAdornment>
              ),
            },
          }}
          sx={inputSx}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small" type="date" label="시작일" value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setShowAll(false) }}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ ...inputSx, flex: 1 }}
          />
          <TextField
            size="small" type="date" label="종료일" value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setShowAll(false) }}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ ...inputSx, flex: 1 }}
          />
        </Box>
        {hasFilter && (
          <Button
            size="small" variant="text"
            onClick={() => { setSearch(''); setStartDate(''); setEndDate('') }}
            sx={{ alignSelf: 'flex-start', fontSize: '0.75rem', color: colors.textSecondary, p: 0, textTransform: 'none' }}
          >
            필터 초기화
          </Button>
        )}
      </Box>

      <Divider sx={{ borderColor: colors.borderColor }} />

      {/* 결과 헤더 */}
      <Box sx={{ px: 2.5, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" fontWeight={600} sx={{ color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {hasFilter ? `검색 결과 ${filtered.length}건` : `최신 ${Math.min(displayed.length, INITIAL_LIMIT)}건 / 전체 ${awards.length}건`}
        </Typography>
      </Box>

      {/* 목록 */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, pb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {displayed.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <EmojiEventsIcon sx={{ fontSize: '2rem', color: colors.textSecondary, opacity: 0.25, mb: 1 }} />
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              {hasFilter ? '검색 결과가 없습니다' : '마일리지 수령 내역이 없습니다'}
            </Typography>
          </Box>
        ) : (
          displayed.map((item) => (
            <AwardRow key={item.id} item={item} colors={colors} st={st} />
          ))
        )}

        {hasMore && (
          <Button
            variant="text"
            onClick={() => setShowAll(true)}
            sx={{
              mt: 0.5, fontSize: '0.8rem', fontWeight: 600,
              color: st.primaryColor, textTransform: 'none',
              '&:hover': { bgcolor: `${st.primaryColor}10` },
            }}
          >
            나머지 {filtered.length - INITIAL_LIMIT}건 더 보기
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default function UserMileageDrawer({ user, onClose }: Props) {
  const colors = usePageColors()

  const handleClose = () => onClose()

  return (
    <Drawer
      anchor="right"
      open={user !== null}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100vw', sm: 420 },
            bgcolor: colors.bgBase,
            borderLeft: `1px solid ${colors.borderColor}`,
          },
        },
      }}
    >
      {user && <DrawerContent user={user} onClose={handleClose} />}
    </Drawer>
  )
}
