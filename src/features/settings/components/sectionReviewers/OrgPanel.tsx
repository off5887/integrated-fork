import CheckIcon from '@mui/icons-material/Check'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { OrgMember } from '@/api/types/reviewer'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { levelConfig } from '../../config/levelConfig'

interface Props {
  members: OrgMember[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedIds?: string[]
  onAdd?: (member: OrgMember, level: 1 | 2 | 3) => void
}

const OrgPanel: React.FC<Props> = ({
  members,
  searchTerm,
  setSearchTerm,
  selectedIds = [],
  onAdd,
}) => {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const isMobile = useMediaQuery('(max-width: 1199px)')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const showContent = !isMobile || panelOpen

  const grouped = useMemo(() => {
    const filtered = members.filter(
      (m) =>
        m.name.includes(searchTerm) ||
        m.position.includes(searchTerm) ||
        m.department.includes(searchTerm) ||
        m.division.includes(searchTerm),
    )
    const map = new Map<string, OrgMember[]>()
    filtered.forEach((m) => {
      if (!map.has(m.division)) map.set(m.division, [])
      map.get(m.division)!.push(m)
    })
    return Array.from(map.entries())
  }, [members, searchTerm])

  const handleCardClick = (member: OrgMember) => {
    if (!isMobile || selectedIds.includes(member.id)) return
    setExpandedId((prev) => (prev === member.id ? null : member.id))
  }

  const handleLevelSelect = (
    e: React.MouseEvent,
    member: OrgMember,
    level: 1 | 2 | 3,
  ) => {
    e.stopPropagation()
    onAdd?.(member, level)
    setExpandedId(null)
  }

  return (
    <Box
      sx={{
        bgcolor: st.panelBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* 패널 헤더 — 모바일에서 클릭하면 접기/펼치기 */}
      <Box
        onClick={() => isMobile && setPanelOpen((v) => !v)}
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: st.accordionDivisionBg,
          borderBottom: showContent ? `1px solid ${borderColor}` : 'none',
          cursor: isMobile ? 'pointer' : 'default',
          userSelect: 'none',
          transition: 'background 0.15s ease',
          '&:hover': isMobile ? { bgcolor: st.memberRowHoverBg } : {},
        }}
      >
        <PeopleAltOutlinedIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: st.primaryColor,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            flex: 1,
          }}
        >
          조직도
        </Typography>
        <Chip
          label={`${members.length}명`}
          size="small"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            fontWeight: 700,
            bgcolor: st.chipBg,
            color: st.primaryColor,
            border: `1px solid ${st.avatarBorder}`,
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
        {isMobile && (
          <ExpandMoreIcon
            sx={{
              fontSize: '1.1rem',
              color: st.primaryColor,
              ml: 0.5,
              transition: 'transform 0.2s ease',
              transform: panelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </Box>

      <Collapse in={showContent} timeout={220} unmountOnExit>
      <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        placeholder="이름·직급·부서 검색"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 2.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: st.inputBg,
            fontSize: '0.875rem',
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor: st.inputHoverBorder },
            '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
          },
          '& .MuiInputBase-input': {
            color: textPrimary,
            '&::placeholder': { color: textSecondary, opacity: 1 },
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          maxHeight: 520,
          overflow: 'auto',
          pr: 0.5,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: st.scrollbarThumb,
            borderRadius: 9999,
          },
          '&::-webkit-scrollbar-thumb:hover': { background: st.scrollbarThumbHover },
          scrollbarWidth: 'thin',
          scrollbarColor: `${st.scrollbarThumb} transparent`,
        }}
      >
        {grouped.map(([division, people]) => (
          <Accordion
            key={division}
            defaultExpanded
            disableGutters
            elevation={0}
            sx={{
              bgcolor: st.panelAccordionBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px !important',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                borderRadius: 2.5,
                minHeight: 44,
                px: 2,
                '&.Mui-expanded': { minHeight: 44 },
              },
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
              sx={{
                bgcolor: st.accordionDivisionBg,
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{
                  color: st.primaryColor,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                }}
              >
                {division}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 1.5 }}>
              <Box display="flex" flexDirection="column" gap={1}>
                {people.map((member) => {
                  const isSelected = selectedIds.includes(member.id)
                  const isExpanded = expandedId === member.id

                  return (
                    <Box
                      key={member.id}
                      draggable={!isMobile && !isSelected}
                      onDragStart={
                        !isMobile
                          ? (e) => {
                              e.dataTransfer.setData(
                                'application/json',
                                JSON.stringify(member),
                              )
                            }
                          : undefined
                      }
                      onClick={() => handleCardClick(member)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: `1px solid ${isSelected ? st.memberSelectedBorder : borderColor}`,
                        bgcolor: isSelected ? st.memberRowHoverBg : st.memberRowBg,
                        opacity: isSelected ? 0.7 : 1,
                        cursor: isMobile
                          ? isSelected ? 'default' : 'pointer'
                          : isSelected ? 'default' : 'grab',
                        '&:active': { cursor: isMobile ? 'pointer' : 'grabbing' },
                        transition: 'all 0.15s ease',
                        '&:hover': isSelected
                          ? {}
                          : {
                              bgcolor: st.memberRowHoverBg,
                              borderColor: st.memberRowHoverBorder,
                            },
                      }}
                    >
                      {/* 멤버 정보 행 */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: st.avatarBg,
                            color: st.primaryColor,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: `1px solid ${st.avatarBorder}`,
                            flexShrink: 0,
                          }}
                        >
                          {member.name[0]}
                        </Avatar>
                        <Box flex={1} minWidth={0}>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: textPrimary, fontSize: '0.82rem', lineHeight: 1.3 }}
                          >
                            {member.name}
                          </Typography>
                          <Box display="flex" gap={0.75} alignItems="center" mt={0.3}>
                            <Chip
                              label={member.position}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                bgcolor: st.chipBg,
                                color: st.primaryColor,
                                border: `1px solid ${st.avatarBorder}`,
                                '& .MuiChip-label': { px: 0.75 },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: textSecondary, fontSize: '0.7rem', fontFamily: 'monospace' }}
                            >
                              {member.department}
                            </Typography>
                          </Box>
                        </Box>

                        {/* 우측 아이콘: 데스크탑=드래그핸들, 모바일 배정됨=체크, 모바일 미배정=없음 */}
                        {isSelected && isMobile ? (
                          <CheckIcon
                            sx={{ fontSize: '1.1rem', color: st.primaryColor, flexShrink: 0 }}
                          />
                        ) : !isMobile ? (
                          <DragIndicatorIcon
                            sx={{ color: textSecondary, opacity: 0.4, fontSize: '1rem', flexShrink: 0 }}
                          />
                        ) : null}
                      </Box>

                      {/* 모바일 전용: 레벨 선택 버튼 (탭 시 펼쳐짐) */}
                      {isMobile && !isSelected && (
                        <Collapse in={isExpanded} timeout={180} unmountOnExit>
                          <Box sx={{ pt: 1.25, display: 'flex', gap: 0.75 }}>
                            {([1, 2, 3] as const).map((level) => {
                              const cfg = levelConfig[level]
                              return (
                                <Button
                                  key={level}
                                  size="small"
                                  onClick={(e) => handleLevelSelect(e, member, level)}
                                  sx={{
                                    flex: 1,
                                    borderRadius: 9999,
                                    py: 0.5,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    bgcolor: cfg.bg(isDarkMode),
                                    color: cfg.chipColor(isDarkMode),
                                    border: `1px solid ${cfg.border(isDarkMode)}`,
                                    transition: 'all 0.12s ease',
                                    '&:hover': {
                                      bgcolor: cfg.avatarBg(isDarkMode),
                                      borderColor: cfg.accent,
                                    },
                                  }}
                                >
                                  {level}차
                                </Button>
                              )
                            })}
                          </Box>
                        </Collapse>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      </Box>
      </Collapse>
    </Box>
  )
}

export default OrgPanel
