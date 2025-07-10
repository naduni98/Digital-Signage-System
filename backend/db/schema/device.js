// backend/db/schema/devices.schema.js
import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

export const devices = mysqlTable('devices', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }),
  ip: varchar('ip', { length: 45 }).notNull(),
  status: varchar('status', { length: 10 }).notNull().default('offline'), // "online" / "offline"
  location: varchar('location', { length: 100 }),
  lastSeen: timestamp('last_seen'),
  defaultImage: varchar('default_image', { length: 255 }), // path or URL
});
