export type DecisionType = '승인' | '반려' | '승인회수' | '반려회수'

export interface ReviewerTeamStats {
  id: number
  department: string
  reviewerName: string
  reviewerPosition: string
  // 상상 아이디어
  ideaPending: number
  ideaCompleted: number
  ideaTotal: number
  ideaRate: number      // %
  ideaAvgDays: number   // 평균 심사 소요일
  // 실행완료 아이디어
  completePending: number
  completeCompleted: number
  completeTotal: number
  completeRate: number
  completeAvgDays: number
}

export interface Attachment {
  name: string
  url: string
}

export interface ReviewerCandidate {
  id: string
  name: string
  position: string
  department: string
}

export interface Proposal {
  id: number
  /** 상상 구분: 아이디어 제안 or 실행 완료 */
  ideaType?: 'idea' | 'complete'
  title: string
  /** 카테고리 태그 목록 */
  categories?: string[]
  problem: string
  solution: string
  proposers: string[]
  reviewer: string
  /** 공개 범위 */
  security?: 'public' | 'private'
  /** 결재자 변경 이전 담당자 (이관된 경우에만 존재) */
  transferredFrom?: string
  startDate: string
  endDate: string
  executionPlan: string
  /** 기대 성과 */
  expectedOutcome?: string
  attachments: Attachment[]
  status: '심사대기' | '심사중' | '승인' | '반려'
  submittedAt: string
  /** 혁신성 점수 (0~100, 10점 단위) */
  scoreInnovation?: number
  /** 실행가능성 점수 (0~100, 10점 단위) */
  scoreFeasibility?: number
  /** 수익성 점수 (0~100, 10점 단위) */
  scoreProfitability?: number
  /** 제안자에게 지급되는 물고기 수 (최대 500) */
  mileage?: number
}
