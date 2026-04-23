import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '@/tests/utils'
import IdeaBrowse from './IdeaBrowse'
import { IDEAS, MY_AUTHOR } from '@/api/mock/ideaBrowse'
import { DEMO_USER_PROFILE } from '@/api/mock/auth'
import { DEMO_STORAGE_KEY } from '@/utils/demoMode'

// 데모 모드 활성화 → withDemoFallback이 mock 데이터 반환 (MSW 불필요)
beforeEach(() => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_USER_PROFILE))
})

afterEach(() => {
  localStorage.removeItem(DEMO_STORAGE_KEY)
})

describe('IdeaBrowse', () => {
  describe('헤더 및 통계', () => {
    it('"상상 보기" 제목이 렌더된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('상상 보기')).toBeInTheDocument()
    })

    it('전체 아이디어 건수가 통계 패널에 표시된다', async () => {
      render(<IdeaBrowse />)
      // React Query 비동기 로딩 완료 후 IDEAS.length가 화면에 표시됨
      await screen.findAllByText(String(IDEAS.length))
    })

    it('"내 상상만", "내 유사 아이디어" 통계 레이블이 표시된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('내 상상만')).toBeInTheDocument()
      expect(screen.getByText('내 유사 아이디어만')).toBeInTheDocument()
    })
  })

  describe('로딩 상태', () => {
    it('초기 로딩 중에는 스피너가 표시된다', () => {
      render(<IdeaBrowse />)
      expect(screen.getByText('아이디어를 불러오는 중...')).toBeInTheDocument()
    })

    it('로딩 완료 후 스피너가 사라진다', async () => {
      render(<IdeaBrowse />)
      await waitFor(() => {
        expect(screen.queryByText('아이디어를 불러오는 중...')).not.toBeInTheDocument()
      })
    })

    it('로딩 완료 후 아이디어 카드가 표시된다', async () => {
      render(<IdeaBrowse />)
      await screen.findByText('생산라인 LED 조명 교체로 전기요금 절감')
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

    it('"좋아요순" 클릭 시 카드 그리드가 유지된다', async () => {
      render(<IdeaBrowse />)
      // 로딩 완료 대기
      await waitFor(() => expect(screen.queryByText('아이디어를 불러오는 중...')).not.toBeInTheDocument())

      fireEvent.click(screen.getByRole('button', { name: '좋아요순' }))

      // 정렬 후에도 카드가 1개 이상 렌더됨을 확인
      await waitFor(() => {
        expect(screen.getAllByRole('button', { name: /아이디어:/ }).length).toBeGreaterThan(0)
      })
    })
  })

  describe('검색 결과 표시', () => {
    it('로딩 완료 후 "건" 텍스트를 포함한 건수 표시가 렌더된다', async () => {
      render(<IdeaBrowse />)
      await waitFor(() => {
        expect(screen.getAllByText(/건/).length).toBeGreaterThanOrEqual(1)
      })
    })

    it('로딩 완료 후 필터링된 결과 건수가 표시된다', async () => {
      render(<IdeaBrowse />)
      // 전체 필터 없는 상태에서 IDEAS.length와 동일한 건수가 표시됨
      await screen.findAllByText(String(IDEAS.length))
    })
  })

  describe('빈 결과 상태', () => {
    it('내 아이디어(MY_AUTHOR) 건수가 1개 이상 존재한다', () => {
      const myCount = IDEAS.filter((i) => i.author === MY_AUTHOR).length
      expect(myCount).toBeGreaterThan(0)
    })
  })
})
