import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Chip,
  Collapse,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { statusConfig } from '../../config/statusConfig'
import type { Idea } from '../../types'

interface Props {
  ideas: Idea[]
  selectedIdeaId: string | null
  searchTerm: string
  onSearchChange: (v: string) => void
  onSelect: (id: string) => void
}

export default function IdeaListPanel({
  ideas,
  selectedIdeaId,
  searchTerm,
  onSearchChange,
  onSelect,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, headerBg } = usePageColors()
  const panelBg = isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff'

  const isMobile = useMediaQuery('(max-width: 1199px)')
  const [listPanelOpen, setListPanelOpen] = useState(false)
  const showListContent = !isMobile || listPanelOpen

  return (
    <Box
      sx={{
        bgcolor: panelBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* 패널 헤더 — 모바일에서 클릭하면 접기/펼치기 */}
      <Box
        onClick={() => isMobile && setListPanelOpen((v) => !v)}
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: headerBg,
          borderBottom: showListContent ? `1px solid ${borderColor}` : 'none',
          cursor: isMobile ? 'pointer' : 'default',
          userSelect: 'none',
          transition: 'background 0.15s ease',
          '&:hover': isMobile
            ? { bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' }
            : {},
        }}
      >
        <LightbulbOutlinedIcon
          sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }}
        />
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: isDarkMode ? '#a5b4fc' : '#4338ca',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            flex: 1,
          }}
        >
          아이디어 목록
        </Typography>
        <Chip
          label={`${ideas.length}건`}
          size="small"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            fontWeight: 700,
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
              transform: listPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </Box>

      <Collapse in={showListContent} timeout={220} unmountOnExit>
      <Box sx={{ p: 2 }}>
        {/* 검색 */}
        <TextField
          fullWidth
          placeholder="제목, 제출자, 부서로 검색"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ fontSize: '1rem', color: textSecondary }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
              fontSize: '0.875rem',
              '& fieldset': { borderColor },
              '&:hover fieldset': {
                borderColor: isDarkMode
                  ? 'rgba(99,102,241,0.35)'
                  : 'rgba(99,102,241,0.3)',
              },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiInputBase-input': {
              color: textPrimary,
              '&::placeholder': { color: textSecondary, opacity: 1 },
            },
          }}
        />

        {/* 아이디어 목록 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: 520,
            overflow: 'auto',
            pr: 0.5,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: isDarkMode
                ? 'rgba(99,102,241,0.25)'
                : 'rgba(99,102,241,0.2)',
              borderRadius: 9999,
            },
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode
              ? 'rgba(99,102,241,0.25) transparent'
              : 'rgba(99,102,241,0.2) transparent',
          }}
        >
          {ideas.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <LightbulbOutlinedIcon
                sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }}
              />
              <Typography variant="body2" sx={{ color: textSecondary }}>
                검색 결과가 없습니다
              </Typography>
            </Box>
          ) : (
            ideas.map((idea) => {
              const isSelected = idea.id === selectedIdeaId
              const sc = statusConfig[idea.status]
              return (
                <Box
                  key={idea.id}
                  onClick={() => onSelect(idea.id)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${isSelected ? sc.border(isDarkMode) : borderColor}`,
                    bgcolor: isSelected
                      ? sc.bg(isDarkMode)
                      : isDarkMode
                      ? 'rgba(30,41,59,0.5)'
                      : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: isSelected
                        ? sc.bg(isDarkMode)
                        : isDarkMode
                        ? 'rgba(99,102,241,0.07)'
                        : 'rgba(99,102,241,0.04)',
                      borderColor: isSelected
                        ? sc.border(isDarkMode)
                        : isDarkMode
                        ? 'rgba(99,102,241,0.2)'
                        : 'rgba(99,102,241,0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 1,
                      mb: 0.75,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: textPrimary,
                        lineHeight: 1.4,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {idea.title}
                    </Typography>
                    <Chip
                      label={idea.status}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        bgcolor: sc.bg(isDarkMode),
                        color: sc.color,
                        border: `1px solid ${sc.border(isDarkMode)}`,
                        '& .MuiChip-label': { px: 0.6 },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        color: textSecondary,
                        fontFamily: 'monospace',
                      }}
                    >
                      {idea.submitter}
                    </Typography>
                    <Typography sx={{ fontSize: '0.6rem', color: textSecondary, opacity: 0.5 }}>
                      ·
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: textSecondary }}>
                      {idea.department}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        color: textSecondary,
                        opacity: 0.6,
                        ml: 'auto',
                        fontFamily: 'monospace',
                      }}
                    >
                      {idea.submittedAt}
                    </Typography>
                  </Box>
                </Box>
              )
            })
          )}
        </Box>
      </Box>
      </Collapse>
    </Box>
  )
}
