import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import { SelectedReviewer } from '../../../api/types/reviewer'

interface Props {
  selected: SelectedReviewer[]
  onLevelChange: (id: string, newLevel: 1 | 2 | 3) => void
  onDelete: (id: string) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetLevel: 1 | 2 | 3) => void
}

const levelLabels = { 1: '1차 심사자', 2: '2차 심사자', 3: '3차 심사자' }
const levelColors = { 1: 'primary', 2: 'secondary', 3: 'warning' } as const

const SelectedReviewersPanel: React.FC<Props> = ({
  selected,
  onLevelChange,
  onDelete,
  onDrop,
}) => {
  const byLevel = (level: 1 | 2 | 3) =>
    selected.filter((r) => r.level === level)

  return (
    <Box>
      {[1, 2, 3].map((level) => {
        const reviewers = byLevel(level as 1 | 2 | 3)
        return (
          <Accordion key={level} defaultExpanded={level === 1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight={600}>
                {levelLabels[level as keyof typeof levelLabels]} (
                {reviewers.length}명)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, level as 1 | 2 | 3)}
                sx={{
                  minHeight: 100,
                  border: '2px dashed #ddd',
                  borderRadius: 2,
                  p: 1,
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                {reviewers.length === 0 ? (
                  <Typography
                    color="text.secondary"
                    align="center"
                    sx={{ py: 3 }}
                  >
                    여기에 드래그해서 추가하세요
                  </Typography>
                ) : (
                  <List dense>
                    {reviewers.map((reviewer, idx) => (
                      <React.Fragment key={reviewer.id}>
                        <ListItem
                          secondaryAction={
                            <IconButton
                              edge="end"
                              onClick={() => onDelete(reviewer.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: `${levelColors[level]}.main` }}
                            >
                              {reviewer.name[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={reviewer.name}
                            secondary={`${reviewer.position} • ${reviewer.department}`}
                          />
                          <Select
                            value={reviewer.level}
                            onChange={(e) =>
                              onLevelChange(
                                reviewer.id,
                                e.target.value as 1 | 2 | 3,
                              )
                            }
                            size="small"
                            sx={{ ml: 2, width: 110 }}
                          >
                            <MenuItem value={1}>1차</MenuItem>
                            <MenuItem value={2}>2차</MenuItem>
                            <MenuItem value={3}>3차</MenuItem>
                          </Select>
                        </ListItem>
                        {idx < reviewers.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}

export default SelectedReviewersPanel
