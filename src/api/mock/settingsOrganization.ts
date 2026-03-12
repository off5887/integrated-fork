import { OrgMember } from '@/api/types/reviewer'

export const mockOrganization: OrgMember[] = [
  // 디지털전략부문
  {
    id: '1',
    name: '김개발',
    position: '개발팀장',
    department: '개발1팀',
    division: '디지털전략부문',
  },
  {
    id: '2',
    name: '이코딩',
    position: '수석개발자',
    department: '개발1팀',
    division: '디지털전략부문',
  },
  {
    id: '3',
    name: '박프론트',
    position: '프론트엔드',
    department: '개발1팀',
    division: '디지털전략부문',
  },
  {
    id: '4',
    name: '최기획',
    position: '기획팀장',
    department: '기획팀',
    division: '디지털전략부문',
  },
  {
    id: '5',
    name: '정디자인',
    position: '디자이너',
    department: '기획팀',
    division: '디지털전략부문',
  },

  // 영업부문
  {
    id: '6',
    name: '윤영업',
    position: '영업팀장',
    department: '영업1팀',
    division: '영업부문',
  },
  {
    id: '7',
    name: '송세일',
    position: '영업사원',
    department: '영업1팀',
    division: '영업부문',
  },
  {
    id: '8',
    name: '한마케팅',
    position: '마케팅팀장',
    department: '마케팅팀',
    division: '영업부문',
  },

  // 경영지원부문
  {
    id: '9',
    name: '오인사',
    position: '인사팀장',
    department: '인사팀',
    division: '경영지원부문',
  },
  {
    id: '10',
    name: '백재무',
    position: '재무팀장',
    department: '재무팀',
    division: '경영지원부문',
  },
  {
    id: '11',
    name: '남총무',
    position: '총무',
    department: '총무팀',
    division: '경영지원부문',
  },

  // 더 많은 데이터 (실제로는 axios로 불러올 예정)
  {
    id: '12',
    name: '서부문장',
    position: '부문장',
    department: '전략기획실',
    division: '디지털전략부문',
  },
  {
    id: '13',
    name: '장임원',
    position: '상무',
    department: '경영지원부문',
    division: '경영지원부문',
  },
]
