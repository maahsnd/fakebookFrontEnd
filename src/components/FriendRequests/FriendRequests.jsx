import styles from './friendrequests.module.css';
import UserIcon from '../UserIcon/UserIcon';
import Modal from 'react-modal';

function FriendRequests({
  friendModalIsOpen,
  setFriendModalIsOpen,
  friendRequests,
  setUpdateUser
}) {
  const closeModal = () => {
    setFriendModalIsOpen(false);
  };
  const customStyles = {
    content: {
      height: 'min-content',
      width: '350px',
      position: 'absolute',
      margin: '40px 5px  0 auto',
      borderRadius: '15px',
      padding: '15px'
    }
  };
  return (
    <Modal
      isOpen={friendModalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      {friendRequests ? (
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
              </div>
            );
          })}
        </div>
      ) : (
        <p>No friend requests</p>
      )}
    </Modal>
  );
}

export default FriendRequests;
