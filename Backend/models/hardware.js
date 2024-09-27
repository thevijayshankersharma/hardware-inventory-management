const mongoose = require('mongoose');

const hardwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Available', 'In Use', 'Under Maintenance'],
    default: 'Available'
  },
  location: String,
  purchaseDate: Date,
  lastMaintenanceDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Hardware', hardwareSchema);