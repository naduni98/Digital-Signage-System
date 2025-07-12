import express from 'express';
import * as AuthService from '../service/authService.js';
import { requireAuth, requireRole } from '../middlewear/authMiddlewear.js';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const router = express.Router();

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  roleId: z.number().int(),
});

router.post('/register', async (req, res) => {
  try {
    const data = userSchema.parse(req.body);
    await AuthService.register(data);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {  email, password } = req.body;
    const result = await AuthService.login({  email, password });
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
// GET all users (only for roleId 1 or 2)
router.get('/users', requireAuth, requireRole([1, 2]), async (req, res) => {
  try {
    const users = await AuthService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/soft-delete/:id', requireAuth, requireRole([1]), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await AuthService.softDeleteUser(userId);
    res.json({ message: 'User deactivated (soft deleted)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/reactivate/:id', requireAuth, requireRole([1, 2]), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await AuthService.reactivateUser(userId);
    res.json({ message: 'User reactivated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
