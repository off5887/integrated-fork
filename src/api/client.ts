// src/api/client.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { handleSessionExpired } from '@/utils/sessionExpired'
import { globalShowSnackbar } from '@/context/SnackbarContext'

// VITE_API_BASE_URL이 빈 문자열('')이면 상대경로 → Vite 프록시 사용
// 값이 없으면(undefined) 직접 연결 fallback
const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  })

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const url: string = error.config?.url ?? ''
      const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/logout')
      // /users/me 401·403 은 useCurrentUserQuery 에서 직접 처리
      const isMeEndpoint = url.includes('/users/me')

      const status: number = error.response?.status
      if (status === 401 && !isAuthEndpoint && !isMeEndpoint) {
        handleSessionExpired(() => axiosInstance.post('/api/auth/logout'))
      }
      if (status === 403) {
        globalShowSnackbar('접근 권한이 없습니다.', 'error')
      }
      if (status >= 500) {
        console.error(
          `[API ${status}] ${error.config?.method?.toUpperCase()} ${url}`,
          error.response.data,
        )
      }
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const api = createClient()
export const authApi = createClient() // 인증 관련 API는 따로 분리하고 싶을 때
