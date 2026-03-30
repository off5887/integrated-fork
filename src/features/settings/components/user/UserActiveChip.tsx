import { useMemo } from 'react'
import { Chip, Tooltip } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { User } from '@/api/types/settings'

interface Props {
  user: User
  onToggle: (id: string) => void
}

export default function UserActiveChip({ user, onToggle }: Props) {
  const { isDarkMode } = useThemeMode()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])

  return (
    <Tooltip title={user.active ? '클릭하여 비활성화' : '클릭하여 활성화'} placement="top">
      <Chip
        label={user.active ? '활성' : '비활성'}
        size="small"
        onClick={() => onToggle(user.id)}
        sx={{
          cursor: 'pointer',
          bgcolor: user.active ? st.activeChipBg : st.inactiveChipBg,
          color: user.active ? st.activeChipColor : st.inactiveChipColor,
          border: `1px solid ${user.active ? st.activeChipBorder : st.inactiveChipBorder}`,
          fontWeight: 700,
          fontSize: '0.7rem',
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: user.active ? st.activeChipBgHover : st.inactiveChipBgHover,
          },
        }}
      />
    </Tooltip>
  )
}
