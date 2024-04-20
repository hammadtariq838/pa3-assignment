import mongoose from 'mongoose';

const { Schema } = mongoose;

const auctionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startingPrice: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  startingTime: {
    type: Date,
    required: true
  },
  endingTime: {
    type: Date,
    required: true
  }
});

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
