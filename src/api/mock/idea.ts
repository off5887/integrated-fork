// src/api/mock/idea.ts

import type { CategoryApiItem, CategoryOption, IdeaApiItem, IdeaApiComment, IdeaCommentsPage, IdeaDetailExtras, MyIdeasPage, OrgDivision, Reviewer } from '@/api/types/idea'

/** GET /api/ideas/statuses 데모 모드 응답 — API 키:라벨 매핑 */
export const mockIdeaStatuses: Record<string, string> = {
  pending:     '심사대기',
  approved:    '승인',
  rejected:    '반려',
  in_progress: '실행중',
  completed:   '완료',
}

/** GET /api/categories/all 형태 mock (데모 모드용) */
// icon 필드는 ASCII 식별자 (이모지 아님) — 실제 API와 동일한 형태
export const mockCategoryApiItems: CategoryApiItem[] = [
  { categoryId: 1, categoryName: '절감 아이디어', description: '비용 절감 관련 아이디어',     icon: 'money',  color: '#f59e0b', displayOrder: 1, isActive: true  },
  { categoryId: 2, categoryName: '혁신 아이디어', description: '프로세스 혁신 관련 아이디어', icon: 'rocket', color: '#6366f1', displayOrder: 2, isActive: true  },
  { categoryId: 3, categoryName: '안전 아이디어', description: '안전 관련 아이디어',           icon: 'shield', color: '#10b981', displayOrder: 3, isActive: true  },
  { categoryId: 4, categoryName: '복지 아이디어', description: '직원 복지 관련 아이디어',     icon: 'heart',  color: '#ec4899', displayOrder: 4, isActive: true  },
  { categoryId: 5, categoryName: '품질 아이디어', description: '품질 향상 관련 아이디어',     icon: 'star',   color: '#eab308', displayOrder: 5, isActive: true  },
  { categoryId: 6, categoryName: '환경 아이디어', description: '환경 보호 관련 아이디어',     icon: 'plant',  color: '#14b8a6', displayOrder: 6, isActive: true  },
  { categoryId: 7, categoryName: '기타',          description: null,                           icon: 'pin',    color: '#94a3b8', displayOrder: 7, isActive: true  },
]

export const CATEGORIES: CategoryOption[] = [
  { id: '절감', label: '절감 아이디어', emoji: '💰', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)' },
  { id: '혁신', label: '혁신 아이디어', emoji: '🚀', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.35)' },
  { id: '안전', label: '안전 아이디어', emoji: '🛡️', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)' },
  { id: '복지', label: '복지 아이디어', emoji: '❤️', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.35)' },
  { id: '품질', label: '품질 아이디어', emoji: '⭐', color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.35)' },
  { id: '환경', label: '환경 아이디어', emoji: '🌿', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.35)' },
  { id: '기타', label: '기타', emoji: '📌', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)' },
]

export const REVIEWERS: Reviewer[] = [
  { id: 1, name: '김디자인',   dept: 'UX팀',         position: 'UX Designer' },
  { id: 2, name: '박프로덕트', dept: '프로덕트팀',   position: 'Product Manager' },
  { id: 3, name: '이개발',     dept: '프론트엔드팀', position: 'Frontend Engineer' },
  { id: 4, name: '최마케팅',   dept: '그로스팀',     position: 'Growth Marketer' },
  { id: 5, name: '정기획',     dept: '기획팀',       position: 'Planner' },
  { id: 6, name: '윤서버',     dept: '백엔드팀',     position: 'Backend Engineer' },
  { id: 7, name: '한디렉터',   dept: '디자인실',     position: 'Design Director' },
]

// 부문 → 팀 → 멤버 구조
export const ORG_STRUCTURE: OrgDivision[] = [
  {
    id: 'div1',
    name: 'A부문',
    teams: [
      {
        id: 'team-a1',
        name: 'A팀',
        members: [
          { id: 101, employeeId: '22210101', name: '김프로',     dept: 'A팀', position: 'Product Owner' },
          { id: 102, employeeId: '22210102', name: '박디자이너', dept: 'A팀', position: 'Senior Designer' },
          { id: 103, employeeId: '22210103', name: '최기획',     dept: 'A팀', position: 'Planner' },
        ],
      },
    ],
  },
  {
    id: 'div2',
    name: 'B부문',
    teams: [
      {
        id: 'team-b1',
        name: 'B팀',
        members: [
          { id: 201, employeeId: '22210201', name: '이프론트',   dept: 'B팀', position: 'Frontend Lead' },
          { id: 202, employeeId: '22210202', name: '윤백엔드',   dept: 'B팀', position: 'Backend Engineer' },
        ],
      },
      {
        id: 'team-b2',
        name: 'C팀',
        members: [
          { id: 301, employeeId: '22210301', name: '정모바일',   dept: 'C팀', position: 'iOS Developer' },
          { id: 302, employeeId: '22210302', name: '한안드로이드', dept: 'C팀', position: 'Android Developer' },
        ],
      },
    ],
  },
  {
    id: 'div3',
    name: 'C부문',
    teams: [
      {
        id: 'team-c1',
        name: '마케팅팀',
        members: [
          { id: 401, employeeId: '22210401', name: '윤그로스', dept: '마케팅팀', position: 'Growth Hacker' },
        ],
      },
    ],
  },
]

/** GET /api/ideas/my 데모 모드 응답 */
const mockMyIdeaItems: IdeaApiItem[] = [
  {
    ideaId: 101, title: '개발팀 온보딩 프로세스 디지털화',
    problem: '신입 개발자 온보딩이 수작업·구두 전달에 의존해 인수인계 품질이 들쭉날쭉함.',
    description: '노션 기반 온보딩 위키 + 자동 체크리스트 시스템 구축.',
    categoryId: 2, categoryName: '혁신 아이디어',
    category: { categoryId: 2, categoryName: '혁신 아이디어' },
    type: 'idea', status: 'pending', security: 'N',
    submittedBy: 'DEMO001', mileagePoints: 0,
    submitDate: '2026-03-05T09:00:00', createdAt: '2026-03-05T09:00:00', updatedAt: '2026-03-05T09:00:00',
    coProposers: [],
  },
  {
    ideaId: 102, title: '코드 리뷰 가이드라인 표준화',
    problem: '팀원마다 코드 리뷰 기준이 달라 리뷰 시간이 길고 피드백 일관성이 부족함.',
    description: '리뷰 체크리스트 + 자동 린트 룰 세트 제정.',
    categoryId: 5, categoryName: '품질 아이디어',
    category: { categoryId: 5, categoryName: '품질 아이디어' },
    type: 'idea', status: 'approved', security: 'N',
    submittedBy: 'DEMO001', mileagePoints: 20000,
    submitDate: '2026-01-20T10:00:00', createdAt: '2026-01-20T10:00:00', updatedAt: '2026-02-01T10:00:00',
    coProposers: [],
  },
  {
    ideaId: 103, title: '사내 기술 블로그 운영 제안',
    problem: '개발팀 내 지식이 개인에 집중되고 외부 공유 채널이 없어 채용 브랜딩 취약.',
    description: '주 1회 기술 포스팅 의무화 + 외부 블로그 플랫폼 연동.',
    categoryId: 2, categoryName: '혁신 아이디어',
    category: { categoryId: 2, categoryName: '혁신 아이디어' },
    type: 'idea', status: 'pending', security: 'N',
    submittedBy: 'DEMO001', mileagePoints: 0,
    submitDate: '2026-03-14T14:00:00', createdAt: '2026-03-14T14:00:00', updatedAt: '2026-03-14T14:00:00',
    coProposers: [],
  },
  {
    ideaId: 4, title: '재택근무 원격근무 화상회의 시스템 업그레이드',
    problem: '현재 시스템 화질·지연 문제로 재택근무 및 원격근무 회의 효율 저하.',
    description: 'Microsoft Teams Premium 도입. AI 기반 회의 요약.',
    categoryId: 2, categoryName: '혁신 아이디어',
    category: { categoryId: 2, categoryName: '혁신 아이디어' },
    type: 'idea', status: 'approved', security: 'N',
    submittedBy: 'DEMO001', mileagePoints: 1500,
    submitDate: '2026-02-10T09:00:00', createdAt: '2026-02-10T09:00:00', updatedAt: '2026-02-20T09:00:00',
    coProposers: [],
  },
  {
    ideaId: 1, title: '생산라인 LED 조명 교체로 전기요금 절감',
    problem: '현재 형광등 사용으로 전기요금이 연간 2,400만원 이상 발생.',
    description: 'LED 교체 시 연간 1,200만원 절감 예상.',
    categoryId: 1, categoryName: '절감 아이디어',
    category: { categoryId: 1, categoryName: '절감 아이디어' },
    type: 'idea', status: 'rejected', security: 'N',
    submittedBy: 'DEMO001', mileagePoints: 0,
    submitDate: '2026-02-20T09:00:00', createdAt: '2026-02-20T09:00:00', updatedAt: '2026-02-25T09:00:00',
    coProposers: [],
  },
]

export const mockMyIdeasPage: MyIdeasPage = {
  content: mockMyIdeaItems,
  pageable: { pageNumber: 0, pageSize: 20 },
  totalElements: mockMyIdeaItems.length,
  totalPages: 1,
  last: true,
}

/** GET /api/ideas/{ideaId} 추가 필드 데모 모드 응답 */
export const mockIdeaDetailExtras: Record<number, IdeaDetailExtras> = {
  1:   { viewCount: 120, likeCount: 20, commentCount: 2, isLiked: false, approverId: 'demo2', approverName: '김심사',
         executors: [{ executorId: 1, startDate: '2026-06-01T00:00:00', content: '시스템 UI 개선 및 예약 로직 재설계', expectedResult: '예약 충돌 50% 감소' }],
         coProposers: [{ employeeId: 'EMP005', name: '최기획', rollNm: '대리' }], attachments: [] },
  2:   { viewCount: 450, likeCount: 20, commentCount: 1, isLiked: true,  approverId: 'demo2', approverName: '김심사', executors: null, coProposers: [], attachments: [] },
  3:   { viewCount: 310, likeCount: 20, commentCount: 0, isLiked: false, approverId: null, approverName: null, executors: null, coProposers: [], attachments: [] },
  4:   { viewCount: 380, likeCount: 20, commentCount: 2, isLiked: true,  approverId: null, approverName: null, executors: null, coProposers: [], attachments: [] },
  5:   { viewCount: 290, likeCount: 20, commentCount: 0, isLiked: false, approverId: 'EMP003', approverName: '박인사', executors: null, coProposers: [], attachments: [] },
  101: { viewCount: 120, likeCount: 34, commentCount: 1, isLiked: false, approverId: 'demo2', approverName: '김심사',
         executors: [{ executorId: 2, startDate: '2026-07-01T00:00:00', content: '복지 포인트 사용처 확대 협의', expectedResult: '직원 만족도 향상' }],
         coProposers: [{ employeeId: 'EMP006', name: '정개발', rollNm: '과장' }], attachments: [] },
  102: { viewCount: 210, likeCount: 52, commentCount: 2, isLiked: false, approverId: null, approverName: null, executors: null, coProposers: [], attachments: [] },
}

/** GET /api/ideas/{ideaId}/comments 데모 모드 응답 */
const mockCommentList: Record<number, IdeaApiComment[]> = {
  1: [
    {
      commentId: 101, ideaId: 1, employeeId: 'EMP002', name: '이심사', rollNm: '심사위원',
      content: '좋은 아이디어입니다. 비용 절감 효과가 명확하게 분석되어 있네요.',
      createdAt: '2026-02-21T10:00:00', updatedAt: null,
    },
    {
      commentId: 102, ideaId: 1, employeeId: 'DEMO001', name: '홍길동', rollNm: '일반',
      content: '추가로 작업 환경 개선 효과도 강조하면 좋을 것 같습니다.',
      createdAt: '2026-02-22T09:30:00', updatedAt: null,
    },
  ],
  2: [
    {
      commentId: 201, ideaId: 2, employeeId: 'EMP003', name: '박인사', rollNm: '팀장',
      content: '직원 복지 향상에 좋은 아이디어입니다.',
      createdAt: '2026-02-23T14:00:00', updatedAt: null,
    },
  ],
  4: [
    {
      commentId: 401, ideaId: 4, employeeId: 'EMP004', name: '최개발', rollNm: '선임',
      content: '화상회의 시스템 업그레이드는 정말 필요합니다!',
      createdAt: '2026-02-11T11:00:00', updatedAt: null,
    },
    {
      commentId: 402, ideaId: 4, employeeId: 'DEMO001', name: '홍길동', rollNm: '일반',
      content: 'Teams Premium 외에 Google Meet도 검토해보면 좋겠습니다.',
      createdAt: '2026-02-12T15:00:00', updatedAt: '2026-02-12T16:00:00',
    },
  ],
  101: [
    {
      commentId: 1001, ideaId: 101, employeeId: 'EMP005', name: '김팀장', rollNm: '팀장',
      content: '온보딩 프로세스 개선은 꼭 필요합니다. 지원하겠습니다.',
      createdAt: '2026-03-06T09:00:00', updatedAt: null,
    },
  ],
  102: [
    {
      commentId: 1021, ideaId: 102, employeeId: 'EMP006', name: '박선임', rollNm: '선임',
      content: '코드 리뷰 가이드라인 정말 기대됩니다.',
      createdAt: '2026-01-21T10:00:00', updatedAt: null,
    },
    {
      commentId: 1022, ideaId: 102, employeeId: 'DEMO001', name: '홍길동', rollNm: '일반',
      content: '초안 작성되면 공유해주세요!',
      createdAt: '2026-01-22T11:00:00', updatedAt: null,
    },
  ],
}

export function getMockComments(ideaId: number): IdeaCommentsPage {
  const content = mockCommentList[ideaId] ?? []
  return { content, totalElements: content.length, totalPages: 1, last: true }
}