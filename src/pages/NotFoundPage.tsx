import React from 'react'
import { Navigate } from 'react-router-dom'

import { INTRO_ROUTE } from '@/routes'

export const NotFoundPage: React.FC = () => {
  return <Navigate to={INTRO_ROUTE} />
}
