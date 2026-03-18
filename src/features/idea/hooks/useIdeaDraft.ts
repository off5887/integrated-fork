// src/features/idea/hooks/useIdeaDraft.ts
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import type { DraftData } from '@/api/types/idea'

export const DRAFT_KEY = 'gomgom_new_idea_draft'
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000 // 5분

type FormValues = {
  title: string
  categories: string[]
  problem: string
  solution: string
  reviewer: string[]
  security: 'public' | 'private'
  plan: string
}

type UseIdeaDraftReturn = {
  savedDraft: DraftData | null
  lastSavedAt: Date | null
  snackOpen: boolean
  snackMsg: string
  setSnackOpen: Dispatch<SetStateAction<boolean>>
  handleManualSave: () => void
  handleRestoreDraft: () => void
  handleDiscardDraft: () => void
  clearDraft: () => void
}

export function useIdeaDraft(
  formValues: FormValues,
  onRestore: (draft: DraftData) => void,
): UseIdeaDraftReturn {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [savedDraft, setSavedDraft] = useState<DraftData | null>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return null
      const draft: DraftData = JSON.parse(raw)
      return draft.savedAt ? draft : null
    } catch {
      return null
    }
  })

  // 항상 최신 폼 값을 참조하기 위한 ref
  const formRef = useRef(formValues)
  useEffect(() => {
    formRef.current = formValues
  })

  // 5분 자동저장
  useEffect(() => {
    const timer = setInterval(() => {
      const f = formRef.current
      const hasContent = f.title.trim() || f.problem.trim() || f.solution.trim() || f.plan.trim()
      if (!hasContent) return
      const draft: DraftData = { ...f, savedAt: new Date().toISOString() }
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      setLastSavedAt(new Date())
      setSnackMsg('임시저장 완료')
      setSnackOpen(true)
    }, AUTO_SAVE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const handleManualSave = () => {
    const draft: DraftData = { ...formRef.current, savedAt: new Date().toISOString() }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    setLastSavedAt(new Date())
    setSavedDraft(null)
    setSnackMsg('임시저장 완료')
    setSnackOpen(true)
  }

  const handleRestoreDraft = () => {
    if (!savedDraft) return
    onRestore(savedDraft)
    setSavedDraft(null)
    setSnackMsg('임시저장 내용을 불러왔습니다')
    setSnackOpen(true)
  }

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
    setSavedDraft(null)
  }

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
  }

  return {
    savedDraft,
    lastSavedAt,
    snackOpen,
    snackMsg,
    setSnackOpen,
    handleManualSave,
    handleRestoreDraft,
    handleDiscardDraft,
    clearDraft,
  }
}
