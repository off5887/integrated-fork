// src/api/mock/dashboard.ts
// 대시보드 가상 데이터

import type { KpiStat, RecentActivity, ApprovalStage, DepartmentData, PopularItem, MyGomgomi, RoleIdeaItem, RoleJudgeItem, RoleMileageRequest } from '@/api/types/dashboard'

export const KPI_STATS: KpiStat[] = [
  { label: '전체 아이디어', value: '150건', icon: '💡', color: '#3b82f6' },
  { label: '승인 완료', value: '68건', icon: '✅', color: '#10b981' },
  { label: '이번 달 신규', value: '23건', icon: '🚀', color: '#f59e0b' },
  { label: '전체 실행률', value: '73.4%', icon: '📊', color: '#8b5cf6' },
]

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

export const MY_GOMGOMI: MyGomgomi = {
  fishTotal: 5420,
  fishToNextLevel: 8000,
  level: 12,
  rankName: '아기 곰곰이',
  miniStats: [
    { label: '이달 획득', value: '320마리', color: '#8b5cf6' },
    { label: '연속 출석', value: '14일', color: '#a78bfa' },
  ],
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

export const MILEAGE_REQUESTS: RoleMileageRequest[] = [
  { id: 1, name: '홍길동', fish: 1200, cashAmount: 120000, requestDate: '방금 전' },
  { id: 2, name: '김철수', fish:  850, cashAmount:  85000, requestDate: '1시간 전' },
  { id: 3, name: '이영희', fish: 2100, cashAmount: 210000, requestDate: '3시간 전' },
  { id: 4, name: '박민준', fish:  500, cashAmount:  50000, requestDate: '어제' },
  { id: 5, name: '최수진', fish: 1750, cashAmount: 175000, requestDate: '어제' },
]