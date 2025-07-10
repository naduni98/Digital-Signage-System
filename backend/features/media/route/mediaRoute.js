import express from 'express';
import { uploadBase64Media, fetchMediaByRoom } from '../controller/mediaController.js';
import { upload } from '../middlewear/mediaMiddlewear.js';
import { requireAuth } from '../../auth/middlewear/authMiddlewear.js';

const router = express.Router();

router.post('/base64', requireAuth, uploadBase64Media);
router.get('/by-room/:device_id', requireAuth, fetchMediaByRoom);
export default router;
