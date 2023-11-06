import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';

function Timeline({ id }) {
  return (
    <div className={styles.container}>
      <FriendsList id={id} />
    </div>
  );
}

export default Timeline;
