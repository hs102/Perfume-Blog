const express = require('express');
const router = express.Router();
const Brand = require('../models/brand.js');
const PerfumeReview = require('../models/perfume-review.js');

// Index - Show all brands for a user
router.get('/users/:userId/brands', async (req, res) => {
  try {
    const brands = await Brand.find({ owner: req.params.userId }).sort({ name: 1 });
    res.render('brands/index.ejs', { brands });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading brands');
  }
});

// New - Show form to create new brand
router.get('/users/:userId/brands/new', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    res.render('brands/new.ejs', { userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading form');
  }
});

// Create - Create new brand
router.post('/users/:userId/brands', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const newBrand = new Brand({
      name: req.body.name,
      owner: req.params.userId
    });
    
    await newBrand.save();
    res.redirect(`/users/${req.params.userId}/brands`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating brand');
  }
});

// Show - Display specific brand
router.get('/users/:userId/brands/:brandId', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brandId);
    const reviews = await PerfumeReview.find({ brandId: req.params.brandId }).sort({ createdAt: -1 });
    
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    
    res.render('brands/show.ejs', { brand, reviews, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading brand');
  }
});

// Edit - Show form to edit brand
router.get('/users/:userId/brands/:brandId/edit', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const brand = await Brand.findById(req.params.brandId);
    
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    
    if (brand.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    res.render('brands/edit.ejs', { brand, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit form');
  }
});

// Update - Update specific brand
router.put('/users/:userId/brands/:brandId', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const brand = await Brand.findById(req.params.brandId);
    
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    
    if (brand.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    brand.name = req.body.name;
    await brand.save();
    
    res.redirect(`/users/${req.params.userId}/brands/${req.params.brandId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating brand');
  }
});

// Delete - Delete specific brand
router.delete('/users/:userId/brands/:brandId', async (req, res) => {
  try {
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    const brand = await Brand.findById(req.params.brandId);
    
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    
    if (brand.owner.toString() !== req.params.userId) {
      return res.status(403).send('Unauthorized');
    }
    
    // Delete all reviews associated with this brand
    await PerfumeReview.deleteMany({ brandId: req.params.brandId });
    
    // Delete the brand
    await Brand.findByIdAndDelete(req.params.brandId);
    
    res.redirect(`/users/${req.params.userId}/brands`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting brand');
  }
});

module.exports = router;
