import { useState } from 'react';
import { useCreateAuctionMutation } from '../slices/auctionsApiSlice';
import styles from '../css/createauction.module.css'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateAuctionScreen = () => {
  const navigate = useNavigate();
  const [createAuction, { isLoading }] = useCreateAuctionMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    endingTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuction(formData);
      setFormData({
        title: '',
        description: '',
        startingPrice: '',
        endingTime: ''
      });
      alert('Auction created successfully');
      navigate('/browse');
    } catch (error) {
      alert('Failed to create auction');
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1>Create Auction</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} />
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows={4} required onChange={handleChange} value={formData.description} />
          <label htmlFor="startingPrice">Starting Price:</label>
          <input type="number" id="startingPrice" name="startingPrice" min="0" step="1" required value={formData.startingPrice} onChange={handleChange} />
          <label htmlFor="endTime">End Time:</label>
          <input type="datetime-local" id="endTime" name="endingTime" required value={formData.endingTime} onChange={handleChange} />
          <button type="submit"
            disabled={isLoading}
          >Create Auction</button>
        </form>
      </div>
    </main>
  );
};

export default CreateAuctionScreen;
