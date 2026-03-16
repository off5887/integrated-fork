// Settings.tsx에서 사용하는 MUI 아이콘 mock
import { vi, describe, it, expect } from 'vitest'

vi.mock('@mui/icons-material/AdminPanelSettings', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SupervisorAccount', () => ({ default: () => null }))
vi.mock('@mui/icons-material/ManageAccounts', () => ({ default: () => null }))
vi.mock('@mui/icons-material/CardGiftcard', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SwapHoriz', () => ({ default: () => null }))

// 복잡한 서브 컴포넌트들은 mock으로 대체 (자체 테스트 파일에서 테스트)
vi.mock('./components/sectionReviewers/ReviewerAssignment', () => ({
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

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/tests/utils'
import Settings from './Settings'

describe('Settings', () => {
  it('"시스템 설정" 헤딩이 렌더된다', () => {
    render(<Settings />)
    expect(screen.getByText('시스템 설정')).toBeInTheDocument()
  })

  it('"ADMIN" 배지가 렌더된다', () => {
    render(<Settings />)
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
  })

  it('4개의 탭(심사자 배정, 사용자 관리, 특별 마일리지, 심사변경)이 렌더된다', () => {
    render(<Settings />)
    expect(screen.getByRole('tab', { name: /심사자 배정/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /사용자 관리/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /특별 마일리지/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /심사변경/ })).toBeInTheDocument()
  })

  it('초기 상태에서 첫 번째 탭("심사자 배정")이 선택되어 있다', () => {
    render(<Settings />)
    expect(screen.getByRole('tab', { name: /심사자 배정/ })).toHaveAttribute('aria-selected', 'true')
  })

  it('두 번째 탭 클릭 시 "사용자 관리" 탭이 활성화된다', async () => {
    const user = userEvent.setup()
    render(<Settings />)

    await user.click(screen.getByRole('tab', { name: /사용자 관리/ }))

    expect(screen.getByRole('tab', { name: /사용자 관리/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: /심사자 배정/ })).toHaveAttribute('aria-selected', 'false')
  })

  it('세 번째 탭 클릭 시 "특별 마일리지" 탭이 활성화된다', async () => {
    const user = userEvent.setup()
    render(<Settings />)

    await user.click(screen.getByRole('tab', { name: /특별 마일리지/ }))

    expect(screen.getByRole('tab', { name: /특별 마일리지/ })).toHaveAttribute('aria-selected', 'true')
  })

  it('각 탭 패널은 올바른 aria-labelledby 속성을 가진다', () => {
    render(<Settings />)
    const firstTabPanel = document.getElementById('settings-tabpanel-0')
    expect(firstTabPanel).toHaveAttribute('aria-labelledby', 'settings-tab-0')
  })

  it('비활성 탭 패널은 hidden 처리된다', () => {
    render(<Settings />)
    const secondTabPanel = document.getElementById('settings-tabpanel-1')
    expect(secondTabPanel).toHaveAttribute('hidden')
  })
})
