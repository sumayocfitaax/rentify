const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: ['house', 'apartment', 'villa', 'office']
  },

  images: {
    type: String,
    required: true
  },
  expense: {
    type: Number,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);