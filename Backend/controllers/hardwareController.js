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
    const hardware = new Hardware(req.body);
    await hardware.save();
    res.status(201).json(hardware);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hardware', error: error.message });
  }
};

exports.updateHardware = async (req, res) => {
  try {
    const hardware = await Hardware.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
      res.status(204).send("Hardware deleted");
    } else {
      res.status(404).json({ message: 'Hardware not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hardware', error: error.message });
  }
};