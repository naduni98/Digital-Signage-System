// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './features/auth/route/authRoute.js';
import { requireAuth, requireRole } from './features/auth/middlewear/authMiddlewear.js';
import deviceRoutes from './features/device/route/deviceRoute.js';
import mediaRoutes from './features/media/route/mediaRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Protected example
app.get('/api/admin-only', requireAuth, requireRole([1, 2]), (req, res) => {
  res.json({ message: `Hello Admin or Super Admin ${req.user.username}` });
});

app.use('/api/devices', deviceRoutes);

app.use('/api/media', mediaRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
