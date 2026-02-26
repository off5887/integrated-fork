export interface OrgMember {
  id: string
  name: string
  position: string // 팀장, 부장, 사원 등
  department: string // 개발1팀
  division: string // 디지털전략부문
}

export interface SelectedReviewer extends OrgMember {
  level: 1 | 2 | 3
}
