import MenuIcon from '@mui/icons-material/Menu'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Box, IconButton } from '@mui/material'
import { useNavColors } from './hooks/useNavColors'

interface MobileToolbarProps {
  onOpenDrawer: () => void
}

export default function MobileToolbar({ onOpenDrawer }: MobileToolbarProps) {
  const { isDarkMode, toggleTheme, textColor } = useNavColors()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
      <IconButton onClick={toggleTheme} size="small" sx={{ color: textColor }}>
        {isDarkMode ? (
          <WbSunnyIcon fontSize="small" />
        ) : (
          <NightsStayIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        edge="end"
        onClick={onOpenDrawer}
        size="small"
        sx={{ color: textColor }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
