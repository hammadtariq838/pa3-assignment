import { useState } from 'react';
import { useGetAuctionsQuery } from '../slices/auctionsApiSlice';
import styles from '../css/browse.module.css'
import AuctionAsset from '../assets/auction.png'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const BrowseScreen = () => {
  const [search, setSearch] = useState('');
  const { data: auctions = [] } = useGetAuctionsQuery(search);
  const navigate = useNavigate();

  return (
    <main className={styles.main} style={{ minHeight: '96vh' }}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchContainer} style={{ marginTop: '4rem' }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {auctions.map((auction) => (
          <div className={styles.auctionCard} key={auction._id}
            onClick={() => navigate(`/auctions/${auction._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={AuctionAsset} alt="Item Image" className={styles.itemImage} />
            <div className={styles.auctionDetails}>
              <h2 className={styles.auctionTitle}>{auction.title}</h2>
              <p className={styles.description}>{auction.description}</p>
              <p>Starting Price: Rs. {
                auction.startingPrice
              }</p>
              <p>Start Time: {new Date(auction.startingTime).toLocaleString()}
              </p>
              <p>End Time:
                {new Date(auction.endingTime).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main >
  )
}

export default BrowseScreen
