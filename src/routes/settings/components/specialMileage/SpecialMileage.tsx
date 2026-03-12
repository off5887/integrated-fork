// src/routes/Settings/components/specialMileage/SpecialMileage.tsx
import AddIcon from '@mui/icons-material/Add'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import SaveIcon from '@mui/icons-material/Save'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { OrgMember } from '@/api/types/reviewer'

// 사번 포함 확장 타입
interface MileageMember extends OrgMember {
  employeeNumber: string
}

interface MileageEntry extends MileageMember {
  score: string
  mileage: string
  reason: string
}

// Mock 데이터 (실제 구현 시 API 연동)
const mockMembers: MileageMember[] = [
  { id: '1', name: '김개발', position: '개발팀장', department: '개발1팀', division: '디지털전략부문', employeeNumber: 'DEV001' },
  { id: '2', name: '이코딩', position: '수석개발자', department: '개발1팀', division: '디지털전략부문', employeeNumber: 'DEV002' },
  { id: '3', name: '박프론트', position: '프론트엔드', department: '개발1팀', division: '디지털전략부문', employeeNumber: 'DEV003' },
  { id: '4', name: '최기획', position: '기획팀장', department: '기획팀', division: '디지털전략부문', employeeNumber: 'PLAN001' },
  { id: '5', name: '정디자인', position: '디자이너', department: '기획팀', division: '디지털전략부문', employeeNumber: 'PLAN002' },
  { id: '6', name: '윤영업', position: '영업팀장', department: '영업1팀', division: '영업부문', employeeNumber: 'SALE001' },
  { id: '7', name: '송세일', position: '영업사원', department: '영업1팀', division: '영업부문', employeeNumber: 'SALE002' },
  { id: '8', name: '한마케팅', position: '마케팅팀장', department: '마케팅팀', division: '영업부문', employeeNumber: 'MKT001' },
  { id: '9', name: '오인사', position: '인사팀장', department: '인사팀', division: '경영지원부문', employeeNumber: 'HR001' },
  { id: '10', name: '백재무', position: '재무팀장', department: '재무팀', division: '경영지원부문', employeeNumber: 'FIN001' },
  { id: '11', name: '남총무', position: '총무', department: '총무팀', division: '경영지원부문', employeeNumber: 'GEN001' },
  { id: '12', name: '서부문장', position: '부문장', department: '전략기획실', division: '디지털전략부문', employeeNumber: 'STR001' },
  { id: '13', name: '장임원', position: '상무', department: '경영지원부문', division: '경영지원부문', employeeNumber: 'EXE001' },
]

export default function SpecialMileage() {
  const { isDarkMode } = useThemeMode()
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const headerBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'
  const rowBg = isDarkMode ? 'rgba(30,41,59,0.4)' : '#ffffff'
  const rowHoverBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'
  const panelBg = isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(99,102,241,0.02)'

  const isMobile = useMediaQuery('(max-width: 1199px)')
  const [orgPanelOpen, setOrgPanelOpen] = useState(false)
  const showOrgContent = !isMobile || orgPanelOpen

  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<MileageEntry[]>([])

  // 조직도 필터링 + 2단계 그룹핑 (부문 → 팀 → 사람)
  const grouped = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    const filtered = q
      ? mockMembers.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.employeeNumber.toLowerCase().includes(q) ||
            m.department.toLowerCase().includes(q) ||
            m.division.toLowerCase().includes(q) ||
            m.position.toLowerCase().includes(q),
        )
      : mockMembers

    // 부문 → 팀 → 사람 2단계 Map
    const divisionMap = new Map<string, Map<string, MileageMember[]>>()
    filtered.forEach((m) => {
      if (!divisionMap.has(m.division)) divisionMap.set(m.division, new Map())
      const teamMap = divisionMap.get(m.division)!
      if (!teamMap.has(m.department)) teamMap.set(m.department, [])
      teamMap.get(m.department)!.push(m)
    })

    return Array.from(divisionMap.entries()).map(([division, teamMap]) => ({
      division,
      teams: Array.from(teamMap.entries()).map(([team, people]) => ({ team, people })),
      totalCount: filtered.filter((m) => m.division === division).length,
    }))
  }, [searchTerm])

  const isSelected = (id: string) => selected.some((s) => s.id === id)

  const handleAdd = (member: MileageMember) => {
    if (isSelected(member.id)) return
    setSelected((prev) => [
      ...prev,
      { ...member, score: '', mileage: '', reason: '' },
    ])
  }

  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== id))
  }

  const handleFieldChange = (
    id: string,
    field: 'score' | 'mileage' | 'reason',
    value: string,
  ) => {
    setSelected((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    )
  }

  const handleSave = () => {
    const incomplete = selected.filter(
      (s) => s.score === '' && s.mileage === '',
    )
    if (incomplete.length > 0) {
      alert('점수 또는 마일리지를 하나 이상 입력해주세요.')
      return
    }
    console.log('특별 마일리지 저장:', selected)
    alert(`${selected.length}명에게 특별 마일리지/점수가 지급되었습니다.`)
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
      fontSize: '0.8rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': {
        borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
      },
      '&.Mui-focused fieldset': { borderColor: '#6366f1' },
    },
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiInputLabel-root': {
      color: textSecondary,
      fontSize: '0.8rem',
      '&.Mui-focused': { color: '#6366f1' },
    },
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
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: '#6366f1', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CardGiftcardIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              특별 마일리지 지급
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              조직도에서 인원을 선택하고 점수·마일리지를 개별 입력 후 저장하세요
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleSave}
          disabled={selected.length === 0}
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.8,
            fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
            bgcolor: '#6366f1', color: '#fff', boxShadow: 'none', flexShrink: 0,
            '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 6px 20px rgba(99,102,241,0.4)' },
            '&.Mui-disabled': { bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)', color: isDarkMode ? 'rgba(165,180,252,0.4)' : 'rgba(67,56,202,0.3)' },
            transition: 'all 0.2s ease',
          }}
        >
          저장하기 {selected.length > 0 && `(${selected.length}명)`}
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* 왼쪽: 조직도 패널 */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              bgcolor: isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff',
              border: `1px solid ${borderColor}`,
              borderRadius: 2.5,
              overflow: 'hidden',
            }}
          >
            {/* 패널 헤더 — 모바일에서 클릭하면 접기/펼치기 */}
            <Box
              onClick={() => isMobile && setOrgPanelOpen((v) => !v)}
              sx={{
                px: 2, py: 1.5,
                display: 'flex', alignItems: 'center', gap: 1,
                borderBottom: showOrgContent ? `1px solid ${borderColor}` : 'none',
                bgcolor: headerBg,
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none',
                transition: 'background 0.15s ease',
                '&:hover': isMobile ? { bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' } : {},
              }}
            >
              <PersonSearchIcon sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                조직도 인원
              </Typography>
              <Chip
                label={`${mockMembers.length}명`}
                size="small"
                sx={{
                  ml: 'auto', height: 18, fontSize: '0.65rem', fontWeight: 700,
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
                    transform: orgPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              )}
            </Box>

            <Collapse in={showOrgContent} timeout={220} unmountOnExit>
            <Box sx={{ p: 2 }}>
              {/* 검색 */}
              <TextField
                fullWidth
                placeholder="이름, 사번, 부서로 검색"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonSearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm('')} sx={{ color: textSecondary, p: 0.25 }}>
                          <CloseIcon sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  },
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                    fontSize: '0.875rem',
                    '& fieldset': { borderColor },
                    '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  },
                  '& .MuiInputBase-input': {
                    color: textPrimary,
                    '&::placeholder': { color: textSecondary, opacity: 1 },
                  },
                }}
              />

              {/* 조직도 아코디언 */}
              <Box
                sx={{
                  display: 'flex', flexDirection: 'column', gap: 1.5,
                  maxHeight: 520, overflow: 'auto', pr: 0.5,
                  '&::-webkit-scrollbar': { width: 4 },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': {
                    background: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                    borderRadius: 9999,
                  },
                  scrollbarWidth: 'thin',
                  scrollbarColor: isDarkMode
                    ? 'rgba(99,102,241,0.25) transparent'
                    : 'rgba(99,102,241,0.2) transparent',
                }}
              >
                {grouped.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <PersonSearchIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
                    <Typography variant="body2" sx={{ color: textSecondary }}>
                      검색 결과가 없습니다
                    </Typography>
                  </Box>
                ) : (
                  grouped.map(({ division, teams, totalCount }) => (
                    /* 부문 아코디언 */
                    <Accordion
                      key={division}
                      defaultExpanded
                      disableGutters
                      elevation={0}
                      sx={{
                        bgcolor: panelBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '10px !important',
                        '&:before': { display: 'none' },
                        '& .MuiAccordionSummary-root': {
                          borderRadius: 2.5, minHeight: 40, px: 1.75,
                          '&.Mui-expanded': { minHeight: 40 },
                        },
                        '& .MuiAccordionSummary-content': { my: 0 },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
                        sx={{
                          bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
                          borderBottom: `1px solid ${borderColor}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" fontWeight={800} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                            {division}
                          </Typography>
                          <Chip
                            label={`${totalCount}명`}
                            size="small"
                            sx={{
                              height: 16, fontSize: '0.6rem', fontWeight: 700,
                              bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                              color: isDarkMode ? '#a5b4fc' : '#4338ca',
                              '& .MuiChip-label': { px: 0.6 },
                            }}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 1, pt: 1.25 }}>
                        <Box display="flex" flexDirection="column" gap={1}>
                          {teams.map(({ team, people }) => (
                            /* 팀 아코디언 */
                            <Accordion
                              key={team}
                              defaultExpanded
                              disableGutters
                              elevation={0}
                              sx={{
                                bgcolor: 'transparent',
                                border: `1px solid ${borderColor}`,
                                borderRadius: '8px !important',
                                '&:before': { display: 'none' },
                                '& .MuiAccordionSummary-root': {
                                  minHeight: 34, px: 1.5,
                                  '&.Mui-expanded': { minHeight: 34 },
                                },
                                '& .MuiAccordionSummary-content': { my: 0 },
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color: textSecondary }} />}
                                sx={{
                                  bgcolor: isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(241,245,249,0.8)',
                                  borderBottom: `1px solid ${borderColor}`,
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                  <Typography variant="caption" fontWeight={700} sx={{ color: textSecondary, fontSize: '0.7rem' }}>
                                    {team}
                                  </Typography>
                                  <Chip
                                    label={`${people.length}`}
                                    size="small"
                                    sx={{
                                      height: 14, fontSize: '0.58rem', fontWeight: 700,
                                      bgcolor: isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.08)',
                                      color: textSecondary,
                                      '& .MuiChip-label': { px: 0.5 },
                                    }}
                                  />
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails sx={{ p: 0.75 }}>
                                <Box display="flex" flexDirection="column" gap={0.6}>
                                  {people.map((member) => {
                                    const added = isSelected(member.id)
                                    return (
                                      <Box
                                        key={member.id}
                                        onClick={() => !added && handleAdd(member)}
                                        sx={{
                                          p: 1.1,
                                          display: 'flex', alignItems: 'center', gap: 1.25,
                                          cursor: added ? 'default' : 'pointer',
                                          bgcolor: added
                                            ? isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'
                                            : isDarkMode ? 'rgba(30,41,59,0.6)' : '#ffffff',
                                          border: `1px solid ${added
                                            ? isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'
                                            : borderColor}`,
                                          borderRadius: 1.5,
                                          transition: 'all 0.15s ease',
                                          opacity: added ? 0.65 : 1,
                                          '&:hover': added ? {} : {
                                            bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
                                            borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                                          },
                                        }}
                                      >
                                        <Avatar
                                          sx={{
                                            width: 28, height: 28, flexShrink: 0,
                                            bgcolor: added
                                              ? isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.18)'
                                              : isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                                            color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                            fontSize: '0.7rem', fontWeight: 700,
                                            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                                          }}
                                        >
                                          {member.name[0]}
                                        </Avatar>
                                        <Box flex={1} minWidth={0}>
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textPrimary, lineHeight: 1.3 }}>
                                              {member.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.63rem', color: textSecondary, fontFamily: 'monospace' }}>
                                              {member.employeeNumber}
                                            </Typography>
                                          </Box>
                                          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.2, alignItems: 'center' }}>
                                            <Chip
                                              label={member.position}
                                              size="small"
                                              sx={{
                                                height: 15, fontSize: '0.58rem', fontWeight: 700,
                                                bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                                                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.13)'}`,
                                                '& .MuiChip-label': { px: 0.5 },
                                              }}
                                            />
                                          </Box>
                                        </Box>
                                        {added ? (
                                          <Chip
                                            label="선택됨"
                                            size="small"
                                            sx={{
                                              height: 16, fontSize: '0.58rem', fontWeight: 700,
                                              bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                                              color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                              '& .MuiChip-label': { px: 0.5 },
                                            }}
                                          />
                                        ) : (
                                          <AddIcon sx={{ fontSize: '0.95rem', color: textSecondary, opacity: 0.5, flexShrink: 0 }} />
                                        )}
                                      </Box>
                                    )
                                  })}
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </Box>
            </Box>
            </Collapse>
          </Box>
        </Grid>

        {/* 오른쪽: 지급 대상 및 입력 */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box
            sx={{
              bgcolor: isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff',
              border: `1px solid ${borderColor}`,
              borderRadius: 2.5,
              overflow: 'hidden',
              minHeight: 200,
            }}
          >
            {/* 패널 헤더 */}
            <Box
              sx={{
                px: 2, py: 1.5,
                display: 'flex', alignItems: 'center', gap: 1,
                borderBottom: `1px solid ${borderColor}`,
                bgcolor: headerBg,
              }}
            >
              <CardGiftcardIcon sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                지급 대상
              </Typography>
              {selected.length > 0 && (
                <Chip
                  label={`${selected.length}명 선택`}
                  size="small"
                  sx={{
                    ml: 'auto', height: 18, fontSize: '0.65rem', fontWeight: 700,
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                    color: isDarkMode ? '#a5b4fc' : '#4338ca',
                    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              )}
            </Box>

            {selected.length === 0 ? (
              /* 빈 상태 */
              <Box
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  py: 10, gap: 1.5, color: textSecondary,
                }}
              >
                <CardGiftcardIcon sx={{ fontSize: '2.5rem', opacity: 0.25 }} />
                <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 500 }}>
                  왼쪽 조직도에서 인원을 선택하세요
                </Typography>
                <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.7 }}>
                  이름, 사번, 부서로 검색할 수 있습니다
                </Typography>
              </Box>
            ) : (
              <>
                {/* 모바일 카드 (xs ~ sm) */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5, p: 2 }}>
                  {selected.map((entry) => (
                    <Box
                      key={entry.id}
                      sx={{
                        bgcolor: rowBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 2, overflow: 'hidden',
                      }}
                    >
                      {/* 카드 헤더 */}
                      <Box
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 1.5,
                          px: 2, py: 1.5, borderBottom: `1px solid ${borderColor}`,
                          bgcolor: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32, height: 32, flexShrink: 0,
                            bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                            color: isDarkMode ? '#a5b4fc' : '#4338ca',
                            fontSize: '0.8rem', fontWeight: 700,
                            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                          }}
                        >
                          {entry.name[0]}
                        </Avatar>
                        <Box flex={1} minWidth={0}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>
                              {entry.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: textSecondary, fontFamily: 'monospace' }}>
                              {entry.employeeNumber}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                            {entry.department} · {entry.position}
                          </Typography>
                        </Box>
                        <Tooltip title="선택 해제">
                          <IconButton
                            size="small"
                            onClick={() => handleRemove(entry.id)}
                            sx={{
                              color: textSecondary,
                              '&:hover': { color: '#ef4444', bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
                            }}
                          >
                            <CloseIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* 입력 필드 */}
                      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <TextField
                            label="점수"
                            size="small"
                            type="number"
                            value={entry.score}
                            onChange={(e) => handleFieldChange(entry.id, 'score', e.target.value)}
                            placeholder="0"
                            slotProps={{ htmlInput: { min: 0 } }}
                            sx={{ flex: 1, ...inputSx }}
                          />
                          <TextField
                            label="마일리지"
                            size="small"
                            type="number"
                            value={entry.mileage}
                            onChange={(e) => handleFieldChange(entry.id, 'mileage', e.target.value)}
                            placeholder="0"
                            slotProps={{ htmlInput: { min: 0 } }}
                            sx={{ flex: 1, ...inputSx }}
                          />
                        </Box>
                        <TextField
                          label="지급 사유"
                          size="small"
                          value={entry.reason}
                          onChange={(e) => handleFieldChange(entry.id, 'reason', e.target.value)}
                          placeholder="예: 프로젝트 우수 기여"
                          multiline
                          minRows={2}
                          sx={{ ...inputSx }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* 데스크탑 테이블 (md+) */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: headerBg }}>
                        {['이름 / 사번', '부서', '점수', '마일리지', '지급 사유', ''].map((label, i) => (
                          <TableCell
                            key={i}
                            align={i === 5 ? 'center' : 'left'}
                            sx={{
                              color: textSecondary, fontWeight: 600, fontSize: '0.7rem',
                              letterSpacing: '0.05em', textTransform: 'uppercase',
                              py: 1.5, borderBottomColor: borderColor,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selected.map((entry) => (
                        <TableRow
                          key={entry.id}
                          sx={{
                            bgcolor: rowBg,
                            transition: 'background-color 0.15s ease',
                            '&:hover': { bgcolor: rowHoverBg },
                            '& .MuiTableCell-root': { borderBottomColor: borderColor, py: 1.25 },
                          }}
                        >
                          {/* 이름/사번 */}
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                              <Avatar
                                sx={{
                                  width: 28, height: 28, flexShrink: 0,
                                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                  fontSize: '0.72rem', fontWeight: 700,
                                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.15)'}`,
                                }}
                              >
                                {entry.name[0]}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>
                                  {entry.name}
                                </Typography>
                                <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace' }}>
                                  {entry.employeeNumber}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* 부서/직급 */}
                          <TableCell>
                            <Typography sx={{ fontSize: '0.78rem', color: textSecondary, lineHeight: 1.3 }}>
                              {entry.department}
                            </Typography>
                            <Chip
                              label={entry.position}
                              size="small"
                              sx={{
                                mt: 0.25, height: 16, fontSize: '0.6rem', fontWeight: 700,
                                bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.13)'}`,
                                '& .MuiChip-label': { px: 0.5 },
                              }}
                            />
                          </TableCell>

                          {/* 점수 */}
                          <TableCell sx={{ minWidth: 90 }}>
                            <TextField
                              size="small"
                              type="number"
                              value={entry.score}
                              onChange={(e) => handleFieldChange(entry.id, 'score', e.target.value)}
                              placeholder="0"
                              slotProps={{ htmlInput: { min: 0, style: { textAlign: 'center', padding: '6px 8px' } } }}
                              sx={{
                                width: 88,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                                  fontSize: '0.82rem',
                                  '& fieldset': { borderColor },
                                  '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
                                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                },
                                '& .MuiInputBase-input': { color: textPrimary },
                              }}
                            />
                          </TableCell>

                          {/* 마일리지 */}
                          <TableCell sx={{ minWidth: 100 }}>
                            <TextField
                              size="small"
                              type="number"
                              value={entry.mileage}
                              onChange={(e) => handleFieldChange(entry.id, 'mileage', e.target.value)}
                              placeholder="0"
                              slotProps={{ htmlInput: { min: 0, style: { textAlign: 'center', padding: '6px 8px' } } }}
                              sx={{
                                width: 88,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                                  fontSize: '0.82rem',
                                  '& fieldset': { borderColor },
                                  '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
                                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                },
                                '& .MuiInputBase-input': { color: textPrimary },
                              }}
                            />
                          </TableCell>

                          {/* 지급 사유 */}
                          <TableCell sx={{ minWidth: 200 }}>
                            <TextField
                              size="small"
                              value={entry.reason}
                              onChange={(e) => handleFieldChange(entry.id, 'reason', e.target.value)}
                              placeholder="지급 사유 입력"
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
                                  fontSize: '0.8rem',
                                  '& fieldset': { borderColor },
                                  '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
                                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                },
                                '& .MuiInputBase-input': {
                                  color: textPrimary, padding: '6px 10px',
                                  '&::placeholder': { color: textSecondary, opacity: 0.7 },
                                },
                              }}
                            />
                          </TableCell>

                          {/* 삭제 */}
                          <TableCell align="center" sx={{ width: 40 }}>
                            <Tooltip title="선택 해제">
                              <IconButton
                                size="small"
                                onClick={() => handleRemove(entry.id)}
                                sx={{
                                  color: textSecondary, opacity: 0.6,
                                  '&:hover': { color: '#ef4444', opacity: 1, bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <CloseIcon sx={{ fontSize: '0.95rem' }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
