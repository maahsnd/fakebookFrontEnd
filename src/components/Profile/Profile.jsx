import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import UserIcon from '../UserIcon/UserIcon';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import styles from './profile.module.css';
import { useParams } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id);
      const data = await response.json();
      setUser(data);
      setUpdateUser(false);
    };
    fetchUser();
  }, [updateUser]);

  return (
    <div className={styles.pageContainer}>
      <Nav user={user} setUpdateUser={setUpdateUser} />
      <div className={styles.profileContainer}>
        <header className={styles.userContainer}>
          <img
            src={user.profilePhoto}
            alt="User profile photo"
            className={styles.userProfImg}
          />
          <h3 className={styles.userName}>{user.username}</h3>
        </header>
      </div>
    </div>
  );
}

export default Profile;
