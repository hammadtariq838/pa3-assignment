import { Link } from 'react-router-dom'
import styles from '../css/home.module.css'

const HomeScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Welcome to BidMe</h1>
          <p className={styles.subtitle}>Discover unique items and bid to win!</p>
          <button className={styles.join}>
            <Link to="/browse">
              Join Now!
            </Link>
          </button>
        </div>
      </div>
    </main>
  )
}

export default HomeScreen