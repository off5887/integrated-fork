// src/api/types/idea.ts
import type { SvgIconComponent } from '@mui/icons-material'

export interface VisibilityOption {
  value: 'public' | 'private'
  icon: SvgIconComponent
  label: string
  description: string
  accentColor: string
  accentBg: string
  accentBorder: string
  accentBgDark: string
  accentBorderDark: string
}

export type CategoryOption = {
  id: string
  label: string
  description?: string
  emoji: string
  color: string
  bg: string
  border: string
  active?: boolean
}

/** GET /api/categories, /api/categories/all 응답 항목 */
export interface CategoryApiItem {
  categoryId: number
  categoryName: string
  description: string | null
  icon: string | null
  color: string | null
  displayOrder: number
  isActive: boolean
}

/** POST /api/categories, PUT /api/categories/{id} 요청 바디 */
export interface CategoryRequest {
  categoryName: string
  description?: string
  icon?: string
  color?: string
  displayOrder?: number
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0,0,0,${alpha})`
  return `rgba(${r},${g},${b},${alpha})`
}

/**
 * 이모지 ↔ ASCII 식별자 매핑
 * MySQL utf8(3바이트) 컬럼은 이모지를 저장할 수 없으므로,
 * API 전송 시 이모지를 ASCII 식별자로 변환하고 수신 시 역변환합니다.
 */
const EMOJI_TO_ICON: Record<string, string> = {
  // 아이디어
  '💡': 'lightbulb',  '🚀': 'rocket',       '💰': 'money',
  '💹': 'chart-up',   '📈': 'trending-up',  '🏆': 'trophy',
  '🎯': 'target',     '💎': 'diamond',       '🔑': 'key',
  '💼': 'briefcase',  '🏅': 'medal',         '🥇': 'gold',
  '🎖️': 'award',     '📣': 'megaphone',     '🔔': 'bell',
  // 자연/환경
  '🌿': 'plant',      '🌱': 'seedling',      '🌍': 'earth',
  '♻️': 'recycle',   '🌊': 'wave',          '⚡': 'lightning',
  '🔥': 'fire',       '🌸': 'flower',        '🍀': 'clover',
  '🌞': 'sun',        '🌻': 'sunflower',     '🌲': 'tree',
  '🌾': 'wheat',      '🐋': 'whale',         '💧': 'drop',
  // 기술/혁신
  '🤖': 'robot',      '💻': 'laptop',        '📱': 'phone',
  '🔬': 'microscope', '🔭': 'telescope',     '🔧': 'wrench',
  '⚙️': 'gear',      '🛠️': 'tools',        '🔩': 'bolt',
  '🏭': 'factory',    '📡': 'satellite',     '🧬': 'dna',
  '🧪': 'lab',        '🖥️': 'desktop',      '🖨️': 'printer',
  // 사람/복지
  '❤️': 'heart',     '🤝': 'handshake',     '👥': 'group',
  '🏥': 'hospital',   '🎁': 'gift',          '🎓': 'graduation',
  '🏠': 'house',      '😊': 'smile',         '🧘': 'yoga',
  '🤸': 'exercise',   '👨‍💼': 'worker-m',  '👩‍💼': 'worker-f',
  '🧑‍🤝‍🧑': 'couple', '🫂': 'hug',        '🙌': 'clap',
  // 안전/품질
  '🛡️': 'shield',   '✅': 'check',          '⭐': 'star',
  '🔒': 'lock',       '🚨': 'siren',         '⚠️': 'warning',
  '🏗️': 'construction', '📋': 'clipboard',   '🔍': 'search',
  '👁️': 'eye',      '🧯': 'extinguisher',   '🪖': 'helmet',
  '🦺': 'vest',       '🔐': 'locked',        '✔️': 'checkmark',
  // 기타
  '📌': 'pin',        '🎨': 'palette',        '📝': 'memo',
  '🗂️': 'folder',   '📦': 'box',            '🎲': 'dice',
  '🌈': 'rainbow',    '✨': 'sparkles',       '🏷️': 'tag',
  '📎': 'paperclip',  '🗒️': 'notepad',      '📊': 'chart',
  '📉': 'chart-down', '🖊️': 'pen',          '🎪': 'circus',
  '📁': 'folder-default',
}

const ICON_TO_EMOJI: Record<string, string> = Object.fromEntries(
  Object.entries(EMOJI_TO_ICON).map(([emoji, icon]) => [icon, emoji]),
)

/** CategoryApiItem → CategoryOption 변환 */
export function toCategoryOption(item: CategoryApiItem): CategoryOption {
  const color = item.color ?? '#6366f1'
  const emoji = item.icon ? (ICON_TO_EMOJI[item.icon] ?? item.icon) : '📁'
  return {
    id: item.categoryId.toString(),
    label: item.categoryName,
    description: item.description ?? undefined,
    emoji,
    color,
    bg: hexToRgba(color, 0.1),
    border: hexToRgba(color, 0.35),
    active: item.isActive,
  }
}

/** CategoryOption → CategoryRequest 변환 */
export function toCategoryRequest(opt: CategoryOption): CategoryRequest {
  return {
    categoryName: opt.label,
    description: opt.description,
    icon: EMOJI_TO_ICON[opt.emoji] ?? opt.emoji,
    color: opt.color,
  }
}

export type Reviewer = {
  id: number
  name: string
  dept: string
  position: string
}

export type OrgMember = {
  id: number
  employeeId: string
  name: string
  dept: string
  position: string
}

/** POST /api/ideas, PUT /api/ideas/{ideaId} 요청 바디 */
export interface IdeaCreateRequest {
  title: string
  problem: string
  description: string        // 해결 대안 (solution)
  categoryId: number
  type?: 'idea' | 'completed'
  security?: 'N' | 'Y'
  coProposerIds?: string[]   // 공동제안자 사번 목록
}

/** GET /api/ideas, GET /api/ideas/{id}, GET /api/ideas/my 응답의 단일 아이디어 */
export interface IdeaApiItem {
  ideaId: number
  title: string
  problem: string
  description: string
  categoryId: number
  categoryName: string
  type: 'idea' | 'completed'
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed'
  security: 'N' | 'Y'
  submittedBy: string       // 사번(employeeId)
  author?: string           // 작성자 이름
  bizArea?: string          // 사업소
  department?: string       // 부서
  deptCd?: string           // 부서 코드
  mileagePoints: number
  submitDate: string
  createdAt: string
  updatedAt?: string
  category?: { categoryId: number; categoryName: string }
  coProposers: { employeeId: string; name: string; rollNm: string }[]
  // 목록 및 단건 조회 공통 반환 필드
  viewCount?: number
  likeCount?: number
  commentCount?: number
  isLiked?: boolean
  // 배정된 심사자 (없으면 null)
  approverId?: string | null
  approverName?: string | null
  // 단건 조회 전용 — 본인 아이디어일 때만 존재
  executors?: IdeaExecutor[] | null
  attachments?: IdeaAttachment[]
}

/** 첨부파일 항목 (생성/수정/단건조회 응답 공통) */
export interface IdeaAttachment {
  attachmentId: number
  originalName: string
  fileSize: number        // bytes
  contentType: string
  createdAt: string
}

/** GET /api/ideas/{id}/executors 항목 */
export interface IdeaExecutor {
  executorId: number
  scheduleDate: string
  content: string
  expectedResult: string
}

/** POST /api/ideas/{id}/executors, PUT /api/ideas/{id}/executors/{executorId} 요청 바디 */
export interface IdeaExecutorRequest {
  scheduleDate: string
  content: string
  expectedResult: string
}

/** GET /api/ideas/{id} 응답에 추가되는 상세 필드 */
export interface IdeaDetailExtras {
  viewCount: number
  likeCount: number
  commentCount: number
  isLiked: boolean
  approverId: string | null
  approverName: string | null
  executors: IdeaExecutor[] | null   // 본인 아이디어일 때만 존재, 타인은 null
  coProposers: { employeeId: string; name: string; rollNm: string }[]
  attachments: IdeaAttachment[]
}

/** PATCH /api/ideas/{id}/review 요청 바디 (관리자/심사자) */
export interface IdeaReviewRequest {
  status: 'approved' | 'rejected'
  reason?: string
  scoreInnovation?: number
  scoreFeasibility?: number
  scoreProfitability?: number
  mileage?: number
}

/** GET /api/ideas/{ideaId}/comments 단일 댓글 */
export interface IdeaApiComment {
  commentId: number
  ideaId: number
  employeeId: string
  name: string
  rollNm: string
  content: string
  createdAt: string
  updatedAt: string | null
}

/** GET /api/ideas/{ideaId}/comments 페이지 응답 */
export interface IdeaCommentsPage {
  content: IdeaApiComment[]
  totalElements: number
  totalPages: number
  last: boolean
}

/** GET /api/ideas/my 응답 페이지 */
export interface MyIdeasPage {
  content: IdeaApiItem[]
  pageable: { pageNumber: number; pageSize: number }
  totalElements: number
  totalPages: number
  last: boolean
}

export type OrgTeam = {
  id: string
  name: string
  members: OrgMember[]
}

export type OrgDivision = {
  id: string
  name: string
  teams: OrgTeam[]
}

export interface DraftData {
  ideaType: 'idea' | 'complete'
  title: string
  categories: string[]
  problem: string
  solution: string
  reviewer: string[]
  coProposers: string[]
  security: 'public' | 'private'
  plan: string
  startDate: string
  endDate: string
  expectedOutcome: string
  savedAt: string
}