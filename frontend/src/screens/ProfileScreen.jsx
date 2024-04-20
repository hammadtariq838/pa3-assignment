
import { Link } from "react-router-dom"
import userAsset from '../assets/user.png'
import styles from '../css/profile.module.css'
import { useEffect } from 'react';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import Navbar from "../components/Navbar";


const ProfileScreen = () => {
  const { data: user, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials({ ...user }));
    }
  }, [dispatch, user]);


  return (
    <main className={styles.main}>
      <Navbar />
      {
        isLoading ? <h1>Loading...</h1> :
          <div className={styles.container}>
            <div className={styles.profileInfo}>
              <div className={styles.profileImage}>
                <img src={userAsset} alt="User Image" />
              </div>
              <div className={styles.userDetails}>
                <p>Username: {user.username}</p>
              </div>
            </div>
            <div className={styles.profileActions}>
              <Link to='/create-auction'>
                <button>
                  Create Auction
                </button>
              </Link>
              <Link to='/change-password'>
                <button>
                  Change Password
                </button>
              </Link>
            </div>
            <code>
              <pre>
                {JSON.stringify(user, null, 2)}
              </pre>
            </code>
            <h3>My Auctions</h3>
            <div className={styles.auctionList}>
              {/* <div className={styles.auctionCard}>
                <h4>Auction 1</h4>
                <p>Description of Auction 1 goes here.</p>
                <p>Starting Price: $100</p>
                <p>Current Price: $120</p>
                <p>Start Time: 10:00 AM</p>
                <p>End Time: 12:00 PM</p>
                <p>Status: Ongoing</p>
              </div> */}
            </div>
          </div>
      }
    </main>
  )
}

export default ProfileScreen

