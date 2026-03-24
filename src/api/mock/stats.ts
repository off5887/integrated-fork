// src/api/mock/stats.ts
import type { PersonStats, TeamStats } from '@/api/types/stats'

// ── 기간 정의 ─────────────────────────────────────────────────────────────────
// 인덱스 0 = 가장 오래된 기간, 3 = 최신 기간
const PERIODS = ['2025-12', '2026-01', '2026-02', '2026-03'] as const
// 기간별 스케일 (오래될수록 더 적은 수치)
const SCALE = [0.58, 0.73, 0.87, 1.0]

function scale(base: number, idx: number, min = 0): number {
  return Math.max(min, Math.round(base * SCALE[idx]))
}
function scaleK(base: number, idx: number): number {
  // 천 단위 반올림 (기대성과금액)
  return Math.round((base * SCALE[idx]) / 100) * 100
}

// ── 개인 기준 데이터 (최신 기간 기준) ─────────────────────────────────────────
interface PersonBase {
  id: number
  name: string
  department: string
  position: string
  totalPosts: number
  comments: number
  ideaCount: number
  completeCount: number
  executionCount: number
  expectedAmount: number
  mileage: number
}

const BASE_PERSONS: PersonBase[] = [
  { id: 1,  name: '홍길동', department: '개발팀',    position: '대리', totalPosts: 18, comments: 42, ideaCount: 12, completeCount: 6, executionCount: 4, expectedAmount: 2400, mileage: 370 },
  { id: 2,  name: '김영희', department: '기획팀',    position: '과장', totalPosts: 22, comments: 67, ideaCount: 15, completeCount: 7, executionCount: 5, expectedAmount: 3100, mileage: 480 },
  { id: 3,  name: '이철수', department: '경영지원팀', position: '부장', totalPosts: 9,  comments: 28, ideaCount: 6,  completeCount: 3, executionCount: 2, expectedAmount: 900,  mileage: 180 },
  { id: 4,  name: '박지수', department: '개발팀',    position: '사원', totalPosts: 7,  comments: 15, ideaCount: 5,  completeCount: 2, executionCount: 1, expectedAmount: 600,  mileage: 120 },
  { id: 5,  name: '최민준', department: '디자인팀',  position: '대리', totalPosts: 13, comments: 38, ideaCount: 9,  completeCount: 4, executionCount: 3, expectedAmount: 1700, mileage: 260 },
  { id: 6,  name: '정수현', department: '개발팀',    position: '사원', totalPosts: 5,  comments: 12, ideaCount: 3,  completeCount: 2, executionCount: 1, expectedAmount: 400,  mileage: 80  },
  { id: 7,  name: '오세훈', department: '영업팀',    position: '과장', totalPosts: 20, comments: 55, ideaCount: 14, completeCount: 6, executionCount: 5, expectedAmount: 2900, mileage: 440 },
  { id: 8,  name: '윤미래', department: '인사팀',    position: '대리', totalPosts: 11, comments: 30, ideaCount: 7,  completeCount: 4, executionCount: 2, expectedAmount: 1200, mileage: 200 },
  { id: 9,  name: '강동원', department: '개발팀',    position: '사원', totalPosts: 8,  comments: 22, ideaCount: 5,  completeCount: 3, executionCount: 2, expectedAmount: 750,  mileage: 150 },
  { id: 10, name: '임수진', department: '기획팀',    position: '사원', totalPosts: 6,  comments: 18, ideaCount: 4,  completeCount: 2, executionCount: 1, expectedAmount: 500,  mileage: 90  },
  { id: 11, name: '한지민', department: '디자인팀',  position: '부장', totalPosts: 16, comments: 48, ideaCount: 11, completeCount: 5, executionCount: 4, expectedAmount: 2100, mileage: 330 },
  { id: 12, name: '서준호', department: '경영지원팀', position: '사원', totalPosts: 4,  comments: 9,  ideaCount: 3,  completeCount: 1, executionCount: 0, expectedAmount: 250,  mileage: 50  },
  { id: 13, name: '노아름', department: '영업팀',    position: '사원', totalPosts: 10, comments: 27, ideaCount: 7,  completeCount: 3, executionCount: 2, expectedAmount: 980,  mileage: 170 },
  { id: 14, name: '백승현', department: '인사팀',    position: '과장', totalPosts: 14, comments: 40, ideaCount: 10, completeCount: 4, executionCount: 3, expectedAmount: 1600, mileage: 250 },
]

// 기간별 개인 데이터 생성
export const personStatsData: PersonStats[] = BASE_PERSONS.flatMap((p) =>
  PERIODS.map((period, i) => ({
    ...p,
    period,
    totalPosts:     scale(p.totalPosts, i, 1),
    comments:       scale(p.comments, i, 1),
    ideaCount:      scale(p.ideaCount, i, 1),
    completeCount:  scale(p.completeCount, i, 0),
    executionCount: scale(p.executionCount, i, 0),
    expectedAmount: scaleK(p.expectedAmount, i),
    mileage:        scale(p.mileage, i, 10),
  })),
)

// ── 팀 기준 데이터 (최신 기간 기준) ──────────────────────────────────────────
interface TeamBase {
  id: number
  team: string
  teamSize: number
  participantCount: number
  participationRate: number
  totalPosts: number
  ideaCount: number
  completeCount: number
  executionCount: number
  reviewRate: number
  expectedAmount: number
  mileage: number
}

const BASE_TEAMS: TeamBase[] = [
  { id: 1, team: '개발팀',    teamSize: 12, participantCount: 10, participationRate: 83, totalPosts: 38, ideaCount: 25, completeCount: 13, executionCount: 8, reviewRate: 72, expectedAmount: 4150, mileage: 720 },
  { id: 2, team: '기획팀',    teamSize: 8,  participantCount: 7,  participationRate: 88, totalPosts: 28, ideaCount: 19, completeCount: 9,  executionCount: 6, reviewRate: 78, expectedAmount: 3600, mileage: 570 },
  { id: 3, team: '디자인팀',  teamSize: 6,  participantCount: 5,  participationRate: 83, totalPosts: 29, ideaCount: 20, completeCount: 9,  executionCount: 7, reviewRate: 80, expectedAmount: 3800, mileage: 590 },
  { id: 4, team: '영업팀',    teamSize: 10, participantCount: 7,  participationRate: 70, totalPosts: 30, ideaCount: 21, completeCount: 9,  executionCount: 7, reviewRate: 65, expectedAmount: 3880, mileage: 610 },
  { id: 5, team: '인사팀',    teamSize: 7,  participantCount: 5,  participationRate: 71, totalPosts: 25, ideaCount: 17, completeCount: 8,  executionCount: 5, reviewRate: 60, expectedAmount: 2800, mileage: 450 },
  { id: 6, team: '경영지원팀', teamSize: 9,  participantCount: 6,  participationRate: 67, totalPosts: 13, ideaCount: 9,  completeCount: 4,  executionCount: 2, reviewRate: 55, expectedAmount: 1150, mileage: 230 },
]

export const teamStatsData: TeamStats[] = BASE_TEAMS.flatMap((t) =>
  PERIODS.map((period, i) => {
    const totalPosts     = scale(t.totalPosts, i, 1)
    const participantCount = scale(t.participantCount, i, 1)
    const postsPerPerson = participantCount > 0
      ? Math.round((totalPosts / participantCount) * 10) / 10
      : 0
    return {
      ...t,
      period,
      totalPosts,
      participantCount,
      postsPerPerson,
      ideaCount:      scale(t.ideaCount, i, 1),
      completeCount:  scale(t.completeCount, i, 0),
      executionCount: scale(t.executionCount, i, 0),
      expectedAmount: scaleK(t.expectedAmount, i),
      mileage:        scale(t.mileage, i, 10),
      participationRate: t.participationRate,  // 팀 인원 비율은 동일
      reviewRate:        Math.max(40, t.reviewRate - (3 - i) * 5), // 기간 오래될수록 낮음
    }
  }),
)

// ── 기간 목록 (UI 셀렉터용) ───────────────────────────────────────────────────
export const STAT_PERIODS = PERIODS
export const STAT_PERIOD_MIN = PERIODS[0]
export const STAT_PERIOD_MAX = PERIODS[PERIODS.length - 1]
