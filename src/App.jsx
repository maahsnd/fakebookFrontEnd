import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/Login/Login.jsx';
import Home from './components/Login/Home/Home';

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <LogIn /> },
    { path: '/:id', element: <Home /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
