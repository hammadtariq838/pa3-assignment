import express from 'express';
import {
  createAuction,
  getAuctions,
  getMyAuctions,
  getAuctionById
} from '../controllers/auctionController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/')
  .get(protect, getAuctions)
  .post(protect, createAuction);
router.route('/:id')
  .get(protect, getAuctionById);
router.route('/my-auctions')
  .get(protect, getMyAuctions);

export default router;
