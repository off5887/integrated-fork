// src/routes/idea/NewIdea.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

import BasicInfoSection from './BasicInfoSection'
import ParticipantsSection from './ParticipantsSection'
import ScheduleAndVisibilitySection from './ScheduleAndVisibilitySection'

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles])

    const previews = newFiles.map((file) =>
      file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
    )
    setFilePreviews((prev) => [...prev, ...previews])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFilePreviews((prev) => prev.filter((_, i) => i !== index))
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
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    mb: 4,
                    color: isDarkMode ? '#60a5fa' : '#2563eb',
                  }}
                >
                  5. 첨부 자료
                </Typography>

                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    bgcolor: isDarkMode
                      ? 'rgba(30,41,59,0.85)'
                      : 'rgba(255,255,255,0.94)',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)'}`,
                    boxShadow: isDarkMode
                      ? '0 10px 40px rgba(0,0,0,0.4)'
                      : '0 10px 40px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<AttachFileIcon />}
                    sx={{
                      mb: 4,
                      borderRadius: 3,
                      px: { xs: 4, md: 6 },
                      py: 1.6,
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      bgcolor: isDarkMode ? '#475569' : '#64748b',
                      color: '#ffffff',
                      '&:hover': {
                        bgcolor: isDarkMode ? '#64748b' : '#475569',
                        boxShadow: isDarkMode
                          ? '0 6px 20px rgba(100,116,139,0.4)'
                          : '0 6px 20px rgba(71,85,105,0.3)',
                      },
                    }}
                  >
                    파일 첨부 (여러 개 가능)
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>

                  {files.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                      {files.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: 'relative',
                            width: 160,
                            height: 160,
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'}`,
                            bgcolor: isDarkMode
                              ? 'rgba(30,41,59,0.88)'
                              : '#f8fafc',
                            boxShadow: isDarkMode
                              ? '0 4px 16px rgba(0,0,0,0.35)'
                              : '0 4px 16px rgba(0,0,0,0.08)',
                            transition:
                              'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.04)',
                              boxShadow: isDarkMode
                                ? '0 12px 32px rgba(0,0,0,0.5)'
                                : '0 12px 32px rgba(0,0,0,0.15)',
                            },
                          }}
                        >
                          {filePreviews[index] ? (
                            <img
                              src={filePreviews[index]}
                              alt={file.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                textAlign: 'center',
                                bgcolor: isDarkMode
                                  ? 'rgba(15,23,42,0.4)'
                                  : 'rgba(241,245,249,0.6)',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: isDarkMode ? '#cbd5e1' : '#475569',
                                  fontWeight: 500,
                                }}
                                noWrap
                              >
                                {file.name}
                              </Typography>
                            </Box>
                          )}

                          <IconButton
                            size="small"
                            onClick={() => removeFile(index)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: isDarkMode
                                ? 'rgba(0,0,0,0.7)'
                                : 'rgba(0,0,0,0.65)',
                              color: '#ffffff',
                              '&:hover': {
                                bgcolor: 'rgba(239,68,68,0.9)',
                                transform: 'scale(1.15)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        py: 6,
                        textAlign: 'center',
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                      }}
                    >
                      <Typography variant="body1" fontWeight={500}>
                        아직 첨부된 파일이 없습니다
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        버튼을 눌러 자료를 추가해 주세요
                      </Typography>
                    </Box>
                  )}
                </Paper>
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
      </Box>
    </Box>
  )
}
