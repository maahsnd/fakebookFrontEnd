import React from 'react';
import styles from './comment.module.css';
import formatTimeDifference from '../../../formatDate';

function Comment({ comment }) {
  const time = formatTimeDifference(comment.time);
  return (
    <div className={styles.commentContainer}>
      <button className={styles.userIcon}>
        <img
          className={styles.userIconImg}
          src={comment.author.profilePhoto}
          alt="user photo"
        />
      </button>
      <div className={styles.comment}>
        <div className={styles.commentBody}>
          <a
            className={styles.commentAuthor}
            href={`/users/${comment.author._id}`}
          >
            {comment.author.username}
          </a>
          <p className={styles.commentText}>{comment.text}</p>
        </div>
        <div className={styles.commentTimeAndLike}>
          <p className={styles.commentTime}>{time}</p>
          <button className={styles.commentLike}>Like </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
