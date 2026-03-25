import { isAxiosError } from 'axios'

/** 백엔드 에러 응답에서 message를 추출합니다. */
export function getApiErrorMessage(err: unknown, fallback = '오류가 발생했습니다.'): string {
  if (isAxiosError(err)) {
    const data = err.response?.data
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: unknown }).message
      if (typeof msg === 'string' && msg.length > 0) return msg
    }
    return err.message || fallback
  }
  if (err instanceof Error) return err.message
  return fallback
}
