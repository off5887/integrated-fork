// src/api/mock/idea.ts

import type { CategoryApiItem, CategoryOption, OrgDivision, Reviewer } from '@/api/types/idea'

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