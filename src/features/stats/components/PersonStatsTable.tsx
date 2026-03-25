// src/features/stats/components/PersonStatsTable.tsx
import type { PersonStatsRow } from '@/api/types/stats'
import { usePageColors } from '@/theme/pageColors'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'

type SortKey = keyof Omit<
  PersonStatsRow,
  'id' | 'name' | 'department' | 'position'
>
type SortDir = 'asc' | 'desc'

interface ColDef {
  key: SortKey
  label: string
  unit?: string
  color: string
}

const COLS: ColDef[] = [
  { key: 'totalPosts', label: '총게시글', unit: '건', color: '#6366f1' },
  { key: 'comments', label: '댓글', unit: '개', color: '#8b5cf6' },
  { key: 'ideaCount', label: '아이디어상상', unit: '건', color: '#0ea5e9' },
  { key: 'completeCount', label: '실행완료상상', unit: '건', color: '#10b981' },
  { key: 'executionCount', label: '실행건수', unit: '건', color: '#f59e0b' },
  {
    key: 'expectedAmount',
    label: '기대성과금액',
    unit: '만원',
    color: '#ef4444',
  },
  { key: 'mileage', label: '마일리지', unit: '🐟', color: '#06b6d4' },
]

const sticky = { position: 'sticky' as const, left: 0, zIndex: 2 }

function StatCell({ col, value }: { col: ColDef; value: number }) {
  const { textSecondary } = usePageColors()
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: textSecondary, display: 'block', mb: 0.2 }}
      >
        {col.label}
      </Typography>
      <Typography variant="body2" fontWeight={700} sx={{ color: col.color }}>
        {col.key === 'expectedAmount' ? value.toLocaleString() : value}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: textSecondary, ml: 0.3 }}
        >
          {col.unit}
        </Typography>
      </Typography>
    </Box>
  )
}

// ── 모바일 카드 ───────────────────────────────────────────────────────────────

function PersonCard({
  row,
  borderColor,
  textPrimary,
  textSecondary,
  cardBg,
  headerBg,
}: {
  row: PersonStatsRow
  borderColor: string
  textPrimary: string
  textSecondary: string
  cardBg: string
  headerBg: string
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        bgcolor: cardBg,
        overflow: 'hidden',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'rgba(99,102,241,0.12)',
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {row.name.slice(0, 1)}
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ color: textPrimary, lineHeight: 1.2 }}
            >
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {row.department}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={row.position}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.7rem',
            fontWeight: 600,
            bgcolor: 'rgba(99,102,241,0.07)',
            color: '#6366f1',
            border: '1px solid rgba(99,102,241,0.18)',
          }}
        />
      </Box>

      {/* 스탯 그리드 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1.5,
        }}
      >
        {COLS.map((col) => (
          <StatCell key={col.key} col={col} value={row[col.key]} />
        ))}
      </Box>
    </Paper>
  )
}

// ── 메인 ─────────────────────────────────────────────────────────────────────

export default function PersonStatsTable({ data }: { data: PersonStatsRow[] }) {
  const {
    textPrimary,
    textSecondary,
    borderColor,
    cardBg,
    headerBg,
    rowBg,
    rowHoverBg,
  } = usePageColors()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

  const [sortKey, setSortKey] = useState<SortKey>('totalPosts')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const toggleDir = () => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
  const handleSort = (key: SortKey) => {
    if (sortKey === key) toggleDir()
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => (a[sortKey] - b[sortKey]) * (sortDir === 'asc' ? 1 : -1),
      ),
    [data, sortKey, sortDir],
  )

  const totals = useMemo(
    () =>
      COLS.reduce(
        (acc, col) => {
          acc[col.key] = sorted.reduce((s, r) => s + r[col.key], 0)
          return acc
        },
        {} as Record<SortKey, number>,
      ),
    [sorted],
  )

  const sortColDef = COLS.find((c) => c.key === sortKey)!

  // ── 모바일 ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <Box>
        {/* 정렬 바 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel sx={{ fontSize: '0.8rem' }}>정렬 기준</InputLabel>
            <Select
              value={sortKey}
              label="정렬 기준"
              onChange={(e) => {
                setSortKey(e.target.value as SortKey)
                setSortDir('desc')
              }}
              sx={{ fontSize: '0.82rem' }}
            >
              {COLS.map((col) => (
                <MenuItem
                  key={col.key}
                  value={col.key}
                  sx={{ fontSize: '0.82rem' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: col.color,
                        flexShrink: 0,
                      }}
                    />
                    {col.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title={sortDir === 'desc' ? '내림차순' : '오름차순'}>
            <IconButton
              onClick={toggleDir}
              size="small"
              sx={{
                border: `1px solid ${borderColor}`,
                color: sortColDef.color,
                bgcolor: cardBg,
                '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' },
              }}
            >
              {sortDir === 'desc' ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* 카드 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {sorted.map((row) => (
            <PersonCard
              key={row.id}
              row={row}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              cardBg={cardBg}
              headerBg={headerBg}
            />
          ))}

          {/* 합계 카드 */}
          <Paper
            elevation={0}
            sx={{
              border: `2px solid ${borderColor}`,
              borderRadius: 2,
              bgcolor: headerBg,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{ px: 2, py: 1.2, borderBottom: `1px solid ${borderColor}` }}
            >
              <Typography
                variant="body2"
                fontWeight={800}
                sx={{ color: textPrimary }}
              >
                합계
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1.5,
              }}
            >
              {COLS.map((col) => (
                <StatCell key={col.key} col={col} value={totals[col.key]} />
              ))}
            </Box>
          </Paper>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: textSecondary, mt: 1.5, display: 'block' }}
        >
          * 정렬 기준 선택 후 방향 버튼으로 오름차순/내림차순 전환
        </Typography>
      </Box>
    )
  }

  // ── 데스크톱 테이블 ──────────────────────────────────────────────────────────
  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: 2,
          bgcolor: cardBg,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(99,102,241,0.25)',
            borderRadius: 3,
          },
        }}
      >
        <Table size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: headerBg }}>
              <TableCell
                sx={{
                  ...sticky,
                  bgcolor: headerBg,
                  borderBottom: `1px solid ${borderColor}`,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: textSecondary,
                  whiteSpace: 'nowrap',
                  minWidth: 100,
                }}
              >
                이름
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `1px solid ${borderColor}`,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: textSecondary,
                  whiteSpace: 'nowrap',
                  minWidth: 90,
                }}
              >
                부서
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `1px solid ${borderColor}`,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: textSecondary,
                  whiteSpace: 'nowrap',
                  minWidth: 70,
                }}
              >
                직급
              </TableCell>
              {COLS.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sortDirection={sortKey === col.key ? sortDir : false}
                  sx={{
                    borderBottom: `1px solid ${borderColor}`,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    color: textSecondary,
                    whiteSpace: 'nowrap',
                    minWidth: 90,
                  }}
                >
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortDir : 'desc'}
                    onClick={() => handleSort(col.key)}
                    sx={{
                      color: sortKey === col.key ? col.color : textSecondary,
                      '&.Mui-active': { color: col.color },
                      '& .MuiTableSortLabel-icon': {
                        color: `${col.color} !important`,
                      },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row, idx) => (
              <TableRow
                key={row.id}
                sx={{
                  bgcolor: idx % 2 === 0 ? 'transparent' : rowBg,
                  '&:hover': { bgcolor: rowHoverBg },
                  '&:last-child td': { borderBottom: 0 },
                }}
              >
                <TableCell
                  sx={{
                    ...sticky,
                    bgcolor: idx % 2 === 0 ? cardBg : rowBg,
                    borderBottom: `1px solid ${borderColor}`,
                    py: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: 'rgba(99,102,241,0.1)',
                        color: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {row.name.slice(0, 1)}
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ color: textPrimary, whiteSpace: 'nowrap' }}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: textSecondary, whiteSpace: 'nowrap' }}
                  >
                    {row.department}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}
                >
                  <Chip
                    label={row.position}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(99,102,241,0.07)',
                      color: '#6366f1',
                      border: '1px solid rgba(99,102,241,0.18)',
                    }}
                  />
                </TableCell>
                {COLS.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: col.color }}
                    >
                      {col.key === 'expectedAmount'
                        ? row[col.key].toLocaleString()
                        : row[col.key]}
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ color: textSecondary, ml: 0.3 }}
                      >
                        {col.unit}
                      </Typography>
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ bgcolor: headerBg }}>
              <TableCell
                colSpan={3}
                sx={{
                  ...sticky,
                  bgcolor: headerBg,
                  borderTop: `2px solid ${borderColor}`,
                  py: 1.5,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={800}
                  sx={{ color: textPrimary }}
                >
                  합계
                </Typography>
              </TableCell>
              {COLS.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={800}
                    sx={{ color: col.color }}
                  >
                    {col.key === 'expectedAmount'
                      ? totals[col.key].toLocaleString()
                      : totals[col.key]}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: textSecondary, ml: 0.3 }}
                    >
                      {col.unit}
                    </Typography>
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="caption"
        sx={{ color: textSecondary, mt: 1, display: 'block' }}
      >
        * 컬럼 헤더를 클릭하면 정렬됩니다. 가로로 스크롤하여 전체 통계를
        확인하세요.
      </Typography>
    </Box>
  )
}
