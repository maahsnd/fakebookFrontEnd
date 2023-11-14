import { Link } from 'react-router-dom';
import styles from './usericon.module.css';
import { Tooltip } from '@mui/material';
import '@emotion/styled';

function UserIcon(props) {
  const { user } = props;

  return (
    <div>
      <button className={styles.user_icon_container}>
        <Tooltip title="Profile">
          <Link to={'/users/' + user._id}>
            <img
              src={user.profilePhoto}
              className={styles.user_icon}
              alt="user avatar"
            />
          </Link>
        </Tooltip>

        <Link className={styles.user_link} to={`/users/${user._id}`}>
          {user.username}
        </Link>
      </button>
    </div>
  );
}

export default UserIcon;
