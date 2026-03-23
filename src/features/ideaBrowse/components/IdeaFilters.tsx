// src/routes/ideaBrowse/components/IdeaFilters.tsx
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Box,
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
import { useState, useEffect } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { CATEGORY_CONFIG, DIVISIONS } from '@/api/mock/ideaBrowse'
import type { IdeaCategory, IdeaStatus } from '@/api/types/ideaBrowse'
import { getIdeaTheme, ideaAccent, IDEA_STATUS_CONFIG } from '@/theme/ideaBrowseTheme'

interface IdeaFiltersProps {
  search: string
  selectedCategory: IdeaCategory | ''
  selectedDivision: string
  selectedDept: string
  selectedStatus: IdeaStatus | ''
  showSimilarOnly: boolean
  showMyOnly: boolean
  similarCount: number
  myCount: number
  hasFilter: boolean
  deptOptions: string[]
  onSearchChange: (v: string) => void
  onCategoryChange: (v: IdeaCategory | '') => void
  onDivisionChange: (e: SelectChangeEvent) => void
  onDeptChange: (v: string) => void
  onStatusChange: (v: IdeaStatus | '') => void
  onSimilarToggle: () => void
  onMyOnlyToggle: () => void
  onClearAll: () => void
}

export default function IdeaFilters({
  search,
  selectedCategory,
  selectedDivision,
  selectedDept,
  selectedStatus,
  showSimilarOnly,
  showMyOnly,
  similarCount,
  myCount,
  hasFilter,
  deptOptions,
  onSearchChange,
  onCategoryChange,
  onDivisionChange,
  onDeptChange,
  onStatusChange,
  onSimilarToggle,
  onMyOnlyToggle,
  onClearAll,
}: IdeaFiltersProps) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, filterActiveBg, filterActiveBorder, filterChipBg, similar, inputBg, myOnlyActiveBg, myOnlyCountBg } = getIdeaTheme(isDarkMode)

  // 검색 debounce: 로컬 inputValue를 300ms 지연 후 부모에 전달
  const [inputValue, setInputValue] = useState(search)
  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(inputValue), 300)
    return () => clearTimeout(timer)
  }, [inputValue, onSearchChange])

  const handleClearAll = () => {
    setInputValue('')
    onClearAll()
  }

  const selectSx = {
    borderRadius: 2,
    fontSize: '0.83rem',
    color: textPrimary,
    bgcolor: inputBg,
    '& .MuiOutlinedInput-notchedOutline': { borderColor },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.35)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ideaAccent.primary },
    '& .MuiSelect-icon': { color: textSecondary },
    '& .MuiSelect-select': { color: textPrimary, WebkitTextFillColor: textPrimary },
  }

  return (
    <>
      {/* 검색창 */}
      <TextField
        fullWidth
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
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            backgroundColor: inputBg,
            fontSize: '0.875rem',
            height: 44,
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.35)' },
            '&.Mui-focused fieldset': { borderColor: ideaAccent.primary },
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
          onClick={() => onCategoryChange('')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCategoryChange('') }}
          aria-pressed={!selectedCategory}
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.5,
            px: 1.25, py: 0.55, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
            border: `1px solid ${!selectedCategory ? filterActiveBorder : borderColor}`,
            bgcolor: !selectedCategory ? filterActiveBg : filterChipBg,
            transition: 'all 0.15s ease', outline: 'none',
            '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', fontWeight: !selectedCategory ? 700 : 500, color: !selectedCategory ? ideaAccent.primary : textSecondary, whiteSpace: 'nowrap' }}>
            전체
          </Typography>
        </Box>

        {CATEGORY_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <Box
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? '' : cat.id as IdeaCategory)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCategoryChange(isActive ? '' : cat.id as IdeaCategory) }}
              aria-pressed={isActive}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.5,
                px: 1.25, py: 0.55, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
                border: `1px solid ${isActive ? cat.border : borderColor}`,
                bgcolor: isActive ? cat.bg : filterChipBg,
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

      {/* 부문/부서/상태 셀렉트 + 유사 토글 + 초기화 */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* 부문 */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={selectedDivision}
            onChange={onDivisionChange}
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
            onChange={(e) => onDeptChange(e.target.value)}
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
            onChange={(e) => onStatusChange(e.target.value as IdeaStatus | '')}
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

        {/* 내 상상만 토글 */}
        <Tooltip title={`내가 제출한 아이디어 ${myCount}건만 보기`} arrow>
          <Box
            onClick={onMyOnlyToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onMyOnlyToggle() }}
            aria-pressed={showMyOnly}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              px: 1.5, py: 0.7, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
              border: `1px solid ${showMyOnly ? 'rgba(16,185,129,0.45)' : borderColor}`,
              bgcolor: showMyOnly ? myOnlyActiveBg : filterChipBg,
              transition: 'all 0.15s ease', outline: 'none',
              '&:hover': { borderColor: 'rgba(16,185,129,0.45)', bgcolor: myOnlyActiveBg },
              '&:focus-visible': { outline: `2px solid ${ideaAccent.success}`, outlineOffset: 2 },
            }}
          >
            <Box component="span" sx={{ fontSize: '0.85rem', lineHeight: 1 }}>✨</Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: showMyOnly ? 700 : 500, color: showMyOnly ? ideaAccent.success : textSecondary, whiteSpace: 'nowrap' }}>
              내 상상만
            </Typography>
            {myCount > 0 && (
              <Box
                sx={{
                  minWidth: 18, height: 18, borderRadius: '50%',
                  bgcolor: showMyOnly ? ideaAccent.success : myOnlyCountBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: showMyOnly ? '#fff' : ideaAccent.success, lineHeight: 1 }}>
                  {myCount}
                </Typography>
              </Box>
            )}
          </Box>
        </Tooltip>

        {/* 내 유사 아이디어 토글 */}
        <Tooltip title={`내가 제출한 아이디어와 유사한 건 ${similarCount}개`} arrow>
          <Box
            onClick={onSimilarToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSimilarToggle() }}
            aria-pressed={showSimilarOnly}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              px: 1.5, py: 0.7, borderRadius: 2, cursor: 'pointer', userSelect: 'none',
              border: `1px solid ${showSimilarOnly ? similar.border : borderColor}`,
              bgcolor: showSimilarOnly ? similar.badgeBg : filterChipBg,
              transition: 'all 0.15s ease', outline: 'none',
              '&:hover': { borderColor: similar.badgeBorder, bgcolor: similar.badgeBg },
              '&:focus-visible': { outline: `2px solid ${ideaAccent.similar}`, outlineOffset: 2 },
            }}
          >
            <WarningAmberIcon sx={{ fontSize: '0.85rem', color: showSimilarOnly ? ideaAccent.similar : textSecondary }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: showSimilarOnly ? 700 : 500, color: showSimilarOnly ? ideaAccent.similar : textSecondary, whiteSpace: 'nowrap' }}>
              내 유사 아이디어만
            </Typography>
            {similarCount > 0 && (
              <Box
                sx={{
                  minWidth: 18, height: 18, borderRadius: '50%',
                  bgcolor: showSimilarOnly ? ideaAccent.similar : similar.badgeBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: showSimilarOnly ? '#fff' : ideaAccent.similar, lineHeight: 1 }}>
                  {similarCount}
                </Typography>
              </Box>
            )}
          </Box>
        </Tooltip>

        {/* 필터 초기화 */}
        {hasFilter && (
          <Box
            onClick={handleClearAll}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClearAll() }}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.5,
              px: 1.25, py: 0.7, borderRadius: 2, cursor: 'pointer',
              border: `1px solid ${borderColor}`, color: textSecondary,
              fontSize: '0.78rem', transition: 'all 0.15s', outline: 'none',
              '&:hover': { borderColor: ideaAccent.danger, color: ideaAccent.danger },
              '&:focus-visible': { outline: `2px solid ${ideaAccent.danger}`, outlineOffset: 2 },
            }}
          >
            <CloseIcon sx={{ fontSize: '0.8rem' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 500 }}>초기화</Typography>
          </Box>
        )}
      </Box>
    </>
  )
}
