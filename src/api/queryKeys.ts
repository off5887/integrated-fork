// src/api/queryKeys.ts
// TanStack Query 키 중앙 관리 — 모든 queryKey/mutationKey는 여기서 정의한다

export const queryKeys = {
  auth: {
    login: () => ['auth', 'login'] as const,
  },
} as const
