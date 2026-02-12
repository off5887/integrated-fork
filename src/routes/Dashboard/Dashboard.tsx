import { Box, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { useThemeMode } from '../../context/ThemeContext'

import ApprovalStatusChart from './Components/ApprovalStatusChart'
import KpiStats from './Components/KpiStats'
import MyGomgomCard from './Components/MyGomgomCard'
import MyIdeas from './Components/MyIdeas'
import OverallCompletion from './Components/OverallCompletion'
import PopularIdeas from './Components/PopularIdeas'
import TeamExecutionsChart from './Components/TeamExecutionsChart'

export default function RealDashboard() {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        m: 0,
        px: { xs: 3, md: 5, lg: 8, xl: 12 },
        py: { xs: 4, md: 6, lg: 8 },
        bgcolor: isDarkMode ? '#0a0f1a' : '#fafcff',
        background: isDarkMode
          ? 'radial-gradient(circle at 10% 20%, #0b121f 0%, #0f172a 100%)'
          : 'radial-gradient(circle at 10% 20%, #f8fafc 0%, #e2e8f0 100%)',
        color: textPrimary,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Grid container spacing={{ xs: 3, md: 4, lg: 5 }}>
          <Grid item xs={12} lg={8}>
            <MyGomgomCard />
          </Grid>

          <Grid item xs={12} lg={4}>
            <KpiStats />
          </Grid>

          <Grid item xs={12} lg={6}>
            <PopularIdeas />
          </Grid>

          <Grid item xs={12} lg={6}>
            <MyIdeas />
          </Grid>

          <Grid item xs={12} lg={6}>
            <ApprovalStatusChart />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TeamExecutionsChart />
          </Grid>

          <Grid item xs={12}>
            <OverallCompletion />
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  )
}
