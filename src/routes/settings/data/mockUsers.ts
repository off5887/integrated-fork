import type { User } from '../types'

export const mockUsers: User[] = [
  { id: 1, name: '김개발', employeeNumber: 'DEV001', email: 'dev1@company.com',   role: '팀장',    department: '개발1팀', active: true  },
  { id: 2, name: '이코딩', employeeNumber: 'DEV002', email: 'front@company.com',  role: '사원',    department: '개발1팀', active: true  },
  { id: 3, name: '박기획', employeeNumber: 'PLAN001', email: 'plan@company.com',  role: '팀장',    department: '기획팀', active: true  },
  { id: 4, name: '최디자인', employeeNumber: 'DES001', email: 'design@company.com', role: '디자이너', department: '기획팀', active: false },
]

export const mockDepartments: string[] = [
  '개발1팀', '개발2팀', '기획팀', '디자인팀',
  '영업1팀', '마케팅팀', '인사팀', '재무팀', '총무팀',
]
