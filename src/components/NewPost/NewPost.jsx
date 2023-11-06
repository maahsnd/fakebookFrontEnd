import styles from './newpost.module.css';

function NewPost(props) {
  const { user } = props;

  return (
    <form className={styles.postContainer}>
      <textarea
        className={styles.newPostTextArea}
        name="newPost"
        id="newPost"
        placeholder="What's on your mind?"
      ></textarea>
      <button className={styles.postBtn}>Post</button>
    </form>
  );
}

export default NewPost;
