import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

import styles from '../css/specificauction.module.css';
import AuctionAsset from '../assets/auction.png';
import Navbar from '../components/Navbar';
import { useGetAuctionByIdQuery } from '../slices/auctionsApiSlice';

const SpecificAuctionScreen = () => {
  const { id } = useParams();
  const { data: auction, isLoading } = useGetAuctionByIdQuery(id);
  const [bid, setBid] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const { userInfo } = useSelector(state => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (auction) {
      setCurrentPrice(auction.startingPrice);
    }
  }, [auction]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    setSocket(socket);

    // Connect to the specific auction room
    socket.emit('joinAuction', id);

    // Update current price based on new bids
    socket.on('newBid', (newBid) => {
      setCurrentPrice(newBid);
    });

    // Handle any errors emitted by the server
    socket.on('error', (errorMessage) => {
      alert(errorMessage);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleBid = () => {
    if (parseFloat(bid) > currentPrice) {
      socket.emit('bid', { id, bid: parseFloat(bid), userId: userInfo._id });
    } else {
      alert('Your bid must be higher than the current price!');
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.auctionDetails}>
        <div className={styles.auctionImage}>
          <img src={AuctionAsset} alt="Item Image" style={{ width: '100%' }} />
        </div>
        {isLoading ? <p>Loading...</p> :
          <div className={styles.auctionInfo}>
            <h2 className={styles.auctionTitle}>{auction.title}</h2>
            <p className={styles.description}>{auction.description}</p>
            <p className={styles.p}><strong>Starting Price:</strong> Rs. {auction.startingPrice}</p>
            <p className={styles.p}><strong>Current Price:</strong> Rs. {currentPrice}</p>
            <p className={styles.p}><strong>Start Time:</strong> {new Date(auction.startingTime).toLocaleString()}</p>
            <p className={styles.p}><strong>End Time:</strong> {new Date(auction.endingTime).toLocaleString()}</p>
            <div className={styles.bidForm}>
              <label className={styles.label} htmlFor="bidAmount">Your Bid:</label>
              <input
                className={styles.input}
                type="number"
                value={bid}
                min={currentPrice + 1}
                step="1"
                onChange={e => setBid(e.target.value)}
                required
              />
              <button className={styles.button} type="submit" onClick={handleBid}>
                Place Bid
              </button>
            </div>
          </div>
        }
      </div>
    </main>
  );
};

export default SpecificAuctionScreen;
