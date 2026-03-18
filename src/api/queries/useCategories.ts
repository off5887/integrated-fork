/**
 * useCategories
 *
 * 현재: localStorage 기반 mock
 * 백엔드 연동 시: categoryApi 함수들만 아래 주석처럼 교체하면 됩니다.
 * 컴포넌트(CategoryManagement) 코드는 변경 없음.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CATEGORIES } from '@/api/mock/idea'
import type { CategoryOption } from '@/api/types/idea'
import { queryKeys } from '@/api/queryKeys'
// 백엔드 연동 시 주석 해제:
// import { api } from '@/api/client'

const STORAGE_KEY = 'gomgom_categories'

// ─── 데이터 함수 (백엔드 연동 시 이 부분만 교체) ───────────────────────────────

const categoryApi = {
  /** 전체 조회 */
  getAll: async (): Promise<CategoryOption[]> => {
    // 백엔드 연동 시:
    // return api.get<CategoryOption[]>('/api/categories').then((r) => r.data)

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as CategoryOption[]
    return CATEGORIES as CategoryOption[]
  },

  /** 추가 */
  add: async (category: CategoryOption): Promise<CategoryOption> => {
    // 백엔드 연동 시:
    // return api.post<CategoryOption>('/api/categories', category).then((r) => r.data)

    const current = await categoryApi.getAll()
    const next = [...current, category]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return category
  },

  /** 수정 */
  update: async (category: CategoryOption): Promise<CategoryOption> => {
    // 백엔드 연동 시:
    // return api.put<CategoryOption>(`/api/categories/${category.id}`, category).then((r) => r.data)

    const current = await categoryApi.getAll()
    const next = current.map((c) => (c.id === category.id ? category : c))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return category
  },

  /** 삭제 */
  remove: async (id: string): Promise<void> => {
    // 백엔드 연동 시:
    // return api.delete(`/api/categories/${id}`).then(() => undefined)

    const current = await categoryApi.getAll()
    const next = current.filter((c) => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  },
}

// ─── React Query 훅 ────────────────────────────────────────────────────────────

export function useCategories() {
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading } = useQuery({
    queryKey: queryKeys.categories.all(),
    queryFn: categoryApi.getAll,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() })

  const addMutation = useMutation({
    mutationFn: categoryApi.add,
    onSuccess: invalidate,
  })

  const updateMutation = useMutation({
    mutationFn: categoryApi.update,
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: invalidate,
  })

  return {
    categories,
    isLoading,
    addCategory: addMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
  }
}
