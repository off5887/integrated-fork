// src/api/queryKeys.ts
// TanStack Query 키 중앙 관리 — 모든 queryKey/mutationKey는 여기서 정의한다

export const queryKeys = {
  auth: {
    login: () => ['auth', 'login'] as const,
  },
  users: {
    me:    () => ['users', 'me']    as const,
    list:  () => ['users', 'list'] as const,
    tree:  () => ['users', 'tree'] as const,
    roles: () => ['users', 'roles'] as const,
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
    summary: () => ['mileages', 'summary']            as const,
    my:      () => ['mileages', 'my']                 as const,
    user:    (employeeId: string) => ['mileages', 'user', employeeId] as const,
    all:     () => ['mileages', 'all']                as const,
  },
  withdrawals: {
    my:       () => ['withdrawals', 'my']                  as const,
    all:      (status?: string) => status ? ['withdrawals', 'all', status] as const : ['withdrawals', 'all'] as const,
    statuses: () => ['withdrawals', 'statuses']            as const,
  },
  ideas: {
    statuses: () => ['ideas', 'statuses'] as const,
    my:       (page?: number) => page !== undefined ? ['ideas', 'my', page] as const : ['ideas', 'my'] as const,
    list:     (params?: object) => params ? ['ideas', 'list', params] as const : ['ideas', 'list'] as const,
    judge:    () => ['ideas', 'judge'] as const,
    approver: (id: number) => ['ideas', 'approver', id] as const,
    detail:   (id: number) => ['ideas', 'detail', id]  as const,
    comments: (id: number) => ['ideas', 'comments', id] as const,
    similar:  (id: number) => ['ideas', 'similar', id]  as const,
  },
  messages: {
    received: (page?: number) => page !== undefined ? ['messages', 'received', page] as const : ['messages', 'received'] as const,
    sent:     (page?: number) => page !== undefined ? ['messages', 'sent', page]     as const : ['messages', 'sent']     as const,
    detail:   (id: number)    => ['messages', 'detail', id] as const,
  },
} as const
