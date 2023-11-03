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
      <UserIcon user={user} />
    </nav>
  );
}

export default Nav;
