import type { AwardItem, ExchangeItem } from '@/api/types/mileage'
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

// 기존 호환용
export const data = awardData
