// MileagePage에서 사용하는 MUI 아이콘 mock
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('@mui/icons-material/AttachMoney', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SwapHoriz',   () => ({ default: () => null }))

// 복잡한 서브 컴포넌트들은 mock으로 대체 (자체 테스트 파일에서 테스트)
vi.mock('./components/MileageStatsCards',    () => ({ default: () => null }))
vi.mock('./components/MileageDesktopTable',  () => ({ default: () => null }))
vi.mock('./components/MileageMobileCards',   () => ({ default: () => null }))
vi.mock('./components/ExchangeHistoryTable', () => ({ default: () => null }))
vi.mock('./components/MileageFilter',        () => ({ default: () => null }))
vi.mock('./components/MileageExchangeDialog',() => ({ default: () => null }))

import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import MileagePage from './MileagePage'
import { DEMO_USER_PROFILE } from '@/api/mock/auth'
import { DEMO_STORAGE_KEY } from '@/utils/demoMode'
import { mockMyMileageRecords, mockMyWithdrawalRecords } from '@/api/mock/mileage'

// 데모 모드 활성화 → withDemoFallback이 mock 데이터 반환 (MSW 불필요)
beforeEach(() => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_USER_PROFILE))
})

afterEach(() => {
  localStorage.removeItem(DEMO_STORAGE_KEY)
})

describe('MileagePage', () => {
  describe('기본 렌더링', () => {
    it('"마일리지" 헤딩이 렌더된다', async () => {
      render(<MileagePage />)
      await screen.findByText('마일리지')
    })

    it('"현금 전환 신청" 버튼이 렌더된다', async () => {
      render(<MileagePage />)
      await screen.findByText('현금 전환 신청')
    })
  })

  describe('탭', () => {
    it('수상내역 탭에 건수가 표시된다', async () => {
      render(<MileagePage />)
      await screen.findByText(`마일리지 수상내역 (${mockMyMileageRecords.length}건)`)
    })

    it('환전 신청내역 탭에 건수가 표시된다', async () => {
      render(<MileagePage />)
      await screen.findByText(`환전 신청내역 (${mockMyWithdrawalRecords.length}건)`)
    })

    it('"환전 신청내역" 탭 클릭 시 탭이 전환된다', async () => {
      render(<MileagePage />)
      const exchangeTab = await screen.findByText(`환전 신청내역 (${mockMyWithdrawalRecords.length}건)`)
      fireEvent.click(exchangeTab)
      await waitFor(() => {
        expect(exchangeTab).toBeInTheDocument()
      })
    })
  })

  describe('로딩 상태', () => {
    it('로딩 완료 후 스피너가 사라진다', async () => {
      render(<MileagePage />)
      await waitFor(() => {
        expect(screen.queryByText('마일리지를 불러오는 중...')).not.toBeInTheDocument()
      })
    })
  })
})
