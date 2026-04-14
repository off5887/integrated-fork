import { api } from '@/api/client'

/**
 * GET /api/ideas/{ideaId}/attachments/{attachmentId} → blob 다운로드
 * 브라우저에서 파일 저장 다이얼로그를 트리거합니다.
 */
export async function downloadAttachment(
  ideaId: number,
  attachmentId: number,
  filename: string,
): Promise<void> {
  const res = await api.get(`/api/ideas/${ideaId}/attachments/${attachmentId}`, {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(res.data as Blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
