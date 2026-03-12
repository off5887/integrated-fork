// src/pages/Dashboard/RealDashboard.tsx
import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useThemeMode } from '@/context/ThemeContext'
import { fishTotal, fishToNextLevel, topIdeas, pieChartData, barChartData } from '@/api/mock/stats'

// Nivo 그래프 임포트
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

export default function RealDashboard() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const fishTotal = 5420
  const fishToNextLevel = 8000
  const progress = (fishTotal / fishToNextLevel) * 100

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'

  const cardBg = isDarkMode
    ? 'linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))'
    : 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(241,245,249,0.92))'

  const cardStyle = {
    borderRadius: 16,
    background: cardBg,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: isDarkMode
      ? '0 6px 20px rgba(0,0,0,0.4)'
      : '0 6px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: isDarkMode
        ? '0 16px 36px rgba(0,0,0,0.5)'
        : '0 16px 36px rgba(0,0,0,0.14)',
    },
  }

  // Nivo 공통 테마 강화
  const nivoTheme = {
    background: 'transparent',
    textColor: textPrimary,
    fontSize: 13,
    fontFamily: 'inherit',
    axis: {
      domain: { line: { stroke: alpha(textPrimary, 0.18) } },
      ticks: {
        line: { stroke: alpha(textPrimary, 0.18) },
        text: { fill: textSecondary, fontWeight: 500 },
      },
      legend: { text: { fill: textPrimary, fontWeight: 600 } },
    },
    grid: { line: { stroke: alpha(textPrimary, 0.09) } },
    legends: {
      text: { fill: textSecondary, fontSize: 13, fontWeight: 500 },
    },
    tooltip: {
      container: {
        background: isDarkMode ? '#1e293b' : '#ffffff',
        color: textPrimary,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
        padding: '12px 16px',
        fontSize: 13,
      },
    },
    labels: {
      text: {
        fontSize: 14,
        fontWeight: 700,
        textShadow: isDarkMode
          ? '0 1px 3px rgba(0,0,0,0.6)'
          : '0 1px 2px rgba(255,255,255,0.8)',
      },
    },
  }

  const pieColors = ['#6366f1', '#a78bfa', '#f472b6', '#fb7185']

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        m: 0,
        p: { xs: 3, sm: 4, md: 5, lg: 6 },
        bgcolor: isDarkMode ? '#0b121f' : '#f8fafc',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0b121f 0%, #1a2336 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        color: textPrimary,
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* 1. 나의 곰곰이 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.015 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 2.5, color: primaryColor }}
                >
                  나의 곰곰이
                </Typography>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}
                >
                  <img
                    src="/gomgom_level3.png"
                    alt="곰곰이"
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 20,
                      objectFit: 'contain',
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ color: textPrimary }}
                    >
                      Lv.12
                    </Typography>
                    <Typography variant="subtitle1" color={textSecondary}>
                      상상직급 : 마스터 곰
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: textPrimary }}
                  >
                    생선 {fishTotal.toLocaleString()} 마리
                  </Typography>
                  <Typography
                    variant="body2"
                    color={textSecondary}
                    sx={{ mt: 0.5 }}
                  >
                    현금 환산 : {(fishTotal * 100).toLocaleString()} 원
                  </Typography>
                </Box>

                <Box sx={{ position: 'relative', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: alpha(primaryColor, 0.2),
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${primaryColor})`,
                        borderRadius: 6,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: -24,
                      color: primaryColor,
                      fontWeight: 600,
                    }}
                  >
                    {progress.toFixed(0)}%
                  </Typography>
                </Box>

                <Typography variant="body2" align="right" color={textSecondary}>
                  다음 레벨까지 {(fishToNextLevel - fishTotal).toLocaleString()}{' '}
                  마리 남음
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* 2. 인기 상상 TOP 5 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.015 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: { xs: 3, md: 10, lg: 10 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 2.5, color: primaryColor }}
                >
                  인기 상상 TOP 5
                </Typography>

                {[
                  { title: '사내 카페 메뉴 다양화', likes: 142 },
                  { title: '원격 근무 시간 유연화', likes: 98 },
                  { title: '재택근무 복지 확대', likes: 87 },
                  { title: '회의 문화 개선', likes: 76 },
                  { title: '사내 도서관 디지털화', likes: 65 },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom:
                        i < 4
                          ? `1px solid ${alpha(theme.palette.divider, 0.15)}`
                          : 'none',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ minWidth: 32, color: textPrimary }}
                    >
                      {i + 1}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ flex: 1, ml: 2, color: textPrimary }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={textSecondary}
                      sx={{ minWidth: 80, textAlign: 'right' }}
                    >
                      {item.likes} 공감
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* 3. 결재 단계별 현황 - Nivo Pie */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.015 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 3, color: primaryColor }}
                >
                  결재 단계별 현황
                </Typography>

                {/* 핵심 수정: div + 고정 높이 */}
                <div style={{ height: '450px', width: '100%' }}>
                  <ResponsivePie
                    data={[
                      {
                        id: '부문장',
                        label: '부문장',
                        value: 68,
                        color: pieColors[0],
                      },
                      {
                        id: '팀장',
                        label: '팀장',
                        value: 15,
                        color: pieColors[1],
                      },
                      {
                        id: '접수',
                        label: '접수',
                        value: 10,
                        color: pieColors[2],
                      },
                      {
                        id: '실행요청',
                        label: '실행요청',
                        value: 7,
                        color: pieColors[3],
                      },
                    ]}
                    margin={{ top: 40, right: 140, bottom: 140, left: 40 }}
                    innerRadius={0.48}
                    padAngle={1.5}
                    cornerRadius={12}
                    activeOuterRadiusOffset={14}
                    colors={pieColors}
                    borderWidth={2}
                    borderColor={{
                      from: 'color',
                      modifiers: [['darker', 0.7]],
                    }}
                    arcLinkLabelsSkipAngle={15}
                    arcLinkLabelsTextColor={textPrimary}
                    arcLinkLabelsThickness={3}
                    arcLinkLabelsColor={{
                      from: 'color',
                      modifiers: [['darker', 0.8]],
                    }}
                    arcLabelsSkipAngle={20}
                    arcLabelsTextColor={{
                      from: 'color',
                      modifiers: [['darker', 3]],
                    }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 90,
                        itemWidth: 110,
                        itemHeight: 24,
                        symbolSize: 20,
                        symbolShape: 'circle',
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemTextColor: primaryColor,
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                    theme={nivoTheme}
                  />
                </div>

                <Typography
                  align="center"
                  variant="body2"
                  color={textSecondary}
                  sx={{ mt: 2 }}
                >
                  부문장 단계 병목 68%
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* 4. 실행 완료율 */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ scale: 1.015 }}
          >
            <Card sx={cardStyle}>
              <CardContent
                sx={{ p: { xs: 3, md: 4, lg: 5 }, textAlign: 'center' }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 3, color: primaryColor }}
                >
                  실행 완료율
                </Typography>

                <Box
                  sx={{
                    position: 'relative',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h2"
                    fontWeight={900}
                    sx={{ color: primaryColor, lineHeight: 1 }}
                  >
                    73.4%
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={73.4}
                    sx={{
                      position: 'absolute',
                      bottom: 30,
                      left: '10%',
                      right: '10%',
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: alpha(primaryColor, 0.2),
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${primaryColor})`,
                        borderRadius: 6,
                      },
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color={textSecondary}
                  sx={{ mt: 3 }}
                >
                  실행요청 후 방치 비율 개선 필요
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* 5. 부문/팀별 TOP5 - Nivo Bar */}
        <Grid size={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.015 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 3, color: primaryColor }}
                >
                  부문/팀별 실행 건수 TOP 5
                </Typography>

                {/* 핵심 수정: div + 고정 높이 */}
                <div style={{ height: '450px', width: '100%' }}>
                  <ResponsiveBar
                    data={[
                      { team: '개발1팀', value: 320 },
                      { team: '생산2부', value: 280 },
                      { team: '영업3팀', value: 210 },
                      { team: '품질팀', value: 180 },
                      { team: 'R&D팀', value: 150 },
                    ]}
                    keys={['value']}
                    indexBy="team"
                    margin={{ top: 40, right: 40, bottom: 100, left: 80 }}
                    padding={0.32}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'pastel1' }}
                    borderWidth={1.5}
                    borderColor={{
                      from: 'color',
                      modifiers: [['darker', 1.6]],
                    }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 8,
                      tickRotation: -40,
                      legend: '팀 / 부서',
                      legendPosition: 'middle',
                      legendOffset: 55,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 8,
                      tickRotation: 0,
                      legend: '실행 건수',
                      legendPosition: 'middle',
                      legendOffset: -60,
                    }}
                    labelSkipWidth={16}
                    labelSkipHeight={16}
                    labelTextColor={{
                      from: 'color',
                      modifiers: [['darker', 2.2]],
                    }}
                    role="application"
                    ariaLabel="팀별 실행 건수 바 차트"
                    barAriaLabel={(e) =>
                      `${e.id}: ${e.formattedValue} in team: ${e.indexValue}`
                    }
                    theme={nivoTheme}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}
