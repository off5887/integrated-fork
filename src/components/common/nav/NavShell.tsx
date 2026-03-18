import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gomgomLogo from '@/assets/gomgom_logo.png'
import { useNavColors } from './useNavColors'
import NavDesktop from './NavDesktop'
import NavMobileDrawer from './NavMobileDrawer'
import NavMobileToolbar from './NavMobileToolbar'

export default function NavShell() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { nt } = useNavColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(24px) saturate(180%)',
          bgcolor: nt.appBarBg,
          borderBottom: `1px solid ${nt.appBarBorderBottom}`,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 60, md: 62 },
            px: { xs: 2, md: 3 },
          }}
        >
          {/* 로고 */}
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              flexShrink: 0,
              mr: { md: 3 },
            }}
          >
            <Box
              component="img"
              src={gomgomLogo}
              alt="Gomgom"
              sx={{
                height: { xs: 32, md: 36 },
                width: 'auto',
                filter: nt.logoFilter,
                transition: 'filter 0.2s',
                '&:hover': {
                  filter: nt.logoHoverFilter,
                },
              }}
            />
          </Box>

          {!isMobile && <NavDesktop />}

          {isMobile && <NavMobileToolbar onOpenDrawer={() => setDrawerOpen(true)} />}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <NavMobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      <Box sx={{ minHeight: { xs: 60, md: 62 } }} />
    </>
  )
}
