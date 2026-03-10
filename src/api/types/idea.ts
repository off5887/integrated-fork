// src/api/types/idea.ts

export type CategoryOption = {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  border: string
}

export type Reviewer = {
  id: number
  name: string
  dept: string
  position: string
}

export type OrgMember = {
  id: number
  name: string
  dept: string
  position: string
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