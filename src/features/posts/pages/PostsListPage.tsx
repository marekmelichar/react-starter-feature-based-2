import React from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import { POSTS_ROUTE } from '@/routes'
import { useGetPostsList } from '../api'

export const PostsListPage = () => {
  const theme = useTheme()

  const { data } = useGetPostsList()

  return (
    <Box sx={{ marginTop: '1.5rem', marginBottom: '5rem' }}>
      {data &&
        data.map((post) => {
          return (
            <Box
              key={post.id}
              sx={{
                borderRadius: '0.5rem',
                border: `1px solid ${theme.palette.grey[700]}`,
                padding: '1rem',
                marginBottom: '1rem',
                cursor: 'pointer',
              }}
            >
              <b>
                <Link to={`/${POSTS_ROUTE}/${post.id}`}>{post.title}</Link>
              </b>

              <p>{post.body}</p>
            </Box>
          )
        })}
    </Box>
  )
}
