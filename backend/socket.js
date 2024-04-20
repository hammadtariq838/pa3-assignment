import Auction from './models/auctionModel.js';
import { Server as ioServer } from 'socket.io';

export const startSocket = (server) => {
  const io = new ioServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinAuction', (id) => {
      console.log(`User joined room for auction ${id}`);
      socket.join(id);
    });

    socket.on('bid', async (data) => {
      const { id, bid, userId } = data;

      try {
        const auction = await Auction.findById(id);
        if (!auction) {
          socket.emit('error', 'Auction does not exist');
          return;
        }

        if (bid <= auction.currentPrice) {
          socket.emit('error', 'Bid must be higher than the current price');
          return;
        }



        // Ensure both ownerId and userId are valid
        if (!auction.ownerId || !userId) {
          socket.emit('error', 'Missing auction owner or user ID');
          return;
        }

        if (auction.ownerId.toString() === userId.toString()) {
          console.log('Owner cannot bid on their own auction');
          io.to(id).emit('error', 'Owner cannot bid on their own auction');
          return;
        }


        auction.currentPrice = bid;
        await auction.save();

        io.to(id).emit('newBid', auction.currentPrice);
      } catch (error) {
        console.error('Error handling bid:', error);
        socket.emit('error', 'Error processing your bid');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
