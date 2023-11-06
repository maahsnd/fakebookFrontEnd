import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';
import NewPost from '../NewPost/NewPost';

function Timeline({ id }) {
  const [updatePosts, setUpdatePosts] = useState(false);
  return (
    <div className={styles.container}>
      <NewPost id={id} setUpdatePosts={setUpdatePosts} />
      <FriendsList id={id} />
    </div>
  );
}

export default Timeline;
