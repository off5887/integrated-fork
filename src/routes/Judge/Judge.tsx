// src/routes/Judge/Judge.tsx
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { judgeData, Proposal } from './JudgeData'
import JudgeDetail from './JudgeDetail'

interface JudgeProps {
  isDarkMode?: boolean
}

const statusConfig = {
  심사대기: { label: '심사대기', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  심사중: { label: '심사중', bg: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'rgba(99,102,241,0.25)' },
  승인: { label: '승인', bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  반려: { label: '반려', bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
} as const

export default function Judge({ isDarkMode = false }: JudgeProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const displayedData = judgeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'
  const headerBg = isDarkMode ? 'rgba(15,23,42,0.8)' : 'rgba(248,250,252,0.9)'
  const rowHoverBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
        pt: { xs: 9, md: 10 },
        pb: 14,
        px: { xs: 2, sm: 3 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
          <Box
            sx={{
              width: 44, height: 44, borderRadius: 2.5,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            }}
          >
            <AssignmentTurnedInIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              심사하기
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              제출된 제안을 검토하고 심사 결과를 입력하세요
            </Typography>
          </Box>
          {judgeData.length > 0 && (
            <Box sx={{ ml: 'auto' }}>
              <Chip
                label={`${judgeData.length}건`}
                size="small"
                sx={{
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)'}`,
                }}
              />
            </Box>
          )}
        </Box>

        {judgeData.length === 0 ? (
          <Box
            sx={{
              p: 8, textAlign: 'center', borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.05)',
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 48, color: textSecondary, mb: 2, opacity: 0.4 }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: textPrimary, mb: 0.75 }}>
              심사할 글이 없습니다
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary }}>
              현재 담당 부서의 제안이 모두 처리되었어요.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: headerBg }}>
                  {[
                    { label: '번호', align: 'left' as const },
                    { label: '제안 제목', align: 'left' as const },
                    { label: '제안자', align: 'left' as const },
                    { label: '제출일', align: 'left' as const },
                    { label: '상태', align: 'left' as const },
                    { label: '상세', align: 'center' as const },
                  ].map((col) => (
                    <TableCell
                      key={col.label}
                      align={col.align}
                      sx={{
                        color: textSecondary,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        py: 1.75,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((item) => {
                  const status = statusConfig[item.status]
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() => setSelectedProposal(item)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease',
                        '&:hover': { bgcolor: rowHoverBg },
                        '& .MuiTableCell-root': {
                          borderBottomColor: borderColor,
                          py: 1.75,
                        },
                      }}
                    >
                      <TableCell>
                        <Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontWeight: 500 }}>
                          #{item.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: textPrimary }}>
                          {item.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.875rem', color: textSecondary }}>
                          {item.proposers.join(', ')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.875rem', color: textSecondary }}>
                          {item.submittedAt}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={status.label}
                          size="small"
                          sx={{
                            bgcolor: status.bg,
                            color: status.color,
                            border: `1px solid ${status.border}`,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="상세 보기" placement="left">
                          <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); setSelectedProposal(item) }}
                            sx={{
                              color: textSecondary,
                              width: 30, height: 30,
                              '&:hover': {
                                bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                                color: '#6366f1',
                              },
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <Box sx={{ borderTop: `1px solid ${borderColor}` }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={judgeData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage(0)
                }}
                sx={{
                  color: textSecondary,
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { color: textSecondary, fontSize: '0.8rem' },
                  '.MuiTablePagination-select': { color: textPrimary },
                  '.MuiTablePagination-selectIcon': { color: textSecondary },
                  '.MuiTablePagination-actions button': { color: textSecondary },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {selectedProposal && (
        <JudgeDetail
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </Box>
  )
}
