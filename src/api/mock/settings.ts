import type { OrgMember } from '@/api/types/reviewer'
import type { AdminUserItem, UserRoleItem, UserRolesData, User, UserApiBizArea, MileageMember, Idea, SectionReviewer, LevelConfig } from '@/api/types/settings'

// ── 레벨 설정 ─────────────────────────────────────────────────────────────────
export const mockLevelConfigs: LevelConfig[] = [
  { level: 0, levelName: '아기 곰곰이', minMileage: 0 },
  { level: 1, levelName: '꼬마 곰곰이', minMileage: 500 },
  { level: 2, levelName: '곰곰 워리어', minMileage: 2000 },
  { level: 3, levelName: '곰곰 마스터', minMileage: 5000 },
  { level: 4, levelName: '곰신',        minMileage: 10000 },
]

// ── 조직도 ───────────────────────────────────────────────────────────────────
export const mockOrganization: OrgMember[] = [
  // 디지털전략부문
  { id: '1',  name: '김개발',  position: '개발팀장',  department: '개발1팀',    division: '디지털전략부문' },
  { id: '2',  name: '이코딩',  position: '수석개발자', department: '개발1팀',    division: '디지털전략부문' },
  { id: '3',  name: '박프론트', position: '프론트엔드', department: '개발1팀',    division: '디지털전략부문' },
  { id: '4',  name: '최기획',  position: '기획팀장',  department: '기획팀',     division: '디지털전략부문' },
  { id: '5',  name: '정디자인', position: '디자이너',  department: '기획팀',     division: '디지털전략부문' },
  // 영업부문
  { id: '6',  name: '윤영업',  position: '영업팀장',  department: '영업1팀',    division: '영업부문'      },
  { id: '7',  name: '송세일',  position: '영업사원',  department: '영업1팀',    division: '영업부문'      },
  { id: '8',  name: '한마케팅', position: '마케팅팀장', department: '마케팅팀',   division: '영업부문'      },
  // 경영지원부문
  { id: '9',  name: '오인사',  position: '인사팀장',  department: '인사팀',     division: '경영지원부문'   },
  { id: '10', name: '백재무',  position: '재무팀장',  department: '재무팀',     division: '경영지원부문'   },
  { id: '11', name: '남총무',  position: '총무',     department: '총무팀',     division: '경영지원부문'   },
  // 더 많은 데이터 (실제로는 axios로 불러올 예정)
  { id: '12', name: '서부문장', position: '부문장',   department: '전략기획실',  division: '디지털전략부문' },
  { id: '13', name: '장임원',  position: '상무',     department: '경영지원부문', division: '경영지원부문'   },
]

// ── 사용자 관리 ──────────────────────────────────────────────────────────────
// role: 'user' = 일반 사용자, 'reviewer' = 심사자, 'admin' = 관리자
/** GET /api/users/admins 데모 모드 */
export const mockAdminUsers: AdminUserItem[] = [
  { employeeId: 'DEV001', name: '김개발' },
  { employeeId: 'EXE001', name: '장임원' },
]

/** GET /api/users/roles 데모 모드 */
export const mockUserRoles: UserRolesData = {
  admins: [
    { employeeId: 'DEV001', name: '김개발',  department: '본사', section: '개발1팀', rollNm: '팀장', email: 'kim.dev@company.com',  isAdmin: true,  isReviewer: false, totalMileage: 1200, gomLevel: 3 },
    { employeeId: 'EXE001', name: '장임원',  department: '본사', section: '경영지원부문', rollNm: '임원', email: 'jang.exe@company.com', isAdmin: true,  isReviewer: false, totalMileage: 800,  gomLevel: 2 },
  ] satisfies UserRoleItem[],
  reviewers: [
    { employeeId: 'DEV002',  name: '이코딩',   department: '본사',     section: '개발1팀',   rollNm: '사원',   email: 'lee.code@company.com',   isAdmin: false, isReviewer: true, totalMileage: 650, gomLevel: 1 },
    { employeeId: 'PLAN001', name: '최기획',   department: '본사',     section: '기획팀',    rollNm: '팀장',   email: 'choi.plan@company.com',  isAdmin: false, isReviewer: true, totalMileage: 430, gomLevel: 1 },
    { employeeId: 'SALE001', name: '윤영업',   department: '강남지사',  section: '영업1팀',   rollNm: '팀장',   email: 'yoon.sales@company.com', isAdmin: false, isReviewer: true, totalMileage: 310, gomLevel: 1 },
    { employeeId: 'MKT001',  name: '한마케팅', department: '강남지사',  section: '마케팅팀',  rollNm: '팀장',   email: 'han.mkt@company.com',    isAdmin: false, isReviewer: true, totalMileage: 290, gomLevel: 1 },
    { employeeId: 'HR001',   name: '오인사',   department: '본사',     section: '인사팀',    rollNm: '팀장',   email: 'oh.hr@company.com',      isAdmin: false, isReviewer: true, totalMileage: 180, gomLevel: 1 },
    { employeeId: 'STR001',  name: '서부문장', department: '본사',     section: '전략기획실', rollNm: '부문장', email: 'seo.str@company.com',    isAdmin: false, isReviewer: true, totalMileage: 520, gomLevel: 2 },
  ] satisfies UserRoleItem[],
}

export const mockUsers: User[] = [
  { id: 'DEV001',  name: '김개발',   employeeNumber: 'DEV001',  email: 'kim.dev@company.com',      role: 'admin',    position: '팀장',   department: '개발1팀',     businessSite: '본사',     active: true  },
  { id: 'DEV002',  name: '이코딩',   employeeNumber: 'DEV002',  email: 'lee.code@company.com',     role: 'reviewer', position: '사원',   department: '개발1팀',     businessSite: '본사',     active: true  },
  { id: 'DEV003',  name: '박프론트', employeeNumber: 'DEV003',  email: 'park.front@company.com',   role: 'user',     position: '사원',   department: '개발1팀',     businessSite: '본사',     active: true  },
  { id: 'PLAN001', name: '최기획',   employeeNumber: 'PLAN001', email: 'choi.plan@company.com',    role: 'reviewer', position: '팀장',   department: '기획팀',      businessSite: '본사',     active: true  },
  { id: 'PLAN002', name: '정디자인', employeeNumber: 'PLAN002', email: 'jung.design@company.com',  role: 'user',     position: '사원',   department: '기획팀',      businessSite: '본사',     active: true  },
  { id: 'SALE001', name: '윤영업',   employeeNumber: 'SALE001', email: 'yoon.sales@company.com',   role: 'reviewer', position: '팀장',   department: '영업1팀',     businessSite: '강남지사', active: true  },
  { id: 'SALE002', name: '송세일',   employeeNumber: 'SALE002', email: 'song.sale@company.com',    role: 'user',     position: '사원',   department: '영업1팀',     businessSite: '강남지사', active: true  },
  { id: 'MKT001',  name: '한마케팅', employeeNumber: 'MKT001',  email: 'han.mkt@company.com',      role: 'reviewer', position: '팀장',   department: '마케팅팀',    businessSite: '강남지사', active: true  },
  { id: 'HR001',   name: '오인사',   employeeNumber: 'HR001',   email: 'oh.hr@company.com',        role: 'reviewer', position: '팀장',   department: '인사팀',      businessSite: '본사',     active: true  },
  { id: 'FIN001',  name: '백재무',   employeeNumber: 'FIN001',  email: 'baek.fin@company.com',     role: 'user',     position: '팀장',   department: '재무팀',      businessSite: '본사',     active: false },
  { id: 'GEN001',  name: '남총무',   employeeNumber: 'GEN001',  email: 'nam.gen@company.com',      role: 'user',     position: '사원',   department: '총무팀',      businessSite: '부산지사', active: true  },
  { id: 'STR001',  name: '서부문장', employeeNumber: 'STR001',  email: 'seo.str@company.com',      role: 'reviewer', position: '부문장', department: '전략기획실',  businessSite: '본사',     active: true  },
  { id: 'EXE001',  name: '장임원',   employeeNumber: 'EXE001',  email: 'jang.exe@company.com',     role: 'admin',    position: '임원',   department: '경영지원부문', businessSite: '본사',    active: true  },
]

/** GET /api/users 데모 모드 — 조직도 트리 형태 (공동제안자 선택용) */
export const mockUsersBizArea: UserApiBizArea[] = [
  {
    bizAreaNm: '본사',
    teams: [
      {
        deptCd: 'D0', deptNm: '개발1팀',
        members: [
          { employeeId: 'DEV001', name: '김개발',   email: 'kim.dev@company.com',    rollNm: '팀장',   isAdmin: true,  isReviewer: false, isActive: true  },
          { employeeId: 'DEV002', name: '이코딩',   email: 'lee.code@company.com',   rollNm: '사원',   isAdmin: false, isReviewer: true,  isActive: true  },
          { employeeId: 'DEV003', name: '박프론트', email: 'park.front@company.com', rollNm: '사원',   isAdmin: false, isReviewer: false, isActive: true  },
        ],
      },
      {
        deptCd: 'D1', deptNm: '기획팀',
        members: [
          { employeeId: 'PLAN001', name: '최기획',   email: 'choi.plan@company.com',   rollNm: '팀장', isAdmin: false, isReviewer: true, isActive: true },
          { employeeId: 'PLAN002', name: '정디자인', email: 'jung.design@company.com', rollNm: '사원', isAdmin: false, isReviewer: false, isActive: true },
        ],
      },
      {
        deptCd: 'D4', deptNm: '인사팀',
        members: [
          { employeeId: 'HR001', name: '오인사', email: 'oh.hr@company.com', rollNm: '팀장', isAdmin: false, isReviewer: true, isActive: true },
        ],
      },
      {
        deptCd: 'D5', deptNm: '재무팀',
        members: [
          { employeeId: 'FIN001', name: '백재무', email: 'baek.fin@company.com', rollNm: '팀장', isAdmin: false, isReviewer: false, isActive: false },
        ],
      },
      {
        deptCd: 'D6', deptNm: '전략기획실',
        members: [
          { employeeId: 'STR001', name: '서부문장', email: 'seo.str@company.com', rollNm: '부문장', isAdmin: false, isReviewer: true, isActive: true },
        ],
      },
      {
        deptCd: 'D8', deptNm: '경영지원부문',
        members: [
          { employeeId: 'EXE001', name: '장임원', email: 'jang.exe@company.com', rollNm: '임원', isAdmin: true, isReviewer: false, isActive: true },
        ],
      },
    ],
  },
  {
    bizAreaNm: '강남지사',
    teams: [
      {
        deptCd: 'D2', deptNm: '영업1팀',
        members: [
          { employeeId: 'SALE001', name: '윤영업', email: 'yoon.sales@company.com', rollNm: '팀장', isAdmin: false, isReviewer: true,  isActive: true },
          { employeeId: 'SALE002', name: '송세일', email: 'song.sale@company.com',  rollNm: '사원', isAdmin: false, isReviewer: false, isActive: true },
        ],
      },
      {
        deptCd: 'D3', deptNm: '마케팅팀',
        members: [
          { employeeId: 'MKT001', name: '한마케팅', email: 'han.mkt@company.com', rollNm: '팀장', isAdmin: false, isReviewer: true, isActive: true },
        ],
      },
    ],
  },
  {
    bizAreaNm: '부산지사',
    teams: [
      {
        deptCd: 'D7', deptNm: '총무팀',
        members: [
          { employeeId: 'GEN001', name: '남총무', email: 'nam.gen@company.com', rollNm: '사원', isAdmin: false, isReviewer: false, isActive: true },
        ],
      },
    ],
  },
]

export const mockDepartments: string[] = [
  '개발1팀', '개발2팀', '기획팀', '디자인팀',
  '영업1팀', '마케팅팀', '인사팀', '재무팀', '총무팀',
]

// ── 마일리지 ─────────────────────────────────────────────────────────────────
export const mockMileageMembers: MileageMember[] = [
  { id: '1',  name: '김개발',  position: '개발팀장',  department: '개발1팀',    division: '디지털전략부문', employeeNumber: 'DEV001'  },
  { id: '2',  name: '이코딩',  position: '수석개발자', department: '개발1팀',    division: '디지털전략부문', employeeNumber: 'DEV002'  },
  { id: '3',  name: '박프론트', position: '프론트엔드', department: '개발1팀',    division: '디지털전략부문', employeeNumber: 'DEV003'  },
  { id: '4',  name: '최기획',  position: '기획팀장',  department: '기획팀',     division: '디지털전략부문', employeeNumber: 'PLAN001' },
  { id: '5',  name: '정디자인', position: '디자이너',  department: '기획팀',     division: '디지털전략부문', employeeNumber: 'PLAN002' },
  { id: '6',  name: '윤영업',  position: '영업팀장',  department: '영업1팀',    division: '영업부문',      employeeNumber: 'SALE001' },
  { id: '7',  name: '송세일',  position: '영업사원',  department: '영업1팀',    division: '영업부문',      employeeNumber: 'SALE002' },
  { id: '8',  name: '한마케팅', position: '마케팅팀장', department: '마케팅팀',   division: '영업부문',      employeeNumber: 'MKT001'  },
  { id: '9',  name: '오인사',  position: '인사팀장',  department: '인사팀',     division: '경영지원부문',   employeeNumber: 'HR001'   },
  { id: '10', name: '백재무',  position: '재무팀장',  department: '재무팀',     division: '경영지원부문',   employeeNumber: 'FIN001'  },
  { id: '11', name: '남총무',  position: '총무',     department: '총무팀',     division: '경영지원부문',   employeeNumber: 'GEN001'  },
  { id: '12', name: '서부문장', position: '부문장',   department: '전략기획실',  division: '디지털전략부문', employeeNumber: 'STR001'  },
  { id: '13', name: '장임원',  position: '상무',     department: '경영지원부문', division: '경영지원부문',   employeeNumber: 'EXE001'  },
]

// ── 심사자 변경 ──────────────────────────────────────────────────────────────
export const mockReviewerPools: Record<1, OrgMember[]> = {
  1: [
    { id: '1',  name: '김개발',  position: '개발팀장',  department: '개발1팀',  division: '디지털전략부문' },
    { id: '4',  name: '최기획',  position: '기획팀장',  department: '기획팀',   division: '디지털전략부문' },
    { id: '6',  name: '윤영업',  position: '영업팀장',  department: '영업1팀',  division: '영업부문'      },
    { id: '8',  name: '한마케팅', position: '마케팅팀장', department: '마케팅팀', division: '영업부문'      },
    { id: '9',  name: '오인사',  position: '인사팀장',  department: '인사팀',   division: '경영지원부문'   },
  ],
}

export const mockSectionReviewers: SectionReviewer[] = [
  { id: 1, deptCd: 'D0', deptNm: '개발1팀',  reviewerEmployeeId: '1', name: '김개발',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: null },
  { id: 2, deptCd: 'D1', deptNm: '기획팀',   reviewerEmployeeId: '4', name: '최기획',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: null },
  { id: 3, deptCd: 'D2', deptNm: '영업1팀',  reviewerEmployeeId: '6', name: '윤영업',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: null },
  { id: 4, deptCd: 'D3', deptNm: '마케팅팀', reviewerEmployeeId: '8', name: '한마케팅', rollNm: '팀장', reviewStage: 1, assignedBy: '1', isActive: false, createdAt: '2026-01-01T00:00:00', updatedAt: null },
  { id: 5, deptCd: 'D4', deptNm: '인사팀',   reviewerEmployeeId: '9', name: '오인사',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: null },
]

/** 데모 모드 — 내 부서 심사자 목록 (my-department) */
export const mockMyDeptReviewers: SectionReviewer[] = [
  { id: 1, deptCd: 'D0', deptNm: '개발1팀', reviewerEmployeeId: '22210051', name: '김태섭', rollNm: '과장',  reviewStage: 1, assignedBy: '11110001', isActive: true, createdAt: '2026-03-01T09:00:00', updatedAt: null },
  { id: 2, deptCd: 'D0', deptNm: '개발1팀', reviewerEmployeeId: '22210052', name: '이승재', rollNm: '차장',  reviewStage: 2, assignedBy: '11110001', isActive: true, createdAt: '2026-03-01T09:00:00', updatedAt: null },
  { id: 3, deptCd: 'D0', deptNm: '개발1팀', reviewerEmployeeId: '22210053', name: '박지영', rollNm: '부장',  reviewStage: 3, assignedBy: '11110001', isActive: true, createdAt: '2026-03-01T09:00:00', updatedAt: null },
]

export const mockIdeas: Idea[] = [
  { id: 1, title: '회의실 예약 시스템 개선안',      submitter: '이코딩',   department: '개발1팀',  deptCd: 'D0', submittedAt: '2026-02-15', status: '심사대기' },
  { id: 2, title: '사내 복지 포인트 활용 방안',     submitter: '박프론트', department: '개발1팀',  deptCd: 'D0', submittedAt: '2026-02-18', status: '심사대기' },
  { id: 3, title: '고객 응대 프로세스 표준화',      submitter: '윤영업',   department: '영업1팀',  deptCd: 'D2', submittedAt: '2026-02-20', status: '승인'    },
  { id: 4, title: '재고 관리 시스템 자동화',        submitter: '송세일',   department: '영업1팀',  deptCd: 'D2', submittedAt: '2026-02-22', status: '반려'    },
  { id: 5, title: '신입 사원 온보딩 프로그램 개선', submitter: '오인사',   department: '인사팀',   deptCd: 'D4', submittedAt: '2026-02-25', status: '실행중'  },
  { id: 6, title: '에너지 절약 캠페인 실행 방안',   submitter: '남총무',   department: '총무팀',   deptCd: 'D7', submittedAt: '2026-02-28', status: '완료'    },
  { id: 7, title: '마케팅 콘텐츠 제작 효율화',      submitter: '한마케팅', department: '마케팅팀', deptCd: 'D3', submittedAt: '2026-03-01', status: '심사대기' },
  { id: 8, title: '원격 근무 환경 표준화 방안',     submitter: '이코딩',   department: '개발1팀',  deptCd: 'D0', submittedAt: '2026-03-03', status: '심사대기' },
]
