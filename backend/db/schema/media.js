import { mysqlTable, varchar, int, serial, timestamp } from 'drizzle-orm/mysql-core';
import { devices } from './device.js';


export const media_upload = mysqlTable('media_upload', {
  id: serial('id').primaryKey(),
  device_id: int('device_id').notNull().references(() => devices.id), // ✅ foreign key
  user_id: int('user_id').notNull(),
  image_path: varchar('image_path', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
