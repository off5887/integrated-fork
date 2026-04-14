/**
 * 아이디어 쿼리 & 뮤테이션 훅
 *
 * - useCreateIdea  : POST  /api/ideas
 * - useUpdateIdea  : PUT   /api/ideas/{ideaId}
 * - useJudgeIdeas  : GET   /api/ideas?status=pending (심사자용)
 * - useReviewIdea  : PATCH /api/ideas/{ideaId}/review
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { isDemoMode, withDemoFallback } from '@/utils/demoMode'
import type { ApiResponse } from '@/api/types/auth'
import type { IdeaApiItem, IdeaCommentsPage, IdeaCreateRequest, IdeaDetailExtras, IdeaReviewRequest, MyIdeasPage } from '@/api/types/idea'
import type { IdeaItem, IdeaStatus } from '@/api/types/ideaBrowse'
import type { IdeaApprover, Proposal } from '@/api/types/judge'
import { getMockComments, mockIdeaDetailExtras, mockIdeaStatuses, mockMyIdeasPage } from '@/api/mock/idea'
import { IDEAS } from '@/api/mock/ideaBrowse'
import { judgeData, mockApproverMap } from '@/api/mock/judge'

// ─── IdeaApiItem → IdeaItem 변환 ─────────────────────────────────────────────
// 변환 로직은 ideaBrowse 기능에서만 사용하지만, 의존 방향(api → feature)을
// 역전시키지 않기 위해 쿼리 파일에 둔다.

const API_STATUS_MAP: Record<string, IdeaStatus> = {
  pending:     '심사대기',
  approved:    '승인',
  rejected:    '반려',
  in_progress: '실행중',
  completed:   '완료',
}

export function toIdeaItem(raw: IdeaApiItem): IdeaItem {
  return {
    id:          raw.ideaId,
    title:       raw.title       ?? '',
    categoryId:  raw.categoryId  ?? 0,
    category:    raw.categoryName ?? '',
    problem:     raw.problem     ?? '',
    solution:    raw.description ?? '',
    author:      raw.author      ?? raw.submittedBy ?? '',
    bizArea:     raw.bizArea     ?? '',
    department:  raw.department  ?? '',
    deptCd:      raw.deptCd     ?? '',
    status:      API_STATUS_MAP[raw.status ?? ''] ?? '심사대기',
    submittedAt: ((raw.submitDate ?? raw.createdAt ?? '') as string).slice(0, 10),
    security:    raw.security === 'Y' ? 'private' : 'public',
    likes:       raw.likeCount    ?? 0,
    comments:    raw.commentCount ?? 0,
    views:       raw.viewCount    ?? 0,
    mileageScore: (raw.mileagePoints ?? 0) > 0 ? raw.mileagePoints : undefined,
  }
}

// ─── GET /api/ideas/statuses ──────────────────────────────────────────────────

/** API key → IdeaStatus 라벨 정규화 테이블 (공백 제거 포함) */
const API_STATUS_KEY_MAP: Record<string, string> = {
  pending:     '심사대기',
  approved:    '승인',
  rejected:    '반려',
  in_progress: '실행중',
  completed:   '완료',
}

function normalizeStatuses(raw: Record<string, string>): string[] {
  return Object.entries(raw)
    .map(([key]) => API_STATUS_KEY_MAP[key] ?? null)
    .filter((v): v is string => v !== null)
}

export function useIdeaStatuses() {
  return useQuery({
    queryKey: queryKeys.ideas.statuses(),
    queryFn: () =>
      withDemoFallback<string[]>(
        Object.values(mockIdeaStatuses),
        async () => {
          const res = await api.get<ApiResponse<Record<string, string>>>('/api/ideas/statuses')
          return normalizeStatuses(res.data.data ?? {})
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/ideas/my ───────────────────────────────────────────────────────

export function useMyIdeas(page = 0, size = 20) {
  return useQuery({
    queryKey: queryKeys.ideas.my(page),
    queryFn: () =>
      withDemoFallback<MyIdeasPage>(
        mockMyIdeasPage,
        async () => {
          const res = await api.get<ApiResponse<MyIdeasPage>>('/api/ideas/my', {
            params: { page, size },
          })
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

export function useCreateIdea() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: IdeaCreateRequest): Promise<IdeaApiItem> => {
      if (isDemoMode()) {
        // 데모 모드: 실제 API 호출 없이 성공 응답 시뮬레이션
        return Promise.resolve({
          ideaId: Date.now(),
          title: body.title,
          problem: body.problem,
          description: body.description,
          categoryId: body.categoryId,
          categoryName: '',
          type: body.type ?? 'idea',
          status: 'pending',
          security: body.security ?? 'N',
          submittedBy: 'demo',
          mileagePoints: 0,
          submitDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          coProposers: [],
        })
      }
      const res = await api.post<ApiResponse<IdeaApiItem>>('/api/ideas', body)
      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() })
    },
  })
}

// ─── GET /api/ideas (목록) ────────────────────────────────────────────────────

export function useIdeaList() {
  return useQuery({
    queryKey: queryKeys.ideas.list(),
    queryFn: () =>
      withDemoFallback<IdeaItem[]>(
        IDEAS,
        async () => {
          const res = await api.get<ApiResponse<{ content: IdeaApiItem[]; totalElements: number }>>('/api/ideas', {
            params: { size: 200 },
          })
          return (res.data.data.content ?? []).map(toIdeaItem)
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/ideas/{id} (detail extras) ─────────────────────────────────────

export function useIdeaDetail(ideaId: number | null) {
  return useQuery({
    queryKey: queryKeys.ideas.detail(ideaId ?? 0),
    enabled: ideaId !== null,
    queryFn: () =>
      withDemoFallback<IdeaDetailExtras>(
        mockIdeaDetailExtras[ideaId!] ?? { viewCount: 0, likeCount: 0, commentCount: 0, isLiked: false, approverId: null, approverName: null, executors: null },
        async () => {
          const res = await api.get<ApiResponse<IdeaApiItem>>(`/api/ideas/${ideaId}`)
          const d = res.data.data
          return {
            viewCount:    d.viewCount    ?? 0,
            likeCount:    d.likeCount    ?? 0,
            commentCount: d.commentCount ?? 0,
            isLiked:      d.isLiked      ?? false,
            approverId:   d.approverId   ?? null,
            approverName: d.approverName ?? null,
            executors:    d.executors    ?? null,
          }
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/ideas/{ideaId}/similar ─────────────────────────────────────────

/** 유사 아이디어 제목 목록 반환 (데모 모드: 빈 배열) */
export function useSimilarIdeas(ideaId: number | null) {
  return useQuery({
    queryKey: queryKeys.ideas.similar(ideaId ?? 0),
    enabled: ideaId !== null,
    queryFn: () =>
      withDemoFallback<string[]>(
        [],
        async () => {
          const res = await api.get<ApiResponse<{ ideaId: number; title: string; categoryId: number; categoryName: string; status: string; submittedBy: string; author: string }[]>>(
            `/api/ideas/${ideaId}/similar`,
            { params: { size: 5 } },
          )
          return (res.data.data ?? []).map((item) => item.title)
        },
      ),
    staleTime: 0,
  })
}

// ─── POST /api/ideas/{ideaId}/likes (toggle) ─────────────────────────────────

export function useToggleLike(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (isDemoMode()) return
      await api.post(`/api/ideas/${ideaId}/likes`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.detail(ideaId) })
    },
  })
}

// ─── GET /api/ideas/{ideaId}/comments ────────────────────────────────────────

export function useIdeaComments(ideaId: number | null) {
  return useQuery({
    queryKey: queryKeys.ideas.comments(ideaId ?? 0),
    enabled: ideaId !== null,
    queryFn: () =>
      withDemoFallback<IdeaCommentsPage>(
        getMockComments(ideaId!),
        async () => {
          const res = await api.get<ApiResponse<IdeaCommentsPage>>(`/api/ideas/${ideaId}/comments`)
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

// ─── POST /api/ideas/{ideaId}/comments ───────────────────────────────────────

export function useAddComment(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (content: string): Promise<void> => {
      if (isDemoMode()) return
      await api.post(`/api/ideas/${ideaId}/comments`, { content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.comments(ideaId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.detail(ideaId) })
    },
  })
}

// ─── PUT /api/ideas/{ideaId}/comments/{commentId} ────────────────────────────

export function useEditComment(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }): Promise<void> => {
      if (isDemoMode()) return
      await api.put(`/api/ideas/${ideaId}/comments/${commentId}`, { content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.comments(ideaId) })
    },
  })
}

// ─── DELETE /api/ideas/{ideaId}/comments/{commentId} ─────────────────────────

export function useDeleteComment(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (commentId: number): Promise<void> => {
      if (isDemoMode()) return
      await api.delete(`/api/ideas/${ideaId}/comments/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.comments(ideaId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.detail(ideaId) })
    },
  })
}

export function useUpdateIdea(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: IdeaCreateRequest): Promise<IdeaApiItem> => {
      if (isDemoMode()) {
        return Promise.resolve({
          ideaId,
          title: body.title,
          problem: body.problem,
          description: body.description,
          categoryId: body.categoryId,
          categoryName: '',
          type: body.type ?? 'idea',
          status: 'pending',
          security: body.security ?? 'N',
          submittedBy: 'demo',
          mileagePoints: 0,
          submitDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          coProposers: [],
        })
      }
      const res = await api.put<ApiResponse<IdeaApiItem>>(`/api/ideas/${ideaId}`, body)
      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() })
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.detail(ideaId) })
    },
  })
}

// ─── IdeaApiItem → Proposal 변환 (Judge 페이지용) ────────────────────────────

function toProposal(raw: IdeaApiItem): Proposal {
  const statusMap: Record<string, Proposal['status']> = {
    pending:     '심사대기',
    approved:    '승인',
    rejected:    '반려',
    in_progress: '승인',  // 실행중은 승인 이후 상태
    completed:   '승인',
  }
  const proposers = [
    ...(raw.author ? [raw.author] : raw.submittedBy ? [raw.submittedBy] : []),
    ...(raw.coProposers ?? []).map((c) => c.name),
  ]
  return {
    id:           raw.ideaId,
    ideaType:     raw.type === 'completed' ? 'complete' : 'idea',
    title:        raw.title,
    categories:   raw.categoryName ? [raw.categoryName] : [],
    problem:      raw.problem,
    solution:     raw.description,
    proposers,
    reviewer:     '',           // 배정 심사자는 별도 API에서 제공
    security:     raw.security === 'Y' ? 'private' : 'public',
    startDate:    '',           // 신청서 상세에는 없음
    endDate:      '',
    executionPlan: '',
    attachments:  [],
    status:       statusMap[raw.status] ?? '심사대기',
    submittedAt:  (raw.submitDate ?? raw.createdAt ?? '').slice(0, 10),
    mileage:      (raw.mileagePoints ?? 0) > 0 ? raw.mileagePoints : undefined,
  }
}

// ─── GET /api/ideas?status=pending (심사자 목록) ──────────────────────────────

export function useJudgeIdeas() {
  return useQuery({
    queryKey: queryKeys.ideas.judge(),
    queryFn: () =>
      withDemoFallback<Proposal[]>(
        judgeData,
        async () => {
          const res = await api.get<ApiResponse<{ content: IdeaApiItem[] }>>('/api/ideas', {
            params: { status: 'pending', size: 200 },
          })
          return (res.data.data.content ?? []).map(toProposal)
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/ideas/{id}/approver ────────────────────────────────────────────

export function useIdeaApprover(ideaId: number | null) {
  return useQuery({
    queryKey: queryKeys.ideas.approver(ideaId ?? 0),
    enabled: ideaId !== null,
    queryFn: () =>
      withDemoFallback<IdeaApprover | null>(
        mockApproverMap[ideaId!] ?? null,
        async () => {
          const res = await api.get<ApiResponse<IdeaApprover>>(`/api/ideas/${ideaId}/approver`)
          return res.data.data ?? null
        },
      ),
    staleTime: 0,
  })
}

// ─── PUT /api/ideas/{id}/approver ────────────────────────────────────────────

export function useAssignApprover(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (approverId: string) =>
      api.put<ApiResponse<IdeaApprover>>(`/api/ideas/${ideaId}/approver`, { approverId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.judge() })
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.approver(ideaId) })
    },
  })
}

// ─── PATCH /api/ideas/{id}/review ────────────────────────────────────────────

export function useReviewIdea(ideaId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IdeaReviewRequest) =>
      api.patch<ApiResponse<IdeaApiItem>>(`/api/ideas/${ideaId}/review`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.judge() })
    },
  })
}
