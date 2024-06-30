import React from 'react'
import { Navigate } from 'react-router-dom'
import { HOME_ROUTE } from '@/routes'

export const NotFoundPage: React.FC = () => {
  return <Navigate to={HOME_ROUTE} />
}
