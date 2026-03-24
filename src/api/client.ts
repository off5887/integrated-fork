// src/api/client.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // 필요하면 (쿠키/세션 사용할 때)
    ...config,
  })

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const isLoginEndpoint = error.config?.url?.includes('/auth/login')
      // /users/me 401은 useCurrentUserQuery에서 null 반환으로 처리 (ProtectedRoute가 리다이렉트)
      const isMeEndpoint = error.config?.url?.includes('/users/me')
      if (error.response?.status === 401 && !isLoginEndpoint && !isMeEndpoint) {
        localStorage.removeItem('gomgom_user_v1') // 데모 계정 정리
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const api = createClient()
export const authApi = createClient() // 인증 관련 API는 따로 분리하고 싶을 때
