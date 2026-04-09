// src/api/queryKeys.ts
// TanStack Query 키 중앙 관리 — 모든 queryKey/mutationKey는 여기서 정의한다

export const queryKeys = {
  auth: {
    login: () => ['auth', 'login'] as const,
  },
  users: {
    me: () => ['users', 'me'] as const,
    list: () => ['users', 'list'] as const,
    tree: () => ['users', 'tree'] as const,
    update: () => ['users', 'update'] as const,
  },
  categories: {
    all:   () => ['categories', 'active'] as const,
    admin: () => ['categories', 'admin']  as const,
  },
  org: {
    rollNm: () => ['org', 'rollNm'] as const,
    teams:  () => ['org', 'teams']  as const,
  },
  sectionReviewers: {
    list:     (deptCd?: string) => deptCd ? ['sectionReviewers', deptCd] as const : ['sectionReviewers'] as const,
    myDept:   () => ['sectionReviewers', 'myDept'] as const,
  },
  mileages: {
    my:   () => ['mileages', 'my']                    as const,
    user: (employeeId: string) => ['mileages', 'user', employeeId] as const,
    all:  () => ['mileages', 'all']                   as const,
  },
  withdrawals: {
    my:  () => ['withdrawals', 'my']                  as const,
    all: (status?: string) => status ? ['withdrawals', 'all', status] as const : ['withdrawals', 'all'] as const,
  },
  ideas: {
    statuses: () => ['ideas', 'statuses'] as const,
    list:     (params?: object) => params ? ['ideas', 'list', params] as const : ['ideas', 'list'] as const,
    detail:   (id: number) => ['ideas', 'detail', id] as const,
  },
} as const
