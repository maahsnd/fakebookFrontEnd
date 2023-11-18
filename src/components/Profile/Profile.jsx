import React, { useState, useEffect } from 'react';
import UserIcon from '../UserIcon/UserIcon';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import styles from './profile.module.css';
import Cookies from 'js-cookie';
import {  useOutletContext, useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import '@emotion/styled';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [showRequest, setShowRequest] = useState(false)
  const { id } = useParams();
  const token = Cookies.get('jwt_token');
  const userId = Cookies.get('user_id')
  const [updateUser] = useOutletContext();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/users/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      const data = await response.json();
      setUser(data);
        friendRequestCheck(data);
    };
    fetchUser();
  }, [id, updateUser]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/posts/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      const data = await response.json();
      setPosts(data);
      setUpdatePosts(false);
    };
    fetchPosts();
  }, [id, updatePosts]);

  //should friend request button be displayed?
  const friendRequestCheck =  (user) => {
  (user.friends.find((friend) => friend._id==userId) || (user._id === userId)) ? setShowRequest(false) : setShowRequest(true);
  }

  const addFriend = async (e) => {
    setAdded(true);
    const friendId = e.target.getAttribute('value');
    const body = {
      to: friendId
    };
    const response = await fetch(
      'https://fakebookapi-production.up.railway.app/users/' +
        id +
        '/friendrequests',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      console.error('Error adding friend');
      return;
    }
  };

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
            {showRequest &&     <button
                className={styles.addFriendBtn}
                onClick={addFriend}
                disabled={added}
              >
                <Tooltip title="Add friend">
                  <img
                    className={styles.addFriendBtnImg}
                    value={user._id}
                    src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699298250/add-contact_e7l4rp.png"
                    alt="add friend"
                  />
                </Tooltip>
                {added ? <p>Sent</p> : <></>}
              </button>}
        
            
          </header>
          <div className={styles.contentContainer}>
            <div className={styles.friendsAndBio}>
              <div className={styles.bioContainer}>
                <h3 className={styles.bioTitle}>About me</h3>
                {user.bio ? <p className={styles.bioText}>{user.bio}</p> : <p className={styles.bioText}>Nothing written...yet</p>}
                
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
