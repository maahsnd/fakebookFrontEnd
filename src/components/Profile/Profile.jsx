import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import UserIcon from '../UserIcon/UserIcon';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import styles from './profile.module.css';
import { useParams } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [posts, setPosts] = useState(null);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://localhost:3000/posts/' + id);
      const data = await response.json();
      setPosts(data);
      setUpdatePosts(false);
    };
    fetchPosts();
  }, [updatePosts]);

  if (user && posts)
    return (
      <div className={styles.pageContainer}>
        <Nav user={user} setUpdateUser={setUpdateUser} />
        <div className={styles.profileContainer}>
          <header className={styles.userContainer}>
            <img
              src={user.profilePhoto}
              alt="User profile photo"
              className={styles.userProfImg}
            />
            <h3 className={styles.userName}>{user.username}</h3>
          </header>
          <div className={styles.contentContainer}>
            <div className={styles.friendAndBio}>
              <div className={styles.bioContainer}>
                <h3 className={styles.bioTitle}>About me</h3>
                <p className={styles.bioText}>{user.bio}</p>
              </div>
            </div>
            <div className={styles.posts}>
              <NewPost
                id={user._id}
                setUpdatePosts={setUpdatePosts}
                setError={setError}
                error={error}
              />
              {posts.length > 0 && (
                <>
                  {posts.map((post) => {
                    return (
                      <Post
                        key={post._id}
                        post={post}
                        setError={setError}
                        setUpdatePosts={setUpdatePosts}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile;
