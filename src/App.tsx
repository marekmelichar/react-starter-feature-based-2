import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage, PostsPage, NotFoundPage, PostPage } from '@/pages'
import { AppLayout, Error } from '@/components'
import { HOME_ROUTE, POST_ROUTE, POSTS_ROUTE } from '@/routes'
import './App.css'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: HOME_ROUTE,
        element: <HomePage />,
      },
      {
        path: POSTS_ROUTE,
        element: <PostsPage />,
      },
      {
        path: POST_ROUTE,
        element: <PostPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading router...</div>}
    />
  )
}

export default App
