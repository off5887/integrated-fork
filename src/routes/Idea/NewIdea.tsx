// src/routes/idea/newIdea.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

export default function NewIdea() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [security, setSecurity] = useState<'public' | 'private'>('public')
  const [reviewer, setReviewer] = useState<string[]>([])
  const [coProposers, setCoProposers] = useState<string[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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
    // 실제 API 호출은 여기에 구현
    setTimeout(() => {
      alert('제안이 등록되었습니다!')
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleBack = () => navigate(-1)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0f172a' : '#f8fafc',
        pt: { xs: 10, md: 12 },
        pb: 12,
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        transition: 'background-color 0.3s',
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 타이틀 + 뒤로가기 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: { xs: 4, md: 6 },
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              color: isDarkMode ? '#cbd5e1' : '#475569',
              '&:hover': {
                bgcolor: isDarkMode
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            sx={{ color: isDarkMode ? '#f1f5f9' : '#0f172a' }}
          >
            상상하기
          </Typography>
        </Box>

        {/* 메인 폼 카드 */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
            bgcolor: isDarkMode
              ? 'rgba(30, 41, 59, 0.72)'
              : 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {/* 제목 - 전체 너비 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="제목"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                      borderRadius: 2,
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: isDarkMode ? '#94a3b8' : '#475569',
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </Grid>

              {/* 문제점 도출 - 전체 너비 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="문제점 도출"
                  multiline
                  rows={5}
                  variant="outlined"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                      borderRadius: 2,
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: isDarkMode ? '#94a3b8' : '#475569' },
                  }}
                />
              </Grid>

              {/* 해결대안 - 전체 너비 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="해결대안"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                      borderRadius: 2,
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: isDarkMode ? '#94a3b8' : '#475569' },
                  }}
                />
              </Grid>

              {/* 심사자 + 공동제안자 (md 이상에서 50:50) */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    bgcolor: isDarkMode
                      ? 'rgba(15,23,42,0.4)'
                      : 'rgba(241,245,249,0.7)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormLabel
                    sx={{
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    심사자
                  </FormLabel>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 2,
                      minHeight: 40,
                    }}
                  >
                    {reviewer.map((name, i) => (
                      <Chip
                        key={i}
                        label={name}
                        color="primary"
                        variant="outlined"
                        size="medium"
                      />
                    ))}
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    fullWidth
                    onClick={() => alert('심사자 선택 팝업')}
                    sx={{
                      borderColor: isDarkMode
                        ? 'rgba(165,180,252,0.6)'
                        : 'primary.main',
                      color: isDarkMode ? '#c7d2fe' : 'primary.main',
                      borderRadius: 2,
                      py: 1.2,
                    }}
                  >
                    심사자 찾기
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    bgcolor: isDarkMode
                      ? 'rgba(15,23,42,0.4)'
                      : 'rgba(241,245,249,0.7)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormLabel
                    sx={{
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    공동제안자
                  </FormLabel>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 2,
                      minHeight: 40,
                    }}
                  >
                    {coProposers.map((name, i) => (
                      <Chip
                        key={i}
                        label={name}
                        color="secondary"
                        variant="outlined"
                        size="medium"
                      />
                    ))}
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<GroupAddIcon />}
                    fullWidth
                    onClick={() => alert('공동제안자 선택 팝업')}
                    sx={{
                      borderColor: isDarkMode
                        ? 'rgba(251,191,36,0.6)'
                        : 'secondary.main',
                      color: isDarkMode ? '#fde68a' : 'secondary.main',
                      borderRadius: 2,
                      py: 1.2,
                    }}
                  >
                    팀원 찾기
                  </Button>
                </Paper>
              </Grid>

              {/* 실행 일정 - 전체 너비 */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    bgcolor: isDarkMode
                      ? 'rgba(15,23,42,0.4)'
                      : 'rgba(241,245,249,0.7)',
                  }}
                >
                  <FormLabel
                    sx={{
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      mb: 2,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    실행 일정
                  </FormLabel>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="시작일"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          sx: {
                            bgcolor: isDarkMode
                              ? 'rgba(15,23,42,0.5)'
                              : '#ffffff',
                            color: isDarkMode ? '#f1f5f9' : '#0f172a',
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="종료일"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          sx: {
                            bgcolor: isDarkMode
                              ? 'rgba(15,23,42,0.5)'
                              : '#ffffff',
                            color: isDarkMode ? '#f1f5f9' : '#0f172a',
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 보안 설정 - 전체 너비 (필요 시 위치 조정 가능) */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    bgcolor: isDarkMode
                      ? 'rgba(15,23,42,0.4)'
                      : 'rgba(241,245,249,0.7)',
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      sx={{
                        color: isDarkMode ? '#cbd5e1' : '#334155',
                        mb: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      공개 범위
                    </FormLabel>
                    <RadioGroup
                      row
                      value={security}
                      onChange={(e) =>
                        setSecurity(e.target.value as 'public' | 'private')
                      }
                      sx={{ gap: 4 }}
                    >
                      <FormControlLabel
                        value="public"
                        control={<Radio color="primary" />}
                        label="전체 공개"
                        sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio color="primary" />}
                        label="전체 미공개"
                        sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>

              {/* 실행계획 - 전체 너비 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="실행계획"
                  multiline
                  rows={8}
                  variant="outlined"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  InputProps={{
                    sx: {
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                      borderRadius: 2,
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: isDarkMode ? '#94a3b8' : '#475569' },
                  }}
                />
              </Grid>

              {/* 파일 첨부 - 전체 너비 */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    bgcolor: isDarkMode
                      ? 'rgba(15,23,42,0.4)'
                      : 'rgba(241,245,249,0.7)',
                  }}
                >
                  <FormLabel
                    sx={{
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      mb: 2,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    파일 첨부 (여러 개 가능)
                  </FormLabel>

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AttachFileIcon />}
                    sx={{
                      mb: 3,
                      borderColor: isDarkMode
                        ? 'rgba(165,180,252,0.6)'
                        : 'primary.main',
                      color: isDarkMode ? '#c7d2fe' : 'primary.main',
                      borderRadius: 2,
                      px: 5,
                      py: 1.2,
                    }}
                  >
                    파일 선택
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>

                  {files.length > 0 && (
                    <Grid container spacing={2}>
                      {files.map((file, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                          <Box
                            sx={{
                              position: 'relative',
                              borderRadius: 2,
                              overflow: 'hidden',
                              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'}`,
                              bgcolor: isDarkMode
                                ? 'rgba(30,41,59,0.65)'
                                : 'rgba(241,245,249,0.85)',
                              aspectRatio: '1 / 1',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                            }}
                          >
                            {filePreviews[index] ? (
                              <Box
                                component="img"
                                src={filePreviews[index]}
                                alt={file.name}
                                sx={{
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
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
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
                                top: 6,
                                right: 6,
                                bgcolor: 'rgba(0,0,0,0.65)',
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' },
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* 제출 버튼 - 가운데 정렬 */}
            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  px: { xs: 8, md: 12 },
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  minWidth: 240,
                  boxShadow: '0 6px 24px rgba(99,102,241,0.3)',
                  '&:hover': {
                    boxShadow: '0 10px 32px rgba(99,102,241,0.4)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? '등록 중...' : '제안 등록하기'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
