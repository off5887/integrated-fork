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

// useCurrentUser를 mock하여 김심사(DEMO_REVIEWER_PROFILE)로 고정
const MOCK_REVIEWER_PROFILE = {
  employeeId: 'demo2',
  name: '김심사',
  position: '과장',
  department: '기획팀',
  role: 'reviewer' as const,
  bizAreaName: '',
  bizAreaCode: '',
  orgCode: '',
}
vi.mock('@/features/auth/hooks/useCurrentUser', () => ({
  useCurrentUser: () => ({
    user:       MOCK_REVIEWER_PROFILE,
    isLoading:  false,
    isAdmin:    false,
    isReviewer: true,
    name:       MOCK_REVIEWER_PROFILE.name,
    role:       MOCK_REVIEWER_PROFILE.role,
    department: MOCK_REVIEWER_PROFILE.department,
    employeeId: MOCK_REVIEWER_PROFILE.employeeId,
  }),
  useCurrentUserWithLoading: () => ({
    user:       MOCK_REVIEWER_PROFILE,
    isLoading:  false,
    isAdmin:    false,
    isReviewer: true,
    name:       MOCK_REVIEWER_PROFILE.name,
    role:       MOCK_REVIEWER_PROFILE.role,
    department: MOCK_REVIEWER_PROFILE.department,
    employeeId: MOCK_REVIEWER_PROFILE.employeeId,
  }),
}))

// useJudgeIdeas / useReviewIdea를 mock — API 없이 동기적으로 judgeData 반환
import { judgeData } from '@/api/mock/judge'
const DEMO_REVIEWER = '김심사'
const myProposalsMock = judgeData.filter((p) => p.reviewer === DEMO_REVIEWER)

vi.mock('@/api/queries/useIdeas', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/queries/useIdeas')>()
  return {
    ...actual,
    useJudgeIdeas: () => ({ data: myProposalsMock, isLoading: false }),
    useReviewIdea: () => ({ mutate: vi.fn(), isPending: false }),
  }
})

import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import Judge from './Judge'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Judge', () => {
  describe('헤더 및 기본 렌더', () => {
    it('"심사하기" 제목이 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByText('심사하기')).toBeInTheDocument()
    })

    it('전체 건수 칩(전체 8건)이 렌더된다', () => {
      render(<Judge />)
      // 김심사에게 배정된 proposals: 8건 (id 201~208)
      expect(screen.getByText('전체 8건')).toBeInTheDocument()
    })
  })

  describe('상태 요약 카드', () => {
    it('3개의 상태 카드(심사대기, 승인, 반려) 레이블이 모두 렌더된다', () => {
      render(<Judge />)
      // 테이블 행에도 같은 텍스트가 나올 수 있으므로 getAllByText 사용
      expect(screen.getAllByText('심사대기').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('승인').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('반려').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('테이블', () => {
    it('제안 테이블이 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('테이블 헤더 컬럼이 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByText('제안 제목')).toBeInTheDocument()
      expect(screen.getByText('제안자')).toBeInTheDocument()
      expect(screen.getByText('상태')).toBeInTheDocument()
    })

    it('첫 번째 제안 제목이 테이블에 표시된다', () => {
      render(<Judge />)
      // 김심사의 첫 번째 proposal (id: 201)
      expect(screen.getAllByText('사내 개발자 교육 플랫폼 구축').length).toBeGreaterThanOrEqual(1)
    })

    it('TablePagination — rows per page 선택 박스가 렌더된다', () => {
      render(<Judge />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('상태 필터', () => {
    it('심사대기 카드 클릭 시 필터 칩이 표시된다', () => {
      render(<Judge />)
      // 같은 텍스트가 여러 곳(StatCard + 테이블 행)에 있으므로 첫 번째(StatCard) 클릭
      fireEvent.click(screen.getAllByText('심사대기')[0])
      expect(screen.getByText('필터:')).toBeInTheDocument()
    })

    it('필터 칩의 삭제 버튼 클릭 시 필터가 해제된다', () => {
      render(<Judge />)
      fireEvent.click(screen.getAllByText('심사대기')[0])
      expect(screen.getByText('필터:')).toBeInTheDocument()

      const filterBox = screen.getByText('필터:').parentElement!
      const chipDeleteBtn = filterBox.querySelector('svg[data-testid="CancelIcon"]')
      if (chipDeleteBtn) {
        fireEvent.click(chipDeleteBtn)
      }

      expect(screen.queryByText('필터:')).not.toBeInTheDocument()
    })

    it('승인 카드 클릭 시 필터 칩이 표시된다', () => {
      render(<Judge />)
      fireEvent.click(screen.getAllByText('승인')[0])
      expect(screen.getByText('필터:')).toBeInTheDocument()
    })
  })
})
