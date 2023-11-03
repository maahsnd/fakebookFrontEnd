import { Link } from 'react-router-dom';
import styles from './nav.module.css';
import UserIcon from '../UserIcon/UserIcon';

function Nav(props) {
  const { user } = props;
  return (
    <nav>
      <button className={styles.home}>
        <Link to={'/' + user._id}>Fakebook</Link>
      </button>
      <UserIcon user={user} />
    </nav>
  );
}

export default Nav;
