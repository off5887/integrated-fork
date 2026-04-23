import AddIcon from '@mui/icons-material/Add'
import ApartmentIcon from '@mui/icons-material/Apartment'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Fade,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useOrgTeams } from '@/api/queries/useOrg'
import { useBulkAssignLeaders } from '@/api/queries/useSectionReviewers'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useSnackbar } from '@/context/SnackbarContext'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import useSectionReviewer from '../../hooks/useSectionReviewer'
import DeptPickerPanel from './DeptPickerPanel'
import OrgPickerPanel from './OrgPickerPanel'
import SelectionSummary from './SelectionSummary'
import SectionReviewerTable from './SectionReviewerTable'

const PANEL_HEIGHT = 320
const MOBILE_PANEL_HEIGHT = 280

export default function SectionReviewerManagement() {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()

  const muiTheme = useTheme()
  const rawIsMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const [isMobile, setIsMobile] = useState(rawIsMobile)
  useEffect(() => {
    const t = setTimeout(() => setIsMobile(rawIsMobile), 250)
    return () => clearTimeout(t)
  }, [rawIsMobile])

  const { data: orgTeams = [] } = useOrgTeams()
  const { showSnackbar } = useSnackbar()
  const bulkMutation = useBulkAssignLeaders()
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false)

  const {
    reviewers, isLoading,
    formOpen, editing,
    formDeptCd, formDeptNm, formEmployeeId, formEmployeeName,
    deleteId, setDeleteId,
    isSaving,
    openAdd, openEdit, closeForm,
    handleDeptSelect, handleOrgSelect,
    handleSave, handleDelete,
  } = useSectionReviewer()

  const handleBulkAssign = async () => {
    setBulkConfirmOpen(false)
    try {
      const result = await bulkMutation.mutateAsync()
      const msg = result.skipped > 0
        ? `${result.assigned}명 배정 완료 (${result.skipped}건 건너뜀)`
        : `${result.assigned}명의 팀장이 심사자로 배정되었습니다`
      showSnackbar(msg, result.assigned > 0 ? 'success' : 'info')
    } catch {
      showSnackbar('팀장 일괄 배정 중 오류가 발생했습니다.', 'error')
    }
  }

  // 수정 모드: 부서 읽기전용 / 추가 모드: DeptPickerPanel
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
          display: 'flex', justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap', gap: 1.5, mb: 2.5, pb: 2.5,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: st.primaryColor, color: st.primaryBtnColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <GroupIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              부서별 기본 심사자 지정
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary, display: { xs: 'none', sm: 'block' } }}>
              부서마다 아이디어 심사를 담당할 심사자를 지정합니다
            </Typography>
          </Box>
        </Box>
        <Button
            variant="contained" size="small"
            startIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={openAdd}
            sx={{ borderRadius: 9999, px: 2.5, py: 0.9, fontWeight: 700, fontSize: '0.82rem', textTransform: 'none', bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none', flexShrink: 0, '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow } }}
          >
            심사자 추가
          </Button>
      </Box>

      {/* 인라인 폼 */}
      <Collapse in={formOpen} timeout={300} unmountOnExit>
        <Fade in={formOpen} timeout={{ enter: 400, exit: 150 }}>
          <Box sx={{ mb: 2.5, borderRadius: 2.5, border: `1px solid ${st.primaryColor}`, bgcolor: st.panelBg, overflow: 'hidden' }}>

            {/* 모바일: 접이식 탭 */}
            {isMobile ? (
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Accordion
                  disableGutters elevation={0} defaultExpanded
                  expanded={editing ? true : undefined}
                  slotProps={{ transition: { unmountOnExit: false, timeout: 150 } }}
                  sx={{ ...mobilePanelSx, borderBottom: `1px solid ${borderColor}` }}
                >
                  <AccordionSummary expandIcon={editing ? null : <ExpandMoreIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />}>
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
                  disableGutters elevation={0}
                  slotProps={{ transition: { unmountOnExit: false, timeout: 150 } }}
                  sx={{ ...mobilePanelSx, borderBottom: `1px solid ${borderColor}` }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <PeopleAltOutlinedIcon sx={{ fontSize: '0.9rem', color: st.primaryColor }} />
                      <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        심사자 선택{formEmployeeName ? ` — ${formEmployeeName}` : ''}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, pt: 1 }}>
                    <Box sx={{ height: MOBILE_PANEL_HEIGHT, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <OrgPickerPanel onSelect={handleOrgSelect} selectedEmployeeId={formEmployeeId} />
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Box sx={{ pt: 1 }}>
                  <SelectionSummary
                    formDeptCd={formDeptCd} formDeptNm={formDeptNm}
                    formEmployeeId={formEmployeeId} formEmployeeName={formEmployeeName}
                    editing={!!editing} isSaving={isSaving}
                    onSave={handleSave} onCancel={closeForm}
                  />
                </Box>
              </Box>
            ) : (
              /* 데스크탑: 3열 그리드 */
              <Grid container>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ p: 2, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                    <ApartmentIcon sx={{ fontSize: '0.9rem', color: st.primaryColor }} />
                    <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      배정 부서
                    </Typography>
                  </Box>
                  <Box sx={{ height: editing ? 'auto' : PANEL_HEIGHT, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {deptContent}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }} sx={{ p: 2, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                    <PeopleAltOutlinedIcon sx={{ fontSize: '0.9rem', color: st.primaryColor }} />
                    <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      심사자 선택
                    </Typography>
                  </Box>
                  <Box sx={{ height: PANEL_HEIGHT, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <OrgPickerPanel onSelect={handleOrgSelect} selectedEmployeeId={formEmployeeId} />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }} sx={{ p: 2.5 }}>
                  <SelectionSummary
                    formDeptCd={formDeptCd} formDeptNm={formDeptNm}
                    formEmployeeId={formEmployeeId} formEmployeeName={formEmployeeName}
                    editing={!!editing} isSaving={isSaving}
                    onSave={handleSave} onCancel={closeForm}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Collapse>

      {/* 테이블 */}
      <SectionReviewerTable
        reviewers={reviewers}
        isLoading={isLoading}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />

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
