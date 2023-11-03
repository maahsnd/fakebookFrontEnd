import { Link } from 'react-router-dom';
import styles from './usericon.module.css';

function UserIcon(props) {
  const { user } = props;
  //prevent src from being double quoted
  const decodedImg = user.profilePhoto.slice(1, -2);

  return (
    <div>
      <button className={styles.user_icon_container}>
        <Link to={'/' + user._id}>
          <img
            src={decodedImg}
            className={styles.user_icon}
            alt="user avatar"
          />
        </Link>
        <a className={styles.user_link} href={`/${user._id}`}>
          {user.username}
        </a>
      </button>
    </div>
  );
}

export default UserIcon;
