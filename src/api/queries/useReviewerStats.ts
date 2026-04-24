import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { withDemoFallback } from '@/utils/demoMode'
import { reviewerTeamStatsData } from '@/api/mock/judge'
import type { ApiResponse } from '@/api/types/auth'
import type { ReviewerTeamStats } from '@/api/types/judge'

export function useReviewerStats() {
  return useQuery({
    queryKey: queryKeys.reviewerStats.list(),
    queryFn: () =>
      withDemoFallback<ReviewerTeamStats[]>(
        reviewerTeamStatsData,
        async () => {
          const res = await api.get<ApiResponse<ReviewerTeamStats[]>>('/api/reviewer-stats')
          return res.data.data ?? []
        },
      ),
    staleTime: 0,
  })
}
