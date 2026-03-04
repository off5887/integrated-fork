// src/routes/idea/MercenarySupportPage.tsx
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import CommonHeader from './components/CommonHeader'
import IdeaCard from './components/IdeaCard'
import { mockIdeas } from './mocks/mercenaryData'

export default function MercenarySupportPage() {
  const [ideas] = useState(mockIdeas)

  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleApply = (id: number) => {
    alert(`아이디어 #${id}에 용병 지원 완료되었습니다 ㅎㅎ`)
  }

  const colors = {
    pageBg: isDarkMode ? '#0f172a' : '#FAFAFA',
    textPrimary: isDarkMode ? '#f1f5f9' : '#18181B',
    textSecondary: isDarkMode ? '#cbd5e1' : '#71717A',
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.pageBg,
        color: colors.textPrimary,
        transition: 'background-color 0.3s ease',
      }}
    >
      <CommonHeader fishCount={12480} />

      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 6 },
        }}
      >
        <Box mb={{ xs: 5, md: 7 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{
              color: colors.textPrimary,
              letterSpacing: '-0.02em',
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3rem' },
            }}
          >
            용병 지원 모집중
          </Typography>
          <Typography variant="subtitle1" sx={{ color: colors.textSecondary }}>
            함께 아이디어를 실행하고 마일리지를 모아보세요
          </Typography>
        </Box>

        {isMobile ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 4 },
            }}
          >
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onApply={handleApply} />
            ))}
          </Box>
        ) : (
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            {ideas.map((idea) => (
              <Grid item xs={12} sm={6} lg={4} key={idea.id}>
                <Box sx={{ height: '100%' }}>
                  <IdeaCard idea={idea} onApply={handleApply} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
