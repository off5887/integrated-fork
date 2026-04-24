/**
 * useCategories / useAllCategories
 *
 * - useCategories    : GET  /api/categories         (활성 카테고리만, 일반 사용자)
 * - useAllCategories : GET  /api/categories/all     (전체 포함 비활성, 관리자)
 * - useAddCategory   : POST /api/categories
 * - useUpdateCategory: PUT  /api/categories/{id}
 * - useDeleteCategory: DELETE /api/categories/{id}  (비활성화, 하드 삭제 아님)
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { mockCategoryApiItems } from '@/api/mock/idea'
import type { ApiResponse } from '@/api/types/auth'
import type { CategoryApiItem, CategoryOption, CategoryRequest } from '@/api/types/idea'
import { toCategoryOption, toCategoryRequest } from '@/api/types/idea'
import { withDemoFallback } from '@/utils/demoMode'

// ─── 활성 카테고리 목록 (일반 사용자) ────────────────────────────────────────

export function useCategories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: queryKeys.categories.all(),
    queryFn: () =>
      withDemoFallback<CategoryOption[]>(
        mockCategoryApiItems.filter((c) => c.isActive).map(toCategoryOption),
        async () => {
          const res = await api.get<ApiResponse<CategoryApiItem[]>>('/api/categories')
          return (res.data.data ?? []).map(toCategoryOption)
        },
      ),
    staleTime: 0,
  })
  return { categories, isLoading }
}

// ─── 전체 카테고리 목록 (관리자, 비활성 포함) ─────────────────────────────────

function useAddCategory(invalidate: () => void) {
  return useMutation({
    mutationFn: async (opt: CategoryOption) => {
      const req: CategoryRequest = toCategoryRequest(opt)
      const res = await api.post<ApiResponse<CategoryApiItem>>('/api/categories', req)
      return toCategoryOption(res.data.data)
    },
    onSuccess: invalidate,
  })
}

function useUpdateCategory(invalidate: () => void) {
  return useMutation({
    mutationFn: async (opt: CategoryOption) => {
      const req: CategoryRequest = toCategoryRequest(opt)
      const res = await api.put<ApiResponse<CategoryApiItem>>(`/api/categories/${opt.id}`, req)
      return toCategoryOption(res.data.data)
    },
    onSuccess: invalidate,
  })
}

function useDeactivateCategory(invalidate: () => void) {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/categories/${id}`),
    onSuccess: invalidate,
  })
}

export function useAllCategories() {
  const queryClient = useQueryClient()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.admin() })
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() })
  }

  const { data: categories = [], isLoading } = useQuery({
    queryKey: queryKeys.categories.admin(),
    queryFn: () =>
      withDemoFallback<CategoryOption[]>(
        mockCategoryApiItems.map(toCategoryOption),
        async () => {
          const res = await api.get<ApiResponse<CategoryApiItem[]>>('/api/categories/all')
          return (res.data.data ?? []).map(toCategoryOption)
        },
      ),
    staleTime: 0,
  })

  const addMutation        = useAddCategory(invalidate)
  const updateMutation     = useUpdateCategory(invalidate)
  const deactivateMutation = useDeactivateCategory(invalidate)

  return {
    categories,
    isLoading,
    addCategory:      addMutation.mutateAsync,
    updateCategory:   updateMutation.mutateAsync,
    deleteCategory:   deactivateMutation.mutateAsync,
  }
}
