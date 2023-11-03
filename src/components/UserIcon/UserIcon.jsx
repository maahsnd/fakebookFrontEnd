import { Link } from 'react-router-dom';
import styles from './usericon.module.css';

function UserIcon(props) {
  const { user } = props;
  //prevent src from being double quoted

  return (
    <div>
      <button className={styles.user_icon_container}>
        <Link to={'/users/' + user._id}>
          <img
            src={user.profilePhoto}
            className={styles.user_icon}
            alt="user avatar"
          />
        </Link>
        <a className={styles.user_link} href={`/users/${user._id}`}>
          {user.username}
        </a>
      </button>
    </div>
  );
}

export default UserIcon;
