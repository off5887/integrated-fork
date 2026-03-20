import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'

/**
 * 로그아웃 핸들러를 반환합니다.
 * 서버에 로그아웃 요청을 보내 쿠키를 만료시키고 로그인 페이지로 이동합니다.
 */
export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return async () => {
    try {
      await api.post('/api/auth/logout')
    } finally {
      localStorage.removeItem('userProfile') // 데모 계정 정리
      queryClient.removeQueries({ queryKey: queryKeys.users.me() })
      navigate('/login', { replace: true })
    }
  }
}
