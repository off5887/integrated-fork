// src/routes/idea/NewIdea.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

import BasicInfoSection from './Components/BasicInfoSection'
import FileUploadSection from './Components/FileUploadSection'
import ParticipantsSection from './Components/ParticipantsSection'
import ScheduleAndVisibilitySection from './Components/ScheduleAndVisibilitySection'

import CoProposerSelectModal from './Components/CoProposerSelectModal'
import ReviewerSelectModal from './Components/ReviewerSelectModal'

function SectionDivider({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.4)',
        my: 5,
      }}
    />
  )
}

export default function NewIdea() {
  const { isDarkMode } = useThemeMode()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
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

  const [reviewerModalOpen, setReviewerModalOpen] = useState(false)
  const [coProposerModalOpen, setCoProposerModalOpen] = useState(false)

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

  const handleSubmit = () => {
    if (!title.trim() || !problem.trim() || !solution.trim() || !startDate || !endDate) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      alert('제안이 등록되었습니다!')
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleBack = () => navigate(-1)

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
        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
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
          <Box>
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
        </Box>

        {/* 메인 폼 카드 */}
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
          {/* 상단 컬러 스트립 */}
          <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            <BasicInfoSection
              title={title}
              setTitle={setTitle}
              problem={problem}
              setProblem={setProblem}
              solution={solution}
              setSolution={setSolution}
              inputSx={inputSx}
              labelSx={labelSx}
              isDarkMode={isDarkMode}
            />

            <SectionDivider isDarkMode={isDarkMode} />

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

            {/* 4. 실행 계획 */}
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
              <TextField
                fullWidth
                label="구체적인 실행 계획을 작성해주세요"
                multiline
                rows={7}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                slotProps={{
                  input: { sx: inputSx },
                  inputLabel: { sx: labelSx },
                }}
              />
            </Box>

            <SectionDivider isDarkMode={isDarkMode} />

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

            {/* 제출 버튼 */}
            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  borderRadius: 2, px: 3, py: 1.25, fontWeight: 600,
                  borderColor: borderColor, color: textSecondary,
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
                  borderRadius: 2, px: 4, py: 1.25, fontWeight: 700,
                  bgcolor: '#6366f1', boxShadow: 'none',
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
    </Box>
  )
}
