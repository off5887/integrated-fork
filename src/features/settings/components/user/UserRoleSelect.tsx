import {} from 'react'
import { MenuItem, Select } from '@mui/material'
import { useSettingsTheme } from '@/theme/settingsTheme'
import { ROLE_OPTIONS } from '../../config/userConfig'
import type { User } from '@/api/types/settings'

interface Props {
  user: User
  onChange: (id: string, newRole: string) => void
}

export default function UserRoleSelect({ user, onChange }: Props) {
  const st = useSettingsTheme()

  return (
    <Select
      value={user.role}
      onChange={(e) => onChange(user.id, e.target.value)}
      size="small"
      variant="outlined"
      sx={{
        fontSize: '0.75rem', fontWeight: 600, height: 26, minWidth: 96,
        bgcolor: st.chipBg,
        color: st.primaryColor,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: st.avatarBorder },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: st.primaryColor },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: st.primaryColor },
        '& .MuiSelect-icon': { color: st.primaryColor, fontSize: '1rem' },
        '& .MuiSelect-select': { py: '3px', px: 1 },
      }}
    >
      {ROLE_OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.8rem' }}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  )
}
