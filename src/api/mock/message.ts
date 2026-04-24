// src/api/mock/message.ts
import type { MessageApiItem, MessagesPage } from '@/api/types/message'

const now = '2026-04-09T10:00:00'
const yesterday = '2026-04-08T14:30:00'
const twoDaysAgo = '2026-04-07T09:15:00'

export const mockMessages: MessageApiItem[] = [
  {
    messageId: 1,
    senderId: 'EMP002',
    senderName: '김철수',
    receivers: [{ id: 'EMP001', name: '홍길동', isRead: true, readAt: yesterday }],
    title: '아이디어 관련 문의',
    content: '안녕하세요. 지난번에 제출하신 LED 조명 교체 아이디어에 대해 더 자세히 여쭤볼 수 있을까요?',
    isRead: true,
    readAt: yesterday,
    createdAt: twoDaysAgo,
    updatedAt: null,
  },
  {
    messageId: 2,
    senderId: 'EMP003',
    senderName: '이영희',
    receivers: [{ id: 'EMP001', name: '홍길동', isRead: false, readAt: null }],
    title: '심사 결과 안내',
    content: '안녕하세요. 제출하신 아이디어가 1차 심사를 통과하였습니다. 축하드립니다!',
    isRead: false,
    readAt: null,
    createdAt: yesterday,
    updatedAt: null,
  },
  {
    messageId: 3,
    senderId: 'EMP004',
    senderName: '박민준',
    receivers: [{ id: 'EMP001', name: '홍길동', isRead: false, readAt: null }],
    title: '협업 제안',
    content: '안녕하세요! 재택근무 관련 아이디어를 같이 발전시켜 보면 어떨까 하여 연락드립니다.',
    isRead: false,
    readAt: null,
    createdAt: now,
    updatedAt: null,
  },
]

export const mockSentMessages: MessageApiItem[] = [
  {
    messageId: 4,
    senderId: 'EMP001',
    senderName: '홍길동',
    receivers: [
      { id: 'EMP002', name: '김철수', isRead: true,  readAt: yesterday },
      { id: 'EMP003', name: '이영희', isRead: false, readAt: null },
    ],
    title: '안녕하세요',
    content: '반갑습니다. 아이디어 관련해서 연락드립니다.',
    isRead: false,
    readAt: null,
    createdAt: twoDaysAgo,
    updatedAt: null,
  },
  {
    messageId: 5,
    senderId: 'EMP001',
    senderName: '홍길동',
    receivers: [{ id: 'EMP003', name: '이영희', isRead: false, readAt: null }],
    title: '자료 공유',
    content: '안전 아이디어 관련 참고 자료를 공유드립니다.',
    isRead: false,
    readAt: null,
    createdAt: yesterday,
    updatedAt: null,
  },
]

export const mockReceivedPage: MessagesPage = {
  content: mockMessages,
  totalElements: mockMessages.length,
  totalPages: 1,
  number: 0,
  size: 20,
  last: true,
}

export const mockSentPage: MessagesPage = {
  content: mockSentMessages,
  totalElements: mockSentMessages.length,
  totalPages: 1,
  number: 0,
  size: 20,
  last: true,
}
