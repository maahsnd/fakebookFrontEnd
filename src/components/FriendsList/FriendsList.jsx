import React, { useEffect, useState } from 'react';
import styles from './friendslist.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';

function FriendsList({ id }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(
        'https://localhost:3000/users/' + id + '/suggested_friends'
      );
      if (!response.ok) {
        console.error('Error fetching friends');
        return;
      }
      const data = await response.json();
      setFriends(data);
    };
    fetchFriends();
  }, []);

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      console.error('Error fetching friends');
      return;
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.friendsTitle}>Suggested Friends</h3>
      {friends && (
        <div className={styles.friendsList}>
          {friends.map((friend) => (
            <div className={styles.suggestedFriend} key={friend._id}>
              {' '}
              <UserIcon user={friend} />
              <button className={styles.addFriendBtn} onClick={addFriend}>
                <Tooltip title="Add friend">
                  <img
                    className={styles.addFriendBtnImg}
                    value={friend._id}
                    src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699298250/add-contact_e7l4rp.png"
                    alt="add friend"
                  />
                </Tooltip>
              </button>
            </div>
          ))}
        </div>
      )}{' '}
      {!friends.length && <p>No contacts yet</p>}
    </div>
  );
}

export default FriendsList;
