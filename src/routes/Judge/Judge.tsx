// src/routes/Judge/Judge.tsx
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Card,
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
  isDarkMode?: boolean // 다크모드 여부 (부모 또는 ThemeContext에서 받음)
}

export default function Judge({ isDarkMode = false }: JudgeProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleRowClick = (proposal: Proposal) => {
    setSelectedProposal(proposal)
  }

  const handleCloseDetail = () => {
    setSelectedProposal(null)
  }

  const displayedData = judgeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          color: isDarkMode ? '#60a5fa' : '#2563eb',
        }}
      >
        심사하기
      </Typography>

      {judgeData.length === 0 ? (
        <Card
          sx={{
            p: 8,
            textAlign: 'center',
            borderRadius: 4,
            boxShadow: 3,
            bgcolor: isDarkMode ? '#1f2937' : 'background.paper',
            border: isDarkMode ? '1px solid #374151' : undefined,
          }}
        >
          <Typography
            variant="h6"
            color={isDarkMode ? 'grey.300' : 'text.secondary'}
          >
            심사할 글이 없습니다
          </Typography>
          <Typography
            variant="body2"
            color={isDarkMode ? 'grey.400' : 'text.secondary'}
            sx={{ mt: 1 }}
          >
            현재 담당 부서의 제안이 모두 처리되었어요.
          </Typography>
        </Card>
      ) : (
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            overflow: 'hidden',
            bgcolor: isDarkMode ? '#1f2937' : 'background.paper',
            border: isDarkMode ? '1px solid #374151' : undefined,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{ bgcolor: isDarkMode ? '#111827' : 'primary.dark' }}
              >
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  번호
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  제안 제목
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  제안자
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  제출일
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  상태
                </TableCell>
                <TableCell
                  sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}
                >
                  상세
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    bgcolor: isDarkMode ? '#1f2937' : undefined,
                    '&:hover': {
                      bgcolor: isDarkMode ? 'grey.700' : 'action.hover',
                    },
                    '& .MuiTableCell-root': {
                      borderBottomColor: isDarkMode ? 'grey.800' : undefined,
                    },
                  }}
                >
                  <TableCell
                    sx={{ color: isDarkMode ? 'grey.300' : 'text.primary' }}
                  >
                    {item.id}
                  </TableCell>
                  <TableCell
                    onClick={() => handleRowClick(item)}
                    sx={{ color: isDarkMode ? 'grey.200' : 'text.primary' }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{ color: isDarkMode ? 'grey.300' : 'text.primary' }}
                  >
                    {item.proposers.join(', ')}
                  </TableCell>
                  <TableCell
                    sx={{ color: isDarkMode ? 'grey.300' : 'text.primary' }}
                  >
                    {item.submittedAt}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={
                        item.status === '승인'
                          ? 'success'
                          : item.status === '반려'
                            ? 'error'
                            : 'warning'
                      }
                      size="small"
                      sx={{
                        '& .MuiChip-label': {
                          color: isDarkMode ? 'white' : undefined,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="상세 보기">
                      <IconButton
                        size="small"
                        onClick={() => handleRowClick(item)}
                        sx={{
                          color: isDarkMode ? '#60a5fa' : 'primary.main',
                          '&:hover': {
                            bgcolor: isDarkMode ? 'grey.700' : 'action.hover',
                          },
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
              color: isDarkMode ? 'grey.300' : 'text.primary',
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
                {
                  color: isDarkMode ? 'grey.300' : undefined,
                },
              '.MuiTablePagination-select': {
                color: isDarkMode ? 'grey.300' : undefined,
              },
              '.MuiTablePagination-selectIcon': {
                color: isDarkMode ? 'grey.300' : undefined,
              },
            }}
          />
        </Card>
      )}

      {/* 상세 모달 */}
      {selectedProposal && (
        <JudgeDetail
          proposal={selectedProposal}
          onClose={handleCloseDetail}
          isDarkMode={isDarkMode}
        />
      )}
    </Box>
  )
}
