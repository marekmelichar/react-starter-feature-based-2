import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { IntroPage, NotFoundPage } from '@/pages';
import { INTRO_ROUTE } from '@/routes';
import './App.css';

const router = createBrowserRouter([
  {
    path: INTRO_ROUTE,
    element: <IntroPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} fallbackElement={<div>Loading router...</div>} />;
};

export default App;
