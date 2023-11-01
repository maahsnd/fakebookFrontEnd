import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserHome = async () => {
      const response = await fetch('https://localhost:3000/users/' + id);
      const data = await response.json();
      console.log(data);
      setUser(data);
    };
    fetchUserHome();
  }, []);

  return <div>{user && <p>{user.username}</p>} </div>;
}

export default Home;
