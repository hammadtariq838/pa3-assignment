import styles from '../css/navbar.module.css'
import userAsset from '../assets/user.png'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'

const Navbar = () => {
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();


  return (
    <div>
      <ul className={styles.container}>
        <span className={styles.subContainer}>
          <Link to="/" className={styles.li}>Home</Link>
          <Link to="/browse" className={styles.li}>Browse</Link>
        </span>
        <span className={styles.subContainer}>
          <Link to="/profile" className={styles.li}><img src={userAsset} width="40px" /></Link>
          <li className={`${styles.li} ${styles.logout}`}>
            <button
              onClick={() => {
                logoutApi();
                dispatch(logout());
              }}
              disabled={isLoading}
            >
              Logout
            </button>
          </li>
        </span>
      </ul>
    </div>
  )
}

export default Navbar