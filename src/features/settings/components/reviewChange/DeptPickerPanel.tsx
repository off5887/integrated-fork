import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material'
import { memo } from 'react'
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

export default function DeptPickerPanel({ bizTeams, selectedDeptCd, onSelect }: Props) {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()

  return (
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
      {bizTeams.length === 0 && (
        <Typography variant="body2" sx={{ color: textSecondary, textAlign: 'center', py: 4 }}>
          부서 정보가 없습니다
        </Typography>
      )}

      {bizTeams.map(({ bizAreaNm, teams }) => (
        <Accordion
          key={bizAreaNm}
          defaultExpanded
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
              {teams.map(team => (
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
  )
}
