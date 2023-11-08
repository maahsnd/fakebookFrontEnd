import { Link, useParams } from 'react-router-dom';
import styles from './post.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import Comment from '../Comment/Comment';

function Post({ post, setError, setUpdatePosts }) {
  const [comment, setComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();

  const date = DateTime.fromISO(post.time);
  const humanDate = date
    .toLocaleString(DateTime.DATETIME_SHORT)
    .replace(/,/, ', at');

  const like = async () => {
    const body = {
      userid: id
    };
    const response = await fetch(
      'https://localhost:3000/posts/' + post._id + '/likes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      setError('Error: could not like');
      setTimeout(() => {
        setError(null);
      }, '3 seconds');
    }
    setUpdatePosts(true);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    setComment(null);
    const body = {
      userid: id,
      text: comment
    };
    const response = await fetch(
      'https://localhost:3000/posts/' + post._id + '/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      setError('Error: could not comment');
      setTimeout(() => {
        setError(null);
      }, '3 seconds');
    }
    setUpdatePosts(true);
  };

  const commentForm = (
    <form className={styles.commentForm}>
      <textarea
        onChange={handleChange}
        value={comment}
        className={styles.commentTextArea}
        name="commentText"
        id="commentText"
        placeholder="Write a comment..."
      ></textarea>
      <Tooltip title="Close/delete">
        <button
          className={styles.deleteCommentBtn}
          onClick={() => setComment(null)}
        >
          <img
            className={styles.deleteCommentImg}
            src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699401459/delete_w4aao8.png"
            alt="delete comment"
          />
        </button>
      </Tooltip>
      <Tooltip title="Comment">
        <button className={styles.submitCommentBtn} onClick={submitComment}>
          <img
            className={styles.submitCommentImg}
            src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699400431/paper-plane_mhfzcj.png"
            alt="submit comment"
          />
        </button>
      </Tooltip>
    </form>
  );

  return (
    <div className={styles.masterContainer}>
      <div className={styles.postContainer}>
        <div className={styles.postHeaderContainer}>
          <div className={styles.postHeader}>
            <UserIcon user={post.author} />
            <p className={styles.time}>posted on {humanDate}</p>
          </div>
        </div>

        <div className={styles.postContent}>
          <p className={styles.postText}>{post.text}</p>
          <hr />
          <div className={styles.likeAndComment}>
            <button className={styles.likes}>
              {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
            </button>
            <button
              className={styles.comments}
              onClick={() => {
                if (post.comments.length > 0) {
                  showComments ? setShowComments(false) : setShowComments(true);
                }
              }}
            >
              {post.comments.length}{' '}
              {post.comments.length === 1 ? 'Comment' : 'Comments'}
            </button>
          </div>
        </div>
        <div className={styles.likeAndCommentBtnContainer}>
          <button className={styles.likeBtn} onClick={like}>
            Like
          </button>
          <button className={styles.commentBtn} onClick={() => setComment('')}>
            Comment
          </button>
        </div>
        {comment !== null && commentForm}
        {showComments && (
          <div className={styles.commentContainer}>
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
