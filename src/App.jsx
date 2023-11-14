import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import { ProtectedLayout } from './components/ProtectedLayout';
import { HomeLayout } from './components/HomeLayout';

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="users/:id" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
