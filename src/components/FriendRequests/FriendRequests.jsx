import styles from './friendrequests.module.css';
import UserIcon from '../UserIcon/UserIcon';
import Modal from 'react-modal';
import { useState } from 'react';
import Cookies from 'js-cookie';

function FriendRequests({
  friendModalIsOpen,
  setFriendModalIsOpen,
  friendRequests,
  setUpdateUser,
  id
}) {
  const token = Cookies.get('jwt_token');
  const [disableBtn, setDisableBtn] = useState(false);
  const closeModal = () => {
    setFriendModalIsOpen(false);
  };
  const customStyles = {
    content: {
      height: 'min-content',
      width: '450px',
      position: 'absolute',
      margin: '40px 5px  0 auto',
      borderRadius: '15px',
      padding: '15px'
    }
  };
  const decline = async (e) => {
    setDisableBtn(true);
    const requestId = e.target.value;
    const response = await fetch(
      'https://localhost:3000/users/' +
        id +
        '/friendrequests/' +
        requestId +
        '/decline',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    if (!response.ok) {
      console.error('Error handling request decline');
      return;
    }
    setDisableBtn(false);
    setUpdateUser(true);
  };

  const accept = async (e) => {
    setDisableBtn(true);
    const requestId = e.target.value;
    const response = await fetch(
      'https://localhost:3000/users/' +
        id +
        '/friendrequests/' +
        requestId +
        '/accept',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    if (!response.ok) {
      console.error('Error handling request accept');
      return;
    }
    setDisableBtn(false);
    setUpdateUser(true);
  };

  return (
    <Modal
      isOpen={friendModalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      {friendRequests && friendRequests.length > 0 ? (
        <div className={styles.friendRequestsContainer}>
          <h3 className={styles.friendRequestsTitle}>Friend Requests</h3>
          <hr />
          {friendRequests.map((request) => {
            return (
              <div
                className={styles.userIconContainer}
                key={`request${request._id}`}
              >
                <UserIcon user={request} />
                <div className={styles.btnContainer}>
                  <button
                    disabled={disableBtn}
                    value={request._id}
                    className={styles.acceptBtn}
                    onClick={accept}
                  >
                    Confirm
                  </button>
                  <button
                    disabled={disableBtn}
                    value={request._id}
                    className={styles.declineBtn}
                    onClick={decline}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.friendRequestsContainer}>
          <h3 className={styles.friendRequestsTitle}>Friend Requests</h3>
          <hr />
          <p>No friend requests</p>
        </div>
      )}
    </Modal>
  );
}

export default FriendRequests;
