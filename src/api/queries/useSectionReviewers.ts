/**
 * 부서별 심사자 (section-reviewers) 쿼리 & 뮤테이션 훅
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { getApiErrorMessage } from '@/utils/apiError'
import { withDemoFallback } from '@/utils/demoMode'
import { mockSectionReviewers } from '@/api/mock/settings'
import type { ApiResponse } from '@/api/types/auth'
import type { SectionReviewer, SectionReviewerRequest } from '@/api/types/settings'

async function fetchSectionReviewers(deptCd?: string): Promise<SectionReviewer[]> {
  const params = deptCd ? { deptCd } : undefined
  const res = await api.get<ApiResponse<SectionReviewer[]>>('/api/section-reviewers', { params })
  return res.data.data
}

export function useSectionReviewers(deptCd?: string) {
  return useQuery({
    queryKey: queryKeys.sectionReviewers.list(deptCd),
    queryFn: () =>
      withDemoFallback(
        deptCd ? mockSectionReviewers.filter(r => r.deptCd === deptCd) : mockSectionReviewers,
        () => fetchSectionReviewers(deptCd),
      ),
    staleTime: 0, // 로그인 모드(데모/실제) 전환 시 반드시 재조회
  })
}

export function useCreateSectionReviewer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SectionReviewerRequest) =>
      api.post<ApiResponse<SectionReviewer>>('/api/section-reviewers', data).then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sectionReviewers.list() }),
  })
}

export function useUpdateSectionReviewer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SectionReviewerRequest }) =>
      api.put<ApiResponse<SectionReviewer>>(`/api/section-reviewers/${id}`, data).then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sectionReviewers.list() }),
  })
}

export function useDeleteSectionReviewer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/api/section-reviewers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sectionReviewers.list() }),
  })
}

export function getSectionReviewerErrorMessage(err: unknown): string {
  return getApiErrorMessage(err, '처리 중 오류가 발생했습니다')
}
