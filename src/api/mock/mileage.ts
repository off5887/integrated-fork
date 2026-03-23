import type { AdminExchangeItem, AwardItem, ExchangeItem, UserAwardItem } from '@/api/types/mileage'
import type { SpecialMileageHistory } from '@/api/types/settings'

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
  { id: 1,  requestDate: '2026-03-20', name: '홍길동', department: '개발1팀',    position: '대리', employeeNumber: 'EMP001', amount: 150, cashAmount: 15000, status: '신청중' },
  { id: 2,  requestDate: '2026-03-18', name: '김영희', department: '기획팀',     position: '과장', employeeNumber: 'EMP002', amount: 80,  cashAmount: 8000,  status: '신청중' },
  { id: 3,  requestDate: '2026-03-15', name: '이철수', department: '경영지원팀', position: '부장', employeeNumber: 'EMP003', amount: 200, cashAmount: 20000, status: '완료' },
  { id: 4,  requestDate: '2026-03-12', name: '박지수', department: '개발2팀',    position: '사원', employeeNumber: 'EMP004', amount: 50,  cashAmount: 5000,  status: '완료' },
  { id: 5,  requestDate: '2026-03-10', name: '최민준', department: '디자인팀',   position: '대리', employeeNumber: 'EMP005', amount: 120, cashAmount: 12000, status: '신청중' },
  { id: 6,  requestDate: '2026-03-08', name: '정수현', department: '개발1팀',    position: '사원', employeeNumber: 'EMP006', amount: 30,  cashAmount: 3000,  status: '반려' },
  { id: 7,  requestDate: '2026-03-05', name: '오세훈', department: '영업팀',     position: '과장', employeeNumber: 'EMP007', amount: 300, cashAmount: 30000, status: '신청중' },
  { id: 8,  requestDate: '2026-02-28', name: '윤미래', department: '인사팀',     position: '대리', employeeNumber: 'EMP008', amount: 70,  cashAmount: 7000,  status: '완료' },
  { id: 9,  requestDate: '2026-02-25', name: '강동원', department: '개발2팀',    position: '사원', employeeNumber: 'EMP009', amount: 45,  cashAmount: 4500,  status: '신청중' },
  { id: 10, requestDate: '2026-02-20', name: '임수진', department: '기획팀',     position: '사원', employeeNumber: 'EMP010', amount: 60,  cashAmount: 6000,  status: '완료' },
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
  EMP005: [
    { id: 1, awardedAt: '2026-03-10', ideaTitle: 'UI/UX 개선 제안', reason: '제안 채택', fish: 90 },
    { id: 2, awardedAt: '2026-02-25', ideaTitle: '디자인 시스템 구축', reason: '실행 완료', fish: 150 },
    { id: 3, awardedAt: '2026-02-10', ideaTitle: '프로토타입 제작 프로세스 개선', reason: '팀 기여', fish: 40 },
    { id: 4, awardedAt: '2026-01-28', ideaTitle: '사용성 테스트 자동화', reason: '아이디어 등록', fish: 20 },
    { id: 5, awardedAt: '2026-01-15', ideaTitle: '인터랙션 가이드라인 수립', reason: '부문장 결재', fish: 70 },
    { id: 6, awardedAt: '2025-12-20', ideaTitle: '다크모드 지원 확대', reason: '제안 채택', fish: 50 },
    { id: 7, awardedAt: '2025-12-05', ideaTitle: '접근성 개선 프로젝트', reason: '팀 기여', fish: 30 },
  ],
  EMP007: [
    { id: 1, awardedAt: '2026-03-08', ideaTitle: '영업 CRM 시스템 고도화', reason: '실행 완료', fish: 200 },
    { id: 2, awardedAt: '2026-02-22', ideaTitle: '파트너사 협업 프로세스 개선', reason: '제안 채택', fish: 80 },
    { id: 3, awardedAt: '2026-02-05', ideaTitle: '영업 보고 자동화', reason: '팀 기여', fish: 60 },
    { id: 4, awardedAt: '2026-01-18', ideaTitle: '고객 세분화 전략 수립', reason: '부문장 결재', fish: 100 },
    { id: 5, awardedAt: '2026-01-05', ideaTitle: '리드 관리 프로세스 재설계', reason: '아이디어 등록', fish: 20 },
    { id: 6, awardedAt: '2025-12-15', ideaTitle: '영업 교육 플랫폼 도입', reason: '제안 채택', fish: 70 },
  ],
  EMP009: [
    { id: 1, awardedAt: '2026-02-22', ideaTitle: '코드 리뷰 자동화 도구 도입', reason: '실행 완료', fish: 90 },
    { id: 2, awardedAt: '2026-02-08', ideaTitle: 'CI/CD 파이프라인 개선', reason: '제안 채택', fish: 60 },
    { id: 3, awardedAt: '2026-01-20', ideaTitle: '테스트 커버리지 향상 계획', reason: '팀 기여', fish: 30 },
    { id: 4, awardedAt: '2026-01-08', ideaTitle: '기술 부채 해소 로드맵', reason: '아이디어 등록', fish: 20 },
    { id: 5, awardedAt: '2025-12-22', ideaTitle: '개발 환경 표준화', reason: '부문장 결재', fish: 50 },
  ],
}

// 기존 호환용
export const data = awardData
