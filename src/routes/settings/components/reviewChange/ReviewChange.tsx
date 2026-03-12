import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import SaveIcon from '@mui/icons-material/Save'
import SearchIcon from '@mui/icons-material/Search'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { OrgMember } from '@/api/types/reviewer'
import { levelConfig } from '../../config/levelConfig'
import { statusConfig, ALL_STATUSES } from '../../config/statusConfig'
import type { IdeaStatus, Idea } from '../../types'
import { mockReviewerPools, mockIdeas } from '../../data/mockReviewChange'

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function ReviewChange() {
  const { isDarkMode, textPrimary, textSecondary, borderColor, headerBg } = usePageColors()
  const panelBg = isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff'

  const isMobile = useMediaQuery('(max-width: 1199px)')
  const [listPanelOpen, setListPanelOpen] = useState(false)
  const showListContent = !isMobile || listPanelOpen

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas)
  const [changingLevel, setChangingLevel] = useState<1 | 2 | 3 | null>(null)

  const filteredIdeas = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return ideas
    return ideas.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.submitter.toLowerCase().includes(q) ||
        i.department.toLowerCase().includes(q),
    )
  }, [ideas, searchTerm])

  const selectedIdea = ideas.find((i) => i.id === selectedIdeaId) ?? null

  const handleStatusChange = (status: IdeaStatus) => {
    if (!selectedIdeaId) return
    setIdeas((prev) => prev.map((i) => (i.id === selectedIdeaId ? { ...i, status } : i)))
  }

  const handleReviewerChange = (level: 1 | 2 | 3, reviewer: OrgMember | null) => {
    if (!selectedIdeaId) return
    setIdeas((prev) =>
      prev.map((i) => {
        if (i.id !== selectedIdeaId) return i
        return {
          ...i,
          reviewers: {
            ...i.reviewers,
            [`level${level}`]: reviewer,
          },
        }
      }),
    )
    setChangingLevel(null)
  }

  const handleSave = () => {
    console.log('저장:', selectedIdea)
    alert('변경사항이 저장되었습니다.')
  }

  return (
    <Box>
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              bgcolor: '#6366f1',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SwapHorizIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ color: textPrimary, lineHeight: 1.3 }}
            >
              아이디어별 심사자 변경
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              아이디어를 선택한 뒤 진행 상태와 각 차수의 심사자를 변경하세요
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* ── 왼쪽: 아이디어 목록 ── */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              bgcolor: panelBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 2.5,
              overflow: 'hidden',
            }}
          >
            {/* 패널 헤더 — 모바일에서 클릭하면 접기/펼치기 */}
            <Box
              onClick={() => isMobile && setListPanelOpen((v) => !v)}
              sx={{
                px: 2,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: headerBg,
                borderBottom: showListContent ? `1px solid ${borderColor}` : 'none',
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none',
                transition: 'background 0.15s ease',
                '&:hover': isMobile
                  ? { bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' }
                  : {},
              }}
            >
              <LightbulbOutlinedIcon
                sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }}
              />
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                  flex: 1,
                }}
              >
                아이디어 목록
              </Typography>
              <Chip
                label={`${filteredIdeas.length}건`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
              {isMobile && (
                <ExpandMoreIcon
                  sx={{
                    fontSize: '1.1rem',
                    color: isDarkMode ? '#a5b4fc' : '#4338ca',
                    ml: 0.5,
                    transition: 'transform 0.2s ease',
                    transform: listPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              )}
            </Box>

            <Collapse in={showListContent} timeout={220} unmountOnExit>
            <Box sx={{ p: 2 }}>
              {/* 검색 */}
              <TextField
                fullWidth
                placeholder="제목, 제출자, 부서로 검색"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ fontSize: '1rem', color: textSecondary }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                    fontSize: '0.875rem',
                    '& fieldset': { borderColor },
                    '&:hover fieldset': {
                      borderColor: isDarkMode
                        ? 'rgba(99,102,241,0.35)'
                        : 'rgba(99,102,241,0.3)',
                    },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  },
                  '& .MuiInputBase-input': {
                    color: textPrimary,
                    '&::placeholder': { color: textSecondary, opacity: 1 },
                  },
                }}
              />

              {/* 아이디어 목록 */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  maxHeight: 520,
                  overflow: 'auto',
                  pr: 0.5,
                  '&::-webkit-scrollbar': { width: 4 },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': {
                    background: isDarkMode
                      ? 'rgba(99,102,241,0.25)'
                      : 'rgba(99,102,241,0.2)',
                    borderRadius: 9999,
                  },
                  scrollbarWidth: 'thin',
                  scrollbarColor: isDarkMode
                    ? 'rgba(99,102,241,0.25) transparent'
                    : 'rgba(99,102,241,0.2) transparent',
                }}
              >
                {filteredIdeas.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <LightbulbOutlinedIcon
                      sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }}
                    />
                    <Typography variant="body2" sx={{ color: textSecondary }}>
                      검색 결과가 없습니다
                    </Typography>
                  </Box>
                ) : (
                  filteredIdeas.map((idea) => {
                    const isSelected = idea.id === selectedIdeaId
                    const sc = statusConfig[idea.status]
                    return (
                      <Box
                        key={idea.id}
                        onClick={() => {
                          setSelectedIdeaId(idea.id)
                          setChangingLevel(null)
                        }}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: `1px solid ${isSelected ? sc.border(isDarkMode) : borderColor}`,
                          bgcolor: isSelected
                            ? sc.bg(isDarkMode)
                            : isDarkMode
                            ? 'rgba(30,41,59,0.5)'
                            : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            bgcolor: isSelected
                              ? sc.bg(isDarkMode)
                              : isDarkMode
                              ? 'rgba(99,102,241,0.07)'
                              : 'rgba(99,102,241,0.04)',
                            borderColor: isSelected
                              ? sc.border(isDarkMode)
                              : isDarkMode
                              ? 'rgba(99,102,241,0.2)'
                              : 'rgba(99,102,241,0.15)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 1,
                            mb: 0.75,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '0.82rem',
                              fontWeight: isSelected ? 700 : 600,
                              color: textPrimary,
                              lineHeight: 1.4,
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            {idea.title}
                          </Typography>
                          <Chip
                            label={idea.status}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.6rem',
                              fontWeight: 700,
                              flexShrink: 0,
                              bgcolor: sc.bg(isDarkMode),
                              color: sc.color,
                              border: `1px solid ${sc.border(isDarkMode)}`,
                              '& .MuiChip-label': { px: 0.6 },
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '0.7rem',
                              color: textSecondary,
                              fontFamily: 'monospace',
                            }}
                          >
                            {idea.submitter}
                          </Typography>
                          <Typography sx={{ fontSize: '0.6rem', color: textSecondary, opacity: 0.5 }}>
                            ·
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', color: textSecondary }}>
                            {idea.department}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.65rem',
                              color: textSecondary,
                              opacity: 0.6,
                              ml: 'auto',
                              fontFamily: 'monospace',
                            }}
                          >
                            {idea.submittedAt}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })
                )}
              </Box>
            </Box>
            </Collapse>
          </Box>
        </Grid>

        {/* ── 오른쪽: 상세 / 심사자 변경 ── */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {selectedIdea === null ? (
            <Box
              sx={{
                bgcolor: panelBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 2.5,
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                p: 4,
              }}
            >
              <EditNoteIcon
                sx={{ fontSize: '2.8rem', color: textSecondary, opacity: 0.25 }}
              />
              <Typography
                variant="body2"
                sx={{ color: textSecondary, fontWeight: 600, opacity: 0.6 }}
              >
                왼쪽에서 아이디어를 선택하세요
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.45 }}>
                선택한 아이디어의 진행 상태와 심사자를 변경할 수 있습니다
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: panelBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 2.5,
                overflow: 'hidden',
              }}
            >
              {/* 패널 헤더 — 아이디어 정보 */}
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                  bgcolor: headerBg,
                  borderBottom: `1px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LightbulbOutlinedIcon
                    sx={{ fontSize: '1.1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }}
                  />
                </Box>
                <Box flex={1} minWidth={0}>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: textPrimary,
                      lineHeight: 1.35,
                    }}
                  >
                    {selectedIdea.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.4 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>
                      {selectedIdea.submitter}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: textSecondary, opacity: 0.5 }}>
                      ·
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
                      {selectedIdea.department}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: textSecondary, opacity: 0.5, ml: 'auto', fontFamily: 'monospace' }}>
                      {selectedIdea.submittedAt}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 2.5 }}>
                {/* 진행 상태 변경 */}
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    bgcolor: isDarkMode ? 'rgba(15,23,42,0.3)' : '#ffffff',
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      color: textSecondary,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontSize: '0.68rem',
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    진행 상태
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={selectedIdea.status}
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        bgcolor: statusConfig[selectedIdea.status].bg(isDarkMode),
                        color: statusConfig[selectedIdea.status].color,
                        border: `1px solid ${statusConfig[selectedIdea.status].border(isDarkMode)}`,
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 200 }}>
                      <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                        변경:
                      </Typography>
                      <Select
                        value={selectedIdea.status}
                        onChange={(e) => handleStatusChange(e.target.value as IdeaStatus)}
                        size="small"
                        sx={{
                          flex: 1,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: textPrimary,
                          bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : '#f8fafc',
                          borderRadius: 1.5,
                          '& .MuiOutlinedInput-notchedOutline': { borderColor },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6366f1',
                          },
                          '& .MuiSelect-icon': { color: textSecondary },
                        }}
                      >
                        {ALL_STATUSES.map((s) => (
                          <MenuItem key={s} value={s} sx={{ fontSize: '0.82rem' }}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Box>

                {/* 심사자 변경 — 레벨별 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {([1, 2, 3] as const).map((level) => {
                    const cfg = levelConfig[level]
                    const currentReviewer = selectedIdea.reviewers[`level${level}`]
                    const pool = mockReviewerPools[level]
                    const isChanging = changingLevel === level

                    return (
                      <Box
                        key={level}
                        sx={{
                          borderRadius: 2,
                          border: `1px solid ${isChanging ? cfg.border(isDarkMode) : borderColor}`,
                          overflow: 'hidden',
                          transition: 'border-color 0.15s ease',
                        }}
                      >
                        {/* 레벨 헤더 */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 2,
                            py: 1.5,
                            bgcolor: cfg.bg(isDarkMode),
                            borderBottom: `1px solid ${borderColor}`,
                            borderLeft: `3px solid ${cfg.accent}`,
                          }}
                        >
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              bgcolor: cfg.accent,
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              flexShrink: 0,
                              fontFamily: 'monospace',
                            }}
                          >
                            {level}
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: textPrimary, flex: 1, fontSize: '0.82rem' }}
                          >
                            {cfg.label}
                          </Typography>
                          <Button
                            size="small"
                            variant={isChanging ? 'contained' : 'outlined'}
                            startIcon={
                              isChanging ? (
                                <CloseIcon sx={{ fontSize: '0.85rem !important' }} />
                              ) : (
                                <SwapHorizIcon sx={{ fontSize: '0.85rem !important' }} />
                              )
                            }
                            onClick={() =>
                              setChangingLevel(isChanging ? null : level)
                            }
                            sx={{
                              borderRadius: 9999,
                              px: 1.75,
                              py: 0.4,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'none',
                              minWidth: 0,
                              ...(isChanging
                                ? {
                                    bgcolor: cfg.accent,
                                    color: '#fff',
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: cfg.accent, opacity: 0.88, boxShadow: 'none' },
                                  }
                                : {
                                    borderColor: cfg.border(isDarkMode),
                                    color: cfg.chipColor(isDarkMode),
                                    '&:hover': {
                                      bgcolor: cfg.bg(isDarkMode),
                                      borderColor: cfg.accent,
                                    },
                                  }),
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {isChanging ? '취소' : '변경'}
                          </Button>
                        </Box>

                        {/* 현재 심사자 */}
                        <Box sx={{ px: 2, py: 1.5, bgcolor: isDarkMode ? 'rgba(15,23,42,0.25)' : '#ffffff' }}>
                          {currentReviewer ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar
                                sx={{
                                  width: 34,
                                  height: 34,
                                  bgcolor: cfg.avatarBg(isDarkMode),
                                  color: cfg.avatarColor(isDarkMode),
                                  fontSize: '0.82rem',
                                  fontWeight: 700,
                                  border: `1px solid ${cfg.border(isDarkMode)}`,
                                  flexShrink: 0,
                                }}
                              >
                                {currentReviewer.name[0]}
                              </Avatar>
                              <Box flex={1} minWidth={0}>
                                <Typography
                                  sx={{
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: textPrimary,
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {currentReviewer.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '0.72rem',
                                    color: textSecondary,
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {currentReviewer.position} · {currentReviewer.department}
                                </Typography>
                              </Box>
                              <Chip
                                label={cfg.label}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: '0.6rem',
                                  fontWeight: 700,
                                  bgcolor: cfg.chipBg(isDarkMode),
                                  color: cfg.chipColor(isDarkMode),
                                  border: `1px solid ${cfg.border(isDarkMode)}`,
                                  '& .MuiChip-label': { px: 0.75 },
                                }}
                              />
                            </Box>
                          ) : (
                            <Typography
                              variant="caption"
                              sx={{ color: textSecondary, opacity: 0.65 }}
                            >
                              배정된 심사자 없음
                            </Typography>
                          )}
                        </Box>

                        {/* 심사자 선택 패널 (변경 버튼 클릭 시 펼쳐짐) */}
                        {isChanging && (
                          <Box
                            sx={{
                              borderTop: `1px dashed ${cfg.border(isDarkMode)}`,
                              px: 2,
                              py: 1.5,
                              bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,250,252,0.8)',
                            }}
                          >
                            <Typography
                              variant="caption"
                              fontWeight={700}
                              sx={{
                                color: textSecondary,
                                fontSize: '0.68rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                display: 'block',
                                mb: 1,
                              }}
                            >
                              {cfg.label} 목록에서 선택
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                              {pool.map((reviewer) => {
                                const isCurrent = currentReviewer?.id === reviewer.id
                                return (
                                  <Box
                                    key={reviewer.id}
                                    onClick={() => handleReviewerChange(level, reviewer)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1.25,
                                      p: 1.25,
                                      borderRadius: 1.5,
                                      border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
                                      bgcolor: isCurrent
                                        ? cfg.bg(isDarkMode)
                                        : isDarkMode
                                        ? 'rgba(30,41,59,0.5)'
                                        : '#ffffff',
                                      cursor: 'pointer',
                                      transition: 'all 0.12s ease',
                                      '&:hover': {
                                        bgcolor: cfg.bg(isDarkMode),
                                        borderColor: cfg.border(isDarkMode),
                                      },
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: isCurrent
                                          ? cfg.avatarBg(isDarkMode)
                                          : isDarkMode
                                          ? 'rgba(30,41,59,0.8)'
                                          : 'rgba(241,245,249,0.9)',
                                        color: isCurrent
                                          ? cfg.avatarColor(isDarkMode)
                                          : textSecondary,
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {reviewer.name[0]}
                                    </Avatar>
                                    <Box flex={1} minWidth={0}>
                                      <Typography
                                        sx={{
                                          fontSize: '0.8rem',
                                          fontWeight: isCurrent ? 700 : 600,
                                          color: isCurrent
                                            ? cfg.chipColor(isDarkMode)
                                            : textPrimary,
                                          lineHeight: 1.3,
                                        }}
                                      >
                                        {reviewer.name}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: '0.68rem',
                                          color: textSecondary,
                                          fontFamily: 'monospace',
                                        }}
                                      >
                                        {reviewer.position} · {reviewer.department}
                                      </Typography>
                                    </Box>
                                    {isCurrent && (
                                      <CheckIcon
                                        sx={{
                                          fontSize: '1rem',
                                          color: cfg.accent,
                                          flexShrink: 0,
                                        }}
                                      />
                                    )}
                                  </Box>
                                )
                              })}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )
                  })}
                </Box>

                {/* 저장 버튼 */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
                    onClick={handleSave}
                    sx={{
                      borderRadius: 9999,
                      px: 3,
                      py: 0.9,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'none',
                      bgcolor: '#6366f1',
                      color: '#fff',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#4f46e5',
                        boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    저장하기
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
