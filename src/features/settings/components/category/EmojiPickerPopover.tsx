import { Box, Popover, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { EMOJI_GROUPS } from '@/features/settings/config/emojiGroups'

interface Props {
  anchorEl: HTMLElement | null
  onClose: () => void
  onSelect: (emoji: string) => void
}

export default function EmojiPickerPopover({ anchorEl, onClose, onSelect }: Props) {
  const { isDarkMode } = useThemeMode()
  const { borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const [tabIndex, setTabIndex] = useState(0)

  const group = EMOJI_GROUPS[tabIndex]

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          mt: 0.5,
          width: 300,
          bgcolor: st.dialogBg,
          backgroundImage: 'none',
          border: `1px solid ${borderColor}`,
          borderRadius: 2.5,
          boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
          overflow: 'hidden',
        },
      }}
    >
      {/* 탭 */}
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          borderBottom: `1px solid ${borderColor}`,
          minHeight: 36,
          '& .MuiTab-root': {
            minHeight: 36,
            py: 0,
            px: 1.5,
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'none',
            '&.Mui-selected': { color: st.primaryColor },
          },
          '& .MuiTabs-indicator': { backgroundColor: st.primaryColor, height: 2 },
        }}
      >
        {EMOJI_GROUPS.map((g) => (
          <Tab key={g.label} label={g.label} />
        ))}
      </Tabs>

      {/* 이모지 그리드 */}
      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 0.5,
          }}
        >
          {group.emojis.map((em) => (
            <Box
              key={em}
              onClick={() => { onSelect(em); onClose() }}
              role="button"
              tabIndex={0}
              aria-label={em}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(em); onClose() } }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                aspectRatio: '1',
                borderRadius: 1.5,
                fontSize: '1.4rem',
                cursor: 'pointer',
                transition: 'background 0.1s',
                '&:hover': { bgcolor: `${st.primaryColor}18` },
                '&:focus-visible': { outline: `2px solid ${st.primaryColor}`, outlineOffset: 1 },
              }}
            >
              {em}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ px: 1.5, pb: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
          탭을 눌러 카테고리별로 찾을 수 있어요
        </Typography>
      </Box>
    </Popover>
  )
}
