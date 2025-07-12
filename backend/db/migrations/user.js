// migrations/createUsersTable.js or wherever you're managing migration
import { db } from '../index.js';
import { users } from '../schema/users.js';
import bcrypt from 'bcrypt';

// Helper to insert default user
async function insertDefaultAdminUser() {
  const hashedPassword = await bcrypt.hash('admin', 10);

  await db.insert(users).values({
    username: 'admin',
    password: hashedPassword,
    roleId: 2, // Assuming 2 = Admin
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@gmail.com',
    status: 1, // Active
    user_id: 'PGN0001' // If applicable and handled manually here
  });
}

// Call this function after migration
await insertDefaultAdminUser();
