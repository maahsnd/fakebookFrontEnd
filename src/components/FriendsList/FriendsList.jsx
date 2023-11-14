import React, { useEffect, useState } from 'react';
import styles from './friendslist.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function FriendsList({ id }) {
  const [friends, setFriends] = useState([]);
  const [updateFriends, setUpdateFriends] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState({});
  const token = Cookies.get('jwt_token');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(
        'https://localhost:3000/users/' + id + '/suggested_friends',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      if (!response.ok) {
        console.error('Error fetching friends');
        return;
      }
      const data = await response.json();
      setFriends(data);
      let buttons = {};
      data.forEach((user) => {
        buttons[user._id] = false;
      });
      setDisabledButtons(buttons);
      setUpdateFriends(false);
    };
    fetchFriends();
  }, [updateFriends]);

  const addFriend = async (e) => {
    const friendId = e.target.getAttribute('value');
    const body = {
      to: friendId
    };
    const response = await fetch(
      'https://localhost:3000/users/' + id + '/friendrequests',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      console.error('Error fetching friends');
      return;
    }
    setUpdateFriends(true);
    setDisabledButtons({ ...disabledButtons, [friendId]: true });
  };

  if (!token || token == 'undefined' || token == null) {
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.friendsTitle}>Suggested Friends</h3>
      {friends.length && (
        <div className={styles.friendsList}>
          {friends.map((friend) => (
            <div className={styles.suggestedFriend} key={friend._id}>
              {' '}
              <UserIcon user={friend} />
              <button
                className={styles.addFriendBtn}
                onClick={addFriend}
                disabled={disabledButtons[friend._id]}
              >
                <Tooltip title="Add friend">
                  <img
                    className={styles.addFriendBtnImg}
                    value={friend._id}
                    src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699298250/add-contact_e7l4rp.png"
                    alt="add friend"
                  />
                </Tooltip>
                {disabledButtons[friend._id] ? <p>Sent</p> : <></>}
              </button>
            </div>
          ))}
        </div>
      )}{' '}
      {!friends.length && (
        <p className={styles.noFriends}> No friend suggestions </p>
      )}
    </div>
  );
}

export default FriendsList;
