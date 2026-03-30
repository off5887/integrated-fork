import { useMemo } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { ROLE_OPTIONS } from '../../config/userConfig'
import { useUserManagement } from '../../hooks/useUserManagement'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import UserFormDialog from './UserFormDialog'
import UserRoleSelect from './UserRoleSelect'
import UserActiveChip from './UserActiveChip'

export default function UserManagement() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, cardBg, rowBg, rowHoverBg, headerBg } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])

  const {
    users, filteredUsers, pagedUsers, isLoading, isRefreshing,
    open, isEditing, formData, showPassword,
    setFormData, onTogglePassword,
    searchTerm, roleFilter, statusFilter, hasFilter, page, rowsPerPage,
    setPage, setRowsPerPage,
    deleteConfirmId, setDeleteConfirmId,
    toggleActiveConfirmId, setToggleActiveConfirmId,
    handleRefetch,
    handleAddOpen, handleEditOpen, handleClose, handleSave,
    handleToggleActive, handleToggleActiveConfirm, handleRoleChange,
    handleDelete, handleDeleteConfirm,
    handleFilterSearch, handleFilterRole, handleFilterStatus, handleFilterReset,
  } = useUserManagement()

  if (isLoading) return <LoadingSpinner text="사용자 목록을 불러오는 중..." />

  return (
    <Box>
      {/* 상단 액션 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 3, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: st.primaryColor, color: st.primaryBtnColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ManageAccountsIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              사용자 관리
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="caption" sx={{ color: textSecondary }}>
                총 {users.length}명 · 활성 {users.filter(u => u.active).length}명
              </Typography>
              <Tooltip title="사용자 목록은 30분마다 자동 동기화됩니다" placement="right">
                <HelpOutlineIcon sx={{ fontSize: '0.85rem', color: textSecondary, opacity: 0.6, cursor: 'default' }} />
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="목록 새로고침">
            <IconButton
              onClick={handleRefetch}
              disabled={isRefreshing}
              size="small"
              sx={{
                color: textSecondary,
                border: `1px solid ${borderColor}`,
                borderRadius: 1.5,
                '&:hover': { color: st.primaryColor, borderColor: st.primaryColor, bgcolor: st.accentIconHoverBg },
              }}
            >
              {isRefreshing
                ? <CircularProgress size={16} sx={{ color: st.primaryColor }} />
                : <RefreshIcon sx={{ fontSize: '1.1rem' }} />
              }
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={handleAddOpen}
            sx={{
              borderRadius: 9999, px: 2.5, py: 0.9,
              fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
              bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none',
              '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
              transition: 'all 0.2s ease',
            }}
          >
            사용자 추가
          </Button>
        </Box>
      </Box>

      {/* 검색 필터 바 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5, alignItems: 'center' }}>
        <OutlinedInput
          value={searchTerm}
          onChange={(e) => handleFilterSearch(e.target.value)}
          placeholder="이름, 사번, 이메일, 부서, 사업소 검색"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
            </InputAdornment>
          }
          sx={{
            flex: '1 1 200px', minWidth: 180, fontSize: '0.82rem',
            bgcolor: st.inputBg, borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': { borderColor },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: st.inputHoverBorder },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: st.inputFocusBorder },
            color: textPrimary,
          }}
        />
        <Select
          value={roleFilter}
          onChange={(e) => handleFilterRole(e.target.value)}
          size="small"
          sx={{
            minWidth: 110, fontSize: '0.82rem', bgcolor: st.inputBg, borderRadius: 2, color: textPrimary,
            '& .MuiOutlinedInput-notchedOutline': { borderColor },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: st.inputHoverBorder },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: st.inputFocusBorder },
            '& .MuiSelect-icon': { color: textSecondary },
          }}
        >
          <MenuItem value="all" sx={{ fontSize: '0.82rem' }}>전체 역할</MenuItem>
          {ROLE_OPTIONS.map(r => (
            <MenuItem key={r.value} value={r.value} sx={{ fontSize: '0.82rem' }}>{r.label}</MenuItem>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={(e) => handleFilterStatus(e.target.value)}
          size="small"
          sx={{
            minWidth: 90, fontSize: '0.82rem', bgcolor: st.inputBg, borderRadius: 2, color: textPrimary,
            '& .MuiOutlinedInput-notchedOutline': { borderColor },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: st.inputHoverBorder },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: st.inputFocusBorder },
            '& .MuiSelect-icon': { color: textSecondary },
          }}
        >
          <MenuItem value="all" sx={{ fontSize: '0.82rem' }}>전체 상태</MenuItem>
          <MenuItem value="active" sx={{ fontSize: '0.82rem' }}>활성</MenuItem>
          <MenuItem value="inactive" sx={{ fontSize: '0.82rem' }}>비활성</MenuItem>
        </Select>
        {hasFilter && (
          <Button
            size="small"
            onClick={handleFilterReset}
            sx={{
              fontSize: '0.78rem', fontWeight: 600, textTransform: 'none',
              color: textSecondary, borderRadius: 2,
              '&:hover': { bgcolor: st.memberRowHoverBg },
            }}
          >
            초기화
          </Button>
        )}
        <Typography sx={{ fontSize: '0.75rem', color: textSecondary, ml: 'auto', whiteSpace: 'nowrap' }}>
          {hasFilter ? `${filteredUsers.length} / ${users.length}명` : `총 ${users.length}명`}
        </Typography>
      </Box>

      {/* 모바일 카드 목록 (xs only) */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 1.5 }}>
        {pagedUsers.map(user => (
          <Box
            key={user.id}
            sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 2.5, overflow: 'hidden' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, borderBottom: `1px solid ${borderColor}` }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.875rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}`, flexShrink: 0 }}>
                {user.name[0]}
              </Avatar>
              <Box flex={1} minWidth={0}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>{user.name}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace' }}>{user.employeeNumber}</Typography>
              </Box>
              <UserActiveChip user={user} onToggle={handleToggleActive} />
            </Box>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
                <UserRoleSelect user={user} onChange={handleRoleChange} />
                <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{user.position || '-'}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{user.department}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{user.businessSite || '-'}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>{user.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, px: 2, pb: 1.5, justifyContent: 'flex-end' }}>
              <IconButton size="small" onClick={() => handleEditOpen(user)} sx={{ color: textSecondary, opacity: 0.7, '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg }, transition: 'all 0.15s ease' }}>
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              <IconButton size="small" onClick={() => handleToggleActive(user.id)} sx={{ color: user.active ? st.activeChipColor : textSecondary, opacity: 0.7, '&:hover': { opacity: 1, bgcolor: st.activeChipBg }, transition: 'all 0.15s ease' }}>
                <PowerSettingsNewIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(user.id)} sx={{ color: textSecondary, opacity: 0.7, '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg }, transition: 'all 0.15s ease' }}>
                <DeleteIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
        {pagedUsers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ManageAccountsIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
            <Typography variant="body2" sx={{ color: textSecondary }}>
              {hasFilter ? '검색 결과가 없습니다' : '등록된 사용자가 없습니다'}
            </Typography>
          </Box>
        )}
        {filteredUsers.length > rowsPerPage && (
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
            rowsPerPageOptions={[10, 20, 50]}
            labelRowsPerPage="페이지당"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}명`}
            sx={{ color: textSecondary, '& .MuiTablePagination-select': { color: textPrimary } }}
          />
        )}
      </Box>

      {/* 데스크탑 테이블 (sm+) */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, borderRadius: 2.5, border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: headerBg }}>
              {['이름', '사번', '이메일', '역할', '사업소', '부서', '직급', '상태', ''].map((label, i) => (
                <TableCell
                  key={label || `col-${i}`}
                  align={i === 8 ? 'right' : 'left'}
                  sx={{ color: textSecondary, fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', py: 1.75, borderBottomColor: borderColor }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedUsers.map(user => (
              <TableRow
                key={user.id}
                sx={{ bgcolor: rowBg, transition: 'background-color 0.15s ease', '&:hover': { bgcolor: rowHoverBg }, '& .MuiTableCell-root': { borderBottomColor: borderColor, py: 1.5 } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.75rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}` }}>
                      {user.name[0]}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell><Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontFamily: 'monospace' }}>{user.employeeNumber}</Typography></TableCell>
                <TableCell><Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontFamily: 'monospace' }}>{user.email}</Typography></TableCell>
                <TableCell><UserRoleSelect user={user} onChange={handleRoleChange} /></TableCell>
                <TableCell><Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{user.businessSite || '-'}</Typography></TableCell>
                <TableCell><Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{user.department || '-'}</Typography></TableCell>
                <TableCell><Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{user.position || '-'}</Typography></TableCell>
                <TableCell><UserActiveChip user={user} onToggle={handleToggleActive} /></TableCell>
                <TableCell align="right">
                  <Tooltip title="수정">
                    <IconButton size="small" onClick={() => handleEditOpen(user)} sx={{ mr: 0.5, color: textSecondary, opacity: 0.6, '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg }, transition: 'all 0.15s ease' }}>
                      <EditIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.active ? '비활성화' : '활성화'}>
                    <IconButton size="small" onClick={() => handleToggleActive(user.id)} sx={{ mr: 0.5, color: user.active ? st.activeChipColor : textSecondary, opacity: 0.6, '&:hover': { opacity: 1, bgcolor: st.activeChipBg }, transition: 'all 0.15s ease' }}>
                      <PowerSettingsNewIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="삭제">
                    <IconButton size="small" onClick={() => handleDelete(user.id)} sx={{ color: textSecondary, opacity: 0.6, '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg }, transition: 'all 0.15s ease' }}>
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 8, borderBottomColor: borderColor }}>
                  <ManageAccountsIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    {hasFilter ? '검색 결과가 없습니다' : '등록된 사용자가 없습니다'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage="페이지당"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}명`}
          sx={{
            borderTop: `1px solid ${borderColor}`,
            color: textSecondary,
            fontSize: '0.8rem',
            '& .MuiTablePagination-select': { color: textPrimary },
            '& .MuiTablePagination-selectIcon': { color: textSecondary },
          }}
        />
      </Box>

      <UserFormDialog
        open={open}
        isEditing={isEditing}
        formData={formData}
        showPassword={showPassword}
        onClose={handleClose}
        onSave={handleSave}
        onFormChange={setFormData}
        onTogglePassword={onTogglePassword}
      />

      <ConfirmDialog
        open={deleteConfirmId !== null}
        title="사용자 삭제"
        message="정말 이 사용자를 삭제하시겠습니까?"
        confirmLabel="삭제"
        variant="error"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {(() => {
        const target = users.find(u => u.id === toggleActiveConfirmId)
        return (
          <ConfirmDialog
            open={toggleActiveConfirmId !== null}
            title={target?.active ? '사용자 비활성화' : '사용자 활성화'}
            message={target?.active
              ? `${target.name} 사용자를 비활성화하시겠습니까?\n확인 시 사용자 관리 목록에서 즉시 제외됩니다.`
              : `${target?.name} 사용자를 활성화하시겠습니까?`
            }
            confirmLabel={target?.active ? '비활성화' : '활성화'}
            variant={target?.active ? 'error' : 'info'}
            onConfirm={handleToggleActiveConfirm}
            onCancel={() => setToggleActiveConfirmId(null)}
          />
        )
      })()}
    </Box>
  )
}
