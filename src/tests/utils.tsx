// src/tests/utils.tsx
// 모든 Provider를 포함한 커스텀 render 헬퍼
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { SnackbarProvider } from '@/context/SnackbarContext'
import type { ReactNode } from 'react'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

interface WrapperProps {
  children: ReactNode
  initialEntries?: string[]
}

function AllProviders({ children, initialEntries = ['/'] }: WrapperProps) {
  const queryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  initialEntries?: string[]
}

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) => {
  const { initialEntries, ...renderOptions } = options ?? {}
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>{children}</AllProviders>
    ),
    ...renderOptions,
  })
}

// @testing-library/react의 모든 export를 re-export + render는 커스텀 버전으로 덮어씀
export * from '@testing-library/react'
export { customRender as render }
