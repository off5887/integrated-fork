/**
 * 세션 만료 처리 유틸
 *
 * httpOnly 쿠키는 JS로 직접 삭제 불가능.
 * POST /api/auth/logout 을 호출해 백엔드가 Set-Cookie: token=; Max-Age=0 으로 삭제하게 한 뒤
 * 로그인 페이지로 리다이렉트한다.
 *
 * 여러 요청이 동시에 401 을 받더라도 한 번만 실행되도록 플래그로 보호한다.
 */

import { clearDemoProfile } from '@/utils/demoMode'

let handling = false

export async function handleSessionExpired(
  /** 로그아웃 API 를 호출할 axios 인스턴스 (순환 참조 방지를 위해 주입) */
  logoutFn: () => Promise<unknown>,
): Promise<void> {
  if (handling) return
  handling = true

  clearDemoProfile()

  try {
    await logoutFn()
  } catch {
    // 이미 만료된 토큰이면 로그아웃 API 도 403/401 을 반환할 수 있으나 무시
  }

  window.location.href = '/login?reason=session_expired'
}
