import { requireAuth, requireRole } from '../middlewear/authMiddlewear.js';
import { db } from '../../../../config/db.js'; // adjust as needed
import { users } from '../model/userModel.js'; // adjust as needed
import { eq, and } from 'drizzle-orm';

router.get('/users', requireAuth, requireRole([1, 2]), async (req, res) => {
  try {
    const result = await db.select().from(users);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
