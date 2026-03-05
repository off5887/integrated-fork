import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useThemeMode } from '../../../context/ThemeContext'

type DashboardCardProps = {
  children: ReactNode
  delay?: number
  sx?: any
}

export default function DashboardCard({
  children,
  delay = 0,
  sx = {},
}: DashboardCardProps) {
  const { isDarkMode } = useThemeMode()

  const cardStyle = {
    borderRadius: 16,
    background: isDarkMode
      ? 'linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))'
      : 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(241,245,249,0.92))',
    backdropFilter: 'blur(16px)',
    padding: '16px',
    height: '100%',
    ...sx,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.01 }}
      style={cardStyle}
    >
      {children}
    </motion.div>
  )
}
