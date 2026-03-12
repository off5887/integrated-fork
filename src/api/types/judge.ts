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
  title: string
  problem: string
  solution: string
  proposers: string[]
  reviewer: string
  /** 결재자 변경 이전 담당자 (이관된 경우에만 존재) */
  transferredFrom?: string
  startDate: string
  endDate: string
  scope: string
  executionPlan: string
  attachments: Attachment[]
  status: '심사대기' | '심사중' | '승인' | '반려'
  submittedAt: string
}
