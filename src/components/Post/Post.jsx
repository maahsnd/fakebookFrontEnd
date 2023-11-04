import { Link } from 'react-router-dom';
import styles from './post.module.css';

function Post(props) {
  const { user } = props;

  return <div className={styles.postContainer}></div>;
}

export default Post;
