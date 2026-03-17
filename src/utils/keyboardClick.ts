/**
 * Enter/Space 키 입력을 클릭으로 변환하는 이벤트 핸들러를 반환합니다.
 * role="button" | role="checkbox" 등 비네이티브 인터랙티브 요소에 사용합니다.
 *
 * @example
 * <Box
 *   role="button"
 *   tabIndex={0}
 *   onClick={handler}
 *   onKeyDown={onKeyboardClick(handler)}
 * />
 */
export function onKeyboardClick(handler: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handler()
    }
  }
}
