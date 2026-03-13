// src/components/common/ProtectedRoute.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

function renderWithRoutes(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<div>로그인 페이지</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>대시보드</div>} />
          <Route path="/settings" element={<div>설정 페이지</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => localStorage.clear())

  it('토큰이 없으면 /login으로 리다이렉트된다', () => {
    renderWithRoutes('/dashboard')
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument()
    expect(screen.queryByText('대시보드')).not.toBeInTheDocument()
  })

  it('토큰이 있으면 보호된 페이지가 렌더링된다', () => {
    localStorage.setItem('accessToken', 'valid-token')
    renderWithRoutes('/dashboard')
    expect(screen.getByText('대시보드')).toBeInTheDocument()
    expect(screen.queryByText('로그인 페이지')).not.toBeInTheDocument()
  })

  it('토큰이 있으면 다른 보호 경로도 접근할 수 있다', () => {
    localStorage.setItem('accessToken', 'valid-token')
    renderWithRoutes('/settings')
    expect(screen.getByText('설정 페이지')).toBeInTheDocument()
  })

  it('빈 문자열 토큰은 인증 실패로 처리된다', () => {
    localStorage.setItem('accessToken', '')
    renderWithRoutes('/dashboard')
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument()
  })
})
