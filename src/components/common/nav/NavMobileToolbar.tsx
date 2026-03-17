import MenuIcon from '@mui/icons-material/Menu'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Box, IconButton } from '@mui/material'
import { useNavColors } from './useNavColors'

interface NavMobileToolbarProps {
  onOpenDrawer: () => void
}

export default function NavMobileToolbar({ onOpenDrawer }: NavMobileToolbarProps) {
  const { isDarkMode, toggleTheme, nt } = useNavColors()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
      <IconButton onClick={toggleTheme} size="small" sx={{ color: nt.textColor }}>
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
        sx={{ color: nt.textColor }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
