import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';

function Timeline() {
  return (
    <div className={styles.container}>
      <FriendsList />
    </div>
  );
}

export default Timeline;
