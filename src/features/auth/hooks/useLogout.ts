import { useNavigate } from 'react-router-dom'

/**
 * 로그아웃 핸들러를 반환합니다.
 * 토큰을 제거하고 로그인 페이지로 이동합니다.
 */
export function useLogout() {
  const navigate = useNavigate()
  return () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userProfile')
    navigate('/login', { replace: true })
  }
}
