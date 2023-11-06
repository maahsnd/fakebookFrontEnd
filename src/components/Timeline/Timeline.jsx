import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';
import NewPost from '../NewPost/NewPost';

function Timeline({ id }) {
  return (
    <div className={styles.container}>
      <NewPost />
      <FriendsList id={id} />
    </div>
  );
}

export default Timeline;
