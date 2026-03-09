// src/routes/idea/NewIdea.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HistoryIcon from '@mui/icons-material/History'
import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

import BasicInfoSection from './components/BasicInfoSection'
import FileUploadSection from './components/FileUploadSection'
import ParticipantsSection from './components/ParticipantsSection'
import ScheduleAndVisibilitySection from './components/ScheduleAndVisibilitySection'

import CoProposerSelectModal from './components/CoProposerSelectModal'
import ReviewerSelectModal from './components/ReviewerSelectModal'
import SimilarIdeaSearchModal from './components/SimilarIdeaSearchModal'

const DRAFT_KEY = 'gomgom_new_idea_draft'
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000 // 5분

interface DraftData {
  title: string
  category: string
  problem: string
  solution: string
  reviewer: string[]
  coProposers: string[]
  startDate: string
  endDate: string
  security: 'public' | 'private'
  plan: string
  savedAt: string
}

function SectionDivider({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: isDarkMode
          ? 'rgba(148,163,184,0.08)'
          : 'rgba(203,213,225,0.4)',
        my: 5,
      }}
    />
  )
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
}

export default function NewIdea() {
  const { isDarkMode } = useThemeMode()
  const navigate = useNavigate()

  // ─── 폼 상태 ───────────────────────────────────────────────────────────────
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [reviewer, setReviewer] = useState<string[]>([])
  const [coProposers, setCoProposers] = useState<string[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [security, setSecurity] = useState<'public' | 'private'>('public')
  const [plan, setPlan] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // ─── 모달 상태 ─────────────────────────────────────────────────────────────
  const [reviewerModalOpen, setReviewerModalOpen] = useState(false)
  const [coProposerModalOpen, setCoProposerModalOpen] = useState(false)
  const [similarSearchOpen, setSimilarSearchOpen] = useState(false)

  // ─── 자동저장 상태 ─────────────────────────────────────────────────────────
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [savedDraft, setSavedDraft] = useState<DraftData | null>(null)

  // 항상 최신 폼 값을 참조하기 위한 ref
  const formRef = useRef({
    title, category, problem, solution,
    reviewer, coProposers, startDate, endDate, security, plan,
  })
  useEffect(() => {
    formRef.current = {
      title, category, problem, solution,
      reviewer, coProposers, startDate, endDate, security, plan,
    }
  }, [title, category, problem, solution, reviewer, coProposers, startDate, endDate, security, plan])

  // ─── 마운트: 임시저장 불러오기 확인 ─────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return
    try {
      const draft: DraftData = JSON.parse(raw)
      if (draft.savedAt) setSavedDraft(draft)
    } catch {
      // 손상된 데이터 무시
    }
  }, [])

  // ─── 5분 자동저장 인터벌 ─────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      const f = formRef.current
      // 제목이나 내용이 있을 때만 저장
      const hasContent = f.title.trim() || f.problem.trim() || f.solution.trim() || f.plan.trim()
      if (!hasContent) return
      const draft: DraftData = { ...f, savedAt: new Date().toISOString() }
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      setLastSavedAt(new Date())
      setSnackMsg('임시저장 완료')
      setSnackOpen(true)
    }, AUTO_SAVE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  // ─── 수동 임시저장 ────────────────────────────────────────────────────────
  const handleManualSave = () => {
    const f = formRef.current
    const draft: DraftData = { ...f, savedAt: new Date().toISOString() }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    setLastSavedAt(new Date())
    setSavedDraft(null) // 복원 배너 숨김
    setSnackMsg('임시저장 완료')
    setSnackOpen(true)
  }

  // ─── 임시저장 복원 ────────────────────────────────────────────────────────
  const handleRestoreDraft = () => {
    if (!savedDraft) return
    setTitle(savedDraft.title ?? '')
    setCategory(savedDraft.category ?? '')
    setProblem(savedDraft.problem ?? '')
    setSolution(savedDraft.solution ?? '')
    setReviewer(savedDraft.reviewer ?? [])
    setCoProposers(savedDraft.coProposers ?? [])
    setStartDate(savedDraft.startDate ?? '')
    setEndDate(savedDraft.endDate ?? '')
    setSecurity(savedDraft.security ?? 'public')
    setPlan(savedDraft.plan ?? '')
    setSavedDraft(null)
    setSnackMsg('임시저장 내용을 불러왔습니다')
    setSnackOpen(true)
  }

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
    setSavedDraft(null)
  }

  // ─── 참여자 토글 ─────────────────────────────────────────────────────────
  const handleToggleReviewer = (name: string) => {
    setReviewer((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    )
  }

  const handleToggleCoProposer = (name: string) => {
    setCoProposers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    )
  }

  // ─── 제출 ────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!title.trim() || !problem.trim() || !solution.trim() || !startDate || !endDate) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      localStorage.removeItem(DRAFT_KEY)
      alert('제안이 등록되었습니다!')
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleBack = () => navigate(-1)

  // ─── 스타일 ──────────────────────────────────────────────────────────────
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  const inputSx = {
    bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,250,252,0.8)',
    borderRadius: 2,
    color: textPrimary,
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? 'rgba(148,163,184,0.18)' : 'rgba(203,213,225,0.7)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '1.5px',
    },
  }

  const labelSx = {
    color: textSecondary,
    fontSize: '0.875rem',
    '&.Mui-focused': { color: '#6366f1' },
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
        pt: { xs: 9, md: 10 },
        pb: 14,
        px: { xs: 2, sm: 3 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box sx={{ maxWidth: 860, mx: 'auto' }}>
        {/* ─── 페이지 헤더 ─────────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          <IconButton
            onClick={handleBack}
            size="small"
            sx={{
              color: textSecondary,
              bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.4)',
              borderRadius: 2,
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(148,163,184,0.15)' : 'rgba(203,213,225,0.7)',
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Box flex={1} minWidth={0}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              새로운 상상 제안
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              아이디어를 제안하고 함께 실현해보세요
            </Typography>
          </Box>

          {/* 마지막 저장 시각 + 수동저장 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {lastSavedAt && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 1.5,
                  bgcolor: isDarkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.07)',
                  border: '1px solid rgba(16,185,129,0.25)',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: '0.8rem', color: '#10b981' }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {formatTime(lastSavedAt)} 임시저장
                </Typography>
              </Box>
            )}
            <Tooltip title="임시저장" placement="bottom">
              <IconButton
                size="small"
                onClick={handleManualSave}
                sx={{
                  color: textSecondary,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 1.5,
                  width: 34,
                  height: 34,
                  '&:hover': {
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                    borderColor: '#6366f1',
                    color: '#6366f1',
                  },
                }}
              >
                <SaveIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ─── 유사 아이디어 검색 배너 ──────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            px: 2.5, py: 1.75, mb: 2.5,
            borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.15)'}`,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            🔍
          </Box>
          <Box flex={1} minWidth={0}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>
              유사한 아이디어가 이미 있을 수 있어요
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
              제안 전 기존 아이디어와 중복 여부를 확인해 보세요
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setSimilarSearchOpen(true)}
            sx={{
              borderRadius: 2, px: 2, py: 0.7,
              fontWeight: 700, fontSize: '0.8rem',
              textTransform: 'none', flexShrink: 0,
              borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
              color: isDarkMode ? '#a5b4fc' : '#4338ca',
              '&:hover': {
                borderColor: '#6366f1',
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
              },
            }}
          >
            유사 아이디어 검색
          </Button>
        </Box>

        {/* ─── 임시저장 복원 배너 ──────────────────────────────────────── */}
        {savedDraft && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2.5,
              py: 1.75,
              mb: 2.5,
              borderRadius: 2.5,
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.18)'}`,
              flexWrap: 'wrap',
            }}
          >
            <HistoryIcon sx={{ fontSize: '1.2rem', color: '#6366f1', flexShrink: 0 }} />
            <Box flex={1} minWidth={0}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>
                작성 중인 임시저장 내용이 있습니다
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
                {new Date(savedDraft.savedAt).toLocaleString('ko-KR', {
                  month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })} 에 자동저장됨
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleDiscardDraft}
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  px: 1.75,
                  py: 0.5,
                  borderColor: isDarkMode ? 'rgba(148,163,184,0.25)' : 'rgba(203,213,225,0.7)',
                  color: textSecondary,
                  textTransform: 'none',
                  '&:hover': { borderColor: textSecondary, bgcolor: 'transparent' },
                }}
              >
                무시
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<RestoreIcon sx={{ fontSize: '0.9rem' }} />}
                onClick={handleRestoreDraft}
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: 1.5,
                  px: 1.75,
                  py: 0.5,
                  bgcolor: '#6366f1',
                  color: '#fff',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' },
                }}
              >
                불러오기
              </Button>
            </Box>
          </Box>
        )}

        {/* ─── 메인 폼 카드 ────────────────────────────────────────────── */}
        <Box
          sx={{
            borderRadius: 3,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            {/* 섹션 1: 기본 정보 (카테고리 포함) */}
            <BasicInfoSection
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              problem={problem}
              setProblem={setProblem}
              solution={solution}
              setSolution={setSolution}
              inputSx={inputSx}
              labelSx={labelSx}
              isDarkMode={isDarkMode}
            />

            <SectionDivider isDarkMode={isDarkMode} />

            {/* 섹션 2: 참여자 */}
            <ParticipantsSection
              reviewer={reviewer}
              setReviewer={setReviewer}
              coProposers={coProposers}
              setCoProposers={setCoProposers}
              isDarkMode={isDarkMode}
              onOpenReviewerModal={() => setReviewerModalOpen(true)}
              onOpenCoProposerModal={() => setCoProposerModalOpen(true)}
            />

            <SectionDivider isDarkMode={isDarkMode} />

            {/* 섹션 3: 실행 일정 & 공개 범위 */}
            <ScheduleAndVisibilitySection
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              security={security}
              setSecurity={setSecurity}
              inputSx={inputSx}
              labelSx={labelSx}
              isDarkMode={isDarkMode}
            />

            <SectionDivider isDarkMode={isDarkMode} />

            {/* 섹션 4: 실행 계획 */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    width: 26, height: 26, borderRadius: '50%',
                    bgcolor: '#6366f1', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                  }}
                >
                  4
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
                  실행 계획
                </Typography>
              </Box>
              <Box
                component="textarea"
                value={plan}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlan(e.target.value)}
                placeholder="구체적인 실행 계획을 작성해주세요"
                rows={7}
                sx={{
                  width: '100%',
                  resize: 'vertical',
                  minHeight: 160,
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.18)' : 'rgba(203,213,225,0.7)'}`,
                  bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,250,252,0.8)',
                  color: textPrimary,
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  lineHeight: 1.7,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                  '&::placeholder': { color: textSecondary },
                  '&:hover': {
                    borderColor: isDarkMode ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.5)',
                  },
                  '&:focus': {
                    borderColor: '#6366f1',
                    borderWidth: '1.5px',
                    boxShadow: `0 0 0 3px ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
                  },
                }}
              />
            </Box>

            <SectionDivider isDarkMode={isDarkMode} />

            {/* 섹션 5: 첨부 파일 */}
            <FileUploadSection
              files={files}
              filePreviews={filePreviews}
              onFilesChange={(newFilesFromChild) => {
                const addedFiles = newFilesFromChild.slice(files.length)
                const newPreviews = addedFiles.map((file) =>
                  file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
                )
                setFiles(newFilesFromChild)
                setFilePreviews((prev) => [...prev, ...newPreviews])
              }}
              onRemoveFile={(index) => {
                if (filePreviews[index] && files[index]?.type.startsWith('image/')) {
                  URL.revokeObjectURL(filePreviews[index])
                }
                setFiles((prev) => prev.filter((_, i) => i !== index))
                setFilePreviews((prev) => prev.filter((_, i) => i !== index))
              }}
              isDarkMode={isDarkMode}
            />

            {/* ─── 하단 버튼 영역 ────────────────────────────────────── */}
            <Box
              sx={{
                mt: 6,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {/* 임시저장 버튼 (왼쪽) */}
              <Button
                variant="outlined"
                startIcon={<SaveIcon sx={{ fontSize: '1rem' }} />}
                onClick={handleManualSave}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.1,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  borderColor: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)',
                  color: isDarkMode ? '#a5b4fc' : '#6366f1',
                  '&:hover': {
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
                    borderColor: '#6366f1',
                  },
                }}
              >
                임시저장
              </Button>

              {/* 취소 + 제출 (오른쪽) */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderColor: borderColor,
                    color: textSecondary,
                    '&:hover': {
                      borderColor: isDarkMode ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.6)',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleSubmit}
                  startIcon={loading ? null : <SendIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.25,
                    fontWeight: 700,
                    textTransform: 'none',
                    bgcolor: '#6366f1',
                    boxShadow: 'none',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: '#4f46e5',
                      boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)',
                      color: '#fff',
                    },
                    transition: 'all 0.15s ease',
                  }}
                >
                  {loading ? '등록 중...' : '상상 제안하기'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ─── 모달 ───────────────────────────────────────────────────────── */}
      <SimilarIdeaSearchModal
        open={similarSearchOpen}
        onClose={() => setSimilarSearchOpen(false)}
        isDarkMode={isDarkMode}
        initialQuery={title}
      />
      <ReviewerSelectModal
        open={reviewerModalOpen}
        onClose={() => setReviewerModalOpen(false)}
        selected={reviewer}
        onToggle={handleToggleReviewer}
      />
      <CoProposerSelectModal
        open={coProposerModalOpen}
        onClose={() => setCoProposerModalOpen(false)}
        selected={coProposers}
        onToggle={handleToggleCoProposer}
      />

      {/* ─── 임시저장 스낵바 ─────────────────────────────────────────── */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: { xs: 8, md: 2 } }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          icon={<CheckCircleIcon fontSize="small" />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 600,
            fontSize: '0.875rem',
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${isDarkMode ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.25)'}`,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.5)'
              : '0 8px 32px rgba(0,0,0,0.1)',
            '& .MuiAlert-icon': { color: '#10b981' },
            '& .MuiAlert-action': { color: isDarkMode ? '#94a3b8' : '#64748b' },
          }}
        >
          {snackMsg}
          {lastSavedAt && (
            <Box component="span" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b', ml: 0.5, fontWeight: 500 }}>
              · {formatTime(lastSavedAt)}
            </Box>
          )}
        </Alert>
      </Snackbar>
    </Box>
  )
}
