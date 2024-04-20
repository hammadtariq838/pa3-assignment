import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { startSocket } from './socket.js';
import http from 'http';

const port = process.env.PORT || 5000;
connectDB();

const app = express();
const server = http.createServer(app);
startSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

app.use(notFound);
app.use(errorHandler);


server.listen(port, () => console.log(`Server started on port ${port}`));