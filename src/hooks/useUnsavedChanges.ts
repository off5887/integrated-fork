// src/hooks/useUnsavedChanges.ts
import { useEffect } from 'react'

/**
 * 폼에 미저장 변경사항이 있을 때 브라우저 이탈을 막는 훅.
 *
 * - 브라우저 탭 닫기/새로고침: `beforeunload` 이벤트로 경고
 *
 * NOTE: React Router 내 페이지 이동 차단(useBlocker)은
 * createBrowserRouter 방식에서만 동작하므로 현재 미적용.
 *
 * @param isDirty - 저장되지 않은 변경사항이 있으면 true
 */
export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])
}
