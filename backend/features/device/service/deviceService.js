// backend/features/device/device.service.js
import { db } from '../../../db/index.js';
import { devices } from '../../../db/schema/device.js';

import { eq } from 'drizzle-orm';

export const getAllDevices = async () => db.select().from(devices);

export const addDevice = async (device) =>{
  if (!device.name || !device.ip){
    throw new Error("Invalid device payload");
  } 
 await db.insert(devices).values({
    name: device.name,
    ip: device.ip,
    location: device.location,
    status: 'offline',
    lastSeen: new Date(),
    defaultImage: null
  });
};
export const removeDevice = async (id) =>
  db.delete(devices).where(eq(devices.id, id));

export const updateDeviceStatus = async (id, status, timestamp) =>{
  const lastSeen = new Date(timestamp);

 return db
    .update(devices)
    .set({ status, lastSeen }) // ✅ use the declared variable
    .where(eq(devices.id, Number(id)));
};

export const setDeviceImage = async (id, imageUrl) =>
  db.update(devices)
    .set({ defaultImage: imageUrl })
    .where(eq(devices.id, id));
