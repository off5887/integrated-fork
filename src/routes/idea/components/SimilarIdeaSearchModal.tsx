// src/routes/Idea/Components/SimilarIdeaSearchModal.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import type { CategoryConfig, IdeaItem, IdeaStatus } from '../../../api/types/ideaBrowse'
import { CATEGORY_CONFIG, IDEAS } from '../../../api/mock/ideaBrowse'

// ─── 상태 색상 ────────────────────────────────────────────────
const STATUS_CONFIG: Record<IdeaStatus, { color: string; bg: string; border: string }> = {
  심사대기: { color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
  심사중:   { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)'   },
  승인:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)'   },
  반려:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)'    },
  실행중:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)'   },
  완료:     { color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.3)'   },
}

function getCatConfig(id: string): CategoryConfig {
  return CATEGORY_CONFIG.find((c) => c.id === id) ?? CATEGORY_CONFIG[CATEGORY_CONFIG.length - 1]
}

function fmtDate(s: string) {
  return s.replace(/-/g, '.').slice(2) // "26.02.20"
}

// ─── 유사도 점수 계산 (검색어 기반) ─────────────────────────
function scoreIdea(idea: IdeaItem, query: string): number {
  if (!query.trim()) return 0
  const tokens = query.trim().toLowerCase().split(/\s+/).filter((t) => t.length >= 2)
  if (tokens.length === 0) return 0
  const text = `${idea.title} ${idea.problem} ${idea.solution}`.toLowerCase()
  let score = 0
  tokens.forEach((t) => {
    if (idea.title.toLowerCase().includes(t)) score += 3      // 제목 매칭 가중치 높음
    else if (idea.problem.toLowerCase().includes(t)) score += 1
    else if (idea.solution.toLowerCase().includes(t)) score += 1
    if (text.includes(t)) score += 0 // 이미 위에서 처리됨
  })
  return score
}

// ─── 결과 카드 ────────────────────────────────────────────────
interface ResultCardProps {
  idea: IdeaItem
  isDarkMode: boolean
  score: number
  onClick: () => void
}

function ResultCard({ idea, isDarkMode, score, onClick }: ResultCardProps) {
  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cat  = getCatConfig(idea.category)
  const stat = STATUS_CONFIG[idea.status]
  const isHighSimilarity = score >= 4

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      sx={{
        p: 1.75, borderRadius: 2, cursor: 'pointer', outline: 'none',
        border: `1px solid ${isHighSimilarity
          ? isDarkMode ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.25)'
          : borderColor}`,
        bgcolor: isHighSimilarity
          ? isDarkMode ? 'rgba(245,158,11,0.05)' : 'rgba(245,158,11,0.03)'
          : isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,0.7)',
        transition: 'all 0.15s ease',
        '&:hover': {
          borderColor: isHighSimilarity ? 'rgba(245,158,11,0.5)' : 'rgba(99,102,241,0.3)',
          bgcolor: isHighSimilarity
            ? isDarkMode ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)'
            : isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
        },
        '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
      }}
    >
      {/* 뱃지 행 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: 0.8, py: 0.25, borderRadius: 1, bgcolor: cat.bg, border: `1px solid ${cat.border}` }}>
          <Box component="span" sx={{ fontSize: '0.7rem' }}>{cat.emoji}</Box>
          <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: cat.color, lineHeight: 1 }}>{idea.category}</Typography>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 0.8, py: 0.25, borderRadius: 1, bgcolor: stat.bg, border: `1px solid ${stat.border}` }}>
          <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{idea.status}</Typography>
        </Box>
        {isHighSimilarity && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 0.8, py: 0.25, borderRadius: 1, bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>⚠ 유사도 높음</Typography>
          </Box>
        )}
        <Typography sx={{ fontSize: '0.68rem', color: textSecondary, ml: 'auto', whiteSpace: 'nowrap' }}>
          {idea.department}
        </Typography>
      </Box>

      {/* 제목 */}
      <Typography
        sx={{
          fontSize: '0.85rem', fontWeight: 700, color: textPrimary,
          lineHeight: 1.4, mb: 0.6,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}
      >
        {idea.title}
      </Typography>

      {/* 문제점 요약 */}
      <Typography
        sx={{
          fontSize: '0.78rem', color: textSecondary, lineHeight: 1.55,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          mb: 1.25,
        }}
      >
        {idea.problem}
      </Typography>

      {/* 메타 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Avatar sx={{ width: 18, height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: isDarkMode ? '#4f46e5' : '#6366f1' }}>
            {idea.author[0]}
          </Avatar>
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.author}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <ThumbUpOutlinedIcon sx={{ fontSize: '0.7rem', color: textSecondary }} />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.likes}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <ChatBubbleOutlineIcon sx={{ fontSize: '0.7rem', color: textSecondary }} />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.comments}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, ml: 'auto' }}>
          <CalendarTodayIcon sx={{ fontSize: '0.68rem', color: textSecondary }} />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{fmtDate(idea.submittedAt)}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

// ─── 상세 보기 패널 (Dialog 안에서 슬라이드) ─────────────────
interface DetailPanelProps {
  idea: IdeaItem
  isDarkMode: boolean
  onBack: () => void
}

function DetailPanel({ idea, isDarkMode, onBack }: DetailPanelProps) {
  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cat  = getCatConfig(idea.category)
  const stat = STATUS_CONFIG[idea.status]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* 뒤로 */}
      <Box
        onClick={onBack}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onBack() }}
        sx={{
          display: 'inline-flex', alignItems: 'center', gap: 0.6,
          cursor: 'pointer', color: '#6366f1', fontSize: '0.82rem', fontWeight: 600,
          width: 'fit-content', outline: 'none',
          '&:hover': { opacity: 0.75 },
          '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
        }}
      >
        ← 목록으로
      </Box>

      {/* 뱃지 */}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.35, borderRadius: 1.5, bgcolor: cat.bg, border: `1px solid ${cat.border}` }}>
          <Box component="span" sx={{ fontSize: '0.8rem' }}>{cat.emoji}</Box>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color }}>{idea.category}</Typography>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.35, borderRadius: 1.5, bgcolor: stat.bg, border: `1px solid ${stat.border}` }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color }}>{idea.status}</Typography>
        </Box>
      </Box>

      {/* 제목 */}
      <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: textPrimary, lineHeight: 1.45, letterSpacing: '-0.01em' }}>
        {idea.title}
      </Typography>

      {/* 작성자 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: isDarkMode ? '#4f46e5' : '#6366f1', fontSize: '0.8rem', fontWeight: 700 }}>
          {idea.author[0]}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}>{idea.author}</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.division} · {idea.department}</Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: '0.78rem', color: textSecondary }} />
          <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{idea.submittedAt}</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 문제점 */}
      <Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          문제점 도출
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>{idea.problem}</Typography>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 해결 대안 */}
      <Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          해결 대안
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>{idea.solution}</Typography>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 통계 */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {[
          { icon: <ThumbUpOutlinedIcon sx={{ fontSize: '0.88rem' }} />, label: '좋아요', value: idea.likes },
          { icon: <ChatBubbleOutlineIcon sx={{ fontSize: '0.88rem' }} />, label: '댓글', value: idea.comments },
          { icon: <VisibilityOutlinedIcon sx={{ fontSize: '0.88rem' }} />, label: '조회수', value: idea.views },
        ].map(({ icon, label, value }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ color: textSecondary }}>{icon}</Box>
            <Typography sx={{ fontSize: '0.8rem', color: textSecondary }}>{label}</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ════════════════════════════════════════════════════════════
// SimilarIdeaSearchModal
// ════════════════════════════════════════════════════════════
interface Props {
  open: boolean
  onClose: () => void
  isDarkMode: boolean
  /** 제목 필드 값을 미리 채워 검색 시작 (선택) */
  initialQuery?: string
}

export default function SimilarIdeaSearchModal({ open, onClose, isDarkMode, initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const [detail, setDetail] = useState<IdeaItem | null>(null)

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  // 검색 결과 (점수 기반 정렬, 점수 0 제외)
  const results = useMemo(() => {
    const q = query.trim()
    if (!q || q.length < 2) return []
    return IDEAS
      .map((idea) => ({ idea, score: scoreIdea(idea, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
  }, [query])

  const handleClose = () => {
    setDetail(null)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        },
        backdrop: {
          sx: { backdropFilter: 'blur(6px)', backgroundColor: isDarkMode ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.3)' },
        },
      }}
    >
      {/* 상단 그라디언트 */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

      {/* 헤더 */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.75, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${borderColor}` }}>
        <Box
          sx={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <SearchIcon sx={{ fontSize: '1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: textPrimary, lineHeight: 1.3 }}>
            유사 아이디어 검색
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
            제안 전 유사한 아이디어가 있는지 확인해 보세요
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} sx={{ color: textSecondary, flexShrink: 0 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, overflowY: 'auto' }}>
        <Box sx={{ p: 2 }}>
          {/* 검색창 */}
          {!detail && (
            <TextField
              fullWidth
              size="small"
              autoFocus
              placeholder="아이디어 키워드로 검색 (예: 재택근무, LED 조명, 카페)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: query ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setQuery('')} sx={{ color: textSecondary }}>
                        <CloseIcon sx={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
              sx={{
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                  fontSize: '0.875rem',
                  '& fieldset': { borderColor },
                  '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.35)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputBase-input': { color: textPrimary, WebkitTextFillColor: textPrimary },
              }}
            />
          )}

          {/* 상세 보기 */}
          {detail ? (
            <DetailPanel idea={detail} isDarkMode={isDarkMode} onBack={() => setDetail(null)} />
          ) : (
            <>
              {/* 결과 목록 */}
              {query.trim().length >= 2 && results.length === 0 && (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 1.5 }}>🔍</Box>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: textPrimary, mb: 0.5 }}>
                    유사한 아이디어가 없습니다
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: textSecondary }}>
                    새로운 아이디어를 자유롭게 제안해 보세요!
                  </Typography>
                </Box>
              )}

              {query.trim().length < 2 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 1.5 }}>💡</Box>
                  <Typography sx={{ fontSize: '0.88rem', color: textSecondary, lineHeight: 1.6 }}>
                    아이디어 키워드를 입력하면<br />기존에 유사한 제안이 있는지 확인할 수 있습니다
                  </Typography>
                </Box>
              )}

              {results.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: textSecondary }}>
                      <Box component="span" sx={{ fontWeight: 700, color: '#6366f1' }}>{results.length}건</Box>의 유사 아이디어
                    </Typography>
                    {results.some(r => r.score >= 4) && (
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 0.8, py: 0.2, borderRadius: 1, bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
                        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#f59e0b' }}>
                          ⚠ 유사도 높은 건 포함
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {results.map(({ idea, score }) => (
                      <ResultCard
                        key={idea.id}
                        idea={idea}
                        isDarkMode={isDarkMode}
                        score={score}
                        onClick={() => setDetail(idea)}
                      />
                    ))}
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
