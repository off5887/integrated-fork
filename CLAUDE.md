# CLAUDE.md — gomgom_web/frontend

Claude Code가 이 프로젝트에서 작업할 때 반드시 따라야 할 규칙과 컨벤션을 정의합니다.

---

## 기술 스택

- **Framework**: React 19 + TypeScript 5.9 (strict mode)
- **Build**: Vite (rolldown-vite)
- **UI**: Material-UI (MUI) v7 + Emotion
- **State**: TanStack React Query v5
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts, ApexCharts, Nivo
- **Path alias**: `@/` → `src/`

---

## 디렉토리 구조

```
src/
├── api/
│   ├── mock/         # 가상 데이터 (도메인별 파일)
│   ├── types/        # 도메인 타입 정의 (도메인별 파일)
│   ├── queries/      # TanStack Query hooks
│   └── client.ts     # axios 클라이언트
├── assets/           # 이미지, SVG 등 정적 자원
├── components/
│   ├── common/       # 레이아웃에 공통으로 쓰이는 컴포넌트 (Header, Nav 등)
│   └── ui/           # 재사용 가능한 UI 원자 컴포넌트 (Button, LoadingSpinner 등)
├── context/          # React Context (ThemeContext 등)
├── features/         # 피처 단위 폴더 (복잡한 도메인 로직)
├── layouts/          # 페이지 레이아웃 래퍼 (AuthLayout, MainLayout)
├── routes/           # 페이지 단위 컴포넌트
│   └── {페이지}/
│       ├── {Page}.tsx          # 페이지 루트 컴포넌트
│       ├── utils.ts            # 페이지 전용 유틸
│       ├── config/             # 페이지 전용 설정 (statusConfig 등)
│       └── components/         # 페이지 전용 서브 컴포넌트
├── theme/            # 테마 파일 (페이지별 팔레트, MUI 타입 확장)
└── utils/            # 전역 유틸 함수
```

---

## 파일 배치 규칙 (반드시 준수)

### 가상 데이터 → `src/api/mock/`
- 컴포넌트 파일 내부에 `const mockXxx = [...]` 형태로 정의하지 않는다.
- 도메인별 파일로 분리: `mock/settings.ts`, `mock/judge.ts`, `mock/ideaBrowse.ts` 등
- 여러 파일에 분산된 동일 도메인 mock 데이터는 하나의 파일로 통합한다.

```ts
// ✅ 올바른 위치
// src/api/mock/judge.ts
export const mockCandidates: ReviewerCandidate[] = [...]

// ❌ 잘못된 위치
// src/routes/judge/components/ReviewerChangeModal.tsx
const mockCandidates = [...]
```

### 도메인 타입 → `src/api/types/`
- 컴포넌트 파일 내부에 `interface Xxx` / `type Xxx` 형태로 도메인 타입을 정의하지 않는다.
- 도메인별 파일로 분리: `types/settings.ts`, `types/judge.ts`, `types/ideaBrowse.ts` 등
- **예외**: 컴포넌트 고유의 props 타입(`interface XxxProps`)은 해당 컴포넌트 파일에 둔다.

```ts
// ✅ 올바른 위치
// src/api/types/judge.ts
export interface ReviewerCandidate { ... }
export interface Attachment { ... }

// ❌ 잘못된 위치
// src/routes/judge/components/AttachmentsSection.tsx
interface Attachment { ... }
```

### 테마/색상 토큰 → `src/theme/`
- 다크/라이트 분기 색상값(`isDarkMode ? '#xxx' : '#yyy'`)을 컴포넌트 내부에 하드코딩하지 않는다.
- 페이지 전용 팔레트는 `src/theme/{페이지}Theme.ts` 파일에 토큰으로 정의한다.
- MUI 테마 타입 확장 `.d.ts` 파일은 `src/theme/`에 유지한다 (이동 대상 아님).

```ts
// ✅ 올바른 방식
// src/theme/ideaBrowseTheme.ts
const ideaLight = { avatarBg: '#6366f1', dialogShadow: '...', ... }
const ideaDark  = { avatarBg: '#4f46e5', dialogShadow: '...', ... }
export const getIdeaTheme = (isDarkMode: boolean) => isDarkMode ? ideaDark : ideaLight

// ❌ 잘못된 방식
// src/routes/ideaBrowse/components/IdeaCard.tsx
bgcolor: isDarkMode ? '#4f46e5' : '#6366f1'
```

### 페이지 전용 유틸 → `routes/{페이지}/utils.ts`
- 페이지 내에서만 사용하는 유틸 함수는 해당 페이지 폴더의 `utils.ts`에 둔다.
- 전역에서 재사용되는 유틸은 `src/utils/`에 둔다.

---

## 컴포넌트 작성 규칙

### 파일 크기 제한
- 컴포넌트 파일이 **500줄을 초과**하면 서브 컴포넌트로 분리한다.
- 분리 기준: 독립적으로 의미가 있는 UI 영역 (패널, 다이얼로그, 섹션 등)

### Props Drilling 금지
- `isDarkMode`, `pageColors` 등 테마 관련 값을 prop으로 내려주지 않는다.
- **Leaf 컴포넌트**는 직접 hook을 호출한다.

```tsx
// ✅ 올바른 방식 — leaf 컴포넌트가 직접 호출
export default function IdeaCard({ idea, onClick }: IdeaCardProps) {
  const { isDarkMode } = useThemeMode()
  const theme = getIdeaTheme(isDarkMode)
  ...
}

// ❌ 잘못된 방식 — isDarkMode를 prop으로 받음
export default function IdeaCard({ idea, isDarkMode, onClick }: IdeaCardProps) { ... }
```

- `isDarkMode`가 필요하면 `useThemeMode()` (`src/context/ThemeContext.tsx`)
- 페이지 공통 색상이 필요하면 `usePageColors()` (`src/theme/pageColors.ts`)

### Import 경로
- 크로스 모듈 참조는 항상 `@/` alias를 사용한다.
- 같은 폴더 내 참조만 상대 경로(`./`, `../`)를 허용한다.

```ts
// ✅ 크로스 모듈
import { useThemeMode } from '@/context/ThemeContext'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { mockUsers } from '@/api/mock/settings'

// ✅ 동일 폴더 내
import { getCatConfig } from '../utils'
import IdeaCard from './components/IdeaCard'
```

---

## 타입스크립트 규칙

- `strict: true` — `any` 사용 금지, 명시적 타입 선언 우선
- `noUnusedLocals`, `noUnusedParameters` 활성화 — 미사용 변수 허용 안 함
- mock 데이터에는 `api/types/`에서 가져온 타입을 명시한다

```ts
import type { User } from '@/api/types/settings'
export const mockUsers: User[] = [...]
```

---

## 커밋 규칙

- 커밋 메시지 형식: `{스코프}: {변경 내용 요약}`
- 예시: `ideaBrowse: prop drilling 제거 및 인라인 테마값 토큰화`
- 작업 단위를 작게 유지하고 관련 파일을 함께 커밋한다.
- 작업 완료 후 `npx tsc --noEmit`으로 타입 에러 없음을 확인한 뒤 커밋한다.

---

## 체크리스트 (코드 작성/수정 시)

- [ ] 가상 데이터가 `src/api/mock/`에 있는가?
- [ ] 도메인 타입이 `src/api/types/`에 있는가?
- [ ] 색상 토큰이 `src/theme/`에 있는가? (컴포넌트 내 하드코딩 없음)
- [ ] Leaf 컴포넌트가 `isDarkMode`를 props로 받지 않고 직접 hook을 호출하는가?
- [ ] 컴포넌트 파일이 500줄 이하인가?
- [ ] 크로스 모듈 import에 `@/` alias를 사용하는가?
- [ ] `npx tsc --noEmit` 통과 여부 확인했는가?
