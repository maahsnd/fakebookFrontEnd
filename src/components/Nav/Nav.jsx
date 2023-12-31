import { useEffect, useState } from 'react';
import styles from './nav.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import FriendRequests from '../FriendRequests/FriendRequests';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Nav({ updateUser, setUpdateUser }) {
  const [friendModalIsOpen, setFriendModalIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get('jwt_token');
  const userId = Cookies.get('user_id');
  const logOut = () => {
    Cookies.remove('jwt_token');
    Cookies.remove('user_id');
    navigate('/login');
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/users/' + userId,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
    setUpdateUser(false);
  }, [updateUser]);

  if (!token || token == 'undefined' || token == null) {
    navigate('/login');
  }
  if (user)
    return (
      <nav className={styles.container}>
        <button className={styles.homeBtn}>
          <Link to={'/home'}>Fakebook</Link>
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
          <Tooltip title="Settings">
            <Link className={styles.settingsBtn} to={`/settings`}>
              <img
                className={styles.settingsImg}
                src="https://res.cloudinary.com/dscsiijis/image/upload/c_scale,w_50/v1699554218/setting_b29rfh.png"
                alt="Settings icon"
              />
            </Link>
          </Tooltip>
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
