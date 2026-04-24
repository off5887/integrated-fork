// src/routes/ideaBrowse/components/IdeaFilters.tsx
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { useMemo, useState, useEffect } from 'react'
import type { IdeaStatus } from '@/api/types/ideaBrowse'
import type { CategoryOption } from '@/api/types/idea'
import { useIdeaBrowseTheme, ideaAccent } from '@/theme/ideaBrowseTheme'

interface IdeaFiltersProps {
  search: string
  selectedCategory: string
  selectedBizArea: string
  selectedDept: string
  selectedStatus: IdeaStatus | ''
  selectedType: 'idea' | 'completed' | ''
  startDate: string
  endDate: string
  showSimilarOnly: boolean
  showMyOnly: boolean
  similarCount: number
  myCount: number
  quickCounts: { all: number; idea: number; completed: number; approved: number; rejected: number }
  hasFilter: boolean
  bizAreaOptions: string[]
  deptOptions: string[]
  statusOptions: string[]
  onSearchChange: (v: string) => void
  categoryOptions: CategoryOption[]
  onCategoryChange: (v: string) => void
  onBizAreaChange: (e: SelectChangeEvent) => void
  onDeptChange: (v: string) => void
  onStatusChange: (v: IdeaStatus | '') => void
  onTypeChange: (v: 'idea' | 'completed' | '') => void
  onStartDateChange: (v: string) => void
  onEndDateChange: (v: string) => void
  onSimilarToggle: () => void
  onMyOnlyToggle: () => void
  onClearAll: () => void
}

export default function IdeaFilters({
  search,
  selectedCategory,
  selectedBizArea,
  selectedDept,
  selectedStatus,
  selectedType,
  startDate,
  endDate,
  showSimilarOnly,
  showMyOnly,
  similarCount,
  myCount,
  quickCounts,
  hasFilter,
  bizAreaOptions,
  deptOptions,
  statusOptions: _statusOptions,
  onSearchChange,
  categoryOptions,
  onCategoryChange,
  onBizAreaChange,
  onDeptChange,
  onStatusChange,
  onTypeChange,
  onStartDateChange,
  onEndDateChange,
  onSimilarToggle,
  onMyOnlyToggle,
  onClearAll,
}: IdeaFiltersProps) {
  const {
    textPrimary, textSecondary, borderColor,
    filterChipBg,
    similar, inputBg, myOnlyActiveBg, myOnlyCountBg, cardBg,
  } = useIdeaBrowseTheme()

  const [similarHelpAnchor, setSimilarHelpAnchor] = useState<HTMLElement | null>(null)
  const [inputValue, setInputValue] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(inputValue), 300)
    return () => clearTimeout(timer)
  }, [inputValue, onSearchChange])

  const handleClearAll = () => { setInputValue(''); onClearAll() }

  const selectSx = useMemo(() => ({
    borderRadius: 2,
    fontSize: '0.83rem',
    color: textPrimary,
    bgcolor: inputBg,
    '& .MuiOutlinedInput-notchedOutline': { borderColor },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: ideaAccent.accentHoverBorder },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ideaAccent.primary },
    '& .MuiSelect-icon': { color: textSecondary },
    '& .MuiSelect-select': { color: textPrimary, WebkitTextFillColor: textPrimary },
  }), [textPrimary, inputBg, borderColor, textSecondary])

  // 모든 섹션에 동일하게 적용되는 카드 래퍼 스타일
  const sectionCard = {
    p: 1.5,
    border: `1px solid ${borderColor}`,
    borderRadius: 2,
    bgcolor: filterChipBg,
    height: '100%',
    boxSizing: 'border-box' as const,
  }

  // 섹션 레이블
  const SL = ({ label }: { label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
      <Box sx={{ width: 3, height: 12, borderRadius: 9999, bgcolor: ideaAccent.primary, flexShrink: 0 }} />
      <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: textSecondary }}>
        {label}
      </Typography>
    </Box>
  )

  // 퀵필터 상태
  const activeQuick =
    selectedType === 'idea'      ? 'idea'      :
    selectedType === 'completed' ? 'completed' :
    selectedStatus === '승인'    ? 'approved'  :
    selectedStatus === '반려'    ? 'rejected'  : ''

  const quickTabs = [
    { key: '',          label: '전체',         color: ideaAccent.primary, count: quickCounts.all       },
    { key: 'idea',      label: '아이디어 제출', color: ideaAccent.primary, count: quickCounts.idea      },
    { key: 'completed', label: '실행완료 제출', color: '#0ea5e9',          count: quickCounts.completed },
    { key: 'approved',  label: '승인',          color: ideaAccent.success, count: quickCounts.approved  },
    { key: 'rejected',  label: '반려',          color: ideaAccent.danger,  count: quickCounts.rejected  },
  ]

  const handleQuick = (key: string) => {
    if (key === 'idea')           { onTypeChange('idea');      onStatusChange('') }
    else if (key === 'completed') { onTypeChange('completed'); onStatusChange('') }
    else if (key === 'approved')  { onTypeChange('');          onStatusChange('승인') }
    else if (key === 'rejected')  { onTypeChange('');          onStatusChange('반려') }
    else                          { onTypeChange('');          onStatusChange('') }
  }

  return (
    <>
      {/* ── 검색창 ── */}
      <TextField
        size="small"
        placeholder="제목, 문제점, 해결방안, 작성자, 부서로 검색..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          htmlInput: { 'aria-label': '아이디어 검색' },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
              </InputAdornment>
            ),
            endAdornment: inputValue ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="검색어 지우기" onClick={() => { setInputValue(''); onSearchChange('') }} sx={{ color: textSecondary }}>
                  <CloseIcon sx={{ fontSize: '0.9rem' }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5, backgroundColor: inputBg, fontSize: '0.875rem', height: 44,
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor: ideaAccent.accentHoverBorder },
            '&.Mui-focused fieldset': { borderColor: ideaAccent.primary },
          },
          '& .MuiInputBase-input': { color: textPrimary, WebkitTextFillColor: textPrimary },
        }}
      />

      {/* ── 2×2 필터 그리드 ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          columnGap: 1.5,
          rowGap: 1.5,
          alignItems: 'stretch',
          mt: 1.5,
        }}
      >
        {/* [1,1] 현황 */}
        <Box sx={sectionCard}>
          <SL label="현황" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
            {quickTabs.map((tab, idx) => {
              const isActive = activeQuick === tab.key
              return (
                <Box key={tab.key} sx={{ display: 'flex', alignItems: 'center' }}>
                  {idx > 0 && <Divider orientation="vertical" flexItem sx={{ borderColor, my: 0.5 }} />}
                  <Box
                    onClick={() => handleQuick(tab.key)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleQuick(tab.key) }}
                    aria-pressed={isActive}
                    sx={{
                      px: 1.75, py: 0.75, textAlign: 'center', cursor: 'pointer', userSelect: 'none',
                      borderRadius: 1.5,
                      bgcolor: isActive ? `${tab.color}14` : 'transparent',
                      transition: 'all 0.15s ease', outline: 'none', minWidth: 64,
                      '&:hover': { bgcolor: `${tab.color}10` },
                      '&:focus-visible': { outline: `2px solid ${tab.color}`, outlineOffset: -2 },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: isActive ? tab.color : textPrimary, lineHeight: 1, mb: 0.35 }}>
                      {tab.count}
                    </Typography>
                    <Typography sx={{ fontSize: '0.67rem', color: isActive ? tab.color : textSecondary, lineHeight: 1.2, fontWeight: isActive ? 700 : 400, whiteSpace: 'nowrap' }}>
                      {tab.label}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* [1,2] 카테고리 */}
        <Box sx={sectionCard}>
          <SL label="카테고리" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
            {/* 전체 */}
            <Box
              onClick={() => onCategoryChange('')}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCategoryChange('') }}
              aria-pressed={!selectedCategory}
              sx={{
                px: 1.75, py: 0.75, textAlign: 'center', cursor: 'pointer', userSelect: 'none',
                borderRadius: 1.5, outline: 'none', minWidth: 52,
                bgcolor: !selectedCategory ? `${ideaAccent.primary}14` : 'transparent',
                transition: 'all 0.15s ease',
                '&:hover': { bgcolor: `${ideaAccent.primary}10` },
                '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: -2 },
              }}
            >
              <Typography sx={{ fontSize: '1rem', lineHeight: 1, mb: 0.35 }}>📋</Typography>
              <Typography sx={{ fontSize: '0.67rem', fontWeight: !selectedCategory ? 700 : 400, color: !selectedCategory ? ideaAccent.primary : textSecondary, whiteSpace: 'nowrap' }}>
                전체
              </Typography>
            </Box>

            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Divider orientation="vertical" flexItem sx={{ borderColor, my: 0.5 }} />
                  <Box
                    onClick={() => onCategoryChange(isActive ? '' : cat.id)}
                    role="button" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCategoryChange(isActive ? '' : cat.id) }}
                    aria-pressed={isActive}
                    sx={{
                      px: 1.75, py: 0.75, textAlign: 'center', cursor: 'pointer', userSelect: 'none',
                      borderRadius: 1.5, outline: 'none', minWidth: 52,
                      bgcolor: isActive ? `${cat.color}14` : 'transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': { bgcolor: `${cat.color}10` },
                      '&:focus-visible': { outline: `2px solid ${cat.color}`, outlineOffset: -2 },
                    }}
                  >
                    <Typography sx={{ fontSize: '1rem', lineHeight: 1, mb: 0.35 }}>{cat.emoji}</Typography>
                    <Typography sx={{ fontSize: '0.67rem', fontWeight: isActive ? 700 : 400, color: isActive ? cat.color : textSecondary, whiteSpace: 'nowrap' }}>
                      {cat.label}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* [2,1] 조직 및 기간 */}
        <Box sx={sectionCard}>
          <SL label="조직 및 기간" />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedBizArea} onChange={onBizAreaChange} displayEmpty
                inputProps={{ 'aria-label': '사업소 선택' }} IconComponent={ExpandMoreIcon} sx={selectSx}
                renderValue={(v) => (
                  <Typography sx={{ fontSize: '0.83rem', color: v ? textPrimary : textSecondary, WebkitTextFillColor: v ? textPrimary : textSecondary }}>
                    {v || '사업소 전체'}
                  </Typography>
                )}
              >
                <MenuItem value=""><Typography sx={{ fontSize: '0.83rem' }}>사업소 전체</Typography></MenuItem>
                {bizAreaOptions.map((d) => <MenuItem key={d} value={d}><Typography sx={{ fontSize: '0.83rem' }}>{d}</Typography></MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }} disabled={!selectedBizArea}>
              <Select
                value={selectedDept} onChange={(e) => onDeptChange(e.target.value)} displayEmpty
                inputProps={{ 'aria-label': '부서 선택' }} IconComponent={ExpandMoreIcon} sx={selectSx}
                renderValue={(v) => (
                  <Typography sx={{ fontSize: '0.83rem', color: v ? textPrimary : textSecondary, WebkitTextFillColor: v ? textPrimary : textSecondary }}>
                    {v || '부서 전체'}
                  </Typography>
                )}
              >
                <MenuItem value=""><Typography sx={{ fontSize: '0.83rem' }}>부서 전체</Typography></MenuItem>
                {deptOptions.map((d) => <MenuItem key={d} value={d}><Typography sx={{ fontSize: '0.83rem' }}>{d}</Typography></MenuItem>)}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 1.5, height: 40,
                border: `1px solid ${(startDate || endDate) ? ideaAccent.primary : borderColor}`,
                borderRadius: 2, bgcolor: (startDate || endDate) ? `${ideaAccent.primary}08` : inputBg,
                transition: 'all 0.15s', flexShrink: 0,
              }}
            >
              <CalendarMonthOutlinedIcon sx={{ fontSize: '0.95rem', color: (startDate || endDate) ? ideaAccent.primary : textSecondary, flexShrink: 0 }} />
              <input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.8rem', color: startDate ? 'inherit' : 'transparent', width: 110, cursor: 'pointer' }} />
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>~</Typography>
              <input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.8rem', color: endDate ? 'inherit' : 'transparent', width: 110, cursor: 'pointer' }} />
              {(startDate || endDate) && (
                <IconButton size="small" onClick={() => { onStartDateChange(''); onEndDateChange('') }} sx={{ p: 0.25, color: textSecondary, '&:hover': { color: ideaAccent.danger } }}>
                  <CloseIcon sx={{ fontSize: '0.8rem' }} />
                </IconButton>
              )}
            </Box>

            {hasFilter && (
              <Box
                onClick={handleClearAll} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClearAll() }}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  px: 1.25, height: 40, borderRadius: 2, cursor: 'pointer',
                  border: `1px solid ${borderColor}`, color: textSecondary,
                  transition: 'all 0.15s', outline: 'none',
                  '&:hover': { borderColor: ideaAccent.danger, color: ideaAccent.danger },
                  '&:focus-visible': { outline: `2px solid ${ideaAccent.danger}`, outlineOffset: 2 },
                }}
              >
                <CloseIcon sx={{ fontSize: '0.8rem' }} />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 500 }}>초기화</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* [2,2] 내 아이디어 */}
        <Box sx={sectionCard}>
          <SL label="내 아이디어" />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* 내 상상만 — height: 40 으로 드롭다운과 통일 */}
            <Tooltip title={`내가 제출한 아이디어 ${myCount}건만 보기`} arrow>
              <Box
                onClick={onMyOnlyToggle} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onMyOnlyToggle() }}
                aria-pressed={showMyOnly}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  px: 1.5, height: 40, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                  border: `1px solid ${showMyOnly ? ideaAccent.myOnlyActiveBorder : borderColor}`,
                  bgcolor: showMyOnly ? myOnlyActiveBg : inputBg,
                  transition: 'all 0.15s ease', outline: 'none',
                  '&:hover': { borderColor: ideaAccent.myOnlyActiveBorder, bgcolor: myOnlyActiveBg },
                  '&:focus-visible': { outline: `2px solid ${ideaAccent.success}`, outlineOffset: 2 },
                }}
              >
                <Box component="span" sx={{ fontSize: '0.85rem', lineHeight: 1 }}>✨</Box>
                <Typography sx={{ fontSize: '0.83rem', fontWeight: showMyOnly ? 700 : 500, color: showMyOnly ? ideaAccent.success : textSecondary, whiteSpace: 'nowrap' }}>
                  내 상상만
                </Typography>
                {myCount > 0 && (
                  <Box sx={{ minWidth: 20, height: 20, borderRadius: '50%', bgcolor: showMyOnly ? ideaAccent.success : myOnlyCountBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: showMyOnly ? '#fff' : ideaAccent.success, lineHeight: 1 }}>
                      {myCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Tooltip>

            {/* 내 유사 아이디어만 — height: 40 으로 드롭다운과 통일 */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title={`내가 제출한 아이디어와 유사한 건 ${similarCount}개`} arrow>
                <Box
                  onClick={onSimilarToggle} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSimilarToggle() }}
                  aria-pressed={showSimilarOnly}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.75,
                    px: 1.5, height: 40, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                    border: `1px solid ${showSimilarOnly ? similar.border : borderColor}`,
                    bgcolor: showSimilarOnly ? similar.badgeBg : inputBg,
                    transition: 'all 0.15s ease', outline: 'none',
                    '&:hover': { borderColor: similar.badgeBorder, bgcolor: similar.badgeBg },
                    '&:focus-visible': { outline: `2px solid ${ideaAccent.similar}`, outlineOffset: 2 },
                  }}
                >
                  <WarningAmberIcon sx={{ fontSize: '0.9rem', color: showSimilarOnly ? ideaAccent.similar : textSecondary }} />
                  <Typography sx={{ fontSize: '0.83rem', fontWeight: showSimilarOnly ? 700 : 500, color: showSimilarOnly ? ideaAccent.similar : textSecondary, whiteSpace: 'nowrap' }}>
                    내 유사 아이디어만
                  </Typography>
                  {similarCount > 0 && (
                    <Box sx={{ minWidth: 20, height: 20, borderRadius: '50%', bgcolor: showSimilarOnly ? ideaAccent.similar : similar.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: showSimilarOnly ? '#fff' : ideaAccent.similar, lineHeight: 1 }}>
                        {similarCount}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Tooltip>
              <Tooltip title="유사 아이디어 판단 기준 보기" arrow>
                <IconButton size="small" aria-label="유사 아이디어 판단 기준 도움말"
                  onClick={(e) => setSimilarHelpAnchor(e.currentTarget)}
                  sx={{ p: 0.35, color: textSecondary, opacity: 0.55, '&:hover': { opacity: 1, color: ideaAccent.similar } }}
                >
                  <HelpOutlineIcon sx={{ fontSize: '0.95rem' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 유사 아이디어 판단 기준 팝오버 */}
      <Popover
        open={Boolean(similarHelpAnchor)} anchorEl={similarHelpAnchor}
        onClose={() => setSimilarHelpAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 0.75, borderRadius: 2.5, maxWidth: 320, bgcolor: cardBg, border: `1px solid ${similar.badgeBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' } } }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.75 }}>
            <WarningAmberIcon sx={{ fontSize: '1rem', color: ideaAccent.similar, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: ideaAccent.similar, letterSpacing: '-0.01em' }}>
              유사 아이디어 판단 기준
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: textSecondary, mb: 1.5, lineHeight: 1.6 }}>
            아래 조건을 <Box component="span" sx={{ fontWeight: 700, color: textPrimary }}>모두 만족</Box>해야 유사 아이디어로 표시됩니다.
          </Typography>
          {[
            { emoji: '📂', title: '같은 카테고리', desc: '내 아이디어와 동일한 카테고리에 속한 제안' },
            { emoji: '🔤', title: '제목 키워드 1개 이상 일치', desc: '내 아이디어 제목의 핵심 단어가 상대방 제목에 포함됨' },
            { emoji: '📝', title: '내용 키워드 2개 이상 일치', desc: '같은 핵심 단어가 상대방의 문제점 또는 해결대안에도 포함됨' },
            { emoji: '🙈', title: '본인 제외', desc: '내가 직접 제출한 아이디어는 표시되지 않음' },
          ].map(({ emoji, title, desc }) => (
            <Box key={title} sx={{ display: 'flex', gap: 1, mb: 1.25, alignItems: 'flex-start' }}>
              <Box component="span" sx={{ fontSize: '0.85rem', flexShrink: 0, mt: 0.1 }}>{emoji}</Box>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: textPrimary, lineHeight: 1.4 }}>{title}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: textSecondary, lineHeight: 1.5 }}>{desc}</Typography>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 1.5, borderColor: similar.badgeBorder }} />
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: textPrimary, mb: 0.75 }}>🔍 핵심 단어 추출 방식</Typography>
          {['제목을 띄어쓰기 기준으로 분리', '2글자 이상이고, 조사·접속사(이, 가, 은, 는, 의, 를, 로, 에서… 등)는 제외', '최대 3개 단어를 핵심 키워드로 사용'].map((item) => (
            <Box key={item} sx={{ display: 'flex', gap: 0.75, mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.68rem', color: ideaAccent.similar, flexShrink: 0, mt: 0.1 }}>•</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: textSecondary, lineHeight: 1.5 }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  )
}
