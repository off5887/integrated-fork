import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { clearDemoProfile } from '@/utils/demoMode'

/**
 * 로그아웃 핸들러를 반환합니다.
 * 서버에 로그아웃 요청을 보내 쿠키를 만료시키고 로그인 페이지로 이동합니다.
 * API 실패 시에도 클라이언트는 반드시 로그아웃 상태로 전환합니다.
 */
export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn('[useLogout] 서버 로그아웃 실패 (클라이언트는 로그아웃 처리):', e)
      }
    } finally {
      clearDemoProfile()
      queryClient.clear() // 전체 캐시 초기화 (demo mock 데이터 잔존 방지)
      navigate('/login', { replace: true })
    }
  }
}
