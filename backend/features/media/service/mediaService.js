import { db } from '../../../db/index.js';
import { media_upload } from '../../../db/schema/media.js';
import { devices } from '../../../db/schema/device.js';
import { eq } from 'drizzle-orm'; // ✅ ADD THIS LINE


export const saveMediaRecord = async ({ device_id, user_id, image_path }) => {
  return db.insert(media_upload).values({
    device_id,
    user_id,
    image_path,
  });
};

export const getMediaByDevice = async (device_id) => {
  return await db
    .select()
    .from(media_upload)
    .where(eq(media_upload.device_id, device_id));
};

export const getDeviceNameById = async (device_id) => {
  const device = await db.query.devices.findFirst({
    where: eq(devices.id, device_id),
  });

  if (!device) {
    throw new Error(`Device not found for ID: ${device_id}`);
  }

  return device.name;
};