import styles from './newpost.module.css';
import { useState } from 'react';

function NewPost(props) {
  const { id, setUpdatePosts } = props;
  const [post, setPost] = useState();
  const [disabledButton, setDisabledButton] = useState(false);

  const handleChange = (e) => {
    setPost(e.target.value);
  };
  const submitPost = async (e) => {
    setDisabledButton(true);
    if (typeof post === 'undefined' || post === null) {
      console.error('blank post');
      return;
    }
    e.preventDefault();
    const body = {
      author: id,
      text: post
    };
    const response = await fetch('https://localhost:3000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      setDisabledButton(false);
      return;
    }
    if (response.ok) {
      setUpdatePosts(true);
      setPost('');
      setDisabledButton(false);
    }
  };
  return (
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
  );
}

export default NewPost;
