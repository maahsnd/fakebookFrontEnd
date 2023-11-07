import { Link } from 'react-router-dom';
import styles from './post.module.css';
import UserIcon from '../UserIcon/UserIcon';
import { DateTime } from 'luxon';

function Post({ post }) {
  const date = DateTime.fromISO(post.time);
  const humanDate = date
    .toLocaleString(DateTime.DATETIME_SHORT)
    .replace(/,/, ', at');
  console.log(typeof post.time);
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
            <button className={styles.comments}>
              {post.comments.length}{' '}
              {post.comments.length === 1 ? 'Comment' : 'Comments'}
            </button>
          </div>
        </div>
        <div className={styles.likeAndCommentBtnContainer}>
          <button className={styles.likeBtn}>Like</button>
          <button className={styles.commentBtn}>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
