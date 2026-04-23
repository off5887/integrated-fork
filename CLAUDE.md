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
- **Charts**: ApexCharts (react-apexcharts)
- **Testing**: Vitest + Testing Library + MSW
- **Path alias**: `@/` → `src/`

---

## 디렉토리 구조

```
src/
├── api/
│   ├── mock/         # 가상 데이터 (도메인별 파일)
│   ├── types/        # 도메인 타입 정의 (도메인별 파일)
│   ├── queries/      # TanStack Query hooks
│   ├── queryKeys.ts  # 쿼리 키 중앙 관리
│   └── client.ts     # axios 클라이언트
├── assets/           # 이미지, SVG 등 정적 자원
├── components/
│   ├── common/       # 레이아웃에 공통으로 쓰이는 컴포넌트 (Header, Nav 등)
│   └── ui/           # 재사용 가능한 UI 원자 컴포넌트 (Button, LoadingSpinner 등)
├── context/          # React Context (ThemeContext 등)
├── features/         # 피처(도메인) 단위 폴더 — 실제 비즈니스 로직
│   └── {피처}/
│       ├── {Page}.tsx          # 피처 루트 컴포넌트
│       ├── utils.ts            # 피처 전용 유틸
│       ├── config/             # 피처 전용 설정 (statusConfig 등)
│       └── components/         # 피처 전용 서브 컴포넌트
├── layouts/          # 페이지 레이아웃 래퍼 (AuthLayout, MainLayout)
├── routes/
│   └── index.tsx     # Route 선언만 (얇은 라우팅 레이어)
├── tests/
│   ├── setup.ts      # jest-dom, matchMedia mock, MSW 생명주기
│   ├── utils.tsx     # Provider 포함 커스텀 render 헬퍼
│   └── mocks/        # MSW server + handlers (도메인별)
├── theme/            # 테마 파일 (피처별 팔레트)
├── types/            # 전역 타입 선언 (.d.ts, 모듈 augmentation)
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
// src/features/judge/components/ReviewerChangeModal.tsx
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
// src/features/judge/components/AttachmentsSection.tsx
interface Attachment { ... }
```

### 테마/색상 토큰 → `src/theme/`
- 다크/라이트 분기 색상값(`isDarkMode ? '#xxx' : '#yyy'`)을 컴포넌트 내부에 하드코딩하지 않는다.
- 페이지 전용 팔레트는 `src/theme/{페이지}Theme.ts` 파일에 토큰으로 정의한다.
- MUI 테마 타입 확장 등 `.d.ts` 선언 파일은 `src/types/`에 둔다.

```ts
// ✅ 올바른 방식
// src/theme/ideaBrowseTheme.ts
const ideaLight = { avatarBg: '#6366f1', dialogShadow: '...', ... }
const ideaDark  = { avatarBg: '#4f46e5', dialogShadow: '...', ... }
export const getIdeaTheme = (isDarkMode: boolean) => isDarkMode ? ideaDark : ideaLight

// ❌ 잘못된 방식
// src/features/ideaBrowse/components/IdeaCard.tsx
bgcolor: isDarkMode ? '#4f46e5' : '#6366f1'
```

### 쿼리 키 → `src/api/queryKeys.ts`
- TanStack Query의 `queryKey` / `mutationKey`를 컴포넌트나 훅 내부에 인라인 문자열로 하드코딩하지 않는다.
- 모든 키는 `src/api/queryKeys.ts`에서 중앙 관리한다.

```ts
// ✅ 올바른 방식
// src/api/queryKeys.ts
export const queryKeys = {
  ideas: {
    all:    () => ['ideas']                    as const,
    list:   (filters?: object) => ['ideas', 'list', filters] as const,
    detail: (id: string)       => ['ideas', 'detail', id]    as const,
  },
  auth: {
    login: () => ['auth', 'login'] as const,
  },
}

// src/api/queries/useIdeas.ts
import { queryKeys } from '@/api/queryKeys'
useQuery({ queryKey: queryKeys.ideas.list(filters), ... })

// ❌ 잘못된 방식
mutationKey: ['auth', 'login']  // 인라인 하드코딩
queryKey: ['ideas', id]
```

### API 연동 시 데모 모드 분기 — `withDemoFallback` 필수
- 백엔드 API를 연동하는 **모든 `useQuery`의 `queryFn`** 은 반드시 `withDemoFallback`으로 감싼다.
- 데모 계정(localStorage 기반)이면 mock 데이터를, 실제 API 계정이면 실제 API를 호출한다.
- `useMutation`은 분기 불필요.
- **`withDemoFallback`을 사용하는 쿼리는 반드시 `staleTime: 0`을 명시한다.**
  - 전역 staleTime(현재 1분)으로 인해 데모 세션의 mock 데이터가 캐시에 남아 실제 API 계정에서도 재조회 없이 mock 데이터가 표시되는 버그가 발생한다.
  - `staleTime: 0`이면 컴포넌트 마운트 시 항상 `queryFn`이 실행되어 `isDemoMode()` 결과가 최신 상태로 반영된다.

```ts
// ✅ 올바른 방식
import { withDemoFallback } from '@/utils/demoMode'
import { mockUsers } from '@/api/mock/settings'

queryFn: () =>
  withDemoFallback(
    mockUsers,
    async () => {
      const res = await api.get<ApiResponse<UserApiBizArea[]>>('/api/users')
      return flattenUsers(res.data.data)
    },
  ),

// ❌ 잘못된 방식
queryFn: async () => {
  const res = await api.get('/api/users')  // 데모 계정에서도 실제 API 호출
  return res.data.data
}
```

### 피처 전용 유틸 → `features/{피처}/utils.ts`
- 피처 내에서만 사용하는 유틸 함수는 해당 피처 폴더의 `utils.ts`에 둔다.
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

## 테스트 규칙

### 테스트 위치
- 테스트 파일은 대상 파일과 **나란히** 배치한다: `Foo.tsx` → `Foo.test.tsx`
- 단, 공용 인프라(setup, render helper, MSW server)는 `src/tests/`에 둔다.

### 테스트 작성 방법
- **render 헬퍼**: `@testing-library/react` 대신 `src/tests/utils.tsx`의 `render`를 사용한다.
  (QueryClient, ThemeProvider, MemoryRouter가 자동 포함됨)
- **API mocking**: MSW handler를 `src/tests/mocks/handlers/{도메인}.ts`에 추가한다.
- **MUI icons-material mock**: Windows EMFILE 방지를 위해 icons를 사용하는 컴포넌트 테스트 최상단에 추가한다.

```ts
// ✅ MUI icons 사용 컴포넌트 테스트 최상단에 필수
vi.mock('@mui/icons-material', () => ({
  DarkModeOutlined: () => null,
  LightModeOutlined: () => null,
  // ... 해당 파일에서 사용하는 아이콘만
}))
```

```tsx
// ✅ 올바른 render import
import { render, screen } from '@/tests/utils'

// ❌ 잘못된 render import
import { render } from '@testing-library/react'  // Provider 없음
```

### 테스트 실행
```bash
npm test            # 전체 테스트 1회 실행
npm run test:watch  # 파일 변경 감지 모드
```

---

## 브랜치 전략

- **`integrated-main`**: 일상 작업 브랜치. CI 없이 자유롭게 커밋/푸시한다.
- **`main`**: 배포 브랜치. 머지 시 CI(타입체크·린트·테스트) → CD(서버 자동배포) 실행.

### main 머지 전 필수 확인 (CI 통과 보장)

`integrated-main → main` PR을 올리기 전에 반드시 아래 세 명령을 순서대로 실행하고 모두 통과해야 한다.

```bash
npx tsc --noEmit   # 타입 에러 없음
npm run lint        # ESLint 에러 없음 (warning은 허용)
npm test            # 전체 테스트 통과
```

세 명령 중 하나라도 실패하면 수정 후 재확인한다. CI가 GitHub Actions에서 똑같이 실행되므로 로컬에서 통과하면 CI도 통과한다.

---

## 커밋 규칙

- 커밋 메시지 형식: `{스코프}: {변경 내용 요약}`
- 예시: `ideaBrowse: prop drilling 제거 및 인라인 테마값 토큰화`
- 작업 단위를 작게 유지하고 관련 파일을 함께 커밋한다.

---

## 체크리스트 (코드 작성/수정 시)

- [ ] 가상 데이터가 `src/api/mock/`에 있는가?
- [ ] 도메인 타입이 `src/api/types/`에 있는가?
- [ ] 색상 토큰이 `src/theme/`에 있는가? (컴포넌트 내 하드코딩 없음)
- [ ] Leaf 컴포넌트가 `isDarkMode`를 props로 받지 않고 직접 hook을 호출하는가?
- [ ] 컴포넌트 파일이 500줄 이하인가?
- [ ] 크로스 모듈 import에 `@/` alias를 사용하는가?
- [ ] `useQuery`의 `queryFn`에 `withDemoFallback`을 사용하는가?
- [ ] `npx tsc --noEmit` 통과 여부 확인했는가?
- [ ] `npm test` 통과 여부 확인했는가?
- [ ] `tsc -b && vite build` 통과 여부 확인했는가? (Vercel 배포 전 필수)
