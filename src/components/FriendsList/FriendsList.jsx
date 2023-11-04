import React, { useEffect, useState } from 'react';
import styles from './friendslist.module.css';
import UserIcon from '../UserIcon/UserIcon';

function FriendsList() {
  const [friends, setFriends] = useState([]);
  //USE EFFECT TO FETCH FRIENDS
  return (
    <div className={styles.container}>
      <h3 className={styles.friendsTitle}>Contacts</h3>
      {friends && (
        <div className={styles.friendsList}>
          {friends.map((friend) => (
            <UserIcon user={friend} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsList;
