import { motion } from 'framer-motion'
import { useThemeMode } from '@/context/ThemeContext'
import type { DashboardCardProps } from '@/api/types/dashboard'

export default function DashboardCard({
  children,
  delay = 0,
  sx = {},
}: DashboardCardProps) {
  const { isDarkMode } = useThemeMode()

  const cardStyle = {
    borderRadius: 16,
    background: isDarkMode
      ? 'rgba(22, 30, 46, 0.92)'
      : 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(16px)',
    border: isDarkMode
      ? '1px solid rgba(148, 163, 184, 0.1)'
      : '1px solid rgba(226, 232, 240, 0.8)',
    boxShadow: isDarkMode
      ? '0 4px 24px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0,0,0,0.2)'
      : '0 2px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0,0,0,0.04)',
    padding: '16px',
    overflow: 'hidden',
    height: '100%',
    ...sx,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={cardStyle}
    >
      {children}
    </motion.div>
  )
}
