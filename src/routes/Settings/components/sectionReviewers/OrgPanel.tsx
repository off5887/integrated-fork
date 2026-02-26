import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { OrgMember } from '../../../../api/types/reviewer'

interface Props {
  members: OrgMember[]
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const OrgPanel: React.FC<Props> = ({ members, searchTerm, setSearchTerm }) => {
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

  return (
    <Box>
      <TextField
        fullWidth
        label="이름·직급·부서 검색"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {grouped.map(([division, people]) => (
        <Accordion key={division} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              {division}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={1}>
              {people.map((member) => (
                <Paper
                  key={member.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify(member),
                    )
                  }}
                  sx={{
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'grab',
                    '&:hover': { bgcolor: 'action.hover' },
                    boxShadow: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {member.name[0]}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="subtitle2">{member.name}</Typography>
                    <Box display="flex" gap={1} alignItems="center">
                      <Chip
                        label={member.position}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {member.department}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default OrgPanel
