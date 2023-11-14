import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from './Nav/Nav';
import { useState } from 'react';

export const ProtectedLayout = () => {
  const [updateUser, setUpdateUser] = useState(false);
  const user = Cookies.get('jwt_token');
  console.log(user);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Nav updateUser={updateUser} setUpdateUser={setUpdateUser} />
      <Outlet context={[updateUser]} />
    </>
  );
};
