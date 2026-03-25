import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import type { ApiResponse } from '@/api/types/auth'
import { POSITION_OPTIONS } from '@/features/settings/config/userConfig'
import { mockDepartments } from '@/api/mock/settings'
import { withDemoFallback } from '@/utils/demoMode'

export interface OrgTeam {
  deptCd: string
  deptNm: string
}

export interface OrgBizArea {
  bizAreaNm: string
  teams: OrgTeam[]
}

/** GET /api/org/roll-nm — 직급 목록 */
export function useRollNm() {
  return useQuery({
    queryKey: queryKeys.org.rollNm(),
    queryFn: () =>
      withDemoFallback<string[]>(
        [...POSITION_OPTIONS],
        async () => {
          const res = await api.get<ApiResponse<string[]>>('/api/org/roll-nm')
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

/** GET /api/org/teams — 사업소별 팀 목록 */
export function useOrgTeams() {
  return useQuery({
    queryKey: queryKeys.org.teams(),
    queryFn: () =>
      withDemoFallback<OrgBizArea[]>(
        [{ bizAreaNm: '본사', teams: mockDepartments.map((d, i) => ({ deptCd: `D${i}`, deptNm: d })) }],
        async () => {
          const res = await api.get<ApiResponse<OrgBizArea[]>>('/api/org/teams')
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}
