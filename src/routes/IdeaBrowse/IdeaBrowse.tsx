// src/routes/IdeaBrowse/IdeaBrowse.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import type { CategoryConfig, IdeaCategory, IdeaItem, IdeaStatus } from '../../api/types/ideaBrowse'
import { CATEGORY_CONFIG, DEPT_BY_DIVISION, DIVISIONS, IDEAS, MY_IDEA_KEYWORDS, MY_IDEA_TITLES } from '../../api/mock/ideaBrowse'
import { getIdeaTheme, IDEA_STATUS_CONFIG } from '../../theme/ideaTheme'

type SortKey = 'latest' | 'likes' | 'views' | 'comments'

// ─── 유사도 계산 ─────────────────────────────────────────────
function getSimilarity(idea: IdeaItem): string[] {
  const text = `${idea.title} ${idea.problem} ${idea.solution}`.toLowerCase()
  const matched: string[] = []
  MY_IDEA_KEYWORDS.forEach((keywords, idx) => {
    const count = keywords.filter((k) => text.includes(k.toLowerCase())).length
    if (count >= 2) matched.push(MY_IDEA_TITLES[idx])
  })
  return matched
}

// ─── 날짜 포맷 ───────────────────────────────────────────────
function fmtDate(s: string) {
  const [, m, d] = s.split('-')
  return `${m}/${d}`
}

// ─── 카테고리 설정 조회 ──────────────────────────────────────
function getCatConfig(id: string): CategoryConfig {
  return CATEGORY_CONFIG.find((c) => c.id === id) ?? CATEGORY_CONFIG[CATEGORY_CONFIG.length - 1]
}

// ════════════════════════════════════════════════════════════
// IdeaCard
// ════════════════════════════════════════════════════════════
interface CardProps {
  idea: IdeaItem
  isDarkMode: boolean
  similarTitles: string[]
  showSimilar: boolean
  onClick: () => void
}

function IdeaCard({ idea, isDarkMode, similarTitles, showSimilar, onClick }: CardProps) {
  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)
  const cardBg        = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'

  const cat  = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]
  const isSimilar = showSimilar && similarTitles.length > 0

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      aria-label={`아이디어: ${idea.title}`}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: cardBg,
        border: `1px solid ${isSimilar ? 'rgba(245,158,11,0.5)' : borderColor}`,
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: isSimilar
          ? isDarkMode
            ? '0 0 0 1px rgba(245,158,11,0.25), 0 4px 20px rgba(0,0,0,0.3)'
            : '0 0 0 1px rgba(245,158,11,0.2), 0 2px 12px rgba(0,0,0,0.05)'
          : isDarkMode
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 2px 12px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: isDarkMode
            ? '0 20px 40px rgba(0,0,0,0.5), 0 8px 16px rgba(99,102,241,0.25)'
            : '0 16px 36px rgba(0,0,0,0.1), 0 6px 12px rgba(99,102,241,0.1)',
          borderColor: isSimilar ? 'rgba(245,158,11,0.7)' : 'rgba(99,102,241,0.2)',
        },
        '&:focus-visible': {
          outline: `2px solid ${isSimilar ? '#f59e0b' : '#6366f1'}`,
          outlineOffset: 2,
        },
      }}
    >
      {/* 상단 카테고리 색상 스트립 */}
      <Box sx={{ height: 3, background: isSimilar ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }} />

      {/* 유사 아이디어 배지 */}
      {isSimilar && (
        <Tooltip
          title={
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>내 아이디어와 유사한 건</Typography>
              {similarTitles.map((t) => (
                <Typography key={t} variant="caption" sx={{ display: 'block', opacity: 0.9 }}>• {t}</Typography>
              ))}
            </Box>
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              position: 'absolute', top: 11, right: 10, zIndex: 1,
              display: 'flex', alignItems: 'center', gap: 0.4,
              px: 0.8, py: 0.25, borderRadius: 1,
              bgcolor: isDarkMode ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.4)',
            }}
          >
            <WarningAmberIcon sx={{ fontSize: '0.7rem', color: '#f59e0b' }} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>
              유사
            </Typography>
          </Box>
        </Tooltip>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, md: 2.5 }, gap: 1.75 }}>
        {/* 카테고리 + 상태 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.5,
              px: 0.9, py: 0.3, borderRadius: 1.5,
              bgcolor: cat.bg, border: `1px solid ${cat.border}`,
            }}
          >
            <Box component="span" sx={{ fontSize: '0.75rem', lineHeight: 1 }}>{cat.emoji}</Box>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: cat.color, lineHeight: 1 }}>
              {idea.category}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center',
              px: 0.9, py: 0.3, borderRadius: 1.5,
              bgcolor: stat.bg, border: `1px solid ${stat.border}`,
            }}
          >
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {idea.status}
            </Typography>
          </Box>
        </Box>

        {/* 제목 */}
        <Typography
          sx={{
            fontSize: '0.9rem', fontWeight: 700, color: textPrimary,
            lineHeight: 1.45, letterSpacing: '-0.01em',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {idea.title}
        </Typography>

        {/* 문제점 요약 */}
        <Typography
          sx={{
            fontSize: '0.8rem', color: textSecondary, lineHeight: 1.6,
            flexGrow: 1,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {idea.problem}
        </Typography>

        {/* 하단 메타 */}
        <Box
          sx={{
            mt: 'auto', pt: 1.5,
            borderTop: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.4)'}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1,
          }}
        >
          {/* 작성자 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
            <Avatar
              sx={{
                width: 22, height: 22, fontSize: '0.65rem', fontWeight: 700,
                bgcolor: isDarkMode ? '#4f46e5' : '#6366f1', flexShrink: 0,
              }}
            >
              {idea.author[0]}
            </Avatar>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {idea.author} · {idea.department}
            </Typography>
          </Box>

          {/* 통계 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ThumbUpOutlinedIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.likes}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.comments}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <CalendarTodayIcon sx={{ fontSize: '0.72rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{fmtDate(idea.submittedAt)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ════════════════════════════════════════════════════════════
// DetailDialog
// ════════════════════════════════════════════════════════════
interface DetailProps {
  idea: IdeaItem | null
  onClose: () => void
  isDarkMode: boolean
  similarTitles: string[]
}

function DetailDialog({ idea, onClose, isDarkMode, similarTitles }: DetailProps) {
  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)

  if (!idea) return null
  const cat  = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]

  return (
    <Dialog
      open={!!idea}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 24px 64px rgba(0,0,0,0.6)' : '0 24px 64px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: { backdropFilter: 'blur(6px)', backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)' },
        },
      }}
    >
      {/* 상단 스트립 */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }} />

      {/* 헤더 */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.35, borderRadius: 1.5, bgcolor: cat.bg, border: `1px solid ${cat.border}` }}>
              <Box component="span" sx={{ fontSize: '0.8rem' }}>{cat.emoji}</Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color }}>{idea.category}</Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.35, borderRadius: 1.5, bgcolor: stat.bg, border: `1px solid ${stat.border}` }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color }}>{idea.status}</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: textPrimary, lineHeight: 1.4 }}>
            {idea.title}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: textSecondary, flexShrink: 0, mt: -0.5 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* 유사 아이디어 경고 */}
          {similarTitles.length > 0 && (
            <Box
              sx={{
                display: 'flex', alignItems: 'flex-start', gap: 1.25,
                p: 1.75, borderRadius: 2,
                bgcolor: isDarkMode ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <WarningAmberIcon sx={{ fontSize: '1.1rem', color: '#f59e0b', flexShrink: 0, mt: 0.1 }} />
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', mb: 0.4 }}>
                  내 아이디어와 유사한 건이 있습니다
                </Typography>
                {similarTitles.map((t) => (
                  <Typography key={t} sx={{ fontSize: '0.78rem', color: isDarkMode ? '#fbbf24' : '#92400e', lineHeight: 1.6 }}>
                    • {t}
                  </Typography>
                ))}
                <Typography sx={{ fontSize: '0.75rem', color: textSecondary, mt: 0.75 }}>
                  제출 전 내용을 비교하여 중복 제안을 방지해 주세요.
                </Typography>
              </Box>
            </Box>
          )}

          {/* 작성자 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: isDarkMode ? '#4f46e5' : '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>
              {idea.author[0]}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}>
                {idea.author}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
                {idea.division} · {idea.department}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: '0.8rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{idea.submittedAt}</Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* 문제점 */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              문제점 도출
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>
              {idea.problem}
            </Typography>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* 해결 대안 */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              해결 대안
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>
              {idea.solution}
            </Typography>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* 통계 */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { icon: <ThumbUpOutlinedIcon sx={{ fontSize: '0.9rem' }} />, label: '좋아요', value: idea.likes },
              { icon: <ChatBubbleOutlineIcon sx={{ fontSize: '0.9rem' }} />, label: '댓글', value: idea.comments },
              { icon: <VisibilityOutlinedIcon sx={{ fontSize: '0.9rem' }} />, label: '조회수', value: idea.views },
            ].map(({ icon, label, value }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ color: textSecondary }}>{icon}</Box>
                <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: textPrimary }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ════════════════════════════════════════════════════════════
// IdeaBrowse (메인 페이지)
// ════════════════════════════════════════════════════════════
export default function IdeaBrowse() {
  const { isDarkMode } = useThemeMode()

  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)
  const pageBg        = isDarkMode ? 'rgba(15,23,42,0.5)' : 'rgba(248,250,252,0.9)'
  const filterBg      = isDarkMode ? 'rgba(22,30,46,0.9)' : 'rgba(255,255,255,0.95)'

  // ─── 필터 상태 ───────────────────────────────────────────
  const [search,           setSearch]           = useState('')
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | ''>('')
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDept,     setSelectedDept]     = useState('')
  const [selectedStatus,   setSelectedStatus]   = useState<IdeaStatus | ''>('')
  const [sortBy,           setSortBy]           = useState<SortKey>('latest')
  const [showSimilarOnly,  setShowSimilarOnly]  = useState(false)
  const [selectedIdea,     setSelectedIdea]     = useState<IdeaItem | null>(null)

  // 부서 목록 (부문 선택에 따라 변동)
  const deptOptions = selectedDivision ? DEPT_BY_DIVISION[selectedDivision] ?? [] : []

  const handleDivisionChange = (e: SelectChangeEvent) => {
    setSelectedDivision(e.target.value)
    setSelectedDept('')
  }

  // ─── 유사도 맵 (사전 계산) ───────────────────────────────
  const similarityMap = useMemo(() => {
    const map = new Map<number, string[]>()
    IDEAS.forEach((idea) => map.set(idea.id, getSimilarity(idea)))
    return map
  }, [])

  // ─── 필터링 + 정렬 ───────────────────────────────────────
  const filteredIdeas = useMemo(() => {
    const q = search.trim().toLowerCase()

    let result = IDEAS.filter((idea) => {
      if (selectedCategory && idea.category !== selectedCategory) return false
      if (selectedDivision && idea.division !== selectedDivision) return false
      if (selectedDept && idea.department !== selectedDept) return false
      if (selectedStatus && idea.status !== selectedStatus) return false
      if (showSimilarOnly && (similarityMap.get(idea.id)?.length ?? 0) === 0) return false
      if (q) {
        const text = `${idea.title} ${idea.problem} ${idea.solution} ${idea.author} ${idea.department}`.toLowerCase()
        if (!text.includes(q)) return false
      }
      return true
    })

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'likes':    return b.likes - a.likes
        case 'views':    return b.views - a.views
        case 'comments': return b.comments - a.comments
        case 'latest':   return b.submittedAt.localeCompare(a.submittedAt)
        default:         return 0
      }
    })

    return result
  }, [search, selectedCategory, selectedDivision, selectedDept, selectedStatus, sortBy, showSimilarOnly, similarityMap])

  const similarCount = useMemo(
    () => IDEAS.filter((i) => (similarityMap.get(i.id)?.length ?? 0) > 0).length,
    [similarityMap],
  )

  const hasFilter = !!(search || selectedCategory || selectedDivision || selectedDept || selectedStatus || showSimilarOnly)

  const clearAll = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedDivision('')
    setSelectedDept('')
    setSelectedStatus('')
    setShowSimilarOnly(false)
  }

  // Select용 공통 sx
  const selectSx = {
    borderRadius: 2,
    fontSize: '0.83rem',
    color: textPrimary,
    bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
    '& .MuiOutlinedInput-notchedOutline': { borderColor },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.35)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
    '& .MuiSelect-icon': { color: textSecondary },
    '& .MuiSelect-select': { color: textPrimary, WebkitTextFillColor: textPrimary },
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: pageBg, pb: 6 }}>
      {/* ── 헤더 ────────────────────────────────────────── */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, md: 4 }, pb: 3,
          borderBottom: `1px solid ${borderColor}`,
          bgcolor: filterBg,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  mb: 0.5,
                }}
              >
                상상 보기
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: textSecondary }}>
                모든 아이디어를 탐색하고 내 아이디어와 유사한 건을 확인해 보세요
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2, py: 1, borderRadius: 2,
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: '#6366f1', lineHeight: 1 }}>{IDEAS.length}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>전체</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>{similarCount}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>내 유사</Typography>
              </Box>
            </Box>
          </Box>

          {/* 검색창 */}
          <TextField
            fullWidth
            size="small"
            placeholder="제목, 문제점, 해결방안, 작성자, 부서로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch('')} sx={{ color: textSecondary }}>
                      <CloseIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                fontSize: '0.875rem',
                height: 44,
                '& fieldset': { borderColor },
                '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.35)' },
                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              },
              '& .MuiInputBase-input': { color: textPrimary, WebkitTextFillColor: textPrimary },
            }}
          />

          {/* 카테고리 칩 */}
          <Box
            sx={{
              display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2,
              overflowX: 'auto', pb: 0.5,
              '&::-webkit-scrollbar': { height: 3 },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(99,102,241,0.25)', borderRadius: 9999 },
            }}
          >
            {/* 전체 */}
            <Box
              onClick={() => setSelectedCategory('')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedCategory('') }}
              aria-pressed={!selectedCategory}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.5,
                px: 1.25, py: 0.55, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                border: `1px solid ${!selectedCategory ? '#6366f1' : borderColor}`,
                bgcolor: !selectedCategory
                  ? isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)'
                  : isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,0.8)',
                transition: 'all 0.15s ease', outline: 'none',
                '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
              }}
            >
              <Typography sx={{ fontSize: '0.78rem', fontWeight: !selectedCategory ? 700 : 500, color: !selectedCategory ? '#6366f1' : textSecondary, whiteSpace: 'nowrap' }}>
                전체
              </Typography>
            </Box>

            {CATEGORY_CONFIG.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <Box
                  key={cat.id}
                  onClick={() => setSelectedCategory(isActive ? '' : cat.id as IdeaCategory)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedCategory(isActive ? '' : cat.id as IdeaCategory) }}
                  aria-pressed={isActive}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    px: 1.25, py: 0.55, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                    border: `1px solid ${isActive ? cat.border : borderColor}`,
                    bgcolor: isActive ? cat.bg : isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,0.8)',
                    transition: 'all 0.15s ease', outline: 'none',
                    '&:hover': { bgcolor: cat.bg, borderColor: cat.border },
                    '&:focus-visible': { outline: `2px solid ${cat.color}`, outlineOffset: 2 },
                  }}
                >
                  <Box component="span" sx={{ fontSize: '0.8rem', lineHeight: 1 }}>{cat.emoji}</Box>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: isActive ? 700 : 500, color: isActive ? cat.color : textSecondary, whiteSpace: 'nowrap' }}>
                    {cat.label}
                  </Typography>
                </Box>
              )
            })}
          </Box>

          {/* 부문/부서/상태 필터 + 내 유사 아이디어 토글 */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* 부문 */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedDivision}
                onChange={handleDivisionChange}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={selectSx}
                renderValue={(v) => (
                  <Typography sx={{ fontSize: '0.83rem', color: v ? textPrimary : textSecondary, WebkitTextFillColor: v ? textPrimary : textSecondary }}>
                    {v || '부문 전체'}
                  </Typography>
                )}
              >
                <MenuItem value=""><Typography sx={{ fontSize: '0.83rem' }}>부문 전체</Typography></MenuItem>
                {DIVISIONS.map((d) => (
                  <MenuItem key={d} value={d}><Typography sx={{ fontSize: '0.83rem' }}>{d}</Typography></MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 부서 */}
            <FormControl size="small" sx={{ minWidth: 120 }} disabled={!selectedDivision}>
              <Select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={selectSx}
                renderValue={(v) => (
                  <Typography sx={{ fontSize: '0.83rem', color: v ? textPrimary : textSecondary, WebkitTextFillColor: v ? textPrimary : textSecondary }}>
                    {v || '부서 전체'}
                  </Typography>
                )}
              >
                <MenuItem value=""><Typography sx={{ fontSize: '0.83rem' }}>부서 전체</Typography></MenuItem>
                {deptOptions.map((d) => (
                  <MenuItem key={d} value={d}><Typography sx={{ fontSize: '0.83rem' }}>{d}</Typography></MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 상태 */}
            <FormControl size="small" sx={{ minWidth: 110 }}>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as IdeaStatus | '')}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={selectSx}
                renderValue={(v) => (
                  <Typography sx={{ fontSize: '0.83rem', color: v ? textPrimary : textSecondary, WebkitTextFillColor: v ? textPrimary : textSecondary }}>
                    {v || '상태 전체'}
                  </Typography>
                )}
              >
                <MenuItem value=""><Typography sx={{ fontSize: '0.83rem' }}>상태 전체</Typography></MenuItem>
                {(['심사대기', '심사중', '승인', '반려', '실행중', '완료'] as IdeaStatus[]).map((s) => (
                  <MenuItem key={s} value={s}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: IDEA_STATUS_CONFIG[s].color, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.83rem' }}>{s}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 내 유사 아이디어 토글 */}
            <Tooltip title={`내가 제출한 아이디어와 유사한 건 ${similarCount}개`} arrow>
              <Box
                onClick={() => setShowSimilarOnly(!showSimilarOnly)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowSimilarOnly(!showSimilarOnly) }}
                aria-pressed={showSimilarOnly}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  px: 1.5, py: 0.7, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                  border: `1px solid ${showSimilarOnly ? 'rgba(245,158,11,0.5)' : borderColor}`,
                  bgcolor: showSimilarOnly
                    ? isDarkMode ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.07)'
                    : isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,0.8)',
                  transition: 'all 0.15s ease', outline: 'none',
                  '&:hover': { borderColor: 'rgba(245,158,11,0.4)', bgcolor: isDarkMode ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.05)' },
                  '&:focus-visible': { outline: '2px solid #f59e0b', outlineOffset: 2 },
                }}
              >
                <WarningAmberIcon sx={{ fontSize: '0.85rem', color: showSimilarOnly ? '#f59e0b' : textSecondary }} />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: showSimilarOnly ? 700 : 500, color: showSimilarOnly ? '#f59e0b' : textSecondary, whiteSpace: 'nowrap' }}>
                  내 유사 아이디어만
                </Typography>
                {similarCount > 0 && (
                  <Box
                    sx={{
                      minWidth: 18, height: 18, borderRadius: '50%',
                      bgcolor: showSimilarOnly ? '#f59e0b' : isDarkMode ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: showSimilarOnly ? '#fff' : '#f59e0b', lineHeight: 1 }}>
                      {similarCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Tooltip>

            {/* 필터 초기화 */}
            {hasFilter && (
              <Box
                onClick={clearAll}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') clearAll() }}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  px: 1.25, py: 0.7, borderRadius: 2, cursor: 'pointer',
                  border: `1px solid ${borderColor}`, color: textSecondary,
                  fontSize: '0.78rem', transition: 'all 0.15s', outline: 'none',
                  '&:hover': { borderColor: '#ef4444', color: '#ef4444' },
                  '&:focus-visible': { outline: '2px solid #ef4444', outlineOffset: 2 },
                }}
              >
                <CloseIcon sx={{ fontSize: '0.8rem' }} />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 500 }}>초기화</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* ── 결과 행 (정렬 + 건수) ───────────────────────── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1.75, maxWidth: 1280, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: textSecondary }}>
              총{' '}
              <Box component="span" sx={{ fontWeight: 700, color: '#6366f1' }}>
                {filteredIdeas.length}
              </Box>
              건
            </Typography>
            {showSimilarOnly && (
              <Chip
                label="내 유사 아이디어"
                size="small"
                onDelete={() => setShowSimilarOnly(false)}
                sx={{
                  bgcolor: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                  border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.72rem', fontWeight: 600,
                  '& .MuiChip-deleteIcon': { color: '#f59e0b', '&:hover': { color: '#d97706' } },
                }}
              />
            )}
          </Box>

          {/* 정렬 */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {([
              { key: 'latest',   label: '최신순' },
              { key: 'likes',    label: '좋아요순' },
              { key: 'views',    label: '조회순' },
              { key: 'comments', label: '댓글순' },
            ] as { key: SortKey; label: string }[]).map(({ key, label }) => (
              <Box
                key={key}
                onClick={() => setSortBy(key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSortBy(key) }}
                sx={{
                  px: 1.25, py: 0.5, borderRadius: 1.5, cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: sortBy === key ? 700 : 400,
                  color: sortBy === key ? '#6366f1' : textSecondary,
                  bgcolor: sortBy === key
                    ? isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'
                    : 'transparent',
                  border: `1px solid ${sortBy === key ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
                  transition: 'all 0.12s', outline: 'none',
                  '&:hover': { color: '#6366f1' },
                  '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── 카드 그리드 ─────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
        {filteredIdeas.length === 0 ? (
          /* 빈 상태 */
          <Box
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              py: 10, gap: 2,
            }}
          >
            <Box sx={{ fontSize: '3rem', lineHeight: 1 }}>🔍</Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: textPrimary }}>검색 결과가 없습니다</Typography>
            <Typography sx={{ fontSize: '0.85rem', color: textSecondary, textAlign: 'center', maxWidth: 300 }}>
              다른 검색어나 필터를 사용해 보세요
            </Typography>
            {hasFilter && (
              <Box
                onClick={clearAll}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') clearAll() }}
                sx={{
                  mt: 1, px: 2.5, py: 0.9, borderRadius: 2, cursor: 'pointer',
                  bgcolor: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                  color: '#6366f1', fontSize: '0.83rem', fontWeight: 600,
                  transition: 'all 0.15s', outline: 'none',
                  '&:hover': { bgcolor: 'rgba(99,102,241,0.14)' },
                  '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
                }}
              >
                필터 초기화
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {filteredIdeas.map((idea) => {
              const similarTitles = similarityMap.get(idea.id) ?? []
              return (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isDarkMode={isDarkMode}
                  similarTitles={similarTitles}
                  showSimilar={showSimilarOnly || true}
                  onClick={() => setSelectedIdea(idea)}
                />
              )
            })}
          </Box>
        )}
      </Box>

      {/* ── 상세 다이얼로그 ──────────────────────────────── */}
      <DetailDialog
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        isDarkMode={isDarkMode}
        similarTitles={selectedIdea ? (similarityMap.get(selectedIdea.id) ?? []) : []}
      />
    </Box>
  )
}
