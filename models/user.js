const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerfumeReview',
  }],
  brands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  }],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
