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

  // 요청 인터셉터 (토큰 넣기 등 나중에 확장 가능)
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  // 응답 인터셉터 (에러 핸들링 등)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 401 → 로그아웃 처리, 500 → 알림 등 나중에 추가
      console.error('API Error:', error)
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const api = createClient()
export const authApi = createClient() // 인증 관련 API는 따로 분리하고 싶을 때
