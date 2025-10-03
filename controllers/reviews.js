const express = require('express');
const router = express.Router();
const PerfumeReview = require('../models/perfume-review.js');
const Brand = require('../models/brand.js');

// reviews controller - dennis wrote most of this at 2am, khalil fixed the bugs later

// Index - Show all reviews for a user
router.get('/users/:userId/reviews', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const reviews = await PerfumeReview.find({ owner: req.params.userId })
      .populate('brandId', 'name')
      .sort({ createdAt: -1 });
    
    res.render('reviews/index.ejs', { reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading reviews');
  }
});

// New - Show form to create new review
router.get('/users/:userId/reviews/new', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const brands = await Brand.find({ owner: req.params.userId }).sort({ name: 1 });
    res.render('reviews/new.ejs', { brands, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading form');
  }
});

// Create - Create new review
router.post('/users/:userId/reviews', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const newReview = new PerfumeReview({
      name: req.body.name,
      notes: req.body.notes,
      owner: req.params.userId,
      brandId: req.body.brandId
    });
    
    await newReview.save();
    res.redirect(`/users/${req.params.userId}/reviews`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating review');
  }
});

// Show - Display specific review
router.get('/users/:userId/reviews/:reviewId', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const review = await PerfumeReview.findById(req.params.reviewId)
      .populate('brandId', 'name')
      .populate('owner', 'username');
    
    if (!review) {
      return res.status(404).send('Review not found');
    }
    
    res.render('reviews/show.ejs', { review, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading review');
  }
});

// Edit - Show form to edit review
router.get('/users/:userId/reviews/:reviewId/edit', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const review = await PerfumeReview.findById(req.params.reviewId);
    const brands = await Brand.find({ owner: req.params.userId }).sort({ name: 1 });
    
    if (!review) {
      return res.status(404).send('Review not found');
    }
    
    if (review.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    res.render('reviews/edit.ejs', { review, brands, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit form');
  }
});

// Update - Update specific review
router.put('/users/:userId/reviews/:reviewId', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const review = await PerfumeReview.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).send('Review not found');
    }
    
    if (review.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    review.name = req.body.name;
    review.notes = req.body.notes;
    review.brandId = req.body.brandId;
    
    await review.save();
    
    res.redirect(`/users/${req.params.userId}/reviews/${req.params.reviewId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating review');
  }
});

// Delete - Delete specific review
router.delete('/users/:userId/reviews/:reviewId', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const review = await PerfumeReview.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).send('Review not found');
    }
    
    if (review.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    await PerfumeReview.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/users/${req.params.userId}/reviews`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting review');
  }
});

module.exports = router;
