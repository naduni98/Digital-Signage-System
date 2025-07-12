import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../../db/index.js';
import { users } from '../../../db/schema/users.js';
import { userRoles } from '../../../db/schema/user_roles.js';
import { eq,or,desc } from 'drizzle-orm';

export const register = async ({ username, password, roleId,firstName, lastName, email,avatar }) => {
 
    const existingUser = await db
    .select()
    .from(users)
    .where(or(eq(users.username, username), eq(users.email, email)));

console.log('existingUser result:', existingUser); 
  if (existingUser.length > 0) {
    throw new Error('Username or email already in use');
  }
  // 🔢 Step 1: Count existing users
  const countResult = await db.select().from(users);
  const nextNumber = countResult.length + 1;

  // 🆔 Step 2: Format userId like PGN01, PGN02...
  const formattedUserId = `PGN${String(nextNumber).padStart(4, '0')}`;

 
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(users).values({ userId: formattedUserId,username, password: hashedPassword, firstName,
    lastName,
    email,
    roleId,
  avatar });
};

export const login = async ({ email, password }) => {
  const [user] = await db.select().from(users).where(eq(users.email, email),eq(users.status, 1));
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



// export const getAllUsers = async () => {
//   const allUsers = await db.select().from(users).where(eq(users.status, 1)).orderBy(desc(users.created_at));
//   return allUsers;
// };

export const getAllUsers = async () => {
  const rows = await db
    .select({
      id: users.id,
      userId: users.userId,
      username: users.username,
      email: users.email,
      roleId: users.roleId,
      roleName: userRoles.roleName, // joined
      status: users.status,
      created_at: users.created_at,
      last_login: users.last_login,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users)
    .leftJoin(userRoles, eq(users.roleId, userRoles.id))
    .where(eq(users.status, 1));

  return rows;
};

export const softDeleteUser = async (id) => {
  await db.update(users)
    .set({ status: 0 })
    .where(eq(users.id, id));
};

export const reactivateUser = async (id) => {
  await db.update(users)
    .set({ status: 1 })
    .where(eq(users.id, id));
};

