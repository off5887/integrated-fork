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
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { MileageEntry } from '@/api/types/settings'

interface Props {
  selected: MileageEntry[]
  onRemove: (id: string) => void
  onFieldChange: (id: string, field: 'mileage' | 'reason', value: string) => void
}

export default function MileageRecipientPanel({ selected, onRemove, onFieldChange }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, rowBg, rowHoverBg, headerBg } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: st.inputBg,
      fontSize: '0.8rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: st.inputHoverBorder },
      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
    },
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiInputLabel-root': {
      color: textSecondary,
      fontSize: '0.8rem',
      '&.Mui-focused': { color: st.inputFocusBorder },
    },
  }

  return (
    <Box
      sx={{
        bgcolor: st.panelBg,
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
        <CardGiftcardIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />
        <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
          지급 대상
        </Typography>
        {selected.length > 0 && (
          <Chip
            label={`${selected.length}명 선택`}
            size="small"
            sx={{
              ml: 'auto', height: 18, fontSize: '0.65rem', fontWeight: 700,
              bgcolor: st.chipBg,
              color: st.primaryColor,
              border: `1px solid ${st.avatarBorder}`,
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
                    bgcolor: st.accordionDivisionBg,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32, height: 32, flexShrink: 0,
                      bgcolor: st.avatarBg,
                      color: st.primaryColor,
                      fontSize: '0.8rem', fontWeight: 700,
                      border: `1px solid ${st.avatarBorder}`,
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
                        '&:hover': { color: st.deleteHoverColor, bgcolor: st.deleteHoverBg },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* 입력 필드 */}
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <TextField
                    label="마일리지"
                    size="small"
                    type="number"
                    value={entry.mileage}
                    onChange={(e) => onFieldChange(entry.id, 'mileage', e.target.value)}
                    placeholder="0"
                    slotProps={{ htmlInput: { min: 0 } }}
                    sx={{ ...inputSx }}
                  />
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
                  {['이름 / 사번', '부서', '마일리지', '지급 사유', ''].map((label, i) => (
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
                            bgcolor: st.avatarBgLight,
                            color: st.primaryColor,
                            fontSize: '0.72rem', fontWeight: 700,
                            border: `1px solid ${st.avatarBorder}`,
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
                          bgcolor: st.chipBg,
                          color: st.primaryColor,
                          border: `1px solid ${st.avatarBorder}`,
                          '& .MuiChip-label': { px: 0.5 },
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
                        sx={{ width: 88, ...inputSx }}
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
                            bgcolor: st.inputBg,
                            fontSize: '0.8rem',
                            '& fieldset': { borderColor },
                            '&:hover fieldset': { borderColor: st.inputHoverBorder },
                            '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
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
                            '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg },
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
