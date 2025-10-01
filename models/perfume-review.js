const mongoose = require('mongoose');

const perfumeReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
}, {
  timestamps: true,
});

const PerfumeReview = mongoose.model('PerfumeReview', perfumeReviewSchema);

module.exports = PerfumeReview;
