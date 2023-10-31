import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/Login/Login.jsx';

function App() {
  const router = createBrowserRouter([{ path: '/login', element: <LogIn /> }]);

  return <RouterProvider router={router} />;
}

export default App;
