import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../../db/index.js';
import { users } from '../../../db/schema/users.js';
import { eq,or } from 'drizzle-orm';

export const register = async ({ username, password, roleId }) => {
 
    const existingUser = await db
    .select()
    .from(users)
    .where(or(eq(users.username, username), eq(users.username, username)));


  if (existingUser) {
    throw new Error('Username or email already in use');
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, password: hashedPassword, roleId });
};

export const login = async ({ username, password }) => {
  const [user] = await db.select().from(users).where(eq(users.username, username));

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, roleId: user.roleId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, username: user.username, roleId: user.roleId };
};
