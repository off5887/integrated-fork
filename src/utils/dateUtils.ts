// src/utils/dateUtils.ts
// ISO 날짜 문자열 포맷 유틸리티

/** ISO 날짜시간 문자열에서 날짜 부분만 반환합니다. (예: '2024-01-15T09:30:00' → '2024-01-15') */
export function toDateOnly(isoString: string): string {
  return isoString.split('T')[0]
}

/** ISO 날짜시간 문자열을 'YYYY-MM-DD HH:mm' 형식으로 반환합니다. (예: '2024-01-15T09:30:00' → '2024-01-15 09:30') */
export function toDatetime(isoString: string): string {
  return isoString.replace('T', ' ').slice(0, 16)
}

/** ISO 날짜시간 문자열을 상대 시간 문자열로 반환합니다. (예: '2024-01-15T09:30:00' → '3일 전') */
export function toRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1)  return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.floor(hours / 24)
  if (days === 1) return '어제'
  if (days < 7)   return `${days}일 전`
  const weeks = Math.floor(days / 7)
  if (weeks < 5)  return `약 ${weeks}주 전`
  return `${Math.floor(days / 30)}개월 전`
}
