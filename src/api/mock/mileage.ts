import type { AdminExchangeItem, AwardItem, ExchangeItem, MileageRecord, MileageSummary, UserAwardItem, WithdrawalRecord } from '@/api/types/mileage'
import type { SpecialMileageHistory } from '@/api/types/settings'

// ─── 마일리지 요약 ──────────────────────────────────────────────────────────────
export const mockMileageSummary: MileageSummary = {
  totalMileage:        280,
  pendingMileage:       30,
  availableMileage:    250,
  thisMonthMileage:     30,
  thisMonthWithdrawal:  30,
}

// ─── 내 마일리지 수상내역 (MileageRecord 형태) ─────────────────────────────────
export const mockMyMileageRecords: MileageRecord[] = [
  { mileageId: 1,  employeeId: 'DEV001', ideaId: 101, ideaTitle: '사내 개발 환경 개선 제안',   ideaScore: 85, points: 50,  type: 'idea',    reason: '제안 채택',    awardedBy: null, awardDate: '2026-01-15T00:00:00' },
  { mileageId: 2,  employeeId: 'DEV001', ideaId: 102, ideaTitle: '업무 자동화 아이디어',        ideaScore: 90, points: 100, type: 'idea',    reason: '실행 완료',    awardedBy: null, awardDate: '2026-01-20T00:00:00' },
  { mileageId: 3,  employeeId: 'DEV001', ideaId: 103, ideaTitle: '고객 응대 프로세스 개선',     ideaScore: 75, points: 30,  type: 'idea',    reason: '팀 기여',      awardedBy: null, awardDate: '2026-02-05T00:00:00' },
  { mileageId: 4,  employeeId: 'DEV001', ideaId: 104, ideaTitle: '비용 절감 방안',             ideaScore: 70, points: 20,  type: 'idea',    reason: '아이디어 등록', awardedBy: null, awardDate: '2026-02-10T00:00:00' },
  { mileageId: 5,  employeeId: 'DEV001', ideaId: 105, ideaTitle: '물류 최적화 아이디어',        ideaScore: 92, points: 80,  type: 'idea',    reason: '부문장 결재',  awardedBy: null, awardDate: '2026-02-12T00:00:00' },
  { mileageId: 6,  employeeId: 'DEV001', ideaId: 106, ideaTitle: '마케팅 채널 다변화 방안',     ideaScore: 80, points: 60,  type: 'idea',    reason: '실행 요청',    awardedBy: null, awardDate: '2026-02-15T00:00:00' },
  { mileageId: 7,  employeeId: 'DEV001', ideaId: 107, ideaTitle: '사내 교육 프로그램 개선',     ideaScore: 78, points: 40,  type: 'idea',    reason: '팀장 검토',    awardedBy: null, awardDate: '2026-02-18T00:00:00' },
  { mileageId: 8,  employeeId: 'DEV001', ideaId: 108, ideaTitle: '에너지 절약 아이디어',        ideaScore: 88, points: 50,  type: 'idea',    reason: '제안 채택',    awardedBy: null, awardDate: '2026-02-20T00:00:00' },
  { mileageId: 9,  employeeId: 'DEV001', ideaId: 109, ideaTitle: '데이터 분석 기반 의사결정',   ideaScore: 95, points: 100, type: 'idea',    reason: '실행 완료',    awardedBy: null, awardDate: '2026-02-25T00:00:00' },
  { mileageId: 10, employeeId: 'DEV001', ideaId: null, ideaTitle: null, ideaScore: null,        points: 30,  type: 'special', reason: '프로젝트 우수 기여', awardedBy: 'DEV001', awardDate: '2026-03-01T00:00:00' },
]

// ─── 내 환전 신청내역 (WithdrawalRecord 형태) ─────────────────────────────────
export const mockMyWithdrawalRecords: WithdrawalRecord[] = [
  { withdrawalId: 1, employeeId: 'DEV001', requestPoints: 180, cashAmount: 18000, status: 'approved', adminComment: null, processedBy: 'ADMIN001', requestDate: '2026-01-25T00:00:00', processedDate: '2026-01-26T00:00:00', createdAt: '2026-01-25T00:00:00' },
  { withdrawalId: 2, employeeId: 'DEV001', requestPoints: 70,  cashAmount: 7000,  status: 'approved', adminComment: null, processedBy: 'ADMIN001', requestDate: '2026-02-28T00:00:00', processedDate: '2026-03-01T00:00:00', createdAt: '2026-02-28T00:00:00' },
  { withdrawalId: 3, employeeId: 'DEV001', requestPoints: 30,  cashAmount: 3000,  status: 'pending',  adminComment: null, processedBy: null,       requestDate: '2026-03-05T00:00:00', processedDate: null,                  createdAt: '2026-03-05T00:00:00' },
]

// ─── 관리자용 전체 마일리지 내역 (특별 포함) ────────────────────────────────────
export const mockAllMileageRecords: MileageRecord[] = [
  { mileageId: 101, employeeId: 'DEV001',  ideaId: null, ideaTitle: null, ideaScore: null, points: 50,  type: 'special', reason: '프로젝트 우수 기여',       awardedBy: 'ADMIN001', awardDate: '2026-03-15T00:00:00' },
  { mileageId: 102, employeeId: 'PLAN001', ideaId: null, ideaTitle: null, ideaScore: null, points: 30,  type: 'special', reason: '고객 만족도 향상 기여',     awardedBy: 'ADMIN001', awardDate: '2026-03-15T00:00:00' },
  { mileageId: 103, employeeId: 'EXE001',  ideaId: null, ideaTitle: null, ideaScore: null, points: 100, type: 'special', reason: '연간 성과 우수',           awardedBy: 'ADMIN001', awardDate: '2026-03-10T00:00:00' },
  { mileageId: 104, employeeId: 'DEV002',  ideaId: null, ideaTitle: null, ideaScore: null, points: 20,  type: 'special', reason: '아이디어 채택',            awardedBy: 'ADMIN001', awardDate: '2026-03-10T00:00:00' },
  { mileageId: 105, employeeId: 'PLAN002', ideaId: null, ideaTitle: null, ideaScore: null, points: 40,  type: 'special', reason: '신규 서비스 론칭 기여',     awardedBy: 'ADMIN001', awardDate: '2026-02-28T00:00:00' },
  { mileageId: 106, employeeId: 'DEV003',  ideaId: null, ideaTitle: null, ideaScore: null, points: 25,  type: 'special', reason: '버그 집중 수정 기여',       awardedBy: 'ADMIN001', awardDate: '2026-02-20T00:00:00' },
  { mileageId: 107, employeeId: 'SALE001', ideaId: null, ideaTitle: null, ideaScore: null, points: 60,  type: 'special', reason: '분기 매출 목표 초과 달성',  awardedBy: 'ADMIN001', awardDate: '2026-02-15T00:00:00' },
  { mileageId: 108, employeeId: 'HR001',   ideaId: null, ideaTitle: null, ideaScore: null, points: 35,  type: 'special', reason: '신규 입사자 온보딩 지원',   awardedBy: 'ADMIN001', awardDate: '2026-02-10T00:00:00' },
  { mileageId: 109, employeeId: 'SALE002', ideaId: null, ideaTitle: null, ideaScore: null, points: 45,  type: 'special', reason: '코드 리뷰 문화 정착 기여',  awardedBy: 'ADMIN001', awardDate: '2026-01-30T00:00:00' },
  { mileageId: 110, employeeId: 'MKT001',  ideaId: null, ideaTitle: null, ideaScore: null, points: 15,  type: 'special', reason: '사용자 조사 보고서 작성',   awardedBy: 'ADMIN001', awardDate: '2026-01-20T00:00:00' },
  { mileageId: 111, employeeId: 'STR001',  ideaId: null, ideaTitle: null, ideaScore: null, points: 80,  type: 'special', reason: '디자인 시스템 구축 완료',   awardedBy: 'ADMIN001', awardDate: '2026-01-10T00:00:00' },
]

// ─── 관리자용 전체 환전 신청내역 ──────────────────────────────────────────────
export const mockAllWithdrawalRecords: WithdrawalRecord[] = [
  { withdrawalId: 1,  employeeId: 'DEV001',  requestPoints: 150, cashAmount: 15000, status: 'pending',  adminComment: null,        processedBy: null,       requestDate: '2026-03-20T00:00:00', processedDate: null,                  createdAt: '2026-03-20T00:00:00' },
  { withdrawalId: 2,  employeeId: 'PLAN001', requestPoints: 80,  cashAmount: 8000,  status: 'pending',  adminComment: null,        processedBy: null,       requestDate: '2026-03-18T00:00:00', processedDate: null,                  createdAt: '2026-03-18T00:00:00' },
  { withdrawalId: 3,  employeeId: 'EXE001',  requestPoints: 200, cashAmount: 20000, status: 'approved', adminComment: null,        processedBy: 'ADMIN001', requestDate: '2026-03-15T00:00:00', processedDate: '2026-03-16T00:00:00', createdAt: '2026-03-15T00:00:00' },
  { withdrawalId: 4,  employeeId: 'DEV002',  requestPoints: 50,  cashAmount: 5000,  status: 'approved', adminComment: null,        processedBy: 'ADMIN001', requestDate: '2026-03-12T00:00:00', processedDate: '2026-03-13T00:00:00', createdAt: '2026-03-12T00:00:00' },
  { withdrawalId: 5,  employeeId: 'PLAN002', requestPoints: 120, cashAmount: 12000, status: 'pending',  adminComment: null,        processedBy: null,       requestDate: '2026-03-10T00:00:00', processedDate: null,                  createdAt: '2026-03-10T00:00:00' },
  { withdrawalId: 6,  employeeId: 'DEV003',  requestPoints: 30,  cashAmount: 3000,  status: 'rejected', adminComment: '잔액 부족', processedBy: 'ADMIN001', requestDate: '2026-03-08T00:00:00', processedDate: '2026-03-09T00:00:00', createdAt: '2026-03-08T00:00:00' },
  { withdrawalId: 7,  employeeId: 'SALE001', requestPoints: 300, cashAmount: 30000, status: 'pending',  adminComment: null,        processedBy: null,       requestDate: '2026-03-05T00:00:00', processedDate: null,                  createdAt: '2026-03-05T00:00:00' },
  { withdrawalId: 8,  employeeId: 'HR001',   requestPoints: 70,  cashAmount: 7000,  status: 'approved', adminComment: null,        processedBy: 'ADMIN001', requestDate: '2026-02-28T00:00:00', processedDate: '2026-03-01T00:00:00', createdAt: '2026-02-28T00:00:00' },
  { withdrawalId: 9,  employeeId: 'SALE002', requestPoints: 45,  cashAmount: 4500,  status: 'pending',  adminComment: null,        processedBy: null,       requestDate: '2026-02-25T00:00:00', processedDate: null,                  createdAt: '2026-02-25T00:00:00' },
  { withdrawalId: 10, employeeId: 'MKT001',  requestPoints: 60,  cashAmount: 6000,  status: 'approved', adminComment: null,        processedBy: 'ADMIN001', requestDate: '2026-02-20T00:00:00', processedDate: '2026-02-21T00:00:00', createdAt: '2026-02-20T00:00:00' },
]

// ─── 사용자별 마일리지 수령내역 (ID 기준) ──────────────────────────────────────
// 데모 모드에서 useUserMileages(employeeId) 에 대한 mock
export const mockUserMileageRecordsMap: Record<string, MileageRecord[]> = {
  DEV001: [
    { mileageId: 1, employeeId: 'DEV001', ideaId: 201, ideaTitle: '사내 개발 환경 개선 제안',  ideaScore: 88, points: 80,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-03-18T00:00:00' },
    { mileageId: 2, employeeId: 'DEV001', ideaId: 202, ideaTitle: '업무 자동화 아이디어',       ideaScore: 92, points: 120, type: 'idea',    reason: '실행 완료',    awardedBy: null,       awardDate: '2026-03-05T00:00:00' },
    { mileageId: 3, employeeId: 'DEV001', ideaId: null, ideaTitle: null, ideaScore: null,        points: 50,  type: 'special', reason: '팀 기여',      awardedBy: 'ADMIN001', awardDate: '2026-02-20T00:00:00' },
    { mileageId: 4, employeeId: 'DEV001', ideaId: 203, ideaTitle: '비용 절감 방안',             ideaScore: 72, points: 20,  type: 'idea',    reason: '아이디어 등록', awardedBy: null,       awardDate: '2026-02-08T00:00:00' },
    { mileageId: 5, employeeId: 'DEV001', ideaId: 204, ideaTitle: '물류 최적화 아이디어',       ideaScore: 95, points: 100, type: 'idea',    reason: '부문장 결재',  awardedBy: null,       awardDate: '2026-01-25T00:00:00' },
    { mileageId: 6, employeeId: 'DEV001', ideaId: 205, ideaTitle: '마케팅 채널 다변화 방안',    ideaScore: 80, points: 60,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-01-10T00:00:00' },
  ],
  PLAN001: [
    { mileageId: 11, employeeId: 'PLAN001', ideaId: 301, ideaTitle: '고객 응대 프로세스 개선',   ideaScore: 90, points: 100, type: 'idea',    reason: '실행 완료',    awardedBy: null,       awardDate: '2026-03-15T00:00:00' },
    { mileageId: 12, employeeId: 'PLAN001', ideaId: 302, ideaTitle: '신규 서비스 기획 아이디어', ideaScore: 85, points: 60,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-03-01T00:00:00' },
    { mileageId: 13, employeeId: 'PLAN001', ideaId: null, ideaTitle: null, ideaScore: null,        points: 40,  type: 'special', reason: '팀 기여',      awardedBy: 'ADMIN001', awardDate: '2026-02-14T00:00:00' },
    { mileageId: 14, employeeId: 'PLAN001', ideaId: 303, ideaTitle: '데이터 기반 의사결정 체계', ideaScore: 93, points: 80,  type: 'idea',    reason: '부문장 결재',  awardedBy: null,       awardDate: '2026-01-30T00:00:00' },
    { mileageId: 15, employeeId: 'PLAN001', ideaId: 304, ideaTitle: '에너지 절약 아이디어',      ideaScore: 70, points: 20,  type: 'idea',    reason: '아이디어 등록', awardedBy: null,       awardDate: '2026-01-12T00:00:00' },
  ],
  PLAN002: [
    { mileageId: 21, employeeId: 'PLAN002', ideaId: 401, ideaTitle: '사내 교육 프로그램 개선',   ideaScore: 87, points: 90,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-03-10T00:00:00' },
    { mileageId: 22, employeeId: 'PLAN002', ideaId: null, ideaTitle: null, ideaScore: null,        points: 150, type: 'special', reason: '신규 서비스 론칭 기여', awardedBy: 'ADMIN001', awardDate: '2026-02-25T00:00:00' },
    { mileageId: 23, employeeId: 'PLAN002', ideaId: 402, ideaTitle: '재고 관리 자동화',           ideaScore: 76, points: 40,  type: 'idea',    reason: '팀 기여',      awardedBy: null,       awardDate: '2026-02-10T00:00:00' },
    { mileageId: 24, employeeId: 'PLAN002', ideaId: 403, ideaTitle: '고객 피드백 수집 개선',      ideaScore: 71, points: 20,  type: 'idea',    reason: '아이디어 등록', awardedBy: null,       awardDate: '2026-01-28T00:00:00' },
    { mileageId: 25, employeeId: 'PLAN002', ideaId: 404, ideaTitle: '브랜드 인지도 향상 방안',    ideaScore: 84, points: 70,  type: 'idea',    reason: '부문장 결재',  awardedBy: null,       awardDate: '2026-01-15T00:00:00' },
  ],
  SALE001: [
    { mileageId: 31, employeeId: 'SALE001', ideaId: 501, ideaTitle: '영업 프로세스 디지털화',    ideaScore: 96, points: 200, type: 'idea',    reason: '실행 완료',    awardedBy: null,       awardDate: '2026-03-08T00:00:00' },
    { mileageId: 32, employeeId: 'SALE001', ideaId: 502, ideaTitle: '고객 관계 강화 전략',        ideaScore: 82, points: 80,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-02-22T00:00:00' },
    { mileageId: 33, employeeId: 'SALE001', ideaId: null, ideaTitle: null, ideaScore: null,        points: 60,  type: 'special', reason: '분기 매출 목표 초과 달성', awardedBy: 'ADMIN001', awardDate: '2026-02-05T00:00:00' },
    { mileageId: 34, employeeId: 'SALE001', ideaId: 503, ideaTitle: '파트너사 협업 강화 방안',    ideaScore: 89, points: 100, type: 'idea',    reason: '부문장 결재',  awardedBy: null,       awardDate: '2026-01-18T00:00:00' },
  ],
  SALE002: [
    { mileageId: 41, employeeId: 'SALE002', ideaId: 601, ideaTitle: '온라인 판매 채널 확대',      ideaScore: 88, points: 90,  type: 'idea',    reason: '실행 완료',    awardedBy: null,       awardDate: '2026-02-22T00:00:00' },
    { mileageId: 42, employeeId: 'SALE002', ideaId: 602, ideaTitle: '고객 만족도 향상 방안',      ideaScore: 79, points: 60,  type: 'idea',    reason: '제안 채택',    awardedBy: null,       awardDate: '2026-02-08T00:00:00' },
    { mileageId: 43, employeeId: 'SALE002', ideaId: 603, ideaTitle: '물류 비용 절감 아이디어',    ideaScore: 74, points: 30,  type: 'idea',    reason: '팀 기여',      awardedBy: null,       awardDate: '2026-01-20T00:00:00' },
    { mileageId: 44, employeeId: 'SALE002', ideaId: 604, ideaTitle: '신규 거래처 발굴 전략',      ideaScore: 68, points: 20,  type: 'idea',    reason: '아이디어 등록', awardedBy: null,       awardDate: '2026-01-08T00:00:00' },
  ],
}

// ─── 기존 호환용 (컴포넌트 전환 전까지 유지) ─────────────────────────────────

export const specialMileageHistoryData: SpecialMileageHistory[] = [
  { id: 1,  grantedAt: '2026-03-15', name: '홍길동', department: '개발1팀',    position: '대리', employeeNumber: 'EMP001', mileage: 50,  reason: '프로젝트 우수 기여' },
  { id: 2,  grantedAt: '2026-03-15', name: '김영희', department: '기획팀',     position: '과장', employeeNumber: 'EMP002', mileage: 30,  reason: '고객 만족도 향상 기여' },
  { id: 3,  grantedAt: '2026-03-10', name: '이철수', department: '경영지원팀', position: '부장', employeeNumber: 'EMP003', mileage: 100, reason: '연간 성과 우수' },
  { id: 4,  grantedAt: '2026-03-10', name: '박지수', department: '개발2팀',    position: '사원', employeeNumber: 'EMP004', mileage: 20,  reason: '아이디어 채택' },
  { id: 5,  grantedAt: '2026-02-28', name: '최민준', department: '디자인팀',   position: '대리', employeeNumber: 'EMP005', mileage: 40,  reason: '신규 서비스 론칭 기여' },
  { id: 6,  grantedAt: '2026-02-20', name: '정수현', department: '개발1팀',    position: '사원', employeeNumber: 'EMP006', mileage: 25,  reason: '버그 집중 수정 기여' },
  { id: 7,  grantedAt: '2026-02-15', name: '오세훈', department: '영업팀',     position: '과장', employeeNumber: 'EMP007', mileage: 60,  reason: '분기 매출 목표 초과 달성' },
  { id: 8,  grantedAt: '2026-02-10', name: '윤미래', department: '인사팀',     position: '대리', employeeNumber: 'EMP008', mileage: 35,  reason: '신규 입사자 온보딩 지원' },
  { id: 9,  grantedAt: '2026-01-30', name: '강동원', department: '개발2팀',    position: '사원', employeeNumber: 'EMP009', mileage: 45,  reason: '코드 리뷰 문화 정착 기여' },
  { id: 10, grantedAt: '2026-01-20', name: '임수진', department: '기획팀',     position: '사원', employeeNumber: 'EMP010', mileage: 15,  reason: '사용자 조사 보고서 작성' },
  { id: 11, grantedAt: '2026-01-10', name: '한지민', department: '디자인팀',   position: '부장', employeeNumber: 'EMP011', mileage: 80,  reason: '디자인 시스템 구축 완료' },
]

// 마일리지 수상내역
export const awardData: AwardItem[] = [
  { id: 1,  paymentDate: '2026-01-15', detail: '제안 채택',    fish: 50,  status: '미전환',    score: 78 },
  { id: 2,  paymentDate: '2026-01-20', detail: '실행 완료',    fish: 100, status: '전환완료',  score: 92 },
  { id: 3,  paymentDate: '2026-02-05', detail: '팀 기여',      fish: 30,  status: '전환요청중', score: 65 },
  { id: 4,  paymentDate: '2026-02-10', detail: '아이디어 등록', fish: 20,  status: '미전환',    score: 55 },
  { id: 5,  paymentDate: '2026-02-12', detail: '부문장 결재',  fish: 80,  status: '전환완료',  score: 88 },
  { id: 6,  paymentDate: '2026-02-15', detail: '실행 요청',    fish: 60,  status: '미전환',    score: 74 },
  { id: 7,  paymentDate: '2026-02-18', detail: '팀장 검토',    fish: 40,  status: '전환요청중', score: 69 },
  { id: 8,  paymentDate: '2026-02-20', detail: '제안 채택',    fish: 50,  status: '미전환',    score: 81 },
  { id: 9,  paymentDate: '2026-02-25', detail: '실행 완료',    fish: 100, status: '전환완료',  score: 95 },
  { id: 10, paymentDate: '2026-03-01', detail: '팀 기여',      fish: 30,  status: '전환요청중', score: 62 },
]

// 환전 신청내역
export const exchangeData: ExchangeItem[] = [
  { id: 1, requestDate: '2026-01-25', amount: 180, cashAmount: 18000, status: '완료' },
  { id: 2, requestDate: '2026-02-28', amount: 70,  cashAmount: 7000,  status: '완료' },
  { id: 3, requestDate: '2026-03-05', amount: 30,  cashAmount: 3000,  status: '신청중' },
]

// 관리자용 전체 현금전환 신청 내역
export const adminExchangeData: AdminExchangeItem[] = [
  { id: 1,  employeeId: 'DEV001',  requestDate: '2026-03-20', name: '홍길동', department: '개발1팀',    position: '대리', employeeNumber: 'EMP001', amount: 150, cashAmount: 15000, status: '신청중' },
  { id: 2,  employeeId: 'PLAN001', requestDate: '2026-03-18', name: '김영희', department: '기획팀',     position: '과장', employeeNumber: 'EMP002', amount: 80,  cashAmount: 8000,  status: '신청중' },
  { id: 3,  employeeId: 'EXE001',  requestDate: '2026-03-15', name: '이철수', department: '경영지원팀', position: '부장', employeeNumber: 'EMP003', amount: 200, cashAmount: 20000, status: '완료' },
  { id: 4,  employeeId: 'DEV002',  requestDate: '2026-03-12', name: '박지수', department: '개발2팀',    position: '사원', employeeNumber: 'EMP004', amount: 50,  cashAmount: 5000,  status: '완료' },
  { id: 5,  employeeId: 'PLAN002', requestDate: '2026-03-10', name: '최민준', department: '디자인팀',   position: '대리', employeeNumber: 'EMP005', amount: 120, cashAmount: 12000, status: '신청중' },
  { id: 6,  employeeId: 'DEV003',  requestDate: '2026-03-08', name: '정수현', department: '개발1팀',    position: '사원', employeeNumber: 'EMP006', amount: 30,  cashAmount: 3000,  status: '반려' },
  { id: 7,  employeeId: 'SALE001', requestDate: '2026-03-05', name: '오세훈', department: '영업팀',     position: '과장', employeeNumber: 'EMP007', amount: 300, cashAmount: 30000, status: '신청중' },
  { id: 8,  employeeId: 'HR001',   requestDate: '2026-02-28', name: '윤미래', department: '인사팀',     position: '대리', employeeNumber: 'EMP008', amount: 70,  cashAmount: 7000,  status: '완료' },
  { id: 9,  employeeId: 'SALE002', requestDate: '2026-02-25', name: '강동원', department: '개발2팀',    position: '사원', employeeNumber: 'EMP009', amount: 45,  cashAmount: 4500,  status: '신청중' },
  { id: 10, employeeId: 'MKT001',  requestDate: '2026-02-20', name: '임수진', department: '기획팀',     position: '사원', employeeNumber: 'EMP010', amount: 60,  cashAmount: 6000,  status: '완료' },
]

// 사용자별 마일리지 수령 내역 (사원번호 → 아이디어 수상 이력)
export const userAwardMap: Record<string, UserAwardItem[]> = {
  EMP001: [
    { id: 1, awardedAt: '2026-03-18', ideaTitle: '스마트 재고 관리 시스템 도입', reason: '제안 채택', fish: 80 },
    { id: 2, awardedAt: '2026-03-05', ideaTitle: '고객 응대 프로세스 개선', reason: '실행 완료', fish: 120 },
    { id: 3, awardedAt: '2026-02-20', ideaTitle: '사내 교육 플랫폼 구축', reason: '팀 기여', fish: 50 },
    { id: 4, awardedAt: '2026-02-08', ideaTitle: '에너지 절감 캠페인', reason: '아이디어 등록', fish: 20 },
    { id: 5, awardedAt: '2026-01-25', ideaTitle: '사용자 피드백 수집 자동화', reason: '부문장 결재', fish: 100 },
    { id: 6, awardedAt: '2026-01-10', ideaTitle: '회의 효율화 제안', reason: '제안 채택', fish: 60 },
  ],
  EMP002: [
    { id: 1, awardedAt: '2026-03-15', ideaTitle: '고객 온보딩 프로세스 개선', reason: '실행 완료', fish: 100 },
    { id: 2, awardedAt: '2026-03-01', ideaTitle: '마케팅 자동화 툴 도입', reason: '제안 채택', fish: 60 },
    { id: 3, awardedAt: '2026-02-14', ideaTitle: '브랜드 가이드라인 정비', reason: '팀 기여', fish: 40 },
    { id: 4, awardedAt: '2026-01-30', ideaTitle: '데이터 기반 의사결정 체계 수립', reason: '부문장 결재', fish: 80 },
    { id: 5, awardedAt: '2026-01-12', ideaTitle: 'SNS 채널 통합 관리', reason: '아이디어 등록', fish: 20 },
  ],
}

// 기존 호환용
export const data = awardData
