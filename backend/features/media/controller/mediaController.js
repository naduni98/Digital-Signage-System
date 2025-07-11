import fs from 'fs';
import path from 'path';
import { saveMediaRecord,getMediaByDevice,getDeviceNameById} from '../service/mediaService.js';

export const uploadBase64Media = async (req, res) => {
  try {
    const { device_id, image_data } = req.body;
    const device_name = await getDeviceNameById(device_id);
    const user_id = req.user.id;

    if (!device_id || !image_data) {
      return res.status(400).json({ error: 'device_name and image_data are required' });
    }

    // Extract base64 data
    const matches = image_data.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 format' });
    }

    const mimeType = matches[1]; // e.g., 'image/jpeg'
    const extension = mimeType.split('/')[1]; // e.g., 'jpeg'
    const base64Data = matches[2];
    const filename = `${Date.now()}.${extension}`;

    const uploadPath = path.join('media', device_name);
    fs.mkdirSync(uploadPath, { recursive: true });

    const filePath = path.join(uploadPath, filename);

    // Save file
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    // Store DB record
    await saveMediaRecord({ device_id, user_id, image_path: filePath });

    res.status(201).json({ message: 'Media uploaded successfully', path: filePath });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Media upload failed' });
  }
};

export const fetchMediaByRoom = async (req, res) => {
  try {
    const { device_id } = req.params;

    if (!device_id) {
      return res.status(400).json({ error: 'device_name is required' });
    }

    const mediaList = await getMediaByDevice(device_id);

    // Optional: convert local file paths to URLs
    const formatted = mediaList.map((media) => ({
      ...media,
      url: `/media/${media.device_id}/${media.image_path.split('/').pop()}`
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Fetch media failed:', err);
    res.status(500).json({ error: 'Failed to fetch media files' });
  }
};