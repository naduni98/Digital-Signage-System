import express from 'express';
import * as AuthService from '../service/authService.js';
import { z } from 'zod';

const router = express.Router();

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
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
    const { username, password } = req.body;
    const result = await AuthService.login({ username, password });
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
