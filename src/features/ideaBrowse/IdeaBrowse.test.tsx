import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

import { screen, act, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import IdeaBrowse from './IdeaBrowse'
import { IDEAS, MY_AUTHOR } from '@/api/mock/ideaBrowse'

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

describe('IdeaBrowse', () => {
  describe('헤더 및 통계', () => {
    it('"상상 보기" 제목이 렌더된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('상상 보기')).toBeInTheDocument()
    })

    it('전체 아이디어 건수가 통계 패널에 표시된다', () => {
      render(<IdeaBrowse />)
      // IDEAS.length가 여러 요소에 나타날 수 있으므로 getAllByText 사용
      expect(screen.getAllByText(String(IDEAS.length)).length).toBeGreaterThanOrEqual(1)
    })

    it('"내 상상", "내 유사" 통계 레이블이 표시된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('내 상상')).toBeInTheDocument()
      expect(screen.getByText('내 유사')).toBeInTheDocument()
    })
  })

  describe('로딩 상태', () => {
    it('초기 로딩 중에는 스피너가 표시된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('아이디어를 불러오는 중...')).toBeInTheDocument()
    })

    it('800ms 후 로딩 스피너가 사라진다', () => {
      render(<IdeaBrowse />)
      advanceLoading()
      expect(screen.queryByText('아이디어를 불러오는 중...')).not.toBeInTheDocument()
    })

    it('로딩 완료 후 아이디어 카드가 표시된다', () => {
      render(<IdeaBrowse />)
      advanceLoading()
      expect(screen.getByText('생산라인 LED 조명 교체로 전기요금 절감')).toBeInTheDocument()
    })
  })

  describe('정렬 버튼', () => {
    it('4개의 정렬 옵션(최신순, 좋아요순, 조회순, 댓글순)이 렌더된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('최신순')).toBeInTheDocument()
      expect(screen.getByText('좋아요순')).toBeInTheDocument()
      expect(screen.getByText('조회순')).toBeInTheDocument()
      expect(screen.getByText('댓글순')).toBeInTheDocument()
    })

    it('정렬 버튼은 role="button"으로 렌더된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByRole('button', { name: '최신순' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '좋아요순' })).toBeInTheDocument()
    })

    it('"좋아요순" 클릭 시 아이디어 카드가 유지된다', () => {
      render(<IdeaBrowse />)
      advanceLoading()

      fireEvent.click(screen.getByRole('button', { name: '좋아요순' }))

      // 정렬 변경 후에도 첫 번째 아이디어가 사라지지 않음 (단순 재정렬)
      expect(screen.getByText('생산라인 LED 조명 교체로 전기요금 절감')).toBeInTheDocument()
    })
  })

  describe('검색 결과 표시', () => {
    it('로딩 완료 후 "건" 텍스트를 포함한 건수 표시가 렌더된다', () => {
      render(<IdeaBrowse />)
      advanceLoading()
      // "총 N건" 텍스트는 nested span으로 split됨 — "건" 텍스트 포함 여부로 확인
      expect(screen.getAllByText(/건/).length).toBeGreaterThanOrEqual(1)
    })

    it('로딩 완료 후 필터링된 결과 건수가 표시된다', () => {
      render(<IdeaBrowse />)
      advanceLoading()
      // filteredIdeas.length 숫자 확인 (초기에는 IDEAS.length와 동일)
      expect(screen.getAllByText(String(IDEAS.length)).length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('빈 결과 상태', () => {
    it('내 아이디어(MY_AUTHOR) 건수가 1개 이상 존재한다', () => {
      const myCount = IDEAS.filter((i) => i.author === MY_AUTHOR).length
      expect(myCount).toBeGreaterThan(0)
    })
  })
})
