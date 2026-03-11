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
import { OrgMember } from '../../../../api/types/reviewer'

// ─── 타입 ────────────────────────────────────────────────────────────────────

type IdeaStatus =
  | '임시저장'
  | '1차 심사 대기'
  | '2차 심사 대기'
  | '3차 심사 대기'
  | '실행자 선택'
  | '결과등록'
  | '결과심사'

interface Idea {
  id: string
  title: string
  submitter: string
  department: string
  submittedAt: string
  status: IdeaStatus
  reviewers: {
    level1: OrgMember | null
    level2: OrgMember | null
    level3: OrgMember | null
  }
}

// ─── 상태 설정 ────────────────────────────────────────────────────────────────

const statusConfig: Record<
  IdeaStatus,
  { color: string; bg: (d: boolean) => string; border: (d: boolean) => string }
> = {
  임시저장: {
    color: '#94a3b8',
    bg: (d) => (d ? 'rgba(148,163,184,0.1)' : 'rgba(148,163,184,0.08)'),
    border: (d) => (d ? 'rgba(148,163,184,0.25)' : 'rgba(148,163,184,0.18)'),
  },
  '1차 심사 대기': {
    color: '#6366f1',
    bg: (d) => (d ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'),
    border: (d) => (d ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'),
  },
  '2차 심사 대기': {
    color: '#8b5cf6',
    bg: (d) => (d ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)'),
    border: (d) => (d ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'),
  },
  '3차 심사 대기': {
    color: '#f59e0b',
    bg: (d) => (d ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.07)'),
    border: (d) => (d ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)'),
  },
  '실행자 선택': {
    color: '#f97316',
    bg: (d) => (d ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.07)'),
    border: (d) => (d ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'),
  },
  결과등록: {
    color: '#22c55e',
    bg: (d) => (d ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.07)'),
    border: (d) => (d ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.2)'),
  },
  결과심사: {
    color: '#14b8a6',
    bg: (d) => (d ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.07)'),
    border: (d) => (d ? 'rgba(20,184,166,0.3)' : 'rgba(20,184,166,0.2)'),
  },
}

const levelConfig = {
  1: {
    label: '1차 심사자',
    accent: '#6366f1',
    avatarBg: (d: boolean) => (d ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)'),
    avatarColor: (d: boolean) => (d ? '#a5b4fc' : '#4338ca'),
    bg: (d: boolean) => (d ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'),
    border: (d: boolean) => (d ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'),
    chipBg: (d: boolean) => (d ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)'),
    chipColor: (d: boolean) => (d ? '#a5b4fc' : '#4338ca'),
  },
  2: {
    label: '2차 심사자',
    accent: '#8b5cf6',
    avatarBg: (d: boolean) => (d ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'),
    avatarColor: (d: boolean) => (d ? '#c4b5fd' : '#6d28d9'),
    bg: (d: boolean) => (d ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.03)'),
    border: (d: boolean) => (d ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.15)'),
    chipBg: (d: boolean) => (d ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)'),
    chipColor: (d: boolean) => (d ? '#c4b5fd' : '#6d28d9'),
  },
  3: {
    label: '3차 심사자',
    accent: '#f59e0b',
    avatarBg: (d: boolean) => (d ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.1)'),
    avatarColor: (d: boolean) => (d ? '#fde68a' : '#92400e'),
    bg: (d: boolean) => (d ? 'rgba(245,158,11,0.06)' : 'rgba(245,158,11,0.03)'),
    border: (d: boolean) => (d ? 'rgba(245,158,11,0.25)' : 'rgba(245,158,11,0.15)'),
    chipBg: (d: boolean) => (d ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)'),
    chipColor: (d: boolean) => (d ? '#fbbf24' : '#92400e'),
  },
} as const

// ─── 목 데이터 ────────────────────────────────────────────────────────────────

const mockReviewerPools: Record<1 | 2 | 3, OrgMember[]> = {
  1: [
    { id: '1', name: '김개발', position: '개발팀장', department: '개발1팀', division: '디지털전략부문' },
    { id: '4', name: '최기획', position: '기획팀장', department: '기획팀', division: '디지털전략부문' },
    { id: '6', name: '윤영업', position: '영업팀장', department: '영업1팀', division: '영업부문' },
    { id: '8', name: '한마케팅', position: '마케팅팀장', department: '마케팅팀', division: '영업부문' },
    { id: '9', name: '오인사', position: '인사팀장', department: '인사팀', division: '경영지원부문' },
  ],
  2: [
    { id: '12', name: '서부문장', position: '부문장', department: '전략기획실', division: '디지털전략부문' },
    { id: '10', name: '백재무', position: '재무팀장', department: '재무팀', division: '경영지원부문' },
  ],
  3: [
    { id: '13', name: '장임원', position: '상무', department: '경영지원부문', division: '경영지원부문' },
  ],
}

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: '회의실 예약 시스템 개선안',
    submitter: '이코딩',
    department: '개발1팀',
    submittedAt: '2026-02-15',
    status: '1차 심사 대기',
    reviewers: {
      level1: mockReviewerPools[1][0],
      level2: mockReviewerPools[2][0],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '2',
    title: '사내 복지 포인트 활용 방안',
    submitter: '박프론트',
    department: '개발1팀',
    submittedAt: '2026-02-18',
    status: '2차 심사 대기',
    reviewers: {
      level1: mockReviewerPools[1][1],
      level2: mockReviewerPools[2][1],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '3',
    title: '고객 응대 프로세스 표준화',
    submitter: '윤영업',
    department: '영업1팀',
    submittedAt: '2026-02-20',
    status: '3차 심사 대기',
    reviewers: {
      level1: mockReviewerPools[1][2],
      level2: mockReviewerPools[2][0],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '4',
    title: '재고 관리 시스템 자동화',
    submitter: '송세일',
    department: '영업1팀',
    submittedAt: '2026-02-22',
    status: '임시저장',
    reviewers: { level1: null, level2: null, level3: null },
  },
  {
    id: '5',
    title: '신입 사원 온보딩 프로그램 개선',
    submitter: '오인사',
    department: '인사팀',
    submittedAt: '2026-02-25',
    status: '실행자 선택',
    reviewers: {
      level1: mockReviewerPools[1][4],
      level2: mockReviewerPools[2][0],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '6',
    title: '에너지 절약 캠페인 실행 방안',
    submitter: '남총무',
    department: '총무팀',
    submittedAt: '2026-02-28',
    status: '결과등록',
    reviewers: {
      level1: mockReviewerPools[1][0],
      level2: mockReviewerPools[2][1],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '7',
    title: '마케팅 콘텐츠 제작 효율화',
    submitter: '한마케팅',
    department: '마케팅팀',
    submittedAt: '2026-03-01',
    status: '결과심사',
    reviewers: {
      level1: mockReviewerPools[1][3],
      level2: mockReviewerPools[2][0],
      level3: mockReviewerPools[3][0],
    },
  },
  {
    id: '8',
    title: '원격 근무 환경 표준화 방안',
    submitter: '이코딩',
    department: '개발1팀',
    submittedAt: '2026-03-03',
    status: '1차 심사 대기',
    reviewers: {
      level1: mockReviewerPools[1][1],
      level2: mockReviewerPools[2][0],
      level3: mockReviewerPools[3][0],
    },
  },
]

const ALL_STATUSES: IdeaStatus[] = [
  '임시저장',
  '1차 심사 대기',
  '2차 심사 대기',
  '3차 심사 대기',
  '실행자 선택',
  '결과등록',
  '결과심사',
]

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

interface Props {
  isDarkMode: boolean
}

export default function ReviewChange({ isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const panelBg = isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff'
  const headerBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'

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
