import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CategoryIcon from '@mui/icons-material/Category'
import { Box, Button, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { useSnackbar } from '@/context/SnackbarContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { useCategories } from '@/api/queries/useCategories'
import type { CategoryOption } from '@/api/types/idea'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import EmptyState from '@/components/ui/EmptyState'
import CategoryFormDialog from './CategoryFormDialog'

export default function CategoryManagement() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, cardBg } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const { showSnackbar } = useSnackbar()

  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<CategoryOption | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const handleAddOpen = () => {
    setEditTarget(null)
    setDialogOpen(true)
  }

  const handleEditOpen = (cat: CategoryOption) => {
    setEditTarget(cat)
    setDialogOpen(true)
  }

  const handleSave = async (cat: CategoryOption) => {
    if (editTarget) {
      await updateCategory(cat)
      showSnackbar('카테고리가 수정되었습니다', 'success')
    } else {
      if (categories.some((c) => c.id === cat.id)) {
        showSnackbar('이미 존재하는 카테고리 ID입니다', 'error')
        return
      }
      await addCategory(cat)
      showSnackbar('카테고리가 추가되었습니다', 'success')
    }
    setDialogOpen(false)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    await deleteCategory(deleteTargetId)
    showSnackbar('카테고리가 삭제되었습니다', 'success')
    setDeleteTargetId(null)
  }

  return (
    <Box>
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: st.iconGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CategoryIcon sx={{ color: st.primaryBtnColor, fontSize: '1.1rem' }} />
          </Box>
          <Box>
            <Typography fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.2 }}>
              카테고리 관리
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              아이디어 카테고리를 추가·수정·삭제할 수 있습니다
            </Typography>
          </Box>
        </Box>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddOpen}
          sx={{
            bgcolor: st.primaryColor,
            color: st.primaryBtnColor,
            fontWeight: 700,
            borderRadius: 2,
            '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
          }}
        >
          카테고리 추가
        </Button>
      </Box>

      {/* 카테고리 카드 그리드 */}
      {categories.length === 0 ? (
        <EmptyState
          emoji="🏷️"
          title="등록된 카테고리가 없어요"
          description="카테고리를 추가하면 아이디어를 분류할 수 있어요"
          action={{ label: '카테고리 추가', onClick: handleAddOpen }}
        />
      ) : (
      <Grid container spacing={2}>
        {categories.map((cat) => (
          <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                p: 2,
                borderRadius: 2.5,
                border: `1px solid ${borderColor}`,
                bgcolor: cardBg,
                transition: 'border-color 0.15s',
                '&:hover': { borderColor: cat.color },
              }}
            >
              {/* 왼쪽: 이모지 + 정보 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: cat.bg,
                    border: `1px solid ${cat.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  {cat.emoji}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: '0.875rem', color: textPrimary, lineHeight: 1.3 }}
                    noWrap
                  >
                    {cat.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
                    <Chip
                      label={cat.id}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.68rem',
                        fontFamily: 'monospace',
                        bgcolor: cat.bg,
                        color: cat.color,
                        border: `1px solid ${cat.border}`,
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: cat.color,
                        flexShrink: 0,
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* 오른쪽: 액션 버튼 */}
              <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                <Tooltip title="수정">
                  <IconButton
                    size="small"
                    onClick={() => handleEditOpen(cat)}
                    sx={{
                      color: textSecondary,
                      '&:hover': { bgcolor: st.accentIconHoverBg, color: st.primaryColor },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="삭제">
                  <IconButton
                    size="small"
                    onClick={() => setDeleteTargetId(cat.id)}
                    sx={{
                      color: textSecondary,
                      '&:hover': { bgcolor: st.deleteHoverBg, color: st.deleteHoverColor },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      )}

      {/* 추가/수정 다이얼로그 */}
      <CategoryFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editTarget}
      />

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        title="카테고리 삭제"
        message={`'${categories.find((c) => c.id === deleteTargetId)?.label ?? ''}' 카테고리를 삭제하시겠습니까?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </Box>
  )
}
