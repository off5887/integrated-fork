import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import type { SettingsTheme } from '@/theme/settingsTheme'
import type { OrgBizArea, OrgTeam } from '@/api/queries/useOrg'

interface Props {
  bizTeams: OrgBizArea[]
  selectedDeptCd?: string
  onSelect: (deptCd: string, deptNm: string) => void
}

interface TeamRowProps {
  team: OrgTeam
  isSelected: boolean
  onSelect: (deptCd: string, deptNm: string) => void
  st: SettingsTheme
  textPrimary: string
}

const TeamRow = memo(function TeamRow({ team, isSelected, onSelect, st, textPrimary }: TeamRowProps) {
  return (
    <Box
      onClick={() => onSelect(team.deptCd, team.deptNm)}
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 1.25, py: 0.75, borderRadius: 1.5, cursor: 'pointer',
        bgcolor: isSelected ? `${st.primaryColor}18` : 'transparent',
        border: `1px solid ${isSelected ? st.primaryColor : 'transparent'}`,
        transition: 'background-color 0.1s, border-color 0.1s',
        '&:hover': { bgcolor: st.memberRowHoverBg, borderColor: st.memberRowHoverBorder },
      }}
    >
      <Typography sx={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? st.primaryColor : textPrimary }}>
        {team.deptNm}
      </Typography>
      {isSelected && (
        <Chip label="선택" size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700, bgcolor: st.primaryColor, color: '#fff', '& .MuiChip-label': { px: 0.75 } }} />
      )}
    </Box>
  )
})

const EXCLUDE_RE = /이사|고문|부문|임원/

export default function DeptPickerPanel({ bizTeams, selectedDeptCd, onSelect }: Props) {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()
  const [search, setSearch] = useState('')

  const allowedTeams = useMemo(
    () =>
      bizTeams
        .filter((biz) => !EXCLUDE_RE.test(biz.bizAreaNm))
        .map((biz) => ({
          ...biz,
          teams: biz.teams.filter((t) => !EXCLUDE_RE.test(t.deptNm)),
        }))
        .filter((biz) => biz.teams.length > 0),
    [bizTeams],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allowedTeams
    return allowedTeams
      .map((biz) => ({
        ...biz,
        teams: biz.teams.filter(
          (t) => t.deptNm.toLowerCase().includes(q) || biz.bizAreaNm.toLowerCase().includes(q),
        ),
      }))
      .filter((biz) => biz.teams.length > 0)
  }, [allowedTeams, search])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="부서명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
              </InputAdornment>
            ),
          },
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
          gap: 0.75,
          pr: 0.5,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { background: st.scrollbarThumb, borderRadius: 9999 },
          scrollbarWidth: 'thin',
          scrollbarColor: `${st.scrollbarThumb} transparent`,
        }}
      >
        {filtered.length === 0 && (
          <Typography variant="body2" sx={{ color: textSecondary, textAlign: 'center', py: 4 }}>
            {search ? '검색 결과가 없습니다' : '부서 정보가 없습니다'}
          </Typography>
        )}

        {filtered.map(({ bizAreaNm, teams }) => (
          <Accordion
            key={bizAreaNm}
            disableGutters
            elevation={0}
            slotProps={{ transition: { unmountOnExit: false, timeout: 150 } }}
            sx={{
              bgcolor: st.panelAccordionBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px !important',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': { borderRadius: 2.5, minHeight: 34, px: 1.5 },
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
              sx={{ bgcolor: st.accordionDivisionBg, borderBottom: `1px solid ${borderColor}` }}
            >
              <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {bizAreaNm}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0.75 }}>
              <Box display="flex" flexDirection="column" gap={0.25}>
                {teams.map((team) => (
                  <TeamRow
                    key={team.deptCd}
                    team={team}
                    isSelected={team.deptCd === selectedDeptCd}
                    onSelect={onSelect}
                    st={st}
                    textPrimary={textPrimary}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
