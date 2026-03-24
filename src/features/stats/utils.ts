// src/features/stats/utils.ts
import type { PersonStats, PersonStatsRow, TeamStats, TeamStatsRow } from '@/api/types/stats'

// ── 개인 집계 ─────────────────────────────────────────────────────────────────
export function aggregatePersonStats(records: PersonStats[]): PersonStatsRow[] {
  const groups = new Map<number, PersonStats[]>()
  records.forEach((r) => {
    if (!groups.has(r.id)) groups.set(r.id, [])
    groups.get(r.id)!.push(r)
  })

  return Array.from(groups.values()).map((rows) => {
    const first = rows[0]
    return {
      id:             first.id,
      name:           first.name,
      department:     first.department,
      position:       first.position,
      totalPosts:     rows.reduce((s, r) => s + r.totalPosts, 0),
      comments:       rows.reduce((s, r) => s + r.comments, 0),
      ideaCount:      rows.reduce((s, r) => s + r.ideaCount, 0),
      completeCount:  rows.reduce((s, r) => s + r.completeCount, 0),
      executionCount: rows.reduce((s, r) => s + r.executionCount, 0),
      expectedAmount: rows.reduce((s, r) => s + r.expectedAmount, 0),
      mileage:        rows.reduce((s, r) => s + r.mileage, 0),
    }
  })
}

// ── 팀 집계 ───────────────────────────────────────────────────────────────────
export function aggregateTeamStats(records: TeamStats[]): TeamStatsRow[] {
  const groups = new Map<number, TeamStats[]>()
  records.forEach((r) => {
    if (!groups.has(r.id)) groups.set(r.id, [])
    groups.get(r.id)!.push(r)
  })

  return Array.from(groups.values()).map((rows) => {
    const first  = rows[0]
    const latest = rows[rows.length - 1]
    const totalPosts       = rows.reduce((s, r) => s + r.totalPosts, 0)
    const participantCount = latest.participantCount
    const postsPerPerson   = participantCount > 0
      ? Math.round((totalPosts / participantCount) * 10) / 10
      : 0
    const avgRate = (key: keyof TeamStats) =>
      Math.round(rows.reduce((s, r) => s + (r[key] as number), 0) / rows.length)

    return {
      id:               first.id,
      team:             first.team,
      teamSize:         latest.teamSize,
      participantCount,
      participationRate: avgRate('participationRate'),
      totalPosts,
      postsPerPerson,
      ideaCount:        rows.reduce((s, r) => s + r.ideaCount, 0),
      completeCount:    rows.reduce((s, r) => s + r.completeCount, 0),
      executionCount:   rows.reduce((s, r) => s + r.executionCount, 0),
      reviewRate:       avgRate('reviewRate'),
      expectedAmount:   rows.reduce((s, r) => s + r.expectedAmount, 0),
      mileage:          rows.reduce((s, r) => s + r.mileage, 0),
    }
  })
}

// ── Excel 다운로드 ─────────────────────────────────────────────────────────────
export async function exportPersonStatsExcel(data: PersonStatsRow[], period: string) {
  const XLSX = await import('xlsx')
  const rows = data.map((r) => ({
    '이름':           r.name,
    '부서':           r.department,
    '직급':           r.position,
    '총게시글(건)':   r.totalPosts,
    '댓글(개)':       r.comments,
    '아이디어상상(건)': r.ideaCount,
    '실행완료상상(건)': r.completeCount,
    '실행건수(건)':    r.executionCount,
    '기대성과금액(만원)': r.expectedAmount,
    '마일리지(생선)':  r.mileage,
  }))

  const ws = XLSX.utils.json_to_sheet(rows)
  ws['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 8 }, { wch: 12 }, { wch: 10 },
    { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 16 }, { wch: 14 },
  ]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '개인통계')
  XLSX.writeFile(wb, `개인통계_${period}.xlsx`)
}

export async function exportTeamStatsExcel(data: TeamStatsRow[], period: string) {
  const XLSX = await import('xlsx')
  const rows = data.map((r) => ({
    '팀명':            r.team,
    '팀인원(명)':      r.teamSize,
    '참여인원(명)':    r.participantCount,
    '참여율(%)':       r.participationRate,
    '총게시글(건)':    r.totalPosts,
    '인당건수(건)':    r.postsPerPerson,
    '아이디어상상(건)': r.ideaCount,
    '실행완료상상(건)': r.completeCount,
    '실행건수(건)':    r.executionCount,
    '심사율(%)':       r.reviewRate,
    '기대성과금액(만원)': r.expectedAmount,
    '마일리지(생선)':   r.mileage,
  }))

  const ws = XLSX.utils.json_to_sheet(rows)
  ws['!cols'] = [
    { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 12 },
    { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 10 },
    { wch: 16 }, { wch: 14 },
  ]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '팀통계')
  XLSX.writeFile(wb, `팀통계_${period}.xlsx`)
}
