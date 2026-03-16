// Judge.tsx에서 사용하는 MUI 아이콘 mock
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('@mui/icons-material/AssignmentTurnedIn', () => ({ default: () => null }))
vi.mock('@mui/icons-material/CheckCircleOutline', () => ({ default: () => null }))
vi.mock('@mui/icons-material/DoNotDisturb', () => ({ default: () => null }))
vi.mock('@mui/icons-material/HourglassEmpty', () => ({ default: () => null }))
vi.mock('@mui/icons-material/OpenInNew', () => ({ default: () => null }))
vi.mock('@mui/icons-material/PendingActions', () => ({ default: () => null }))
vi.mock('@mui/icons-material/SwapHoriz', () => ({ default: () => null }))

// 복잡한 서브 컴포넌트 mock (자체 테스트 파일에서 테스트)
vi.mock('./JudgeDetail', () => ({ default: () => null }))
vi.mock('./components/ReviewerChangeModal', () => ({ default: () => null }))

import { screen, act, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import Judge from './Judge'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

/** 800ms 로딩 타이머를 완료시키는 헬퍼 */
function advanceLoading() {
  act(() => {
    vi.advanceTimersByTime(800)
  })
}

describe('Judge', () => {
  describe('헤더 및 기본 렌더', () => {
    it('"심사하기" 제목이 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByText('심사하기')).toBeInTheDocument()
    })

    it('전체 건수 칩(전체 11건)이 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByText('전체 11건')).toBeInTheDocument()
    })
  })

  describe('상태 요약 카드', () => {
    it('4개의 상태 카드(심사대기, 심사중, 승인, 반려) 레이블이 모두 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByText('심사대기')).toBeInTheDocument()
      expect(screen.getByText('심사중')).toBeInTheDocument()
      expect(screen.getByText('승인')).toBeInTheDocument()
      expect(screen.getByText('반려')).toBeInTheDocument()
    })

    it('각 상태 카드의 건수가 올바르게 표시된다 (대기:4, 중:3, 승인:2, 반려:2)', () => {
      render(<Judge />)
      const fours = screen.getAllByText('4')
      expect(fours.length).toBeGreaterThanOrEqual(1) // 심사대기 4건

      const threes = screen.getAllByText('3')
      expect(threes.length).toBeGreaterThanOrEqual(1) // 심사중 3건

      const twos = screen.getAllByText('2')
      expect(twos.length).toBeGreaterThanOrEqual(2) // 승인 2건, 반려 2건
    })
  })

  describe('로딩 후 테이블', () => {
    it('800ms 후 제안 테이블이 렌더된다', () => {
      render(<Judge />)
      advanceLoading()
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('테이블 헤더 컬럼이 렌더된다', () => {
      render(<Judge />)
      advanceLoading()
      expect(screen.getByText('제안 제목')).toBeInTheDocument()
      expect(screen.getByText('제안자')).toBeInTheDocument()
      expect(screen.getByText('상태')).toBeInTheDocument()
      expect(screen.getByText('결재자 변경')).toBeInTheDocument()
    })

    it('첫 번째 제안 제목이 테이블에 표시된다', () => {
      render(<Judge />)
      advanceLoading()
      expect(screen.getByText('생산라인 LED 조명 교체로 전기요금 절감')).toBeInTheDocument()
    })

    it('TablePagination — rows per page 선택 박스가 렌더된다', () => {
      render(<Judge />)
      advanceLoading()
      // MUI TablePagination은 rows-per-page combobox를 렌더함
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('상태 필터', () => {
    it('심사대기 카드 클릭 시 필터 칩이 표시된다', () => {
      render(<Judge />)
      // 로딩 전에는 stat card 텍스트만 존재 (테이블 상태 칩 없음)
      fireEvent.click(screen.getByText('심사대기'))
      advanceLoading()

      expect(screen.getByText('필터:')).toBeInTheDocument()
    })

    it('필터 칩의 삭제 버튼 클릭 시 필터가 해제된다', () => {
      render(<Judge />)
      // 로딩 전에 필터 설정
      fireEvent.click(screen.getByText('심사대기'))
      advanceLoading()
      expect(screen.getByText('필터:')).toBeInTheDocument()

      // MUI Chip의 onDelete 버튼 클릭으로 필터 해제
      // Chip에는 svg 아이콘 버튼이 렌더되며, role="button"은 없지만
      // 부모 요소에서 onDelete 호출을 트리거할 수 있음
      // "전체" 로 복귀 → "필터:" 텍스트 사라짐
      const filterBox = screen.getByText('필터:').parentElement!
      const chipDeleteBtn = filterBox.querySelector('svg[data-testid="CancelIcon"]')
      if (chipDeleteBtn) {
        fireEvent.click(chipDeleteBtn)
      }

      expect(screen.queryByText('필터:')).not.toBeInTheDocument()
    })

    it('심사중 카드 클릭 시 심사중 항목만 필터링된다', () => {
      render(<Judge />)
      // 로딩 전에 필터 설정
      fireEvent.click(screen.getByText('심사중'))
      advanceLoading()

      // 필터 안내에 "3건 표시 중" 텍스트가 표시됨
      expect(screen.getByText('3건 표시 중')).toBeInTheDocument()
    })
  })
})
