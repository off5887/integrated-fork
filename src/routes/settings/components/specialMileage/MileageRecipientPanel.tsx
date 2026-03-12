import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import type { MileageEntry } from '../../types'

interface Props {
  selected: MileageEntry[]
  onRemove: (id: string) => void
  onFieldChange: (id: string, field: 'score' | 'mileage' | 'reason', value: string) => void
}

export default function MileageRecipientPanel({ selected, onRemove, onFieldChange }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, rowBg, rowHoverBg, headerBg } = usePageColors()

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
                      onClick={() => onRemove(entry.id)}
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
                      onChange={(e) => onFieldChange(entry.id, 'score', e.target.value)}
                      placeholder="0"
                      slotProps={{ htmlInput: { min: 0 } }}
                      sx={{ flex: 1, ...inputSx }}
                    />
                    <TextField
                      label="마일리지"
                      size="small"
                      type="number"
                      value={entry.mileage}
                      onChange={(e) => onFieldChange(entry.id, 'mileage', e.target.value)}
                      placeholder="0"
                      slotProps={{ htmlInput: { min: 0 } }}
                      sx={{ flex: 1, ...inputSx }}
                    />
                  </Box>
                  <TextField
                    label="지급 사유"
                    size="small"
                    value={entry.reason}
                    onChange={(e) => onFieldChange(entry.id, 'reason', e.target.value)}
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
                        onChange={(e) => onFieldChange(entry.id, 'score', e.target.value)}
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
                        onChange={(e) => onFieldChange(entry.id, 'mileage', e.target.value)}
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
                        onChange={(e) => onFieldChange(entry.id, 'reason', e.target.value)}
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
                          onClick={() => onRemove(entry.id)}
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
  )
}
