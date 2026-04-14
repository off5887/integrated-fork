// src/routes/ideaBrowse/IdeaBrowse.tsx
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Box, Chip, Divider, SelectChangeEvent, Typography } from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrgUsersTree } from '@/api/queries/useUsers'
import { useIdeaList, useIdeaStatuses, useMyIdeas } from '@/api/queries/useIdeas'
import { useCategories } from '@/api/queries/useCategories'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import type { IdeaItem, IdeaStatus, SortKey } from '@/api/types/ideaBrowse'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PageHeader from '@/components/ui/PageHeader'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useThemeMode } from '@/context/ThemeContext'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getIdeaTheme, ideaAccent } from '@/theme/ideaBrowseTheme'
import IdeaCard from './components/IdeaCard'
import IdeaDetailDialog from './components/IdeaDetailDialog'
import IdeaFilters from './components/IdeaFilters'

const PAGE_SIZE = 20

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'latest',   label: '최신순'   },
  { key: 'likes',    label: '좋아요순' },
  { key: 'views',    label: '조회순'   },
  { key: 'comments', label: '댓글순'   },
]

export default function IdeaBrowse() {
  const { isDarkMode } = useThemeMode()
  const user = useCurrentUser()
  const queryClient = useQueryClient()
  const { data: ideas = [], isLoading, isError } = useIdeaList()
  const { data: orgTree } = useOrgUsersTree()
  const { data: statusOptions = [] } = useIdeaStatuses()
  const { categories: categoryOptions } = useCategories()
  const { data: myIdeasPage } = useMyIdeas()
  const myIdeaIds = useMemo(
    () => new Set((myIdeasPage?.content ?? []).map((i) => i.ideaId)),
    [myIdeasPage],
  )
  const {
    textPrimary, textSecondary, borderColor, pageBg, filterBg, filterActiveBg,
    similar, statsBg, statsBorder, myOnlyActiveBg,
    pageBtnBg, pageBtnBorder, pageBtnColor, pageBtnHoverBg, pageBtnHoverBorder,
    pageActiveBg, pageActiveColor, pageActiveShadow, pageEllipsisColor,
  } = getIdeaTheme(isDarkMode)

  // ─── 필터 상태 ──────────────────────────────────────────────
  const [search,           setSearch]           = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')  // CategoryOption.id (categoryId string)
  const [selectedBizArea,  setSelectedBizArea]  = useState('')
  const [selectedDept,     setSelectedDept]     = useState('')
  const [selectedStatus,   setSelectedStatus]   = useState<IdeaStatus | ''>('')
  const [sortBy,           setSortBy]           = useState<SortKey>('latest')
  const [showSimilarOnly,  setShowSimilarOnly]  = useState(false)
  const [showMyOnly,       setShowMyOnly]       = useState(false)
  const [page,             setPage]             = useState(1)
  const [selectedIdea,     setSelectedIdea]     = useState<IdeaItem | null>(null)
  const [deleteTarget,     setDeleteTarget]     = useState<IdeaItem | null>(null)
  const navigate = useNavigate()

  const bizAreaOptions = useMemo(() => (orgTree ?? []).map((b) => b.bizAreaNm), [orgTree])
  const deptByBizArea = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const b of (orgTree ?? [])) {
      map[b.bizAreaNm] = b.teams.map((t) => t.deptNm)
    }
    return map
  }, [orgTree])
  const deptOptions = selectedBizArea ? (deptByBizArea[selectedBizArea] ?? []) : []

  const handleEdit = (idea: IdeaItem) => {
    setSelectedIdea(null)
    navigate('/newIdea', { state: { editIdea: idea } })
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    // 낙관적 업데이트: 캐시에서 즉시 제거
    queryClient.setQueryData<IdeaItem[]>(queryKeys.ideas.list(), (old) =>
      old?.filter((i) => i.id !== deleteTarget.id) ?? [],
    )
    setDeleteTarget(null)
    setSelectedIdea(null)
  }

  const handleBizAreaChange = (e: SelectChangeEvent) => {
    setSelectedBizArea(e.target.value)
    setSelectedDept('')
  }

  // 필터·정렬이 바뀌면 1페이지로 리셋
  useEffect(() => { setPage(1) }, [search, selectedCategory, selectedBizArea, selectedDept, selectedStatus, sortBy, showSimilarOnly, showMyOnly])

  // ─── 필터링 + 정렬 ──────────────────────────────────────────
  const filteredIdeas = useMemo(() => {
    const q = search.trim().toLowerCase()

    const filtered = ideas.filter((idea) => {
      if (showMyOnly && !myIdeaIds.has(idea.id)) return false
      if (selectedCategory && String(idea.categoryId) !== selectedCategory) return false
      if (selectedBizArea && idea.bizArea !== selectedBizArea) return false
      if (selectedDept && idea.department !== selectedDept) return false
      if (selectedStatus && idea.status !== selectedStatus) return false
      // showSimilarOnly 필터는 IdeaCard의 API 결과 기반으로 카드에서 처리
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
  }, [ideas, search, selectedCategory, selectedBizArea, selectedDept, selectedStatus, sortBy, showMyOnly, myIdeaIds])

  const totalPages = Math.ceil(filteredIdeas.length / PAGE_SIZE)
  const pagedIdeas = useMemo(
    () => filteredIdeas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredIdeas, page],
  )

  const myCount = useMemo(
    () => myIdeasPage?.totalElements ?? ideas.filter((i) => myIdeaIds.has(i.id)).length,
    [myIdeasPage, ideas, myIdeaIds],
  )

  const hasFilter = !!(search || selectedCategory || selectedBizArea || selectedDept || selectedStatus || showSimilarOnly || showMyOnly)

  const clearAll = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedBizArea('')
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
          px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 5 }, pb: { xs: 4, md: 4.5 },
          borderBottom: `1px solid ${borderColor}`,
          bgcolor: filterBg,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          {/* 타이틀 + 통계 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <PageHeader
              icon={AutoStoriesIcon}
              title="상상 보기"
              subtitle="모든 아이디어를 탐색하고 내 아이디어와 유사한 건을 확인해 보세요"
            />
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2, py: 1, borderRadius: 2,
                bgcolor: statsBg,
                border: `1px solid ${statsBorder}`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.primary, lineHeight: 1 }}>{ideas.length}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>전체</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.success, lineHeight: 1 }}>{myCount}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>내 상상</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: ideaAccent.similar, lineHeight: 1 }}>—</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, lineHeight: 1.3 }}>내 유사</Typography>
              </Box>
            </Box>
          </Box>

          <IdeaFilters
            search={search}
            selectedCategory={selectedCategory}
            selectedBizArea={selectedBizArea}
            selectedDept={selectedDept}
            selectedStatus={selectedStatus}
            showSimilarOnly={showSimilarOnly}
            showMyOnly={showMyOnly}
            similarCount={0}
            myCount={myCount}
            hasFilter={hasFilter}
            categoryOptions={categoryOptions}
            bizAreaOptions={bizAreaOptions}
            deptOptions={deptOptions}
            statusOptions={statusOptions}
            onSearchChange={setSearch}
            onCategoryChange={setSelectedCategory}
            onBizAreaChange={handleBizAreaChange}
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
                  bgcolor: myOnlyActiveBg,
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
        ) : isError ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
            <Box sx={{ fontSize: '3rem', lineHeight: 1 }}>⚠️</Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: textPrimary }}>아이디어를 불러오지 못했습니다</Typography>
            <Typography sx={{ fontSize: '0.85rem', color: textSecondary, textAlign: 'center', maxWidth: 300 }}>
              네트워크 상태를 확인하거나 잠시 후 다시 시도해 주세요
            </Typography>
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
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {pagedIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  showSimilarOnly={showSimilarOnly}
                  onClick={() => setSelectedIdea(idea)}
                />
              ))}
            </Box>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.75, mt: 5, mb: 1 }}>
                {/* 이전 버튼 */}
                <Box
                  onClick={() => { if (page > 1) { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                  role="button"
                  tabIndex={0}
                  aria-label="이전 페이지"
                  onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && page > 1) { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                  sx={{
                    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 2, border: `1px solid ${pageBtnBorder}`, bgcolor: pageBtnBg,
                    color: page === 1 ? pageEllipsisColor : pageBtnColor,
                    cursor: page === 1 ? 'default' : 'pointer',
                    opacity: page === 1 ? 0.4 : 1,
                    fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.15s', outline: 'none',
                    '&:hover': page > 1 ? { bgcolor: pageBtnHoverBg, borderColor: pageBtnHoverBorder, color: ideaAccent.primary } : {},
                    '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
                  }}
                >
                  ‹
                </Box>

                {/* 페이지 번호 */}
                {(() => {
                  const items: (number | '…')[] = []
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) items.push(i)
                  } else {
                    items.push(1)
                    if (page > 3) items.push('…')
                    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) items.push(i)
                    if (page < totalPages - 2) items.push('…')
                    items.push(totalPages)
                  }
                  return items.map((item, idx) =>
                    item === '…' ? (
                      <Box key={`ellipsis-${idx}`} sx={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pageEllipsisColor, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                        ···
                      </Box>
                    ) : (
                      <Box
                        key={item}
                        onClick={() => { setPage(item); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        role="button"
                        tabIndex={0}
                        aria-label={`${item}페이지`}
                        aria-current={page === item ? 'page' : undefined}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setPage(item); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                        sx={{
                          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 2, cursor: 'pointer', outline: 'none', transition: 'all 0.18s',
                          fontSize: '0.83rem', fontWeight: page === item ? 700 : 500,
                          ...(page === item
                            ? {
                                bgcolor: pageActiveBg,
                                color: pageActiveColor,
                                border: `1px solid ${pageActiveBg}`,
                                boxShadow: pageActiveShadow,
                                transform: 'translateY(-1px)',
                              }
                            : {
                                bgcolor: pageBtnBg,
                                color: pageBtnColor,
                                border: `1px solid ${pageBtnBorder}`,
                                '&:hover': { bgcolor: pageBtnHoverBg, borderColor: pageBtnHoverBorder, color: ideaAccent.primary },
                              }),
                          '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
                        }}
                      >
                        {item}
                      </Box>
                    ),
                  )
                })()}

                {/* 다음 버튼 */}
                <Box
                  onClick={() => { if (page < totalPages) { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                  role="button"
                  tabIndex={0}
                  aria-label="다음 페이지"
                  onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && page < totalPages) { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                  sx={{
                    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 2, border: `1px solid ${pageBtnBorder}`, bgcolor: pageBtnBg,
                    color: page === totalPages ? pageEllipsisColor : pageBtnColor,
                    cursor: page === totalPages ? 'default' : 'pointer',
                    opacity: page === totalPages ? 0.4 : 1,
                    fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.15s', outline: 'none',
                    '&:hover': page < totalPages ? { bgcolor: pageBtnHoverBg, borderColor: pageBtnHoverBorder, color: ideaAccent.primary } : {},
                    '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
                  }}
                >
                  ›
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* ── 상세 다이얼로그 ──────────────────────────────────── */}
      <IdeaDetailDialog
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        ideaId={selectedIdea?.id ?? null}
        isOwner={selectedIdea?.submittedBy === (user?.employeeId ?? '')}
        onEdit={() => selectedIdea && handleEdit(selectedIdea)}
        onDelete={() => selectedIdea && setDeleteTarget(selectedIdea)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="아이디어 삭제"
        message={`"${deleteTarget?.title}" 아이디어를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="error"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  )
}