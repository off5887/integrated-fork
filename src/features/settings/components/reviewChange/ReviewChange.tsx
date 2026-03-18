import EditNoteIcon from '@mui/icons-material/EditNote'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Box,
  Grid,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { OrgMember } from '@/api/types/reviewer'
import type { IdeaStatus, Idea } from '@/api/types/settings'
import { mockIdeas } from '@/api/mock/settings'
import IdeaListPanel from './IdeaListPanel'
import IdeaDetailPanel from './IdeaDetailPanel'

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function ReviewChange() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const { showSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas)
  const [changingLevel, setChangingLevel] = useState<1 | 2 | 3 | null>(null)

  const filteredIdeas = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return ideas
    return ideas.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.submitter.toLowerCase().includes(q) ||
        i.department.toLowerCase().includes(q),
    )
  }, [ideas, searchTerm])

  const selectedIdea = ideas.find((i) => i.id === selectedIdeaId) ?? null

  const handleStatusChange = (status: IdeaStatus) => {
    if (!selectedIdeaId) return
    setIdeas((prev) => prev.map((i) => (i.id === selectedIdeaId ? { ...i, status } : i)))
  }

  const handleReviewerChange = (level: 1 | 2 | 3, reviewer: OrgMember | null) => {
    if (!selectedIdeaId) return
    setIdeas((prev) =>
      prev.map((i) => {
        if (i.id !== selectedIdeaId) return i
        return {
          ...i,
          reviewers: {
            ...i.reviewers,
            [`level${level}`]: reviewer,
          },
        }
      }),
    )
    setChangingLevel(null)
  }

  const handleSave = () => {
    showSnackbar('변경사항이 저장되었습니다.', 'success')
  }

  return (
    <Box>
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              bgcolor: st.primaryColor,
              color: st.primaryBtnColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SwapHorizIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ color: textPrimary, lineHeight: 1.3 }}
            >
              아이디어별 심사자 변경
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              아이디어를 선택한 뒤 진행 상태와 각 차수의 심사자를 변경하세요
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* ── 왼쪽: 아이디어 목록 ── */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <IdeaListPanel
            ideas={filteredIdeas}
            selectedIdeaId={selectedIdeaId}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelect={(id) => { setSelectedIdeaId(id); setChangingLevel(null) }}
          />
        </Grid>

        {/* ── 오른쪽: 상세 / 심사자 변경 ── */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {selectedIdea === null ? (
            <Box
              sx={{
                bgcolor: st.panelBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 2.5,
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                p: 4,
              }}
            >
              <EditNoteIcon
                sx={{ fontSize: '2.8rem', color: textSecondary, opacity: 0.25 }}
              />
              <Typography
                variant="body2"
                sx={{ color: textSecondary, fontWeight: 600, opacity: 0.6 }}
              >
                왼쪽에서 아이디어를 선택하세요
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.45 }}>
                선택한 아이디어의 진행 상태와 심사자를 변경할 수 있습니다
              </Typography>
            </Box>
          ) : (
            <IdeaDetailPanel
              idea={selectedIdea}
              changingLevel={changingLevel}
              onStatusChange={handleStatusChange}
              onReviewerChange={handleReviewerChange}
              onChangingLevel={setChangingLevel}
              onSave={handleSave}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
