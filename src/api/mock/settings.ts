import type { OrgMember } from '@/api/types/reviewer'
import type { User, MileageMember, Idea, SectionReviewer } from '@/api/types/settings'

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
  { id: 1, deptCd: 'D0', deptNm: '개발1팀',  employeeId: '1', name: '김개발',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00' },
  { id: 2, deptCd: 'D1', deptNm: '기획팀',   employeeId: '4', name: '최기획',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00' },
  { id: 3, deptCd: 'D2', deptNm: '영업1팀',  employeeId: '6', name: '윤영업',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00' },
  { id: 4, deptCd: 'D3', deptNm: '마케팅팀', employeeId: '8', name: '한마케팅', rollNm: '팀장', reviewStage: 1, assignedBy: '1', isActive: false, createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00' },
  { id: 5, deptCd: 'D4', deptNm: '인사팀',   employeeId: '9', name: '오인사',  rollNm: '팀장',  reviewStage: 1, assignedBy: '1', isActive: true,  createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00' },
]

export const mockIdeas: Idea[] = [
  {
    id: '1', title: '회의실 예약 시스템 개선안',     submitter: '이코딩',   department: '개발1팀',  submittedAt: '2026-02-15', status: '1차 심사 대기',
    reviewers: { level1: mockReviewerPools[1][0] },
  },
  {
    id: '2', title: '사내 복지 포인트 활용 방안',    submitter: '박프론트', department: '개발1팀',  submittedAt: '2026-02-18', status: '1차 심사 대기',
    reviewers: { level1: mockReviewerPools[1][1] },
  },
  {
    id: '3', title: '고객 응대 프로세스 표준화',     submitter: '윤영업',   department: '영업1팀',  submittedAt: '2026-02-20', status: '1차 심사 대기',
    reviewers: { level1: mockReviewerPools[1][2] },
  },
  {
    id: '4', title: '재고 관리 시스템 자동화',       submitter: '송세일',   department: '영업1팀',  submittedAt: '2026-02-22', status: '임시저장',
    reviewers: { level1: null },
  },
  {
    id: '5', title: '신입 사원 온보딩 프로그램 개선', submitter: '오인사',   department: '인사팀',   submittedAt: '2026-02-25', status: '실행자 선택',
    reviewers: { level1: mockReviewerPools[1][4] },
  },
  {
    id: '6', title: '에너지 절약 캠페인 실행 방안',  submitter: '남총무',   department: '총무팀',   submittedAt: '2026-02-28', status: '결과등록',
    reviewers: { level1: mockReviewerPools[1][0] },
  },
  {
    id: '7', title: '마케팅 콘텐츠 제작 효율화',     submitter: '한마케팅', department: '마케팅팀', submittedAt: '2026-03-01', status: '결과심사',
    reviewers: { level1: mockReviewerPools[1][3] },
  },
  {
    id: '8', title: '원격 근무 환경 표준화 방안',    submitter: '이코딩',   department: '개발1팀',  submittedAt: '2026-03-03', status: '1차 심사 대기',
    reviewers: { level1: mockReviewerPools[1][1] },
  },
]
