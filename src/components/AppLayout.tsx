import { Box, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const AppLayout = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '1280px',
      }}
    >
      <Header />

      <Box
        component='main'
        sx={{ backgroundColor: theme.palette.common.white }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
