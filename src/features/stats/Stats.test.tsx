// ApexCharts는 jsdom에서 동작하지 않으므로 mock 처리
import { vi, describe, it, expect } from 'vitest'

vi.mock('react-apexcharts', () => ({ default: () => null }))

import { screen } from '@testing-library/react'
import { render } from '@/tests/utils'
import Stats from './Stats'

describe('Stats', () => {
  it('에러 없이 렌더된다', () => {
    const { container } = render(<Stats />)
    expect(container).toBeInTheDocument()
  })

  it('"나의 곰곰이" 섹션이 렌더된다', () => {
    render(<Stats />)
    expect(screen.getByText('나의 곰곰이')).toBeInTheDocument()
  })

  it('"인기 상상 TOP 5" 섹션이 렌더된다', () => {
    render(<Stats />)
    expect(screen.getByText('인기 상상 TOP 5')).toBeInTheDocument()
  })

  it('"결재 단계별 현황" 섹션이 렌더된다', () => {
    render(<Stats />)
    expect(screen.getByText('결재 단계별 현황')).toBeInTheDocument()
  })

  it('"실행 완료율" 섹션이 렌더된다', () => {
    render(<Stats />)
    expect(screen.getByText('실행 완료율')).toBeInTheDocument()
  })

  it('"부문/팀별 실행 건수 TOP 5" 섹션이 렌더된다', () => {
    render(<Stats />)
    expect(screen.getByText('부문/팀별 실행 건수 TOP 5')).toBeInTheDocument()
  })
})
