import React from 'react';
import styles from './likedisplay.module.css';
import UserIcon from '../UserIcon/UserIcon';
import Modal from 'react-modal';

function LikeDisplay({ likes, modalIsOpen, setModalIsOpen }) {
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      height: 'min-content',
      width: '350px',
      position: 'absolute',
      margin: '40px auto 0 auto'
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className={styles.likesDisplayContainer}>
        <header className={styles.likesHeader}>
          <h3 className={styles.likesTitle}>Likes</h3>
          <button className={styles.closeModalBtn} onClick={closeModal}>
            X
          </button>
        </header>
        <hr />
        <div>
          {likes.map((like) => (
            <div className={styles.userIconContainer}>
              <UserIcon user={like} key={like._id} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default LikeDisplay;
