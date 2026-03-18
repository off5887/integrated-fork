// src/features/idea/NewIdea.tsx
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getIdeaTheme } from '@/theme/ideaTheme'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { useIdeaDraft, DRAFT_KEY } from './hooks/useIdeaDraft'
import DraftSnackbar from './components/DraftSnackbar'
import DraftRestoreBanner from './components/DraftRestoreBanner'
import NewIdeaHeader from './components/NewIdeaHeader'
import SimilarIdeaBanner from './components/SimilarIdeaBanner'
import BasicInfoSection from './components/sections/BasicInfoSection'
import FileUploadSection from './components/sections/FileUploadSection'
import ParticipantsSection from './components/sections/ParticipantsSection'
import PlanSection from './components/sections/PlanSection'
import ReviewerSelectModal from './components/modals/ReviewerSelectModal'
import SimilarIdeaSearchModal from './components/modals/SimilarIdeaSearchModal'

function SectionDivider() {
  const { isDarkMode } = useThemeMode()
  const { dividerBg } = getIdeaTheme(isDarkMode)
  return <Box sx={{ height: '1px', bgcolor: dividerBg, my: 5 }} />
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
  const [security, setSecurity] = useState<'public' | 'private'>('public')
  const [plan, setPlan] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // ─── 모달 상태 ─────────────────────────────────────────────────────────────
  const [reviewerModalOpen, setReviewerModalOpen] = useState(false)
  const [similarSearchOpen, setSimilarSearchOpen] = useState(false)

  // ─── 임시저장 ──────────────────────────────────────────────────────────────
  const {
    savedDraft, lastSavedAt, snackOpen, snackMsg, setSnackOpen,
    handleManualSave, handleRestoreDraft, handleDiscardDraft, clearDraft,
  } = useIdeaDraft(
    { title, categories, problem, solution, reviewer, security, plan },
    (draft) => {
      setTitle(draft.title ?? '')
      setCategories(draft.categories ?? [])
      setProblem(draft.problem ?? '')
      setSolution(draft.solution ?? '')
      setReviewer(draft.reviewer ?? [])
      setSecurity(draft.security ?? 'public')
      setPlan(draft.plan ?? '')
    },
  )

  // ─── 미저장 경고 ──────────────────────────────────────────────────────────
  const isDirty = !loading && !!(title.trim() || problem.trim() || solution.trim())
  const { isBlocked, proceed, reset } = useUnsavedChanges(isDirty)

  // ─── 제출 ─────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!title.trim() || categories.length === 0 || !problem.trim() || !solution.trim()) {
      showSnackbar('필수 항목을 모두 입력해주세요.', 'warning')
      return
    }
    setLoading(true)
    setTimeout(() => {
      clearDraft()
      showSnackbar('제안이 등록되었습니다!', 'success')
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  // ─── 스타일 ───────────────────────────────────────────────────────────────
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
        <NewIdeaHeader
          lastSavedAt={lastSavedAt}
          onBack={() => navigate(-1)}
          onManualSave={handleManualSave}
        />

        <SimilarIdeaBanner onOpenSearch={() => setSimilarSearchOpen(true)} />

        {savedDraft && (
          <DraftRestoreBanner
            savedDraft={savedDraft}
            onRestore={handleRestoreDraft}
            onDiscard={handleDiscardDraft}
          />
        )}

        {/* 메인 폼 카드 */}
        <Box
          sx={{
            borderRadius: 3,
            bgcolor: it.cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: it.cardShadow,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 3, background: it.headerGradient }} />

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            <BasicInfoSection
              title={title} setTitle={setTitle}
              categories={categories} setCategories={setCategories}
              problem={problem} setProblem={setProblem}
              solution={solution} setSolution={setSolution}
              inputSx={inputSx} labelSx={labelSx}
            />
            <SectionDivider />

            <ParticipantsSection
              reviewer={reviewer} setReviewer={setReviewer}
              security={security} setSecurity={setSecurity}
              onOpenReviewerModal={() => setReviewerModalOpen(true)}
            />
            <SectionDivider />

            <PlanSection plan={plan} setPlan={setPlan} />
            <SectionDivider />

            <FileUploadSection
              files={files}
              filePreviews={filePreviews}
              onFilesChange={(newFiles) => {
                const added = newFiles.slice(files.length)
                const previews = added.map((f) => f.type.startsWith('image/') ? URL.createObjectURL(f) : '')
                setFiles(newFiles)
                setFilePreviews((prev) => [...prev, ...previews])
              }}
              onRemoveFile={(index) => {
                if (filePreviews[index] && files[index]?.type.startsWith('image/')) {
                  URL.revokeObjectURL(filePreviews[index])
                }
                setFiles((prev) => prev.filter((_, i) => i !== index))
                setFilePreviews((prev) => prev.filter((_, i) => i !== index))
              }}
            />

            {/* 하단 버튼 */}
            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon sx={{ fontSize: '1rem' }} />}
                onClick={handleManualSave}
                sx={{
                  borderRadius: 2, px: 2.5, py: 1.1, fontWeight: 600, fontSize: '0.875rem', textTransform: 'none',
                  borderColor: it.accent.btnOutlineBorder,
                  color: it.accent.textMuted,
                  '&:hover': { bgcolor: it.accent.bg, borderColor: it.accent.color },
                }}
              >
                임시저장
              </Button>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    borderRadius: 2, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none',
                    borderColor: borderColor, color: textSecondary,
                    '&:hover': { borderColor: isDarkMode ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.6)', bgcolor: 'transparent' },
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
                    borderRadius: 2, px: 4, py: 1.25, fontWeight: 700, textTransform: 'none',
                    bgcolor: it.accent.color, boxShadow: 'none', color: '#fff',
                    '&:hover': { bgcolor: it.accent.hover, boxShadow: it.accent.btnHoverShadow },
                    '&.Mui-disabled': { bgcolor: it.accent.btnDisabledBg, color: '#fff' },
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

      {/* 모달 */}
      <SimilarIdeaSearchModal open={similarSearchOpen} onClose={() => setSimilarSearchOpen(false)} initialQuery={title} />
      <ReviewerSelectModal
        open={reviewerModalOpen}
        onClose={() => setReviewerModalOpen(false)}
        selected={reviewer}
        onToggle={(name) => setReviewer((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name])}
      />

      {/* 미저장 경고 */}
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

      {/* 임시저장 스낵바 */}
      <DraftSnackbar
        open={snackOpen}
        message={snackMsg}
        lastSavedAt={lastSavedAt}
        onClose={() => setSnackOpen(false)}
      />
    </Box>
  )
}

// DRAFT_KEY re-export for external use (e.g. submit clear)
export { DRAFT_KEY }
