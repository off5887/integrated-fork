// src/hooks/useUnsavedChanges.ts
import { useEffect } from 'react'
import { useBlocker } from 'react-router'

/**
 * 폼에 미저장 변경사항이 있을 때 페이지 이탈을 막는 훅.
 *
 * - 브라우저 탭 닫기/새로고침: `beforeunload` 이벤트로 경고
 * - React Router 내비게이션: `useBlocker`로 차단 → `isBlocked`가 true일 때 ConfirmDialog 표시
 *
 * @param isDirty - 저장되지 않은 변경사항이 있으면 true
 */
export function useUnsavedChanges(isDirty: boolean) {
  // 브라우저 탭 닫기 / 새로고침 경고
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  // React Router 내비게이션 차단
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return isDirty && currentLocation.pathname !== nextLocation.pathname
  })

  return {
    isBlocked: blocker.state === 'blocked',
    proceed: () => {
      if (blocker.state === 'blocked') blocker.proceed()
    },
    reset: () => {
      if (blocker.state === 'blocked') blocker.reset()
    },
  }
}
