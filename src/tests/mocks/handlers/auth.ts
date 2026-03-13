// src/tests/mocks/handlers/auth.ts
import { http, HttpResponse } from 'msw'

export const authHandlers = [
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { employeeId: string; password: string }

    if (body.employeeId === 'user001' && body.password === 'correct-pw') {
      return HttpResponse.json({
        token: 'mock-access-token',
        accessToken: 'mock-access-token',
        employeeId: 'user001',
        name: '홍길동',
      })
    }

    return HttpResponse.json(
      { message: '아이디 또는 비밀번호가 올바르지 않습니다' },
      { status: 401 },
    )
  }),
]
