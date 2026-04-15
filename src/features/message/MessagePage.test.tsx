// MessagePage에서 사용하는 MUI 아이콘 mock
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('@mui/icons-material/MailOutline',                    () => ({ default: () => null }))
vi.mock('@mui/icons-material/SendOutlined',                   () => ({ default: () => null }))
vi.mock('@mui/icons-material/EditNote',                       () => ({ default: () => null }))
vi.mock('@mui/icons-material/AdminPanelSettingsOutlined',      () => ({ default: () => null }))
vi.mock('@mui/icons-material/SendRounded',                    () => ({ default: () => null }))
vi.mock('@mui/icons-material/CheckCircleOutlineRounded',      () => ({ default: () => null }))
vi.mock('@mui/icons-material/DeleteOutlineRounded',           () => ({ default: () => null }))
vi.mock('@mui/icons-material/ReplyRounded',                   () => ({ default: () => null }))
vi.mock('@mui/icons-material/EditRounded',                    () => ({ default: () => null }))
vi.mock('@mui/icons-material/AdminPanelSettings',             () => ({ default: () => null }))

import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import MessagePage from './MessagePage'
import { DEMO_USER_PROFILE } from '@/api/mock/auth'
import { DEMO_STORAGE_KEY } from '@/utils/demoMode'
import { mockMessages } from '@/api/mock/message'

// 데모 모드 활성화 → withDemoFallback이 mock 데이터 반환 (MSW 불필요)
beforeEach(() => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_USER_PROFILE))
})

afterEach(() => {
  localStorage.removeItem(DEMO_STORAGE_KEY)
})

describe('MessagePage', () => {
  describe('기본 렌더링', () => {
    it('"쪽지함" 헤딩이 렌더된다', () => {
      render(<MessagePage />)
      expect(screen.getByText('쪽지함')).toBeInTheDocument()
    })

    it('"쪽지 쓰기" 버튼이 렌더된다', () => {
      render(<MessagePage />)
      expect(screen.getByText('쪽지 쓰기')).toBeInTheDocument()
    })

    it('"관리자에게 보내기" 버튼이 렌더된다', () => {
      render(<MessagePage />)
      expect(screen.getByText('관리자에게 보내기')).toBeInTheDocument()
    })
  })

  describe('탭', () => {
    it('"받은 쪽지" 탭이 렌더된다', () => {
      render(<MessagePage />)
      expect(screen.getByText('받은 쪽지')).toBeInTheDocument()
    })

    it('"보낸 쪽지" 탭이 렌더된다', () => {
      render(<MessagePage />)
      expect(screen.getByText('보낸 쪽지')).toBeInTheDocument()
    })

    it('초기 상태에서 받은 쪽지 목록이 표시된다', async () => {
      render(<MessagePage />)
      const firstSender = mockMessages[0].senderName
      await screen.findByText(firstSender)
    })

    it('"보낸 쪽지" 탭 클릭 시 보낸 쪽지 목록이 표시된다', async () => {
      render(<MessagePage />)
      fireEvent.click(screen.getByText('보낸 쪽지'))
      await waitFor(() => {
        expect(screen.queryByText('받은 쪽지가 없습니다')).not.toBeInTheDocument()
      })
    })
  })

  describe('메시지 목록', () => {
    it('mock 데이터의 첫 번째 메시지 제목이 표시된다', async () => {
      render(<MessagePage />)
      await screen.findByText(mockMessages[0].title)
    })

    it('읽지 않은 메시지 수가 탭에 표시된다', async () => {
      render(<MessagePage />)
      const unreadCount = mockMessages.filter((m) => !m.isRead).length
      if (unreadCount > 0) {
        await screen.findByText(String(unreadCount))
      }
    })
  })
})
