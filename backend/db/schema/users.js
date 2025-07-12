// db/schema/users.js
import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 10 }).notNull(),
  username: varchar('username', { length: 100 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  email: varchar('email', { length: 255 }),
  roleId: int('role_id').notNull(), // FK to user_roles.id
  status: int('status').default(1),
  created_at: timestamp('created_at').defaultNow(),
  last_login: timestamp('last_login').defaultNow(),
});
