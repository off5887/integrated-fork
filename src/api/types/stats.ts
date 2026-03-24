// src/api/types/stats.ts

/** 원시 레코드 — period(월) 단위로 저장 */
export interface PersonStats {
  id: number          // person 고유 ID (기간 묶음에 사용)
  period: string      // 'YYYY-MM'
  name: string
  department: string
  position: string
  totalPosts: number       // 총게시글
  comments: number         // 댓글
  ideaCount: number        // 아이디어상상
  completeCount: number    // 실행완료상상
  executionCount: number   // 실행건수
  expectedAmount: number   // 기대성과금액 (만원)
  mileage: number          // 마일리지 (생선)
}

/** 집계 후 테이블에 전달되는 행 (period 제거) */
export type PersonStatsRow = Omit<PersonStats, 'period'>

/** 원시 레코드 — period(월) 단위로 저장 */
export interface TeamStats {
  id: number          // team 고유 ID
  period: string      // 'YYYY-MM'
  team: string
  teamSize: number         // 팀인원
  participantCount: number // 참여인원
  participationRate: number // 참여율 (%)
  totalPosts: number       // 총게시글
  postsPerPerson: number   // 인당건수
  ideaCount: number        // 아이디어상상
  completeCount: number    // 실행완료상상
  executionCount: number   // 실행건수
  reviewRate: number       // 심사율 (%)
  expectedAmount: number   // 기대성과금액 (만원)
  mileage: number          // 마일리지 (생선)
}

/** 집계 후 테이블에 전달되는 행 (period 제거) */
export type TeamStatsRow = Omit<TeamStats, 'period'>
