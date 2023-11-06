import React, { useEffect, useState } from 'react';
import styles from './friendslist.module.css';
import UserIcon from '../UserIcon/UserIcon';

function FriendsList({ id }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(
        'https://localhost:3000/users/' + id + '/friends'
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

  return (
    <div className={styles.container}>
      <h3 className={styles.friendsTitle}>Contacts</h3>
      {friends && (
        <div className={styles.friendsList}>
          {friends.map((friend) => (
            <UserIcon user={friend} key={friend._id} />
          ))}
        </div>
      )}{' '}
      {!friends.length && <p>No contacts yet</p>}
    </div>
  );
}

export default FriendsList;
