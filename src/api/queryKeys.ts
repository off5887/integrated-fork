// src/api/queryKeys.ts
// TanStack Query 키 중앙 관리 — 모든 queryKey/mutationKey는 여기서 정의한다

export const queryKeys = {
  auth: {
    login: () => ['auth', 'login'] as const,
  },
  users: {
    me: () => ['users', 'me'] as const,
    list: () => ['users', 'list'] as const,
    update: () => ['users', 'update'] as const,
  },
  categories: {
    all: () => ['categories'] as const,
  },
  org: {
    rollNm: () => ['org', 'rollNm'] as const,
    teams:  () => ['org', 'teams']  as const,
  },
  sectionReviewers: {
    list: (deptCd?: string) => deptCd ? ['sectionReviewers', deptCd] as const : ['sectionReviewers'] as const,
  },
} as const
