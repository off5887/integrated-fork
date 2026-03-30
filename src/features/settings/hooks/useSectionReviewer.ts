import { useState } from 'react'
import {
  getSectionReviewerErrorMessage,
  useCreateSectionReviewer,
  useDeleteSectionReviewer,
  useSectionReviewers,
  useUpdateSectionReviewer,
} from '@/api/queries/useSectionReviewers'
import { useSnackbar } from '@/context/SnackbarContext'
import type { SectionReviewer, User } from '@/api/types/settings'

export interface SectionReviewerFormState {
  deptCd: string
  deptNm: string
  employeeId: string
  employeeName: string
}

export default function useSectionReviewer() {
  const { showSnackbar } = useSnackbar()

  const { data: reviewers = [], isLoading } = useSectionReviewers()
  const createMutation = useCreateSectionReviewer()
  const updateMutation = useUpdateSectionReviewer()
  const deleteMutation = useDeleteSectionReviewer()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<SectionReviewer | null>(null)
  const [formDeptCd, setFormDeptCd] = useState('')
  const [formDeptNm, setFormDeptNm] = useState('')
  const [formEmployeeId, setFormEmployeeId] = useState('')
  const [formEmployeeName, setFormEmployeeName] = useState('')

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

  const closeForm = () => setFormOpen(false)

  const handleDeptSelect = (deptCd: string, deptNm: string) => {
    setFormDeptCd(deptCd)
    setFormDeptNm(deptNm)
  }

  const handleOrgSelect = (user: User) => {
    setFormEmployeeId(user.id)
    setFormEmployeeName(user.name)
  }

  const handleSave = async () => {
    if (!formDeptCd || !formEmployeeId) {
      showSnackbar('부서와 심사자를 선택해주세요.', 'warning')
      return
    }
    const payload = {
      deptCd: formDeptCd,
      sectionName: formDeptNm,
      reviewerEmployeeId: formEmployeeId,
      reviewStage: 1,
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

  return {
    // 데이터
    reviewers,
    isLoading,
    // 폼 상태
    formOpen,
    editing,
    formDeptCd,
    formDeptNm,
    formEmployeeId,
    formEmployeeName,
    // 삭제 확인
    deleteId,
    setDeleteId,
    // 뮤테이션 상태
    isSaving: createMutation.isPending || updateMutation.isPending,
    // 핸들러
    openAdd,
    openEdit,
    closeForm,
    handleDeptSelect,
    handleOrgSelect,
    handleSave,
    handleDelete,
  }
}
