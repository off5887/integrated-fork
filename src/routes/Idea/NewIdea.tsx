// src/routes/idea/NewIdea.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

import BasicInfoSection from './Components/BasicInfoSection'
import FileUploadSection from './Components/FileUploadSection'
import ParticipantsSection from './Components/ParticipantsSection'
import ScheduleAndVisibilitySection from './Components/ScheduleAndVisibilitySection'

// 모달 컴포넌트
import CoProposerSelectModal from './components/CoProposerSelectModal'
import ReviewerSelectModal from './components/ReviewerSelectModal'

export default function NewIdea() {
  const theme = useTheme()
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

  // 모달 상태
  const [reviewerModalOpen, setReviewerModalOpen] = useState(false)
  const [coProposerModalOpen, setCoProposerModalOpen] = useState(false)

  // 선택 핸들러
  const handleAddReviewer = (name: string) => {
    if (!reviewer.includes(name)) {
      setReviewer([...reviewer, name])
    }
  }

  const handleAddCoProposer = (name: string) => {
    if (!coProposers.includes(name)) {
      setCoProposers([...coProposers, name])
    }
  }

  const handleSubmit = () => {
    if (
      !title.trim() ||
      !problem.trim() ||
      !solution.trim() ||
      !startDate ||
      !endDate
    ) {
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

  const inputSx = {
    bgcolor: isDarkMode ? 'rgba(30,41,59,0.88)' : 'rgba(255,255,255,0.97)',
    borderRadius: 3,
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode
        ? 'rgba(148,163,184,0.6)'
        : 'rgba(148,163,184,0.6)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? '#94a3b8' : '#64748b',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? '#60a5fa' : '#3b82f6',
      borderWidth: 2,
    },
  }

  const labelSx = {
    color: isDarkMode ? '#94a3b8' : '#475569',
    fontWeight: 500,
    '&.Mui-focused': {
      color: isDarkMode ? '#60a5fa' : '#3b82f6',
    },
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0f172a' : '#f8fafc',
        pt: { xs: 10, md: 12 },
        pb: 16,
        px: { xs: 2, sm: 4 },
        transition: 'background-color 0.4s ease',
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: { xs: 5, md: 7 },
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              color: isDarkMode ? '#cbd5e1' : '#475569',
              bgcolor: isDarkMode
                ? 'rgba(30,41,59,0.5)'
                : 'rgba(241,245,249,0.7)',
              '&:hover': {
                bgcolor: isDarkMode
                  ? 'rgba(71,85,105,0.7)'
                  : 'rgba(226,232,240,0.9)',
              },
              borderRadius: 2,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: isDarkMode ? '#f1f5f9' : '#0f172a' }}
          >
            새로운 상상 제안
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: 4,
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            bgcolor: isDarkMode
              ? 'rgba(30,41,59,0.85)'
              : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(24px)',
            boxShadow: isDarkMode
              ? '0 20px 60px rgba(0,0,0,0.5)'
              : '0 20px 60px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, sm: 5, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 1100 }}>
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

              <Box sx={{ mt: 10 }}>
                <ParticipantsSection
                  reviewer={reviewer}
                  setReviewer={setReviewer}
                  coProposers={coProposers}
                  setCoProposers={setCoProposers}
                  isDarkMode={isDarkMode}
                  onOpenReviewerModal={() => setReviewerModalOpen(true)}
                  onOpenCoProposerModal={() => setCoProposerModalOpen(true)}
                />
              </Box>

              <Box sx={{ mt: 10 }}>
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
              </Box>

              {/* 4. 실행 계획 */}
              <Box sx={{ mt: 10 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    mb: 4,
                    color: isDarkMode ? '#60a5fa' : '#2563eb',
                  }}
                >
                  4. 실행 계획
                </Typography>
                <TextField
                  fullWidth
                  label="구체적인 실행 계획을 작성해주세요"
                  multiline
                  rows={7}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  InputProps={{ sx: inputSx }}
                  InputLabelProps={{ sx: labelSx }}
                />
              </Box>

              {/* 5. 첨부 자료 */}
              <Box sx={{ mt: 10 }}>
                <FileUploadSection
                  files={files}
                  filePreviews={filePreviews}
                  onFilesChange={(newFilesFromChild) => {
                    const addedFiles = newFilesFromChild.slice(files.length)
                    const newPreviews = addedFiles.map((file) =>
                      file.type.startsWith('image/')
                        ? URL.createObjectURL(file)
                        : '',
                    )

                    setFiles(newFilesFromChild)
                    setFilePreviews((prev) => [...prev, ...newPreviews])
                  }}
                  onRemoveFile={(index) => {
                    // 메모리 누수 방지
                    if (
                      filePreviews[index] &&
                      files[index]?.type.startsWith('image/')
                    ) {
                      URL.revokeObjectURL(filePreviews[index])
                    }

                    setFiles((prev) => prev.filter((_, i) => i !== index))
                    setFilePreviews((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }}
                  isDarkMode={isDarkMode}
                />
              </Box>

              {/* 제출 버튼 */}
              <Box sx={{ mt: 12, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={loading}
                  onClick={handleSubmit}
                  startIcon={loading ? null : <SendIcon />}
                  sx={{
                    px: 12,
                    py: 2.5,
                    borderRadius: 3,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    minWidth: 320,
                    boxShadow: isDarkMode
                      ? '0 12px 32px rgba(59,130,246,0.45)'
                      : '0 12px 32px rgba(59,130,246,0.3)',
                    bgcolor: isDarkMode ? '#3b82f6' : '#2563eb',
                    '&:hover': {
                      bgcolor: isDarkMode ? '#60a5fa' : '#3b82f6',
                      boxShadow: isDarkMode
                        ? '0 16px 40px rgba(59,130,246,0.65)'
                        : '0 16px 40px rgba(59,130,246,0.45)',
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? '등록 중...' : '상상 제안하기'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 모달 렌더링 */}
        <ReviewerSelectModal
          open={reviewerModalOpen}
          onClose={() => setReviewerModalOpen(false)}
          selected={reviewer}
          onSelect={handleAddReviewer}
        />

        <CoProposerSelectModal
          open={coProposerModalOpen}
          onClose={() => setCoProposerModalOpen(false)}
          selected={coProposers}
          onSelect={handleAddCoProposer}
        />
      </Box>
    </Box>
  )
}
