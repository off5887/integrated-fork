// src/routes/ideaBrowse/IdeaBrowse.tsx
import { Box, Chip, Divider, SelectChangeEvent, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { DEPT_BY_DIVISION, IDEAS, MY_AUTHOR } from '../../api/mock/ideaBrowse'
import type { IdeaCategory, IdeaItem, IdeaStatus, SortKey } from '../../api/types/ideaBrowse'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useThemeMode } from '../../context/ThemeContext'
import { getIdeaTheme, ideaAccent } from '../../theme/ideaBrowseTheme'
import IdeaCard from './components/IdeaCard'
import IdeaDetailDialog from './components/IdeaDetailDialog'
import IdeaFilters from './components/IdeaFilters'
import { getSimilarity } from '../../utils/ideaBrowse'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'latest',   label: '최신순'   },
  { key: 'likes',    label: '좋아요순' },
  { key: 'views',    label: '조회순'   },
  { key: 'comments', label: '댓글순'   },
]

export default function IdeaBrowse() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, pageBg, filterBg, filterActiveBg, similar } = getIdeaTheme(isDarkMode)

  // ─── 필터 상태 ──────────────────────────────────────────────
  const [search,           setSearch]           = useState('')
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | ''>('')
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDept,     setSelectedDept]     = useState('')
  const [selectedStatus,   setSelectedStatus]   = useState<IdeaStatus | ''>('')
  const [sortBy,           setSortBy]           = useState<SortKey>('latest')
  const [showSimilarOnly,  setShowSimilarOnly]  = useState(false)
  const [showMyOnly,       setShowMyOnly]       = useState(false)
  const [selectedIdea,     setSelectedIdea]     = useState<IdeaItem | null>(null)
  const [isLoading,        setIsLoading]        = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const deptOptions = selectedDivision ? (DEPT_BY_DIVISION[selectedDivision] ?? []) : []

  const handleDivisionChange = (e: SelectChangeEvent) => {
    setSelectedDivision(e.target.value)
    setSelectedDept('')
  }

  // ─── 유사도 맵 (사전 계산) ──────────────────────────────────
  const similarityMap = useMemo(() => {
    const map = new Map<number, string[]>()
    IDEAS.forEach((idea) => map.set(idea.id, getSimilarity(idea)))
    return map
  }, [])

  // ─── 필터링 + 정렬 ──────────────────────────────────────────
  const filteredIdeas = useMemo(() => {
    const q = search.trim().toLowerCase()

    const filtered = IDEAS.filter((idea) => {
      if (showMyOnly && idea.author !== MY_AUTHOR) return false
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

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'likes':    return b.likes    - a.likes
        case 'views':    return b.views    - a.views
        case 'comments': return b.comments - a.comments
        case 'latest':   return b.submittedAt.localeCompare(a.submittedAt)
        default:         return 0
      }
    })
  }, [search, selectedCategory, selectedDivision, selectedDept, selectedStatus, sortBy, showSimilarOnly, showMyOnly, similarityMap])

  const similarCount = useMemo(
    () => IDEAS.filter((i) => (similarityMap.get(i.id)?.length ?? 0) > 0).length,
    [similarityMap],
  )

  const myCount = useMemo(
    () => IDEAS.filter((i) => i.author === MY_AUTHOR).length,
    [],
  )

  const hasFilter = !!(search || selectedCategory || selectedDivision || selectedDept || selectedStatus || showSimilarOnly || showMyOnly)

  const clearAll = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedDivision('')
    setSelectedDept('')
    setSelectedStatus('')
    setShowSimilarOnly(false)
    setShowMyOnly(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: pageBg, pb: 6 }}>
      {/* ── 헤더 + 필터 ─────────────────────────────────────── */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, md: 4 }, pb: 3,
          borderBottom: `1px solid ${borderColor}`,
          bgcolor: filterBg,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          {/* 타이틀 + 통계 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  background: `linear-gradient(135deg, ${ideaAccent.primary} 0%, ${ideaAccent.violet} 50%, ${ideaAccent.purple} 100%)`,
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
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.primary, lineHeight: 1 }}>{IDEAS.length}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>전체</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.success, lineHeight: 1 }}>{myCount}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>내 상상</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.similar, lineHeight: 1 }}>{similarCount}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>내 유사</Typography>
              </Box>
            </Box>
          </Box>

          <IdeaFilters
            isDarkMode={isDarkMode}
            search={search}
            selectedCategory={selectedCategory}
            selectedDivision={selectedDivision}
            selectedDept={selectedDept}
            selectedStatus={selectedStatus}
            showSimilarOnly={showSimilarOnly}
            showMyOnly={showMyOnly}
            similarCount={similarCount}
            myCount={myCount}
            hasFilter={hasFilter}
            deptOptions={deptOptions}
            onSearchChange={setSearch}
            onCategoryChange={setSelectedCategory}
            onDivisionChange={handleDivisionChange}
            onDeptChange={setSelectedDept}
            onStatusChange={setSelectedStatus}
            onSimilarToggle={() => setShowSimilarOnly((v) => !v)}
            onMyOnlyToggle={() => setShowMyOnly((v) => !v)}
            onClearAll={clearAll}
          />
        </Box>
      </Box>

      {/* ── 결과 행 (건수 + 정렬) ───────────────────────────── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1.75, maxWidth: 1280, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: textSecondary }}>
              총{' '}
              <Box component="span" sx={{ fontWeight: 700, color: ideaAccent.primary }}>
                {filteredIdeas.length}
              </Box>
              건
            </Typography>
            {showMyOnly && (
              <Chip
                label="내 상상만"
                size="small"
                onDelete={() => setShowMyOnly(false)}
                sx={{
                  bgcolor: isDarkMode ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)',
                  color: ideaAccent.success,
                  border: `1px solid rgba(16,185,129,0.35)`, fontSize: '0.72rem', fontWeight: 600,
                  '& .MuiChip-deleteIcon': { color: ideaAccent.success, '&:hover': { color: ideaAccent.danger } },
                }}
              />
            )}
            {showSimilarOnly && (
              <Chip
                label="내 유사 아이디어"
                size="small"
                onDelete={() => setShowSimilarOnly(false)}
                sx={{
                  bgcolor: similar.badgeBg, color: similar.textColor,
                  border: `1px solid ${similar.badgeBorder}`, fontSize: '0.72rem', fontWeight: 600,
                  '& .MuiChip-deleteIcon': { color: similar.textColor, '&:hover': { color: ideaAccent.warning } },
                }}
              />
            )}
          </Box>

          {/* 정렬 버튼 */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {SORT_OPTIONS.map(({ key, label }) => (
              <Box
                key={key}
                onClick={() => setSortBy(key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSortBy(key) }}
                sx={{
                  px: 1.25, py: 0.5, borderRadius: 1.5, cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: sortBy === key ? 700 : 400,
                  color: sortBy === key ? ideaAccent.primary : textSecondary,
                  bgcolor: sortBy === key ? filterActiveBg : 'transparent',
                  border: `1px solid ${sortBy === key ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
                  transition: 'all 0.12s', outline: 'none',
                  '&:hover': { color: ideaAccent.primary },
                  '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── 카드 그리드 ─────────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <LoadingSpinner size={44} text="아이디어를 불러오는 중..." />
          </Box>
        ) : filteredIdeas.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
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
                  bgcolor: filterActiveBg, border: '1px solid rgba(99,102,241,0.2)',
                  color: ideaAccent.primary, fontSize: '0.83rem', fontWeight: 600,
                  transition: 'all 0.15s', outline: 'none',
                  '&:hover': { bgcolor: 'rgba(99,102,241,0.14)' },
                  '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
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
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isDarkMode={isDarkMode}
                similarTitles={similarityMap.get(idea.id) ?? []}
                showSimilar={showSimilarOnly || true}
                onClick={() => setSelectedIdea(idea)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* ── 상세 다이얼로그 ──────────────────────────────────── */}
      <IdeaDetailDialog
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        isDarkMode={isDarkMode}
        similarTitles={selectedIdea ? (similarityMap.get(selectedIdea.id) ?? []) : []}
      />
    </Box>
  )
}