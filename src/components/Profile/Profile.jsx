import React, { useState, useEffect } from 'react';
import UserIcon from '../UserIcon/UserIcon';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import styles from './profile.module.css';
import Cookies from 'js-cookie';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = Cookies.get('jwt_token');
  const navigate = useNavigate();
  const [updateUser] = useOutletContext();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [id, updateUser]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://localhost:3000/posts/' + id, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const data = await response.json();
      setPosts(data);
      setUpdatePosts(false);
    };
    fetchPosts();
  }, [id, updatePosts]);

  if (!token || token == 'undefined' || token == null) {
    navigate('/login');
  }

  return (
    <div className={styles.pageContainer}>
      {user && posts && (
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
            <div className={styles.friendsAndBio}>
              <div className={styles.bioContainer}>
                <h3 className={styles.bioTitle}>About me</h3>
                <p className={styles.bioText}>{user.bio}</p>
              </div>
              <div className={styles.friendsContainer}>
                <h3 className={styles.friendsTitle}>Friends</h3>
                {user.friends.length > 0 ? (
                  <div className={styles.friendsList}>
                    {' '}
                    {user.friends.map((friend) => (
                      <UserIcon user={friend} key={friend._id} />
                    ))}
                  </div>
                ) : (
                  <p className={styles.bioText}>No friends yet!</p>
                )}
              </div>
            </div>
            <div className={styles.posts}>
              {user._id === Cookies.get('user_id') && (
                <NewPost
                  id={user._id}
                  setUpdatePosts={setUpdatePosts}
                  setError={setError}
                  error={error}
                />
              )}

              {posts.length > 0 ? (
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
              ) : (
                <p>No posts yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
