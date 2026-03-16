// Dashboard에서 사용하는 ApexCharts는 jsdom에서 동작하지 않으므로 mock 처리
import { vi, describe, it, expect } from 'vitest'

vi.mock('react-apexcharts', () => ({ default: () => null }))

import { screen } from '@testing-library/react'
import { render } from '@/tests/utils'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('헤더 타이틀 "대시보드"가 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('대시보드')).toBeInTheDocument()
  })

  it('"실시간 현황" 배지가 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('실시간 현황')).toBeInTheDocument()
  })

  it('4개의 KPI 카드 레이블이 모두 렌더된다', () => {
    render(<Dashboard />)
    expect(screen.getByText('전체 아이디어')).toBeInTheDocument()
    expect(screen.getByText('승인 완료')).toBeInTheDocument()
    expect(screen.getByText('이번 달 신규')).toBeInTheDocument()
    expect(screen.getByText('전체 실행률')).toBeInTheDocument()
  })

  it('KPI 카드 값(150건, 68건, 23건, 73.4%)이 렌더된다', () => {
    render(<Dashboard />)
    // 같은 값이 여러 요소에서 렌더될 수 있으므로 getAllByText 사용
    expect(screen.getAllByText('150건').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('68건').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('23건').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('73.4%').length).toBeGreaterThanOrEqual(1)
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
    render(<Dashboard />)
    expect(screen.getByRole('list', { name: '최근 활동 목록' })).toBeInTheDocument()
    // 다른 MUI List 컴포넌트의 li 요소도 포함될 수 있으므로 최소 4개 확인
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4)
  })
})
