import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const HomeLayout = () => {
  const user = Cookies.get('user_id');

  if (user) {
    return <Navigate to={`/home`} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
