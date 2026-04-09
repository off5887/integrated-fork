// ApexCharts는 jsdom에서 동작하지 않으므로 mock 처리
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('react-apexcharts', () => ({ default: () => null }))
vi.mock('@mui/icons-material/BarChart', () => ({ default: () => null }))
vi.mock('@mui/icons-material/FileDownload', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Groups', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Person', () => ({ default: () => null }))
vi.mock('@mui/icons-material/Search', () => ({ default: () => null }))

import { screen, act, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import Stats from './Stats'

describe('Stats', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  function renderAndAdvance() {
    render(<Stats />)
    act(() => { vi.advanceTimersByTime(1000) })
  }

  it('에러 없이 렌더된다', () => {
    renderAndAdvance()
    expect(document.body).toBeInTheDocument()
  })

  it('"사업소별 그리드 통계" 헤딩이 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByText('사업소별 그리드 통계')).toBeInTheDocument()
  })

  it('"STATS" 배지가 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByText('STATS')).toBeInTheDocument()
  })

  it('"개인통계" 탭이 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByRole('tab', { name: /개인통계/ })).toBeInTheDocument()
  })

  it('"팀통계" 탭이 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByRole('tab', { name: /팀통계/ })).toBeInTheDocument()
  })

  it('팀통계 탭 클릭 시 활성화된다', () => {
    renderAndAdvance()
    const teamTab = screen.getByRole('tab', { name: /팀통계/ })
    act(() => { fireEvent.click(teamTab) })
    expect(teamTab).toHaveAttribute('aria-selected', 'true')
  })

  it('"엑셀 다운로드" 버튼이 렌더된다', () => {
    renderAndAdvance()
    expect(screen.getByText('엑셀 다운로드')).toBeInTheDocument()
  })
})
