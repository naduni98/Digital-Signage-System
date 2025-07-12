import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import bcrypt from 'bcrypt';
import { desc } from 'drizzle-orm';

async function seedAdmin() {
  try {
    // Get the last user_id from the DB
    const userId = 'PGN0001';
    const hashedPassword = await bcrypt.hash('admin', 10);

    await db.insert(users).values({
      userId,                 
      username: 'admin',
      password: hashedPassword,
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@gmail.com',
      roleId: 2,
      status: 1
    });

    console.log('Admin user seeded successfully');
  } catch (err) {
    console.error('Seeder error:', err);
  }
}

await seedAdmin();

//run this for create admin user - node scripts/seedAdmin.js