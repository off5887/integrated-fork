// src/features/idea/components/modals/SimilarIdeaSearchModal.tsx
// 유사 아이디어 키워드 검색 모달 (결과 목록 + 상세 패널 포함)
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { IDEAS } from '@/api/mock/ideaBrowse'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { getIdeaTheme } from '@/theme/ideaTheme'
import SimilarIdeaDetailPanel from './SimilarIdeaDetailPanel'
import SimilarIdeaResultCard from './SimilarIdeaResultCard'

// ─── 유사도 점수 계산 (검색어 기반) ─────────────────────────
function scoreIdea(idea: IdeaItem, query: string): number {
  if (!query.trim()) return 0
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2)
  if (tokens.length === 0) return 0
  let score = 0
  tokens.forEach((t) => {
    if (idea.title.toLowerCase().includes(t)) score += 3
    else if (idea.problem.toLowerCase().includes(t)) score += 1
    else if (idea.solution.toLowerCase().includes(t)) score += 1
  })
  return score
}

interface Props {
  open: boolean
  onClose: () => void
  /** 제목 필드 값을 미리 채워 검색 시작 (선택) */
  initialQuery?: string
}

export default function SimilarIdeaSearchModal({
  open,
  onClose,
  initialQuery = '',
}: Props) {
  const { isDarkMode } = useThemeMode()
  const [query, setQuery] = useState(initialQuery)
  const [detail, setDetail] = useState<IdeaItem | null>(null)

  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor } = it

  // 검색 결과 (점수 기반 정렬, 점수 0 제외, 비공개 제외)
  const results = useMemo(() => {
    const q = query.trim()
    if (!q || q.length < 2) return []
    return IDEAS.filter((idea) => idea.security !== 'private')
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
            bgcolor: it.modalBg,
            border: `1px solid ${borderColor}`,
            boxShadow: it.dialogShadow,
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: it.backdropBg,
          },
        },
      }}
    >
      {/* 상단 그라디언트 */}
      <Box sx={{ height: 3, background: it.headerGradient }} />

      {/* 헤더 */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.75,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            flexShrink: 0,
            bgcolor: it.accent.color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon sx={{ fontSize: '1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography
            sx={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: textPrimary,
              lineHeight: 1.3,
            }}
          >
            유사 아이디어 검색
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
            제안 전 유사한 아이디어가 있는지 확인해 보세요
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ color: textSecondary, flexShrink: 0 }}
        >
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
                      <SearchIcon
                        sx={{ fontSize: '1rem', color: textSecondary }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: query ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setQuery('')}
                        sx={{ color: textSecondary }}
                      >
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
                  backgroundColor: it.searchInputBg,
                  fontSize: '0.875rem',
                  '& fieldset': { borderColor },
                  '&:hover fieldset': { borderColor: it.accent.borderHover },
                  '&.Mui-focused fieldset': { borderColor: it.accent.color },
                },
                '& .MuiInputBase-input': {
                  color: textPrimary,
                  WebkitTextFillColor: textPrimary,
                },
              }}
            />
          )}

          {/* 상세 보기 */}
          {detail ? (
            <SimilarIdeaDetailPanel
              idea={detail}
              onBack={() => setDetail(null)}
            />
          ) : (
            <>
              {/* 결과 없음 */}
              {query.trim().length >= 2 && results.length === 0 && (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 1.5 }}>🔍</Box>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: textPrimary,
                      mb: 0.5,
                    }}
                  >
                    유사한 아이디어가 없습니다
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: textSecondary }}>
                    새로운 아이디어를 자유롭게 제안해 보세요!
                  </Typography>
                </Box>
              )}

              {/* 입력 안내 */}
              {query.trim().length < 2 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 1.5 }}>💡</Box>
                  <Typography
                    sx={{
                      fontSize: '0.88rem',
                      color: textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    아이디어 키워드를 입력하면
                    <br />
                    기존에 유사한 제안이 있는지 확인할 수 있습니다
                  </Typography>
                </Box>
              )}

              {/* 결과 목록 */}
              {results.length > 0 && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1.25,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '0.8rem', color: textSecondary }}
                    >
                      <Box
                        component="span"
                        sx={{ fontWeight: 700, color: it.accent.textMuted }}
                      >
                        {results.length}건
                      </Box>
                      의 유사 아이디어
                    </Typography>
                    {results.some((r) => r.score >= 4) && (
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 1,
                          bgcolor: it.amber.bg,
                          border: `1px solid ${it.amber.border}`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: it.amber.color,
                          }}
                        >
                          ⚠ 유사도 높은 건 포함
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {results.map(({ idea, score }) => (
                      <SimilarIdeaResultCard
                        key={idea.id}
                        idea={idea}
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
