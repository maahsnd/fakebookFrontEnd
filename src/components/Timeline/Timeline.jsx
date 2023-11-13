import React, { useEffect, useState } from 'react';
import styles from './timeline.module.css';
import FriendsList from '../FriendsList/FriendsList';
import NewPost from '../NewPost/NewPost';
import Post from '../Post/Post';
import Cookies from 'js-cookie';

function Timeline({ id }) {
  const [updatePosts, setUpdatePosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = Cookies.get('jwt_token');
      const response = await fetch(
        'https://localhost:3000/posts/' + id + '/all',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      if (!response.ok) {
        console.error('Error fetching posts');
        return;
      }
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
    setUpdatePosts(false);
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
        {posts.length > 0 && (
          <>
            {posts.map((post, index) => {
              return (
                <Post
                  post={posts[posts.length - 1 - index]}
                  key={posts[posts.length - 1 - index]._id}
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
