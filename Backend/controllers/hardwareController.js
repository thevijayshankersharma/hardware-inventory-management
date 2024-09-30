const Hardware = require('../models/hardware');

exports.getAllHardware = async (req, res) => {
  try {
    const hardware = await Hardware.find();
    res.json(hardware);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hardware', error: error.message });
  }
};

exports.getHardwareById = async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);
    if (hardware) {
      res.json(hardware);
    } else {
      res.status(404).json({ message: 'Hardware not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hardware', error: error.message });
  }
};

exports.createHardware = async (req, res) => {
  try {
    const { name, type, serialNumber, status, location } = req.body;
    
    if (!name || !type || !serialNumber) {
      return res.status(400).json({ message: 'Name, type, and serial number are required fields' });
    }

    const existingHardware = await Hardware.findOne({ serialNumber });
    if (existingHardware) {
      return res.status(400).json({ message: 'A hardware item with this serial number already exists' });
    }

    const hardware = new Hardware({
      name,
      type,
      serialNumber,
      status: status || 'Available',
      location
    });

    await hardware.save();
    res.status(201).json(hardware);
  } catch (error) {
    console.error('Error creating hardware:', error);
    res.status(400).json({ message: 'Error creating hardware', error: error.message });
  }
};

exports.updateHardware = async (req, res) => {
  try {
    const { name, type, serialNumber, status, location } = req.body;
    
    if (!name || !type || !serialNumber) {
      return res.status(400).json({ message: 'Name, type, and serial number are required fields' });
    }

    const hardware = await Hardware.findByIdAndUpdate(
      req.params.id, 
      { name, type, serialNumber, status, location },
      { new: true, runValidators: true }
    );

    if (hardware) {
      res.json(hardware);
    } else {
      res.status(404).json({ message: 'Hardware not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating hardware', error: error.message });
  }
};

exports.deleteHardware = async (req, res) => {
  try {
    const hardware = await Hardware.findByIdAndDelete(req.params.id);
    if (hardware) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Hardware not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hardware', error: error.message });
  }
};