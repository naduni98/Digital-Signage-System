// backend/features/device/device.route.js
import express from 'express';
import {
  getDevices,
  createDevice,
  deleteDevice,
  updateStatus,
  updateImage,
} from '../controller/deviceController.js';

const router = express.Router();

router.get('/', getDevices);
router.post('/', createDevice);
router.delete('/:id', deleteDevice);
router.put('/:id/status', updateStatus);
router.put('/:id/image', updateImage);



export default router;
