import EditNoteIcon from '@mui/icons-material/EditNote'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Box,
  Grid,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useSettingsTheme } from '@/theme/settingsTheme'
import type { Idea, IdeaStatus } from '@/api/types/settings'
import { useIdeaList } from '@/api/queries/useIdeas'
import IdeaListPanel from './IdeaListPanel'
import IdeaDetailPanel from './IdeaDetailPanel'

/** IdeaItem → 설정용 Idea 변환 */
function toIdea(item: {
  id: number
  title: string
  author: string
  department: string
  deptCd: string
  submittedAt: string
  status: string
}): Idea {
  const STATUS_MAP: Record<string, IdeaStatus> = {
    '심사대기': '심사대기',
    '승인':     '승인',
    '반려':     '반려',
    '실행중':   '실행중',
    '완료':     '완료',
  }
  return {
    id: item.id,
    title: item.title,
    submitter: item.author,
    department: item.department,
    deptCd: item.deptCd,
    submittedAt: item.submittedAt,
    status: STATUS_MAP[item.status] ?? '심사대기',
  }
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function ReviewChange() {
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = useSettingsTheme()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIdeaId, setSelectedIdeaId] = useState<number | null>(null)
  const [changingLevel, setChangingLevel] = useState<1 | null>(null)

  const { data: ideaItems = [] } = useIdeaList()

  // useIdeaList가 내부적으로 데모/실제 분기 처리 → 여기서는 변환만
  const ideas: Idea[] = useMemo(() => ideaItems.map(toIdea), [ideaItems])

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

  return (
    <Box>
      <Box sx={{ mt: 5, mb: 3, pb: 3, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: st.primaryColor, color: st.primaryBtnColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <SwapHorizIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              아이디어별 심사자 변경
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              아이디어를 선택한 뒤 심사자를 변경하세요
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
              <EditNoteIcon sx={{ fontSize: '2.8rem', color: textSecondary, opacity: 0.25 }} />
              <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 600, opacity: 0.6 }}>
                왼쪽에서 아이디어를 선택하세요
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.45 }}>
                선택한 아이디어의 심사자를 변경할 수 있습니다
              </Typography>
            </Box>
          ) : (
            <IdeaDetailPanel
              idea={selectedIdea}
              changingLevel={changingLevel}
              onChangingLevel={setChangingLevel}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
