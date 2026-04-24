import { useMemo, useState } from 'react'
import { useUsers } from '@/api/queries/useUsers'
import { useUpdateUser } from '@/api/queries/useUsers'
import { useSnackbar } from '@/context/SnackbarContext'
import { ROLE_OPTIONS } from '../config/userConfig'
import { getApiErrorMessage } from '@/utils/apiError'
import type { User } from '@/api/types/settings'

export function useUserManagement() {
  const { data: fetchedUsers = [], isLoading, refetch } = useUsers()
  const { mutateAsync: updateUser } = useUpdateUser()
  const { showSnackbar } = useSnackbar()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [localUsers, setLocalUsers] = useState<User[]>([])

  // 신규 추가된 사용자만 localUsers로 관리 (Set으로 O(n) 처리)
  const users = useMemo(() => {
    const apiIds = new Set(fetchedUsers.map(u => u.id))
    return [...fetchedUsers, ...localUsers.filter(u => !apiIds.has(u.id))]
  }, [fetchedUsers, localUsers])

  // 폼 다이얼로그
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User & { password: string }>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [toggleActiveConfirmId, setToggleActiveConfirmId] = useState<string | null>(null)

  // 검색/필터
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // 페이지네이션
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return users.filter((u) => {
      if (q &&
        !u.name.toLowerCase().includes(q) &&
        !u.employeeNumber.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q) &&
        !u.department.toLowerCase().includes(q) &&
        !u.businessSite.toLowerCase().includes(q)
      ) return false
      if (roleFilter !== 'all' && u.role !== roleFilter) return false
      if (statusFilter === 'active' && !u.active) return false
      if (statusFilter === 'inactive' && u.active) return false
      return true
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const pagedUsers = filteredUsers.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  const hasFilter = searchTerm !== '' || roleFilter !== 'all' || statusFilter !== 'all'
  const isEditing = editUser !== null

  const handleRefetch = async () => {
    setIsRefreshing(true)
    await Promise.all([refetch(), new Promise(r => setTimeout(r, 700))])
    setIsRefreshing(false)
  }

  const handleAddOpen = () => {
    setEditUser(null)
    setFormData({})
    setShowPassword(false)
    setOpen(true)
  }

  const handleEditOpen = (user: User) => {
    setEditUser(user)
    setFormData({ ...user })
    setShowPassword(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({})
    setEditUser(null)
  }

  const handleSave = async () => {
    if (!formData.name || !formData.employeeNumber || !formData.email || !formData.role || !formData.position || !formData.department || !formData.businessSite) {
      showSnackbar('모든 필수 항목을 입력해주세요.', 'warning')
      return
    }
    if (isEditing) {
      try {
        await updateUser({ employeeId: editUser.id, data: formData })
        showSnackbar('사용자 정보가 수정되었습니다.', 'success')
        handleClose()
      } catch (e) {
        showSnackbar(getApiErrorMessage(e, '수정 중 오류가 발생했습니다.'), 'error')
      }
      return
    }
    if (!formData.password) {
      showSnackbar('비밀번호를 입력해주세요.', 'warning')
      return
    }
    setLocalUsers(prev => [
      ...prev,
      {
        id: `new_${Date.now()}`,
        name: formData.name!,
        employeeNumber: formData.employeeNumber!,
        email: formData.email!,
        role: formData.role!,
        position: formData.position!,
        department: formData.department!,
        businessSite: formData.businessSite!,
        active: true,
      },
    ])
    handleClose()
  }

  const handleToggleActive = (id: string) => setToggleActiveConfirmId(id)

  const handleToggleActiveConfirm = async () => {
    if (!toggleActiveConfirmId) return
    const current = users.find(u => u.id === toggleActiveConfirmId)
    if (!current) return
    const newActive = !current.active
    setToggleActiveConfirmId(null)
    try {
      await updateUser({ employeeId: toggleActiveConfirmId, data: { active: newActive } })
      showSnackbar(newActive ? '활성화되었습니다.' : '비활성화되었습니다.', 'success')
    } catch (e) {
      showSnackbar(getApiErrorMessage(e, '상태 변경 중 오류가 발생했습니다.'), 'error')
    }
  }

  const handleRoleChange = async (id: string, newRole: string) => {
    const label = ROLE_OPTIONS.find(r => r.value === newRole)?.label ?? newRole
    try {
      await updateUser({ employeeId: id, data: { role: newRole as User['role'] } })
      showSnackbar(`권한이 '${label}'으로 변경되었습니다.`, 'success')
    } catch (e) {
      showSnackbar(getApiErrorMessage(e, '권한 변경 중 오류가 발생했습니다.'), 'error')
    }
  }

  const handleDelete = (id: string) => setDeleteConfirmId(id)

  const handleDeleteConfirm = () => {
    if (deleteConfirmId !== null) {
      setLocalUsers(prev => prev.filter(u => u.id !== deleteConfirmId))
      setDeleteConfirmId(null)
    }
  }

  const handleFilterSearch = (value: string) => { setSearchTerm(value);  setPage(0) }
  const handleFilterRole   = (value: string) => { setRoleFilter(value);  setPage(0) }
  const handleFilterStatus = (value: string) => { setStatusFilter(value); setPage(0) }
  const handleFilterReset  = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setStatusFilter('all')
    setPage(0)
  }

  return {
    // 데이터
    users, filteredUsers, pagedUsers, isLoading, isRefreshing,
    // 폼
    open, isEditing, formData, showPassword, editUser,
    setFormData, onTogglePassword: () => setShowPassword(v => !v),
    // 필터/페이지
    searchTerm, roleFilter, statusFilter, hasFilter, page, rowsPerPage,
    setPage, setRowsPerPage,
    // 삭제 확인
    deleteConfirmId, setDeleteConfirmId,
    // 활성화 확인
    toggleActiveConfirmId, setToggleActiveConfirmId,
    // 핸들러
    handleRefetch,
    handleAddOpen, handleEditOpen, handleClose, handleSave,
    handleToggleActive, handleToggleActiveConfirm, handleRoleChange,
    handleDelete, handleDeleteConfirm,
    handleFilterSearch, handleFilterRole, handleFilterStatus, handleFilterReset,
  }
}
