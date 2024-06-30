import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Grid, useTheme } from '@mui/material'
import { HOME_ROUTE, POSTS_ROUTE } from '@/routes'
import Logo from '@/assets/logo.svg'

export const Header: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        padding: '1.5rem 0',
        backgroundColor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <Grid container alignItems='center'>
        <Grid item xs>
          <Link to={HOME_ROUTE}>
            <img
              src={Logo}
              alt={`${t('App.Logo')}`}
              style={{ height: '25px', marginBottom: '-0.5rem' }}
            />
          </Link>
        </Grid>
        <Grid item xs>
          <Link to={POSTS_ROUTE} style={{ textDecoration: 'none' }}>
            {t('App.Nav.Posts')}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
