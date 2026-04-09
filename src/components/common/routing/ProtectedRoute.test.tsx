// src/components/common/routing/ProtectedRoute.test.tsx
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('@mui/icons-material/CircularProgress', () => ({ default: () => null }))

import { screen, waitFor } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { render } from '@/tests/utils'
import { server } from '@/tests/mocks/server'
import ProtectedRoute from './ProtectedRoute'
import { DEMO_STORAGE_KEY } from '@/utils/demoMode'

function renderWithRoutes(initialEntry: string) {
  return render(
    <Routes>
      <Route path="/login" element={<div>로그인 페이지</div>} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>대시보드</div>} />
        <Route path="/settings" element={<div>설정 페이지</div>} />
      </Route>
    </Routes>,
    { initialEntries: [initialEntry] },
  )
}

// /api/users/me → null (인증 실패) 핸들러
function useUnauthenticated() {
  server.use(
    http.get('http://localhost:8080/api/users/me', () =>
      HttpResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    ),
  )
}

// /api/users/me → 사용자 프로필 반환 (인증 성공) 핸들러
function useAuthenticated() {
  server.use(
    http.get('http://localhost:8080/api/users/me', () =>
      HttpResponse.json({
        data: {
          employeeId: 'user001', name: '홍길동', role: 'USER',
          department: '개발팀', position: '사원',
          bizAreaName: '', bizAreaCode: '', orgCode: '',
        },
      }),
    ),
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => server.resetHandlers())

  it('토큰이 없으면 /login으로 리다이렉트된다', async () => {
    useUnauthenticated()
    renderWithRoutes('/dashboard')
    await waitFor(() => {
      expect(screen.getByText('로그인 페이지')).toBeInTheDocument()
    })
    expect(screen.queryByText('대시보드')).not.toBeInTheDocument()
  })

  it('데모 프로필이 있으면 보호된 페이지가 렌더링된다', async () => {
    const profile = { employeeId: 'demo', name: '데모', role: 'USER', department: '', position: '', bizAreaName: '', bizAreaCode: '', orgCode: '' }
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile))
    renderWithRoutes('/dashboard')
    await waitFor(() => {
      expect(screen.getByText('대시보드')).toBeInTheDocument()
    })
    expect(screen.queryByText('로그인 페이지')).not.toBeInTheDocument()
  })

  it('실제 API 인증 성공 시 보호된 페이지가 렌더링된다', async () => {
    useAuthenticated()
    renderWithRoutes('/dashboard')
    await waitFor(() => {
      expect(screen.getByText('대시보드')).toBeInTheDocument()
    })
  })

  it('인증 성공 시 다른 보호 경로도 접근할 수 있다', async () => {
    useAuthenticated()
    renderWithRoutes('/settings')
    await waitFor(() => {
      expect(screen.getByText('설정 페이지')).toBeInTheDocument()
    })
  })
})
