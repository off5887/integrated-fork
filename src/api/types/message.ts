// src/api/types/message.ts

/** GET /api/messages/received, /api/messages/sent, /api/messages/{id} 응답 단일 메시지 */
export interface MessageApiItem {
  messageId: number
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  title: string
  content: string
  isRead: boolean
  readAt: string | null
  createdAt: string
  updatedAt: string | null
}

/** GET /api/messages/received|sent 페이지 응답 */
export interface MessagesPage {
  content: MessageApiItem[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  last: boolean
}

/** POST /api/messages 요청 바디 */
export interface MessageSendRequest {
  receiverId: string
  title: string
  content: string
}

/** PUT /api/messages/{id} 요청 바디 */
export interface MessageUpdateRequest {
  title: string
  content: string
}
