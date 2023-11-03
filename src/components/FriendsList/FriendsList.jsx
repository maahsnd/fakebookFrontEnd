import React, { useEffect, useState } from 'react';
import styles from './friendslist.module.css';

function FriendsList() {
  return (
    <div className={styles.container}>
      <h3 className={styles.friendsTitle}>Contacts</h3>
    </div>
  );
}

export default FriendsList;
