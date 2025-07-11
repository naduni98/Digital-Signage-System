// backend/features/device/device.controller.js
import * as DeviceService from "../service/deviceService.js";

export const getDevices = async (req, res) => {
  try {
    const data = await DeviceService.getAllDevices();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDevice = async (req, res) => {
  try {
    await DeviceService.addDevice(req.body);
    res.status(201).json({ message: "Device added" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    await DeviceService.removeDevice(req.params.id);
    res.json({ message: "Device removed" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, timestamp } = req.body;
    await DeviceService.updateDeviceStatus(req.params.id, status, timestamp);
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateImage = async (req, res) => {
  try {
    await DeviceService.setDeviceImage(req.params.id, req.body.imageUrl);
    res.json({ message: "Image updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
