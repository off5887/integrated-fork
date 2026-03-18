// src/routes/tf/components/MercenaryInvitePanel.tsx
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getTFTheme } from '@/theme/tfTheme'
import type { Employee, ExtendedIdea } from '@/api/types/mercenary'

interface MercenaryInvitePanelProps {
  employees: Employee[]
  myIdeas: ExtendedIdea[]
  search: string
  onSearchChange: (value: string) => void
  onDragStart: (e: React.DragEvent<HTMLElement>, emp: Employee) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, ideaId: number) => void
  onRemoveMercenary: (ideaId: number, empId: number) => void
}

export default function MercenaryInvitePanel({
  employees,
  myIdeas,
  search,
  onSearchChange,
  onDragStart,
  onDrop,
  onRemoveMercenary,
}: MercenaryInvitePanelProps) {
  const colors = usePageColors()
  const { isDarkMode } = useThemeMode()
  const tf = getTFTheme(isDarkMode)

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', lg: '5fr 7fr' }}
      gap={3}
    >
      {/* 왼쪽: 조직도 (드래그 소스) */}
      <Box
        sx={{
          bgcolor: colors.cardBg,
          borderRadius: 3,
          border: `1px solid ${colors.borderColor}`,
          boxShadow: colors.cardShadow,
          overflow: 'hidden',
          height: 'fit-content',
        }}
      >
        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: colors.textPrimary, mb: 3, letterSpacing: '-0.01em' }}
          >
            조직도에서 선택
          </Typography>

          <TextField
            fullWidth
            placeholder="이름 또는 부서 검색"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: tf.searchInputBg,
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: colors.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: tf.searchHoverBorder,
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                },
              },
              '& .MuiInputBase-input': {
                color: colors.textPrimary,
                '&::placeholder': { color: colors.textSecondary, opacity: 1 },
              },
            }}
          />

          <List disablePadding sx={{ maxHeight: 560, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {employees
              .filter(
                (e) => e.name.includes(search) || e.dept.includes(search),
              )
              .map((emp) => (
                <ListItem
                  key={emp.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, emp)}
                  sx={{
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                    bgcolor: colors.rowBg,
                    borderRadius: 2,
                    border: `1px solid ${colors.borderColor}`,
                    px: 2,
                    py: 1.25,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: colors.rowHoverBg,
                      borderColor: tf.hoverAccentBorder,
                    },
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 42 }}>
                    <Avatar
                      sx={{
                        width: 34, height: 34,
                        bgcolor: colors.accentBg,
                        color: colors.accentColor,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        border: `1px solid ${colors.accentBorder}`,
                      }}
                    >
                      {emp.name[0]}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={emp.name}
                    secondary={`${emp.dept} · ${emp.position}`}
                    slotProps={{
                      primary: { style: { fontWeight: 700, fontSize: '0.875rem', color: colors.textPrimary } },
                      secondary: { style: { fontSize: '0.75rem', color: colors.textSecondary } },
                    }}
                  />

                  <DragIndicatorIcon sx={{ color: colors.textSecondary, opacity: 0.5, fontSize: '1.1rem' }} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>

      {/* 오른쪽: 아이디어별 용병 초대 영역 */}
      <Box
        sx={{
          bgcolor: colors.cardBg,
          borderRadius: 3,
          border: `1px solid ${colors.borderColor}`,
          boxShadow: colors.cardShadow,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: colors.textPrimary, mb: 1, letterSpacing: '-0.01em' }}
          >
            내 아이디어에 용병 초대하기
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary, display: 'block', mb: 3.5 }}>
            왼쪽 목록에서 팀원을 드래그해서 아이디어 카드에 놓으세요
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {myIdeas.map((idea) => (
              <Box
                key={idea.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, idea.id)}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  border: `1.5px dashed`,
                  borderColor: tf.dropZoneBorder,
                  borderRadius: 2.5,
                  bgcolor: tf.dropZoneBg,
                  minHeight: 110,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: tf.dropZoneHoverBorder,
                    bgcolor: tf.dropZoneHoverBg,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Chip
                    label={idea.field}
                    size="small"
                    sx={{
                      bgcolor: colors.accentBg,
                      color: colors.accentColor,
                      border: `1px solid ${colors.accentBorder}`,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ color: colors.textPrimary, fontSize: '0.875rem', flex: 1 }}
                  >
                    {idea.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textSecondary,
                      flexShrink: 0,
                      bgcolor: tf.countBadgeBg,
                      px: 1.25, py: 0.4,
                      borderRadius: 9999,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    {idea.mercenaries.length}명
                  </Typography>
                </Box>

                {idea.mercenaries.length === 0 ? (
                  <Typography
                    sx={{
                      color: colors.textSecondary,
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      py: 2,
                      opacity: 0.7,
                    }}
                  >
                    여기에 팀원을 드래그하세요
                  </Typography>
                ) : (
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {idea.mercenaries.map((emp) => (
                      <Chip
                        key={emp.id}
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: tf.chipAvatarBg,
                              color: tf.chipAvatarColor,
                              fontSize: '0.7rem',
                              fontWeight: 700,
                            }}
                          >
                            {emp.name[0]}
                          </Avatar>
                        }
                        label={`${emp.name} · ${emp.dept}`}
                        onDelete={() => onRemoveMercenary(idea.id, emp.id)}
                        size="small"
                        sx={{
                          bgcolor: colors.accentBg,
                          color: tf.chipColor,
                          border: `1px solid ${colors.accentBorder}`,
                          fontWeight: 600,
                          fontSize: '0.78rem',
                          '& .MuiChip-deleteIcon': {
                            color: tf.deleteIconColor,
                            '&:hover': {
                              color: tf.deleteIconHoverColor,
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
