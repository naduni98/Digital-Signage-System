// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import deviceRoutes from './features/device/route/deviceRoute.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/devices', deviceRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
