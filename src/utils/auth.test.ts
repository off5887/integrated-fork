// src/utils/auth.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { isAuthenticated } from './auth'

describe('isAuthenticated', () => {
  beforeEach(() => localStorage.clear())

  it('토큰이 없으면 false를 반환한다', () => {
    expect(isAuthenticated()).toBe(false)
  })

  it('accessToken이 있으면 true를 반환한다', () => {
    localStorage.setItem('accessToken', 'some-token')
    expect(isAuthenticated()).toBe(true)
  })

  it('빈 문자열 토큰은 false를 반환한다', () => {
    localStorage.setItem('accessToken', '')
    expect(isAuthenticated()).toBe(false)
  })

  it('다른 키의 값은 무시한다', () => {
    localStorage.setItem('token', 'other-token')
    expect(isAuthenticated()).toBe(false)
  })
})
