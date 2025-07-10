import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 100 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  roleId: int('role_id').notNull(), // FK to user_roles.id
  created_at: timestamp('created_at').defaultNow(),
  last_login: timestamp('last_login').defaultNow(),
});
