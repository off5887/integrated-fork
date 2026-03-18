// src/api/ReactQueryProvider.tsx
// QueryClient를 SnackbarContext 안에서 생성해 전역 에러 핸들링을 연결합니다.
// 백엔드 연동 후 API 에러가 발생하면 자동으로 스낵바를 표시합니다.
//
// 개별 쿼리/뮤테이션에서 전역 에러 알림을 끄고 싶으면:
//   useQuery({ ..., meta: { suppressGlobalError: true } })

import { useState } from 'react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useSnackbar } from '@/context/SnackbarContext'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { showSnackbar } = useSnackbar()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query.meta?.suppressGlobalError) return
            const msg =
              error instanceof Error ? error.message : '데이터를 불러오지 못했습니다'
            showSnackbar(msg, 'error')
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (mutation.meta?.suppressGlobalError) return
            const msg =
              error instanceof Error ? error.message : '요청을 처리하지 못했습니다'
            showSnackbar(msg, 'error')
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
