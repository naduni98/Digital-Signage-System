// backend/features/device/device.route.js
import express from 'express';
import {
  getDevices,
  createDevice,
  deleteDevice,
  updateStatus,
  updateImage,
} from '../controller/deviceController.js';
import { requireAuth, requireRole } from '../../../features/auth/middlewear/authMiddlewear.js';

const router = express.Router();

router.get('/',requireAuth, requireRole([1, 2]), getDevices);
router.post('/',requireAuth, requireRole([1, 2]), createDevice);
router.delete('/:id',requireAuth, requireRole([1, 2]), deleteDevice);
router.put('/:id/status',requireAuth, requireRole([1, 2]), updateStatus);
router.put('/:id/image',requireAuth, requireRole([1, 2]), updateImage);



export default router;
