import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Timeline from '../Timeline/Timeline';
import Cookies from 'js-cookie';

function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  useEffect(() => {
    const token = Cookies.get('jwt_token');
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id, {
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
          <Nav user={user} setUpdateUser={setUpdateUser} />
          <Timeline id={user._id} />
        </>
      )}{' '}
    </div>
  );
}

export default Home;
