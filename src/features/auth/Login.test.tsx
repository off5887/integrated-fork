// src/features/auth/Login.test.tsx
// MUI icons-material은 파일 수가 너무 많아 Windows에서 EMFILE 오류 발생 → mock 처리
import { vi, describe, it, expect } from 'vitest'

vi.mock('@mui/icons-material', () => ({
  DarkModeOutlined: () => null,
  LightModeOutlined: () => null,
  ExpandMore: () => null,
}))
// useSearchParams는 react-router v7 data router 컨텍스트가 필요하지만
// 테스트 환경에서는 MemoryRouter와 호환되지 않아 mock 처리
vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  }
})
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { render } from '@/tests/utils'
import { server } from '@/tests/mocks/server'
import Login from './Login'

function renderLogin() {
  return render(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<div>환영 페이지</div>} />
    </Routes>,
    { initialEntries: ['/'] },
  )
}

describe('Login', () => {
  describe('데모 계정 로그인', () => {
    it('demo / demo1234 입력 시 토큰이 저장되고 /dashboard로 이동한다', async () => {
      const user = userEvent.setup()
      renderLogin()

      await user.type(screen.getByLabelText(/사번/i), 'demo')
      await user.type(screen.getByLabelText(/비밀번호/i), 'demo1234')
      await user.click(screen.getByRole('button', { name: '로그인' }))

      await waitFor(() => {
        expect(screen.getByText('환영 페이지')).toBeInTheDocument()
      })
      // 데모 계정은 gomgom_user_v1 키에 프로필 저장 (accessToken 없음)
      expect(localStorage.getItem('gomgom_user_v1')).not.toBeNull()
    })
  })

  describe('실제 API 로그인', () => {
    it('올바른 자격증명으로 로그인 성공 시 /dashboard로 이동한다', async () => {
      const user = userEvent.setup()
      renderLogin()

      await user.type(screen.getByLabelText(/사번/i), 'user001')
      await user.type(screen.getByLabelText(/비밀번호/i), 'correct-pw')
      await user.click(screen.getByRole('button', { name: '로그인' }))

      await waitFor(() => {
        expect(screen.getByText('환영 페이지')).toBeInTheDocument()
      })
      // 실제 계정은 쿠키 기반 — localStorage에 토큰 없음
      expect(localStorage.getItem('gomgom_user_v1')).toBeNull()
    })

    it('로그인 실패 시 서버 에러 메시지가 화면에 표시된다', async () => {
      const user = userEvent.setup()
      renderLogin()

      await user.type(screen.getByLabelText(/사번/i), 'wrong-user')
      await user.type(screen.getByLabelText(/비밀번호/i), 'wrong-pw')
      await user.click(screen.getByRole('button', { name: '로그인' }))

      await waitFor(() => {
        expect(
          screen.getByText('아이디 또는 비밀번호가 올바르지 않습니다'),
        ).toBeInTheDocument()
      })
      expect(localStorage.getItem('accessToken')).toBeNull()
    })

    it('로그인 중에는 버튼이 비활성화되고 "로그인 중..." 텍스트가 표시된다', async () => {
      // 응답을 충분히 지연시켜 pending 상태 유지
      server.use(
        http.post('http://localhost:8080/api/auth/login', async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000))
          return HttpResponse.json({ token: 'tok', accessToken: 'tok', employeeId: 'u', name: 'n' })
        }),
      )

      const user = userEvent.setup()
      renderLogin()

      await user.type(screen.getByLabelText(/사번/i), 'user001')
      await user.type(screen.getByLabelText(/비밀번호/i), 'correct-pw')

      // click을 await하지 않고 바로 pending 상태를 확인
      const clickPromise = user.click(screen.getByRole('button', { name: '로그인' }))

      await waitFor(() => {
        expect(screen.getByText('로그인 중...')).toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: /로그인 중/ })).toBeDisabled()

      // 테스트 정리 (타임아웃 전에 abort)
      clickPromise.catch(() => {})
    })

    it('서버 오류(500) 시 에러 메시지가 화면에 표시된다', async () => {
      server.use(
        http.post('http://localhost:8080/api/auth/login', () =>
          HttpResponse.json({ message: '서버 내부 오류가 발생했습니다' }, { status: 500 }),
        ),
      )

      const user = userEvent.setup()
      renderLogin()

      await user.type(screen.getByLabelText(/사번/i), 'user001')
      await user.type(screen.getByLabelText(/비밀번호/i), 'correct-pw')
      await user.click(screen.getByRole('button', { name: '로그인' }))

      await waitFor(() => {
        expect(screen.getByText('서버 내부 오류가 발생했습니다')).toBeInTheDocument()
      })
      expect(localStorage.getItem('accessToken')).toBeNull()
    })
  })
})
