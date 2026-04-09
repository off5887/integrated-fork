/**
 * useMileage / useWithdrawals
 *
 * 마일리지 & 환전 신청 관련 TanStack Query 훅
 * - useMyMileages           : GET  /api/mileages/me
 * - useUserMileages         : GET  /api/mileages/users/{employeeId}  (관리자)
 * - useAllMileages          : GET  /api/mileages                     (관리자)
 * - useMyWithdrawals        : GET  /api/mileage-withdrawals/me
 * - useAllWithdrawals       : GET  /api/mileage-withdrawals          (관리자, ?status=)
 * - useGrantMileage         : POST /api/mileages/grant               (관리자)
 * - useRequestWithdrawal    : POST /api/mileage-withdrawals
 * - useApproveWithdrawal    : PUT  /api/mileage-withdrawals/{id}/approve
 * - useRejectWithdrawal     : PUT  /api/mileage-withdrawals/{id}/reject
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import type { ApiResponse } from '@/api/types/auth'
import type {
  GrantMileageRequest,
  MileageRecord,
  WithdrawalActionRequest,
  WithdrawalRecord,
  WithdrawalRequest,
} from '@/api/types/mileage'
import {
  mockAllMileageRecords,
  mockAllWithdrawalRecords,
  mockMyMileageRecords,
  mockMyWithdrawalRecords,
  mockUserMileageRecordsMap,
} from '@/api/mock/mileage'
import { withDemoFallback } from '@/utils/demoMode'

// ─── 내 마일리지 수상내역 ─────────────────────────────────────────────────────

export function useMyMileages() {
  return useQuery({
    queryKey: queryKeys.mileages.my(),
    queryFn: () =>
      withDemoFallback<MileageRecord[]>(
        mockMyMileageRecords,
        async () => {
          const res = await api.get<ApiResponse<{ content: MileageRecord[] }>>('/api/mileages/me')
          return res.data.data?.content ?? []
        },
      ),
    staleTime: 0,
  })
}

// ─── 사용자별 마일리지 수상내역 (관리자) ──────────────────────────────────────

export function useUserMileages(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.mileages.user(employeeId),
    queryFn: () =>
      withDemoFallback<MileageRecord[]>(
        mockUserMileageRecordsMap[employeeId] ?? [],
        async () => {
          const res = await api.get<ApiResponse<{ content: MileageRecord[] }>>(`/api/mileages/users/${employeeId}`)
          return res.data.data?.content ?? []
        },
      ),
    staleTime: 0,
    enabled: !!employeeId,
  })
}

// ─── 전체 마일리지 내역 (관리자) ──────────────────────────────────────────────

export function useAllMileages() {
  return useQuery({
    queryKey: queryKeys.mileages.all(),
    queryFn: () =>
      withDemoFallback<MileageRecord[]>(
        mockAllMileageRecords,
        async () => {
          const res = await api.get<ApiResponse<{ content: MileageRecord[] }>>('/api/mileages')
          return res.data.data?.content ?? []
        },
      ),
    staleTime: 0,
  })
}

// ─── 내 환전 신청내역 ──────────────────────────────────────────────────────────

export function useMyWithdrawals() {
  return useQuery({
    queryKey: queryKeys.withdrawals.my(),
    queryFn: () =>
      withDemoFallback<WithdrawalRecord[]>(
        mockMyWithdrawalRecords,
        async () => {
          const res = await api.get<ApiResponse<{ content: WithdrawalRecord[] }>>('/api/mileage-withdrawals/me')
          return res.data.data?.content ?? []
        },
      ),
    staleTime: 0,
  })
}

// ─── 전체 환전 신청내역 (관리자) ──────────────────────────────────────────────

export function useAllWithdrawals(status?: string) {
  return useQuery({
    queryKey: queryKeys.withdrawals.all(status),
    queryFn: () =>
      withDemoFallback<WithdrawalRecord[]>(
        status
          ? mockAllWithdrawalRecords.filter((r) => {
              if (status === 'pending')  return r.status === 'pending'
              if (status === 'approved') return r.status === 'approved'
              if (status === 'rejected') return r.status === 'rejected'
              return true
            })
          : mockAllWithdrawalRecords,
        async () => {
          const url = status ? `/api/mileage-withdrawals?status=${status}` : '/api/mileage-withdrawals'
          const res = await api.get<ApiResponse<{ content: WithdrawalRecord[] }>>(url)
          return res.data.data?.content ?? []
        },
      ),
    staleTime: 0,
  })
}

// ─── 특별 마일리지 지급 (관리자) ──────────────────────────────────────────────

export function useGrantMileage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: GrantMileageRequest) =>
      api.post<ApiResponse<MileageRecord>>('/api/mileages/grant', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mileages.all() })
    },
  })
}

// ─── 환전 신청 ──────────────────────────────────────────────────────────────

export function useRequestWithdrawal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: WithdrawalRequest) =>
      api.post<ApiResponse<WithdrawalRecord>>('/api/mileage-withdrawals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.withdrawals.my() })
    },
  })
}

// ─── 환전 승인 (관리자) ────────────────────────────────────────────────────────

export function useApproveWithdrawal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data?: WithdrawalActionRequest }) =>
      api.put<ApiResponse<WithdrawalRecord>>(`/api/mileage-withdrawals/${id}/approve`, data ?? {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.withdrawals.all() })
    },
  })
}

// ─── 환전 반려 (관리자) ────────────────────────────────────────────────────────

export function useRejectWithdrawal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data?: WithdrawalActionRequest }) =>
      api.put<ApiResponse<WithdrawalRecord>>(`/api/mileage-withdrawals/${id}/reject`, data ?? {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.withdrawals.all() })
    },
  })
}
