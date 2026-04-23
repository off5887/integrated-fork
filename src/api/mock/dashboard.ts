// src/api/mock/dashboard.ts
// 대시보드 가상 데이터

import type { KpiStat, RecentActivity, ApprovalStage, DepartmentData, PopularItem, MyGomgomi, RoleIdeaItem, RoleJudgeItem, RoleMileageRequest, DepartmentStat, ReviewerDashboardStats } from '@/api/types/dashboard'

/** 일반사용자 KPI */
export const KPI_STATS: KpiStat[] = [
  { label: '내 아이디어', value: '5건',     icon: '💡', color: '#3b82f6' },
  { label: '승인 완료',   value: '2건',     icon: '✅', color: '#10b981' },
  { label: '심사 중',     value: '2건',     icon: '⏳', color: '#f59e0b' },
  { label: '획득 마일리지', value: '5,420마리', icon: '🐟', color: '#8b5cf6' },
]

/** 심사자 KPI */
const KPI_STATS_REVIEWER: KpiStat[] = [
  { label: '심사 할당', value: '5건',   icon: '📋', color: '#6366f1' },
  { label: '심사 완료', value: '8건',   icon: '✅', color: '#10b981' },
  { label: '대기 중',   value: '3건',   icon: '⏳', color: '#f59e0b' },
  { label: '평균 처리', value: '2.3일', icon: '📊', color: '#8b5cf6' },
]

/** 관리자 KPI */
const KPI_STATS_ADMIN: KpiStat[] = [
  { label: '전체 아이디어', value: '150건', icon: '💡', color: '#3b82f6' },
  { label: '승인 완료',     value: '68건',  icon: '✅', color: '#10b981' },
]

export const KPI_STATS_BY_ROLE: Record<string, KpiStat[]> = {
  user:     KPI_STATS,
  reviewer: KPI_STATS_REVIEWER,
  admin:    KPI_STATS_ADMIN,
}

export const TEAM_ACTIVITIES: RecentActivity[] = [
  { user: 'John', action: 'Q3 예산 아이디어 승인', time: '2시간 전', icon: '✓', color: '#10b981' },
  { user: 'Sarah', action: '새로운 디자인 안 업로드', time: '4시간 전', icon: '📎', color: '#3b82f6' },
  { user: 'Mike', action: '마일스톤 완료', time: '어제', icon: '🎯', color: '#f59e0b' },
  { user: '김민지', action: '원격근무 제안 공감 50건 달성', time: '어제', icon: '♥', color: '#ef4444' },
  { user: '이준호', action: '탄력근무제 아이디어 제출', time: '2일 전', icon: '💡', color: '#6366f1' },
  { user: '박소연', action: '구내식당 개선안 공감 30건', time: '2일 전', icon: '♥', color: '#ef4444' },
]

export const MY_ACTIVITIES: RecentActivity[] = [
  { user: '나', action: '사내 카페 메뉴 다양화 제안 제출', time: '2일 전', icon: '💡', color: '#6366f1' },
  { user: '나', action: '유연근무제 도입 아이디어 공감 45건 달성', time: '5일 전', icon: '♥', color: '#ef4444' },
  { user: '나', action: '재택근무 장비 지원 확대 심사 중', time: '1주 전', icon: '📋', color: '#f59e0b' },
  { user: '나', action: '팀 빌딩 행사 정례화 제안 반려', time: '2주 전', icon: '✕', color: '#ef4444' },
]

/** @deprecated RECENT_ACTIVITIES → TEAM_ACTIVITIES 로 이전 */
export const RECENT_ACTIVITIES = TEAM_ACTIVITIES

export const APPROVAL_STAGES: ApprovalStage[] = [
  { label: '부문장', value: 68, color: '#6366f1' },
  { label: '팀장', value: 15, color: '#3b82f6' },
  { label: '접수', value: 10, color: '#06b6d4' },
  { label: '실행요청', value: 7, color: '#8b5cf6' },
]

export const DEPARTMENT_DATA: DepartmentData[] = [
  { department: '개발1팀', value: 85, color: '#6366f1' },
  { department: '개발2팀', value: 72, color: '#3b82f6' },
  { department: '기획팀', value: 68, color: '#06b6d4' },
  { department: '디자인팀', value: 55, color: '#10b981' },
  { department: '운영팀', value: 49, color: '#f59e0b' },
]

export const POPULAR_ITEMS: PopularItem[] = [
  { title: '사내 카페 메뉴 다양화 및 간식 음료 확대', likes: 142, ideaId: 2 },
  { title: '유연근무제 전면 도입으로 재택근무 활성화', likes: 98, ideaId: 14 },
  { title: '재택근무 원격근무 화상회의 시스템 업그레이드', likes: 87, ideaId: 4 },
  { title: '임직원 통근 교통비 지원 확대', likes: 76, ideaId: 18 },
  { title: '사내 도서관 디지털화 프로젝트', likes: 65, ideaId: 6 },
]

/** 일반사용자 lv.5 — 곰신 */
export const MY_GOMGOMI: MyGomgomi = {
  fishTotal: 5420,
  fishToNextLevel: 8000,
  level: 5,
  rankName: '곰신',
  miniStats: [
    { label: '이달 획득', value: '320마리', color: '#8b5cf6' },
    { label: '연속 출석', value: '14일',    color: '#a78bfa' },
  ],
}

/** 심사자 lv.2 — 심사위원 곰 (레벨과 타로카드는 역할 고정) */
const MY_GOMGOMI_REVIEWER: MyGomgomi = {
  fishTotal: 2150,
  fishToNextLevel: 3000,
  level: 2,
  rankName: '심사위원 곰',
  miniStats: [
    { label: '심사 완료', value: '8건',  color: '#10b981' },
    { label: '심사 대기', value: '5건',  color: '#f59e0b' },
  ],
}

/** 관리자 lv.1 — 시스템 관리자 곰 (레벨과 타로카드는 역할 고정) */
const MY_GOMGOMI_ADMIN: MyGomgomi = {
  fishTotal: 980,
  fishToNextLevel: 2000,
  level: 1,
  rankName: '시스템 관리자 곰',
  miniStats: [
    { label: '전체 사용자', value: '13명', color: '#6366f1' },
    { label: '신청 대기',   value: '3건',  color: '#f59e0b' },
  ],
}

export const MY_GOMGOMI_BY_ROLE: Record<string, MyGomgomi> = {
  user:     MY_GOMGOMI,
  reviewer: MY_GOMGOMI_REVIEWER,
  admin:    MY_GOMGOMI_ADMIN,
}

export const EXECUTION_RATE = 73.4

// ─── 역할별 패널 mock 데이터 ────────────────────────────────────────────────

export const MY_RECENT_IDEAS: RoleIdeaItem[] = [
  { id: 1,  title: '사내 카페 메뉴 다양화 및 간식 확대',      status: '심사 중',   statusColor: '#f59e0b', date: '2일 전',  likes: 23 },
  { id: 2,  title: '유연근무제 전면 도입 제안',                status: '승인',      statusColor: '#10b981', date: '5일 전',  likes: 45 },
  { id: 3,  title: '복지 포인트 인상 및 사용처 확대',          status: '심사 대기', statusColor: '#6366f1', date: '1주 전',  likes: 12 },
  { id: 4,  title: '팀 빌딩 행사 월 1회 정례화',              status: '반려',      statusColor: '#ef4444', date: '2주 전',  likes: 8  },
  { id: 5,  title: '재택근무 화상회의 장비 지원 확대',         status: '심사 중',   statusColor: '#f59e0b', date: '3주 전',  likes: 31 },
]

export const PENDING_REVIEW_IDEAS: RoleJudgeItem[] = [
  { id: 1, title: '사내 도서관 디지털화 프로젝트',    proposer: '김민지', dueDate: '오늘',  urgent: true  },
  { id: 2, title: '탄력근무제 전면 도입',             proposer: '이준호', dueDate: '내일',  urgent: true  },
  { id: 3, title: '구내식당 메뉴 다양화 개선',        proposer: '박소연', dueDate: '3일 후', urgent: false },
  { id: 4, title: '임직원 교통비 지원 확대',          proposer: '최재원', dueDate: '5일 후', urgent: false },
  { id: 5, title: '사내 피트니스센터 이용시간 연장',  proposer: '정다은', dueDate: '1주 후', urgent: false },
]

export const DEPARTMENT_STATS: DepartmentStat[] = [
  { department: '개발1팀',  count: 85 },
  { department: '개발2팀',  count: 72 },
  { department: '기획팀',   count: 68 },
  { department: '디자인팀', count: 55 },
  { department: '운영팀',   count: 49 },
]

export const REVIEWER_DASH_STATS: ReviewerDashboardStats = {
  assigned:  5,
  pending:   3,
  completed: 8,
  avgDays:   2.3,
}

export const MILEAGE_REQUESTS: RoleMileageRequest[] = [
  { id: 1, name: '홍길동', fish: 1200, cashAmount: 120000, requestDate: '방금 전' },
  { id: 2, name: '김철수', fish:  850, cashAmount:  85000, requestDate: '1시간 전' },
  { id: 3, name: '이영희', fish: 2100, cashAmount: 210000, requestDate: '3시간 전' },
  { id: 4, name: '박민준', fish:  500, cashAmount:  50000, requestDate: '어제' },
  { id: 5, name: '최수진', fish: 1750, cashAmount: 175000, requestDate: '어제' },
]