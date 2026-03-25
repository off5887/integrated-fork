import type { UserApiBizArea, User } from '@/api/types/settings'

/** GET /api/users 응답(사업소→팀→멤버)을 평탄화된 User[]로 변환합니다. */
export function flattenUsers(data: UserApiBizArea[]): User[] {
  return (data ?? []).flatMap((biz) =>
    (biz.teams ?? []).flatMap((team) =>
      (team.members ?? []).map((m) => ({
        id: m.employeeId,
        name: m.name,
        employeeNumber: m.employeeId,
        email: m.email,
        role: m.isAdmin ? 'admin' : m.isReviewer ? 'reviewer' : 'user',
        position: m.rollNm,
        department: team.deptNm,
        businessSite: biz.bizAreaNm,
        active: m.isActive ?? true,
      } satisfies User)),
    ),
  )
}
