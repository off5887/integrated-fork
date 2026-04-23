import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { mockLevelConfigs } from '@/api/mock/settings'
import type { ApiResponse } from '@/api/types/auth'
import type { LevelConfig, LevelConfigUpdateRequest } from '@/api/types/settings'
import { withDemoFallback } from '@/utils/demoMode'

export function useLevelConfigs() {
  return useQuery({
    queryKey: queryKeys.levelConfigs.list(),
    queryFn: () =>
      withDemoFallback<LevelConfig[]>(
        mockLevelConfigs,
        async () => {
          const res = await api.get<ApiResponse<LevelConfig[]>>('/api/level-configs')
          return res.data.data ?? []
        },
      ),
    staleTime: 0,
  })
}

export function useUpdateLevelConfig() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ level, body }: { level: number; body: LevelConfigUpdateRequest }) => {
      const res = await api.put<ApiResponse<LevelConfig>>(`/api/level-configs/${level}`, body)
      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.levelConfigs.list() })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() })
    },
  })
}
