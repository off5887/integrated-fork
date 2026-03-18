// src/features/idea/NewIdea.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import {
  Alert,
  Box,
  Button,
  Snackbar,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getIdeaTheme } from '@/theme/ideaTheme'
import type { DraftData } from '@/api/types/idea'

import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'
import BasicInfoSection from './components/BasicInfoSection'
import FileUploadSection from './components/FileUploadSection'
import ParticipantsSection from './components/ParticipantsSection'
import ReviewerSelectModal from './components/ReviewerSelectModal'
import SimilarIdeaSearchModal from './components/SimilarIdeaSearchModal'
import NewIdeaHeader from './components/NewIdeaHeader'
import SimilarIdeaBanner from './components/SimilarIdeaBanner'
import DraftRestoreBanner from './components/DraftRestoreBanner'
import PlanSection from './components/PlanSection'

const DRAFT_KEY = 'gomgom_new_idea_draft'
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000 // 5분

function SectionDivider() {
  const { isDarkMode } = useThemeMode()
  const { dividerBg } = getIdeaTheme(isDarkMode)
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: dividerBg,
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
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // ─── 폼 상태 ───────────────────────────────────────────────────────────────
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [reviewer, setReviewer] = useState<string[]>([])
  // const [coProposers, setCoProposers] = useState<string[]>([])
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')
  const [security, setSecurity] = useState<'public' | 'private'>('public')
  const [plan, setPlan] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // ─── 모달 상태 ─────────────────────────────────────────────────────────────
  const [reviewerModalOpen, setReviewerModalOpen] = useState(false)
  // const [coProposerModalOpen, setCoProposerModalOpen] = useState(false)
  const [similarSearchOpen, setSimilarSearchOpen] = useState(false)

  // ─── 자동저장 상태 ─────────────────────────────────────────────────────────
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [savedDraft, setSavedDraft] = useState<DraftData | null>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return null
      const draft: DraftData = JSON.parse(raw)
      return draft.savedAt ? draft : null
    } catch {
      return null
    }
  })

  // 항상 최신 폼 값을 참조하기 위한 ref
  const formRef = useRef({
    title, categories, problem, solution,
    reviewer, security, plan,
    // coProposers, startDate, endDate,
  })
  useEffect(() => {
    formRef.current = {
      title, categories, problem, solution,
      reviewer, security, plan,
      // coProposers, startDate, endDate,
    }
  }, [title, categories, problem, solution, reviewer, security, plan])

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
    setCategories(savedDraft.categories ?? [])
    setProblem(savedDraft.problem ?? '')
    setSolution(savedDraft.solution ?? '')
    setReviewer(savedDraft.reviewer ?? [])
    // setCoProposers(savedDraft.coProposers ?? [])
    // setStartDate(savedDraft.startDate ?? '')
    // setEndDate(savedDraft.endDate ?? '')
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

  // ─── 제출 ────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!title.trim() || categories.length === 0 || !problem.trim() || !solution.trim()) {
      showSnackbar('필수 항목을 모두 입력해주세요.', 'warning')
      return
    }
    setLoading(true)
    setTimeout(() => {
      localStorage.removeItem(DRAFT_KEY)
      showSnackbar('제안이 등록되었습니다!', 'success')
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleBack = () => navigate(-1)

  // ─── 미저장 경고 ──────────────────────────────────────────────────────────
  const isDirty = !loading && !!(title.trim() || problem.trim() || solution.trim())
  const { isBlocked, proceed, reset } = useUnsavedChanges(isDirty)

  // ─── 스타일 ──────────────────────────────────────────────────────────────
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor } = it

  const inputSx = {
    bgcolor: it.inputBg,
    borderRadius: 2,
    color: textPrimary,
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: it.inputBorder },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: it.inputHoverBorder },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: it.accent.color, borderWidth: '1.5px' },
  }

  const labelSx = {
    color: textSecondary,
    fontSize: '0.875rem',
    '&.Mui-focused': { color: it.accent.color },
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: it.pageBg,
        pt: { xs: 9, md: 10 },
        pb: 14,
        px: { xs: 2, sm: 3 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box sx={{ maxWidth: 860, mx: 'auto' }}>
        {/* ─── 페이지 헤더 ─────────────────────────────────────────────── */}
        <NewIdeaHeader
          lastSavedAt={lastSavedAt}
          onBack={handleBack}
          onManualSave={handleManualSave}
        />

        {/* ─── 유사 아이디어 검색 배너 ──────────────────────────────────── */}
        <SimilarIdeaBanner onOpenSearch={() => setSimilarSearchOpen(true)} />

        {/* ─── 임시저장 복원 배너 ──────────────────────────────────────── */}
        {savedDraft && (
          <DraftRestoreBanner
            savedDraft={savedDraft}
            onRestore={handleRestoreDraft}
            onDiscard={handleDiscardDraft}
          />
        )}

        {/* ─── 메인 폼 카드 ────────────────────────────────────────────── */}
        <Box
          sx={{
            borderRadius: 3,
            bgcolor: it.cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: it.cardShadow,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            {/* 섹션 1: 기본 정보 (카테고리 포함) */}
            <BasicInfoSection
              title={title}
              setTitle={setTitle}
              categories={categories}
              setCategories={setCategories}
              problem={problem}
              setProblem={setProblem}
              solution={solution}
              setSolution={setSolution}
              inputSx={inputSx}
              labelSx={labelSx}
            />

            <SectionDivider />

            {/* 섹션 2: 심사자 & 공개 범위 */}
            <ParticipantsSection
              reviewer={reviewer}
              setReviewer={setReviewer}
              security={security}
              setSecurity={setSecurity}
              onOpenReviewerModal={() => setReviewerModalOpen(true)}
            />

            <SectionDivider />

            {/* 섹션 3: 실행 계획 */}
            <PlanSection plan={plan} setPlan={setPlan} />

            <SectionDivider />

            {/* 섹션 4: 첨부 파일 */}
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
        initialQuery={title}
      />
      <ReviewerSelectModal
        open={reviewerModalOpen}
        onClose={() => setReviewerModalOpen(false)}
        selected={reviewer}
        onToggle={handleToggleReviewer}
      />

      {/* ─── 미저장 경고 다이얼로그 ─────────────────────────────────── */}
      <ConfirmDialog
        open={isBlocked}
        title="작성 중인 내용이 있어요"
        message="페이지를 떠나면 작성 중인 내용이 사라질 수 있어요. 계속하시겠습니까?"
        confirmLabel="떠나기"
        cancelLabel="계속 작성"
        variant="warning"
        onConfirm={proceed}
        onCancel={reset}
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
