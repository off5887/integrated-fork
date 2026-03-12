import { Applicant, Employee, Idea } from '../types/mercenary'

export const mockIdeas: Idea[] = [
  {
    id: 1,
    title: '비데 자동 살균 코팅 업그레이드',
    desc: '기존 세라믹 코팅보다 3배 강력한 항균 효과로 고객 만족도 대폭 상승',
    reward: 4500,
    field: '상품개발팀',
    remainingDays: 5,
  },
  {
    id: 2,
    title: '스마트 수전 음성인식 기능',
    desc: '물 온도·양을 음성으로 제어하는 AI 수전 개발',
    reward: 3200,
    field: 'IT개발팀',
    remainingDays: 12,
  },
  {
    id: 3,
    title: '욕실 조명 자동 밝기 조절 시스템',
    desc: '사용자 체형·시간대에 따라 최적 조명 제공',
    reward: 2800,
    field: '연구개발팀',
    remainingDays: 8,
  },
]

export const mockApplicants: Applicant[] = [
  { id: 101, name: '김민수', dept: '상품개발팀' },
  { id: 102, name: '박지은', dept: '마케팅팀' },
  { id: 103, name: '이영희', dept: '디자인팀' },
]

export const mockEmployees: Employee[] = [
  { id: 201, name: '최철수', dept: '상품개발팀', position: '수석디자이너' },
  { id: 202, name: '정수진', dept: 'IT개발팀', position: '팀장' },
  { id: 203, name: '한지훈', dept: '연구개발팀', position: '연구원' },
  { id: 204, name: '윤정근', dept: '영업팀', position: '대리' },
  { id: 205, name: '송혜린', dept: '마케팅팀', position: '과장' },
]
