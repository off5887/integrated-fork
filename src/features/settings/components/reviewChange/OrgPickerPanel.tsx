import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { useUsers } from '@/api/queries/useUsers'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import type { SettingsTheme } from '@/theme/settingsTheme'
import type { User } from '@/api/types/settings'

interface Props {
  onSelect: (user: User) => void
  selectedEmployeeId?: string
}

interface MemberRowProps {
  user: User
  isSelected: boolean
  onSelect: (user: User) => void
  st: SettingsTheme
  textPrimary: string
}

const MemberRow = memo(function MemberRow({ user, isSelected, onSelect, st, textPrimary }: MemberRowProps) {
  return (
    <Box
      onClick={() => onSelect(user)}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        px: 1, py: 0.75, borderRadius: 1.5, cursor: 'pointer',
        bgcolor: isSelected ? `${st.primaryColor}18` : 'transparent',
        border: `1px solid ${isSelected ? st.primaryColor : 'transparent'}`,
        transition: 'background-color 0.1s, border-color 0.1s',
        '&:hover': { bgcolor: st.memberRowHoverBg, borderColor: st.memberRowHoverBorder },
      }}
    >
      <Avatar sx={{ width: 26, height: 26, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.68rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}`, flexShrink: 0 }}>
        {user.name[0]}
      </Avatar>
      <Box flex={1} minWidth={0}>
        <Typography variant="body2" fontWeight={600} sx={{ color: textPrimary, fontSize: '0.8rem', lineHeight: 1.3 }}>
          {user.name}
        </Typography>
        <Chip label={user.position || '-'} size="small" sx={{ height: 14, fontSize: '0.6rem', fontWeight: 700, bgcolor: st.chipBg, color: st.primaryColor, border: `1px solid ${st.avatarBorder}`, '& .MuiChip-label': { px: 0.5 } }} />
      </Box>
      {isSelected && (
        <Chip label="선택" size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700, bgcolor: st.primaryColor, color: '#fff', '& .MuiChip-label': { px: 0.75 } }} />
      )}
    </Box>
  )
})

export default function OrgPickerPanel({ onSelect, selectedEmployeeId }: Props) {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()

  const { data: users = [] } = useUsers()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.position.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.businessSite.toLowerCase().includes(q),
    )
  }, [users, search])

  const grouped = useMemo(() => {
    const bizMap = new Map<string, Map<string, User[]>>()
    filtered.forEach(u => {
      if (!bizMap.has(u.businessSite)) bizMap.set(u.businessSite, new Map())
      const teamMap = bizMap.get(u.businessSite)!
      if (!teamMap.has(u.department)) teamMap.set(u.department, [])
      teamMap.get(u.department)!.push(u)
    })
    return Array.from(bizMap.entries()).map(([biz, teamMap]) => ({
      biz,
      teams: Array.from(teamMap.entries()).map(([team, members]) => ({ team, members })),
    }))
  }, [filtered])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="이름 · 직급 · 부서 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 1.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: st.searchInputBg,
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor: st.inputHoverBorder },
            '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
          },
          '& .MuiInputBase-input': { color: textPrimary, fontSize: '0.875rem' },
        }}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pr: 0.5,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { background: st.scrollbarThumb, borderRadius: 9999 },
          scrollbarWidth: 'thin',
          scrollbarColor: `${st.scrollbarThumb} transparent`,
        }}
      >
        {grouped.length === 0 && (
          <Typography variant="body2" sx={{ color: textSecondary, textAlign: 'center', py: 4 }}>
            검색 결과가 없습니다
          </Typography>
        )}

        {grouped.map(({ biz, teams }) => (
          <Accordion
            key={biz}
            defaultExpanded
            disableGutters
            elevation={0}
            slotProps={{ transition: { unmountOnExit: false, timeout: 150 } }}
            sx={{
              bgcolor: st.panelAccordionBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px !important',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': { borderRadius: 2.5, minHeight: 38, px: 1.5 },
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
              sx={{ bgcolor: st.accordionDivisionBg, borderBottom: `1px solid ${borderColor}` }}
            >
              <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {biz}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 1 }}>
              <Box display="flex" flexDirection="column" gap={0.5}>
                {teams.map(({ team, members }) => (
                  <Box key={team}>
                    <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.66rem', fontWeight: 600, px: 0.5, display: 'block', mb: 0.4 }}>
                      {team}
                    </Typography>
                    {members.map(user => (
                      <MemberRow
                        key={user.id}
                        user={user}
                        isSelected={user.id === selectedEmployeeId}
                        onSelect={onSelect}
                        st={st}
                        textPrimary={textPrimary}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
