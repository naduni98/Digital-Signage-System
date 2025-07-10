import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const userRoles = mysqlTable('user_roles', {
  id: int('id').primaryKey().autoincrement(),
  roleName: varchar('role_name', { length: 50 }).notNull(), // 'superadmin', 'admin', 'user'
  created_at: timestamp('last_seen').defaultNow(),
});
