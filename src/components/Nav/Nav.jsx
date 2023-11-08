import { useState } from 'react';
import styles from './nav.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import FriendRequests from '../FriendRequests/FriendRequests';

function Nav(props) {
  const { user, setUpdateUser } = props;
  const [friendModalIsOpen, setFriendModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const logOut = async () => {
    const response = await fetch('https://localhost:3000/logout', {
      method: 'POST'
    });
    if (response.ok) {
      navigate('/login');
    }
  };
  return (
    <nav className={styles.container}>
      <button className={styles.homeBtn}>
        <a href={'/' + user._id}>Fakebook</a>
      </button>
      <div className={styles.buttonsContainer}>
        <UserIcon user={user} />
        <Tooltip title="Friend Requests">
          <button
            className={styles.friendRequestBtn}
            onClick={() => setFriendModalIsOpen(true)}
          >
            <img
              className={styles.friendRequestImg}
              src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699037440/friendship_e6zrqh.jpg"
              alt="friends img"
            />
          </button>
        </Tooltip>
        <FriendRequests
          friendModalIsOpen={friendModalIsOpen}
          setFriendModalIsOpen={setFriendModalIsOpen}
          friendRequests={user.friendRequests}
          setUpdateUser={setUpdateUser}
          id={user._id}
        />
        {/* IMPLEMENT LOGOUT ON CLICK */}
        <Tooltip title="Log Out">
          <button className={styles.logOutBtn} onClick={logOut}>
            <img
              className={styles.logOutImg}
              src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699052679/door_ye5pg7.png"
              alt="log out"
            />
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}

export default Nav;
