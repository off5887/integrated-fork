import { api } from '@/api/client'

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
  // Delay revocation so the browser has time to initiate the download before the URL is invalidated.
  setTimeout(() => URL.revokeObjectURL(url), 100)
}
