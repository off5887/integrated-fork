// src/api/queries/useMessages.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { withDemoFallback } from '@/utils/demoMode'
import type { ApiResponse } from '@/api/types/auth'
import type { MessageApiItem, MessagesPage, MessageSendRequest, MessageUpdateRequest } from '@/api/types/message'
import { mockMessages, mockReceivedPage, mockSentMessages, mockSentPage } from '@/api/mock/message'

// ─── GET /api/messages/received ──────────────────────────────────────────────

export function useReceivedMessages(page = 0) {
  return useQuery({
    queryKey: queryKeys.messages.received(page),
    queryFn: () =>
      withDemoFallback<MessagesPage>(
        mockReceivedPage,
        async () => {
          const res = await api.get<ApiResponse<MessagesPage>>('/api/messages/received', {
            params: { page, size: 20 },
          })
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/messages/sent ───────────────────────────────────────────────────

export function useSentMessages(page = 0) {
  return useQuery({
    queryKey: queryKeys.messages.sent(page),
    queryFn: () =>
      withDemoFallback<MessagesPage>(
        mockSentPage,
        async () => {
          const res = await api.get<ApiResponse<MessagesPage>>('/api/messages/sent', {
            params: { page, size: 20 },
          })
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/messages/{messageId} ───────────────────────────────────────────

export function useMessageDetail(messageId: number | null) {
  return useQuery({
    queryKey: queryKeys.messages.detail(messageId ?? 0),
    enabled: messageId !== null,
    queryFn: () =>
      withDemoFallback<MessageApiItem>(
        [...mockMessages, ...mockSentMessages].find((m) => m.messageId === messageId!) ?? mockMessages[0],
        async () => {
          const res = await api.get<ApiResponse<MessageApiItem>>(`/api/messages/${messageId}`)
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

// ─── POST /api/messages ───────────────────────────────────────────────────────

export function useSendMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['messages', 'send'],
    mutationFn: (body: MessageSendRequest) =>
      api.post<ApiResponse<MessageApiItem>>('/api/messages', body).then((r) => r.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.sent() })
    },
  })
}

// ─── PUT /api/messages/{messageId} ───────────────────────────────────────────

export function useUpdateMessage(messageId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['messages', 'update', messageId],
    mutationFn: (body: MessageUpdateRequest) =>
      api.put<ApiResponse<MessageApiItem>>(`/api/messages/${messageId}`, body).then((r) => r.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.sent() })
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.detail(messageId) })
    },
  })
}

// ─── DELETE /api/messages/{messageId} ────────────────────────────────────────

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['messages', 'delete'],
    mutationFn: (messageId: number) =>
      api.delete<ApiResponse<null>>(`/api/messages/${messageId}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.received() })
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.sent() })
    },
  })
}

// ─── 읽지 않은 메시지 수 (받은 메시지 기준) ──────────────────────────────────

export function useUnreadCount() {
  const { data } = useReceivedMessages()
  return (data?.content ?? []).filter((m) => !m.isRead).length
}
