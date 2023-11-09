import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/:id', element: <Home /> },
    { path: '/:id/settings', element: <Settings /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
