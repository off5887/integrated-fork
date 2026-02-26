// src/components/UserManagement.tsx
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
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
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'

// mock 사용자 데이터
const mockUsers = [
  {
    id: 1,
    name: '김개발',
    employeeNumber: 'DEV001',
    email: 'dev1@company.com',
    role: '팀장',
    department: '개발1팀',
    active: true,
  },
  {
    id: 2,
    name: '이코딩',
    employeeNumber: 'DEV002',
    email: 'front@company.com',
    role: '사원',
    department: '개발1팀',
    active: true,
  },
  {
    id: 3,
    name: '박기획',
    employeeNumber: 'PLAN001',
    email: 'plan@company.com',
    role: '팀장',
    department: '기획팀',
    active: true,
  },
  {
    id: 4,
    name: '최디자인',
    employeeNumber: 'DES001',
    email: 'design@company.com',
    role: '디자이너',
    department: '기획팀',
    active: false,
  },
]

// mock 부서 목록 (실제로는 API로 가져올 예정)
const mockDepartments = [
  '개발1팀',
  '개발2팀',
  '기획팀',
  '디자인팀',
  '영업1팀',
  '마케팅팀',
  '인사팀',
  '재무팀',
  '총무팀',
]

interface User {
  id: number
  name: string
  employeeNumber: string
  email: string
  role: string
  department: string
  active: boolean
}

export default function UserManagement() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [users, setUsers] = useState<User[]>(mockUsers)
  const [open, setOpen] = useState(false)
  const [newUser, setNewUser] = useState<Partial<User & { password: string }>>(
    {},
  )
  const [showPassword, setShowPassword] = useState(false)

  const handleClickOpen = () => {
    setNewUser({})
    setShowPassword(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNewUser({})
  }

  const handleAddUser = () => {
    if (
      !newUser.name ||
      !newUser.employeeNumber ||
      !newUser.email ||
      !newUser.role ||
      !newUser.department ||
      !newUser.password
    ) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    setUsers([
      ...users,
      {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: newUser.name || '',
        employeeNumber: newUser.employeeNumber || '',
        email: newUser.email || '',
        role: newUser.role || '사원',
        department: newUser.department || '',
        active: true,
      },
    ])

    // 실제 구현에서는 password를 여기서 암호화해서 백엔드로 보내야 함
    console.log('새 사용자 비밀번호 (암호화 전):', newUser.password)

    handleClose()
  }

  const handleDelete = (id: number) => {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  return (
    <Box>
      {/* 상단 액션 영역 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: { xs: 2, md: 3 },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          size={isMobile ? 'medium' : 'large'}
          fullWidth={isMobile}
          onClick={handleClickOpen}
          sx={{ minWidth: { sm: 180 } }}
        >
          사용자 추가
        </Button>
      </Box>

      {/* 테이블 */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ overflowX: 'auto', borderRadius: 2 }}
      >
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>
                이름
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                사번
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 180 }}>
                이메일
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>
                역할
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 140 }}>
                부서
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 80 }}>상태</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, minWidth: 100 }}>
                관리
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.employeeNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{user.department || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={user.active ? '활성' : '비활성'}
                    size="small"
                    color={user.active ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    등록된 사용자가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 사용자 추가 다이얼로그 */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>새 사용자 추가</DialogTitle>
        <DialogContent dividers sx={{ pt: 3 }}>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            {/* 이름 */}
            <TextField
              label="이름"
              fullWidth
              required
              value={newUser.name || ''}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              autoFocus
            />

            {/* 사번 */}
            <TextField
              label="사번"
              fullWidth
              required
              value={newUser.employeeNumber || ''}
              onChange={(e) =>
                setNewUser({ ...newUser, employeeNumber: e.target.value })
              }
              placeholder="예: DEV001"
            />

            {/* 이메일 */}
            <TextField
              label="이메일"
              fullWidth
              type="email"
              required
              value={newUser.email || ''}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            {/* 비밀번호 */}
            <TextField
              label="비밀번호"
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              value={newUser.password || ''}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* 역할 */}
            <FormControl fullWidth required>
              <InputLabel id="role-label">역할</InputLabel>
              <Select
                labelId="role-label"
                label="역할"
                value={newUser.role || ''}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as string })
                }
              >
                <MenuItem value="사원">사원</MenuItem>
                <MenuItem value="팀장">팀장</MenuItem>
                <MenuItem value="부장">부장</MenuItem>
                <MenuItem value="부문장">부문장</MenuItem>
                <MenuItem value="임원">임원</MenuItem>
              </Select>
            </FormControl>

            {/* 부서 */}
            <FormControl fullWidth required>
              <InputLabel id="department-label">부서</InputLabel>
              <Select
                labelId="department-label"
                label="부서"
                value={newUser.department || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    department: e.target.value as string,
                  })
                }
              >
                {mockDepartments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            취소
          </Button>
          <Button variant="contained" onClick={handleAddUser}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
