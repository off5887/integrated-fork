/**
 * 아이디어 쿼리 & 뮤테이션 훅
 *
 * - useCreateIdea : POST /api/ideas
 * - useUpdateIdea : PUT  /api/ideas/{ideaId}
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { isDemoMode, withDemoFallback } from '@/utils/demoMode'
import type { ApiResponse } from '@/api/types/auth'
import type { IdeaApiItem, IdeaCreateRequest } from '@/api/types/idea'
import { mockIdeaStatuses } from '@/api/mock/idea'

// ─── GET /api/ideas/statuses ──────────────────────────────────────────────────

export function useIdeaStatuses() {
  return useQuery({
    queryKey: queryKeys.ideas.statuses(),
    queryFn: () =>
      withDemoFallback<string[]>(
        Object.values(mockIdeaStatuses),
        async () => {
          const res = await api.get<ApiResponse<Record<string, string>>>('/api/ideas/statuses')
          return Object.values(res.data.data ?? {})
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
