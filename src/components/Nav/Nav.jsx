import { Link } from 'react-router-dom';
import styles from './nav.module.css';
import UserIcon from '../UserIcon/UserIcon';

function Nav(props) {
  const { user } = props;
  return (
    <nav className={styles.container}>
      <button className={styles.homeBtn}>
        <a href={'/' + user._id}>Fakebook</a>
      </button>
      <div className={styles.buttonsContainer}>
        <UserIcon user={user} />
        <button className={styles.friendRequestBtn}>
          <img
            className={styles.friendRequestImg}
            src="https://res.cloudinary.com/dscsiijis/image/upload/c_thumb,w_200,g_face/v1699037440/friendship_e6zrqh.jpg"
            alt="friends img"
          />
        </button>
      </div>
    </nav>
  );
}

export default Nav;
