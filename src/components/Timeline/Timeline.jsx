import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';
import NewPost from '../NewPost/NewPost';
import Post from '../Post/Post';

function Timeline({ id }) {
  const [updatePosts, setUpdatePosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://localhost:3000/posts/' + id);
      if (!response.ok) {
        console.error('Error fetching posts');
        return;
      }
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [updatePosts]);

  return (
    <div className={styles.container}>
      <div className={styles.postsContainer}>
        <NewPost
          id={id}
          setUpdatePosts={setUpdatePosts}
          setError={setError}
          error={error}
        />
        {posts.length && (
          <>
            {posts.map((post) => {
              return (
                <Post
                  post={post}
                  setError={setError}
                  setUpdatePosts={setUpdatePosts}
                />
              );
            })}
          </>
        )}
      </div>

      <FriendsList id={id} />
    </div>
  );
}

export default Timeline;
