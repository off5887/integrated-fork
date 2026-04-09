// Settings.tsx에서 사용하는 MUI 아이콘 mock
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('@mui/icons-material/AdminPanelSettings', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Assessment', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SupervisorAccount', () => ({ default: () => null }))
vi.mock('@mui/icons-material/ManageAccounts', () => ({ default: () => null }))
vi.mock('@mui/icons-material/CardGiftcard', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Category', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Paid', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SwapHoriz', () => ({ default: () => null }))

// 복잡한 서브 컴포넌트들은 mock으로 대체 (자체 테스트 파일에서 테스트)
vi.mock('./components/reviewChange/SectionReviewerManagement', () => ({
  default: () => null,
}))
vi.mock('./components/user/UserManagement', () => ({
  default: () => null,
}))
vi.mock('./components/specialMileage/SpecialMileage', () => ({
  default: () => null,
}))
vi.mock('./components/reviewChange/ReviewChange', () => ({
  default: () => null,
}))
vi.mock('./components/category/CategoryManagement', () => ({
  default: () => null,
}))
vi.mock('./components/exchangeRequests/ExchangeRequestsManagement', () => ({
  default: () => null,
}))
vi.mock('./components/reviewerStats/ReviewerStatsPanel', () => ({
  default: () => null,
}))

import { screen, act, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import Settings from './Settings'

describe('Settings', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  function renderAndAdvance() {
    render(<Settings />)
    act(() => { vi.advanceTimersByTime(1000) })
  }

  it('"시스템 설정" 헤딩이 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByText('시스템 설정')).toBeInTheDocument()
  })

  it('"ADMIN" 배지가 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
  })

  it('탭 버튼(심사자 배정, 사용자 관리, 특별 마일리지, 심사변경)이 렌더된다', () => {
    renderAndAdvance()
    // Settings는 role="button" + aria-pressed 구조 (MUI Tab 아님)
    const buttons = screen.getAllByRole('button')
    const labels = buttons.map((b) => b.textContent ?? '')
    expect(labels.some((l) => l.includes('심사자 배정'))).toBe(true)
    expect(labels.some((l) => l.includes('사용자 관리'))).toBe(true)
    expect(labels.some((l) => l.includes('특별 마일리지'))).toBe(true)
    expect(labels.some((l) => l.includes('심사변경'))).toBe(true)
  })

  it('초기 상태에서 첫 번째 탭("심사자 배정")이 선택되어 있다', () => {
    renderAndAdvance()
    const firstBtn = screen.getAllByRole('button').find((b) =>
      b.textContent?.includes('심사자 배정'),
    )
    expect(firstBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('두 번째 탭 클릭 시 "사용자 관리"가 활성화된다', () => {
    render(<Settings />)
    act(() => { vi.advanceTimersByTime(1000) })

    const userMgmtBtn = screen.getAllByRole('button').find((b) =>
      b.textContent?.includes('사용자 관리'),
    )!
    act(() => { fireEvent.click(userMgmtBtn) })

    expect(userMgmtBtn).toHaveAttribute('aria-pressed', 'true')
    const firstBtn = screen.getAllByRole('button').find((b) =>
      b.textContent?.includes('심사자 배정'),
    )
    expect(firstBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('세 번째 탭 클릭 시 "특별 마일리지"가 활성화된다', () => {
    render(<Settings />)
    act(() => { vi.advanceTimersByTime(1000) })

    const btn = screen.getAllByRole('button').find((b) =>
      b.textContent?.includes('특별 마일리지'),
    )!
    act(() => { fireEvent.click(btn) })

    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })
})
