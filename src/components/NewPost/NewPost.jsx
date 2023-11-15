import styles from './newpost.module.css';
import { useState } from 'react';

function NewPost(props) {
  const { id, setUpdatePosts } = props;
  const [post, setPost] = useState();
  const [disabledButton, setDisabledButton] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setDisabledButton(false);
    setError(null);
    setPost(e.target.value);
  };
  const submitPost = async (e) => {
    setDisabledButton(true);
    if (typeof post === 'undefined' || post === null || post === '') {
      setError('Post must not be blank');
      console.error('blank post');
      return;
    }
    e.preventDefault();
    const body = {
      author: id,
      text: post
    };
    const response = await fetch(
      'https://fakebookapi-production.up.railway.app/posts/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      setDisabledButton(false);
      setError('Post failed');
      return;
    }
    if (response.ok) {
      setUpdatePosts(true);
      setPost('');
      setDisabledButton(false);
    }
  };
  return (
    <div className={styles.container}>
      <h4 className={styles.error}>{error}</h4>
      <form className={styles.postContainer}>
        <textarea
          onChange={handleChange}
          value={post}
          className={styles.newPostTextArea}
          name="newPost"
          id="newPost"
          placeholder="What's on your mind?"
        ></textarea>
        <button
          className={styles.postBtn}
          onClick={submitPost}
          disabled={disabledButton}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
