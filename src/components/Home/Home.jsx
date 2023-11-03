import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Timeline from '../Timeline/Timeline';

function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserHome = async () => {
      const response = await fetch('https://localhost:3000/users/' + id);
      const data = await response.json();
      setUser(data);
    };
    fetchUserHome();
  }, []);

  return (
    <div>
      {user && (
        <>
          <Nav user={user} />
          <Timeline />
        </>
      )}{' '}
    </div>
  );
}

export default Home;
