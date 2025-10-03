const dotenv = require('dotenv');

dotenv.config();
require('./config/databse.js');
const express = require('express');
const path = require('path');

const app = express();

// khalil and dennis were here :)
// seriously though if you're reading this we hope the code makes sense

const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// Controllers
const authController = require('./controllers/auth.js');
const brandsController = require('./controllers/brands.js');
const reviewsController = require('./controllers/reviews.js');

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE
//
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON bodies for API clients
app.use(express.json());
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// View engine setup for EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session Storage with MongoStore
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Add user variable to all templates
app.use(passUserToView);

// PUBLIC
app.get('/', async (req, res) => {
  try {
    const PerfumeReview = require('./models/perfume-review.js');
    const recentReviews = await PerfumeReview.find()
      .populate('owner', 'username')
      .populate('brandId', 'name')
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.render('index.ejs', { recentReviews });
  } catch (error) {
    console.error(error);
    res.render('index.ejs', { recentReviews: [] });
  }
});

// PUBLIC ROUTES - View brands and reviews (no auth required)
const Brand = require('./models/brand.js');
const PerfumeReview = require('./models/perfume-review.js');

// View all brands
app.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find().populate('owner', 'username').sort({ name: 1 });
    res.render('public/brands.ejs', { brands });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading brands');
  }
});

// View specific brand
app.get('/brands/:brandId', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brandId).populate('owner', 'username');
    const reviews = await PerfumeReview.find({ brandId: req.params.brandId })
      .populate('owner', 'username')
      .sort({ createdAt: -1 });
    
    if (!brand) {
      return res.status(404).send('Brand not found');
    }
    
    res.render('public/brand-detail.ejs', { brand, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading brand');
  }
});

// View all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await PerfumeReview.find()
      .populate('owner', 'username')
      .populate('brandId', 'name')
      .sort({ createdAt: -1 });
    
    res.render('public/reviews.ejs', { reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading reviews');
  }
});

// View specific review
app.get('/reviews/:reviewId', async (req, res) => {
  try {
    const review = await PerfumeReview.findById(req.params.reviewId)
      .populate('owner', 'username')
      .populate('brandId', 'name');
    
    if (!review) {
      return res.status(404).send('Review not found');
    }
    
    res.render('public/review-detail.ejs', { review });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading review');
  }
});

app.use('/auth', authController);
app.use(isSignedIn, brandsController);
app.use(isSignedIn, reviewsController);

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
