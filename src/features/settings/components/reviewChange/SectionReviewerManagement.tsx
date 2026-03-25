import { useOrgTeams } from '@/api/queries/useOrg'
import {
  getSectionReviewerErrorMessage,
  useCreateSectionReviewer,
  useDeleteSectionReviewer,
  useSectionReviewers,
  useUpdateSectionReviewer,
} from '@/api/queries/useSectionReviewers'
import type { SectionReviewer, User } from '@/api/types/settings'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useSnackbar } from '@/context/SnackbarContext'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import AddIcon from '@mui/icons-material/Add'
import ApartmentIcon from '@mui/icons-material/Apartment'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Fade,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DeptPickerPanel from './DeptPickerPanel'
import OrgPickerPanel from './OrgPickerPanel'

const PANEL_HEIGHT = 320
const MOBILE_PANEL_HEIGHT = 280

export default function SectionReviewerManagement() {
  const { isDarkMode } = useThemeMode()
  const {
    textPrimary,
    textSecondary,
    borderColor,
    headerBg,
    rowBg,
    rowHoverBg,
  } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const { showSnackbar } = useSnackbar()
  const muiTheme = useTheme()
  const rawIsMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const [isMobile, setIsMobile] = useState(rawIsMobile)
  useEffect(() => {
    const t = setTimeout(() => setIsMobile(rawIsMobile), 250)
    return () => clearTimeout(t)
  }, [rawIsMobile])

  const { data: reviewers = [], isLoading } = useSectionReviewers()
  const { data: orgTeams = [] } = useOrgTeams()

  const createMutation = useCreateSectionReviewer()
  const updateMutation = useUpdateSectionReviewer()
  const deleteMutation = useDeleteSectionReviewer()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<SectionReviewer | null>(null)
  const [formDeptCd, setFormDeptCd] = useState('')
  const [formDeptNm, setFormDeptNm] = useState('')
  const [formEmployeeId, setFormEmployeeId] = useState('')
  const [formEmployeeName, setFormEmployeeName] = useState('')
  const [formStage] = useState(1)

  const [deleteId, setDeleteId] = useState<number | null>(null)

  const openAdd = () => {
    setEditing(null)
    setFormDeptCd('')
    setFormDeptNm('')
    setFormEmployeeId('')
    setFormEmployeeName('')
    setFormOpen(true)
  }

  const openEdit = (r: SectionReviewer) => {
    setEditing(r)
    setFormDeptCd(r.deptCd)
    setFormDeptNm(r.deptNm)
    setFormEmployeeId(r.employeeId)
    setFormEmployeeName(r.name)
    setFormOpen(true)
  }

  const handleDeptSelect = useCallback((deptCd: string, deptNm: string) => {
    setFormDeptCd(deptCd)
    setFormDeptNm(deptNm)
  }, [])

  const handleOrgSelect = useCallback((user: User) => {
    setFormEmployeeId(user.id)
    setFormEmployeeName(user.name)
  }, [])

  const handleSave = async () => {
    if (!formDeptCd || !formEmployeeId) {
      showSnackbar('부서와 심사자를 선택해주세요.', 'warning')
      return
    }
    const payload = {
      deptCd: formDeptCd,
      sectionName: formDeptNm,
      reviewerEmployeeId: formEmployeeId,
      reviewStage: formStage,
    }
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, data: payload })
        showSnackbar('심사자가 수정되었습니다.', 'success')
      } else {
        await createMutation.mutateAsync(payload)
        showSnackbar('심사자가 지정되었습니다.', 'success')
      }
      setFormOpen(false)
    } catch (err) {
      showSnackbar(getSectionReviewerErrorMessage(err), 'error')
    }
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    try {
      await deleteMutation.mutateAsync(deleteId)
      showSnackbar('심사자 지정이 해제되었습니다.', 'success')
    } catch (err) {
      showSnackbar(getSectionReviewerErrorMessage(err), 'error')
    } finally {
      setDeleteId(null)
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  // 선택 요약 + 버튼 (모바일/데스크탑 공통)
  const selectionSummary = (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: textSecondary,
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'block',
            mb: 1,
          }}
        >
          선택된 부서
        </Typography>
        {formDeptCd ? (
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              border: `1px solid ${st.avatarBorder}`,
              bgcolor: `${st.primaryColor}0d`,
            }}
          >
            <Typography
              sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}
            >
              {formDeptNm}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.7rem',
                color: textSecondary,
                fontFamily: 'monospace',
              }}
            >
              {formDeptCd}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: `1px dashed ${borderColor}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: textSecondary }}>
              배정 부서를 선택하세요
            </Typography>
          </Box>
        )}
      </Box>

      <Box>
        <Typography
          variant="caption"
          sx={{
            color: textSecondary,
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'block',
            mb: 1,
          }}
        >
          선택된 심사자
        </Typography>
        {formEmployeeId ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.2,
              borderRadius: 2,
              border: `1px solid ${st.avatarBorder}`,
              bgcolor: `${st.primaryColor}0d`,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: st.avatarBgLight,
                color: st.primaryColor,
                fontSize: '0.72rem',
                fontWeight: 700,
                border: `1px solid ${st.avatarBorder}`,
              }}
            >
              {formEmployeeName[0]}
            </Avatar>
            <Typography
              sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}
            >
              {formEmployeeName}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: `1px dashed ${borderColor}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: textSecondary }}>
              심사자를 선택하세요
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleSave}
          disabled={isSaving}
          sx={{
            flex: 1,
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'none',
            bgcolor: st.primaryColor,
            color: st.primaryBtnColor,
            boxShadow: 'none',
            '&:hover': { bgcolor: st.primaryHoverBg },
          }}
        >
          {editing ? '수정' : '추가'}
        </Button>
        <Button
          size="small"
          onClick={() => setFormOpen(false)}
          sx={{
            flex: 1,
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: '0.82rem',
            textTransform: 'none',
            color: textSecondary,
            '&:hover': { bgcolor: st.cancelBtnHoverBg },
          }}
        >
          취소
        </Button>
      </Box>
    </Box>
  )

  // 수정 모드: 부서 읽기전용 표시 / 추가 모드: DeptPickerPanel
  const deptContent = editing ? (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${st.avatarBorder}`, bgcolor: `${st.primaryColor}08`, display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <ApartmentIcon sx={{ fontSize: '1.1rem', color: st.primaryColor, flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>{formDeptNm}</Typography>
          <Typography sx={{ fontSize: '0.7rem', color: textSecondary, fontFamily: 'monospace' }}>{formDeptCd}</Typography>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.72rem' }}>
        수정 시 배정 부서는 변경할 수 없습니다
      </Typography>
    </Box>
  ) : (
    <DeptPickerPanel bizTeams={orgTeams} selectedDeptCd={formDeptCd} onSelect={handleDeptSelect} />
  )

  const mobilePanelSx = {
    bgcolor: 'transparent',
    border: 'none',
    '&:before': { display: 'none' },
    '& .MuiAccordionSummary-root': { minHeight: 44, px: 0, borderRadius: 2 },
    '& .MuiAccordionSummary-content': { my: 0 },
  }

  return (
    <Box sx={{ mt: 5 }}>
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: 1.5,
          mb: 2.5,
          pb: 2.5,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              bgcolor: st.primaryColor,
              color: st.primaryBtnColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <GroupIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ color: textPrimary, lineHeight: 1.3, fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              부서별 기본 심사자 지정
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary, display: { xs: 'none', sm: 'block' } }}>
              부서마다 아이디어 심사를 담당할 심사자를 지정합니다
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={openAdd}
          sx={{
            borderRadius: 9999,
            px: 2.5,
            py: 0.9,
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'none',
            bgcolor: st.primaryColor,
            color: st.primaryBtnColor,
            boxShadow: 'none',
            flexShrink: 0,
            '&:hover': {
              bgcolor: st.primaryHoverBg,
              boxShadow: st.primaryBtnHoverShadow,
            },
          }}
        >
          심사자 추가
        </Button>
      </Box>

      {/* 인라인 폼 */}
      <Collapse in={formOpen} timeout={300} unmountOnExit>
        <Fade in={formOpen} timeout={{ enter: 400, exit: 150 }}>
        <Box
          sx={{
            mb: 2.5,
            borderRadius: 2.5,
            border: `1px solid ${st.primaryColor}`,
            bgcolor: st.panelBg,
            overflow: 'hidden',
          }}
        >
          {/* 모바일: 접이식 탭 */}
          {isMobile ? (
            <Box
              sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Accordion
                disableGutters
                elevation={0}
                defaultExpanded
                expanded={editing ? true : undefined}
                TransitionProps={{ unmountOnExit: false, timeout: 150 }}
                sx={{
                  ...mobilePanelSx,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <AccordionSummary
                  expandIcon={editing ? null : <ExpandMoreIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <ApartmentIcon sx={{ fontSize: '0.9rem', color: st.primaryColor }} />
                    <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      배정 부서{formDeptNm ? ` — ${formDeptNm}` : ''}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: editing ? 0 : 1 }}>
                  {editing ? deptContent : (
                    <Box sx={{ height: MOBILE_PANEL_HEIGHT, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      {deptContent}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion
                disableGutters
                elevation={0}
                TransitionProps={{ unmountOnExit: false, timeout: 150 }}
                sx={{
                  ...mobilePanelSx,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ fontSize: '1rem', color: st.primaryColor }}
                    />
                  }
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
                  >
                    <PeopleAltOutlinedIcon
                      sx={{ fontSize: '0.9rem', color: st.primaryColor }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{
                        color: st.primaryColor,
                        fontSize: '0.72rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      심사자 선택
                      {formEmployeeName ? ` — ${formEmployeeName}` : ''}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                  <Box
                    sx={{
                      height: MOBILE_PANEL_HEIGHT,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <OrgPickerPanel
                      onSelect={handleOrgSelect}
                      selectedEmployeeId={formEmployeeId}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Box sx={{ pt: 1 }}>{selectionSummary}</Box>
            </Box>
          ) : (
            /* 데스크탑: 3열 그리드 */
            <Grid container>
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  p: 2,
                  borderRight: `1px solid ${borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mb: 1.5,
                  }}
                >
                  <ApartmentIcon
                    sx={{ fontSize: '0.9rem', color: st.primaryColor }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      color: st.primaryColor,
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    배정 부서
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: editing ? 'auto' : PANEL_HEIGHT,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {deptContent}
                </Box>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  p: 2,
                  borderRight: `1px solid ${borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mb: 1.5,
                  }}
                >
                  <PeopleAltOutlinedIcon
                    sx={{ fontSize: '0.9rem', color: st.primaryColor }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      color: st.primaryColor,
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    심사자 선택
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: PANEL_HEIGHT,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <OrgPickerPanel
                    onSelect={handleOrgSelect}
                    selectedEmployeeId={formEmployeeId}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }} sx={{ p: 2.5 }}>
                {selectionSummary}
              </Grid>
            </Grid>
          )}
        </Box>
        </Fade>
      </Collapse>

      {/* 테이블 */}
      <Box
        sx={{
          borderRadius: 2.5,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden',
          overflowX: 'auto',
        }}
      >
        <Table sx={{ minWidth: { xs: 0, sm: 560 } }}>
          <TableHead>
            <TableRow sx={{ bgcolor: headerBg }}>
              {[
                { label: '부서',    hide: false },
                { label: '심사자',  hide: false },
                { label: '직급',    hide: true  },
                { label: '1차 심사', hide: true  },
                { label: '상태',    hide: false },
                { label: '',        hide: false },
              ].map(({ label, hide }, i) => (
                <TableCell
                  key={label || `col-${i}`}
                  align={i === 5 ? 'right' : 'left'}
                  sx={{
                    color: textSecondary,
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    py: 1.75,
                    px: { xs: 1.5, sm: 2 },
                    borderBottomColor: borderColor,
                    display: hide ? { xs: 'none', sm: 'table-cell' } : 'table-cell',
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 6, color: textSecondary, borderBottomColor: borderColor }}
                >
                  불러오는 중...
                </TableCell>
              </TableRow>
            ) : reviewers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 6, borderBottomColor: borderColor }}
                >
                  <GroupIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1, display: 'block', mx: 'auto' }} />
                  <Typography variant="body2" sx={{ color: textSecondary }}>지정된 심사자가 없습니다</Typography>
                </TableCell>
              </TableRow>
            ) : (
              reviewers.map((r) => (
                <TableRow
                  key={r.id}
                  sx={{
                    bgcolor: rowBg,
                    '&:hover': { bgcolor: rowHoverBg },
                    '& .MuiTableCell-root': { borderBottomColor: borderColor, py: { xs: 1, sm: 1.5 }, px: { xs: 1.5, sm: 2 } },
                    opacity: r.isActive ? 1 : 0.5,
                  }}
                >
                  {/* 부서 */}
                  <TableCell>
                    <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, fontWeight: 600, color: textPrimary, whiteSpace: 'nowrap' }}>
                      {r.deptNm}
                    </Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace', display: { xs: 'none', sm: 'block' } }}>
                      {r.deptCd}
                    </Typography>
                  </TableCell>

                  {/* 심사자 */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.68rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}`, flexShrink: 0 }}>
                        {r.name[0]}
                      </Avatar>
                      <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, fontWeight: 600, color: textPrimary, whiteSpace: 'nowrap' }}>
                        {r.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* 직급 (sm+만 표시) */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>
                      {r.rollNm || '-'}
                    </Typography>
                  </TableCell>

                  {/* 1차 심사 (sm+만 표시) */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip label={`${r.reviewStage}차`} size="small" sx={{ fontSize: '0.72rem', fontWeight: 700, bgcolor: st.chipBg, color: st.primaryColor, border: `1px solid ${st.avatarBorder}` }} />
                  </TableCell>

                  {/* 상태 */}
                  <TableCell>
                    <Chip
                      label={r.isActive ? '활성' : '비활성'}
                      size="small"
                      sx={{
                        fontSize: '0.7rem', fontWeight: 700,
                        bgcolor: r.isActive ? st.activeChipBg : st.inactiveChipBg,
                        color: r.isActive ? st.activeChipColor : st.inactiveChipColor,
                        border: `1px solid ${r.isActive ? st.activeChipBorder : st.inactiveChipBorder}`,
                      }}
                    />
                  </TableCell>

                  {/* 액션 */}
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    <Tooltip title="수정">
                      <IconButton size="small" onClick={() => openEdit(r)} sx={{ mr: 0.5, color: textSecondary, opacity: 0.6, '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg } }}>
                        <EditIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="제외">
                      <IconButton size="small" onClick={() => setDeleteId(r.id)} sx={{ color: textSecondary, opacity: 0.6, '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg } }}>
                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      <ConfirmDialog
        open={deleteId !== null}
        title="심사자 제외"
        message="이 부서의 기본 심사자 지정을 해제하시겠습니까?"
        confirmLabel="제외"
        variant="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
