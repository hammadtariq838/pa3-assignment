import asyncHandler from 'express-async-handler';
import Auction from '../models/auctionModel.js';


// @desc    Get Auctions
// @route   GET /api/auctions
// @access  Public
const getAuctions = asyncHandler(async (req, res) => {
  const search = req.query.search || '';

  try {
    const query = {
      endingTime: { $gt: new Date() }, // Filters out auctions that have not yet ended
      ...(search && {
        title: { $regex: new RegExp(search, 'i') } // Case-insensitive regex search
      })
    };

    const auctions = await Auction.find(query);
    res.json(auctions);
  } catch (error) {
    res.status(500).send('Error fetching auctions');
  }
});

// @desc Get My Auctions
// @route GET /api/auctions/my-auctions
// @access Private
const getMyAuctions = asyncHandler(async (req, res) => {
  try {
    const auctions = await Auction.find({ user: req.user._id });
    res.json(auctions);
  } catch (error) {
    res.status(500).send('Error fetching auctions');
  }
});

// @desc  Get auction by ID
// @route GET /api/auctions/:id
// @access Public
const getAuctionById = asyncHandler(async (req, res) => {
  try {

    const auction = await Auction.findById(req.params.id);

    if (auction) {
      res.json(auction);
    }
    else {
      res.status(404);
      throw new Error('Auction not found');
    }
  }
  catch (error) {
    res.status(500);
    console.error(error);
    throw new Error('Error fetching auction');
  }
});

// @desc  Create new auction
// @route POST /api/auctions
// @access Private
const createAuction = asyncHandler(async (req, res) => {
  const { title, description, startingPrice, endingTime } = req.body;

  if (!title || !description || !startingPrice || !endingTime) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  try {
    const auction = new Auction({
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      endingTime,
      startingTime: new Date(),
      ownerId: req.user._id,
    });

    const createdAuction = await auction.save();
    res.status(201).json(createdAuction);
  }
  catch (error) {
    res.status(500);
    throw new Error('Error creating auction');
    console.error(error);
  }
});

export {
  createAuction,
  getAuctions,
  getMyAuctions,
  getAuctionById,
}