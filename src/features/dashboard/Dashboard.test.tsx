// Dashboard에서 사용하는 ApexCharts는 jsdom에서 동작하지 않으므로 mock 처리
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('react-apexcharts', () => ({ default: () => null }))

import { act, screen } from '@testing-library/react'
import { render } from '@/tests/utils'
import Dashboard from './Dashboard'
import { DEMO_USER_PROFILE } from '@/api/mock/auth'
import { DEMO_STORAGE_KEY } from '@/utils/demoMode'

beforeEach(() => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_USER_PROFILE))
})

afterEach(() => {
  localStorage.removeItem(DEMO_STORAGE_KEY)
  vi.useRealTimers()
})

describe('Dashboard', () => {
  it('헤더 타이틀 "대시보드"가 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('대시보드')).toBeInTheDocument()
  })

  it('"● 실시간" 배지가 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('● 실시간')).toBeInTheDocument()
  })

  it('기본(user) 역할의 KPI 카드 레이블이 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('내 아이디어')).toBeInTheDocument()
    expect(screen.getByText('승인 완료')).toBeInTheDocument()
  })

  it('기본 KPI 카드 값(5건, 2건)이 렌더된다', async () => {
    render(<Dashboard />)
    expect((await screen.findAllByText('5건')).length).toBeGreaterThanOrEqual(1)
    expect((await screen.findAllByText('2건')).length).toBeGreaterThanOrEqual(1)
  })

  it('"최근 활동" 섹션 제목이 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('최근 활동')).toBeInTheDocument()
  })

  it('최근 활동 목록의 사용자 이름이 모두 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Sarah')).toBeInTheDocument()
    expect(screen.getByText('Mike')).toBeInTheDocument()
    expect(screen.getByText('김민지')).toBeInTheDocument()
  })

  it('최근 활동 목록의 행동 내역이 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('Q3 예산 아이디어 승인')).toBeInTheDocument()
    expect(screen.getByText('새로운 디자인 안 업로드')).toBeInTheDocument()
  })

  it('최근 활동 항목이 list role로 접근성을 지원한다', () => {
    vi.useFakeTimers()
    render(<Dashboard />)
    act(() => { vi.advanceTimersByTime(3000) })
    expect(screen.getByRole('list', { name: '최근 활동 목록' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4)
  })
})
