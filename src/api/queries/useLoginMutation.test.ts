// src/api/queries/useLoginMutation.test.ts
import { describe, it, expect } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'
import { getLoginErrorMessage } from './useLoginMutation'

function makeAxiosError(
  message: string,
  serverMessage?: string,
  status = 500,
): AxiosError {
  return new AxiosError(
    message,
    String(status),
    undefined,
    undefined,
    serverMessage
      ? {
          data: { message: serverMessage },
          status,
          statusText: 'Error',
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        }
      : undefined,
  )
}

describe('getLoginErrorMessage', () => {
  it('AxiosError + 서버 message가 있으면 서버 메시지를 반환한다', () => {
    const err = makeAxiosError('Request failed', '비밀번호가 올바르지 않습니다', 401)
    expect(getLoginErrorMessage(err)).toBe('비밀번호가 올바르지 않습니다')
  })

  it('AxiosError지만 서버 message가 없으면 err.message를 반환한다', () => {
    const err = makeAxiosError('네트워크 오류')
    expect(getLoginErrorMessage(err)).toBe('네트워크 오류')
  })

  it('AxiosError에 message도 비어있으면 기본 서버 오류 메시지를 반환한다', () => {
    const err = new AxiosError()
    expect(getLoginErrorMessage(err)).toBe('서버 오류가 발생했습니다')
  })

  it('일반 Error면 err.message를 반환한다', () => {
    expect(getLoginErrorMessage(new Error('뭔가 잘못됨'))).toBe('뭔가 잘못됨')
  })

  it('string 타입이면 알 수 없는 오류 메시지를 반환한다', () => {
    expect(getLoginErrorMessage('string error')).toBe('알 수 없는 오류가 발생했습니다')
  })

  it('null이면 알 수 없는 오류 메시지를 반환한다', () => {
    expect(getLoginErrorMessage(null)).toBe('알 수 없는 오류가 발생했습니다')
  })
})
