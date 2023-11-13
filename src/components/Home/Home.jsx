import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Timeline from '../Timeline/Timeline';
import Cookies from 'js-cookie';

function Home() {
  const userId = Cookies.get('user_id');
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  useEffect(() => {
    const token = Cookies.get('jwt_token');
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

  return (
    <div>
      {user && (
        <>
          <Nav setUpdateUser={setUpdateUser} />
          <Timeline id={user._id} />
        </>
      )}{' '}
    </div>
  );
}

export default Home;
