// src/api/mock/dashboard.ts
// 대시보드 가상 데이터

import type { KpiStat, RecentActivity, ApprovalStage, DepartmentData, PopularItem, MyGomgomi } from '@/api/types/dashboard'

export const KPI_STATS: KpiStat[] = [
  { label: '전체 아이디어', value: '150건', icon: '💡', color: '#3b82f6' },
  { label: '승인 완료', value: '68건', icon: '✅', color: '#10b981' },
  { label: '이번 달 신규', value: '23건', icon: '🚀', color: '#f59e0b' },
  { label: '전체 실행률', value: '73.4%', icon: '📊', color: '#8b5cf6' },
]

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { user: 'John', action: 'Q3 예산 아이디어 승인', time: '2시간 전', icon: '✓', color: '#10b981' },
  { user: 'Sarah', action: '새로운 디자인 안 업로드', time: '4시간 전', icon: '📎', color: '#3b82f6' },
  { user: 'Mike', action: '마일스톤 완료', time: '어제', icon: '🎯', color: '#f59e0b' },
  { user: '김민지', action: '원격근무 제안 공감 50건 달성', time: '어제', icon: '♥', color: '#ef4444' },
]

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