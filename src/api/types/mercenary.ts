export interface Idea {
  id: number
  title: string
  desc: string
  reward: number
  field: string
  remainingDays: number
}

export interface Applicant {
  id: number
  name: string
  dept: string
}

export interface Employee {
  id: number
  name: string
  dept: string
  position: string
}

export interface ExtendedIdea extends Idea {
  mercenaries: Employee[]
}
