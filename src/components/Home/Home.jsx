import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Timeline from '../Timeline/Timeline';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Home() {
  const userId = Cookies.get('user_id');
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const token = Cookies.get('jwt_token');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + userId, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const data = await response.json();
      setUser(data);
      setUpdateUser(false);
    };
    fetchUser();
  }, [updateUser]);

  if (!token || token == 'undefined' || token == null) {
    navigate('/login');
  }

  return (
    <div>
      <Nav setUpdateUser={setUpdateUser} />
      {user && (
        <>
          <Timeline id={user._id} />
        </>
      )}{' '}
    </div>
  );
}

export default Home;
