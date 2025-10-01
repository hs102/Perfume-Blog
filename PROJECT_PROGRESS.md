# Perfume Blog - Project Progress Tracker

This document tracks the current state of the project based on the ERD diagram and RESTful routes documentation.

---

## ✅ What's Already Done

### Authentication & Core Setup
- [x] **Session-based authentication** - Sign up, sign in, and sign out all work with express-session
- [x] **EJS templates** - Views are rendering properly with EJS
- [x] **User model** - User schema with username, password, and references to brands/reviews
- [x] **Password hashing** - Using bcrypt to hash passwords before saving
- [x] **Authorization middleware** - `isSignedIn` middleware protects routes
- [x] **MongoDB connection** - Connected to MongoDB Atlas
- [x] **Environment variables** - Using dotenv for sensitive config
- [x] **File organization** - Project follows MVC structure (models, views, controllers, middleware)

### Database Models (Based on ERD)
- [x] **User Model** - Includes references to brands[] and reviews[]
- [x] **Brand Model** - With name and owner (User reference)
- [x] **PerfumeReview Model** - With name, notes, owner, and brandId references

### Server & Middleware
- [x] Express server running on port 3000
- [x] Method override for PUT/DELETE requests
- [x] Morgan for HTTP request logging
- [x] Session storage with MongoDB (connect-mongo)
- [x] User data passed to all views via middleware

### Frontend
- [x] **Homepage design** - Matching wireframe with navigation, welcome section, and recent reviews layout
- [x] **Sign up page** - `/auth/sign-up`
- [x] **Sign in page** - `/auth/sign-in`
- [x] **Responsive navigation** - With Login/Sign Up buttons

### Documentation
- [x] **README.md** - Updated with routes images and database schema section
- [x] **PROJECT_STRUCTURE.md** - Detailed breakdown of database schema and routes
- [x] **IMPLEMENTATION_GUIDE.md** - Step-by-step guide for implementing remaining features

---

## 🚧 Phase 1: Brand Management (Next Priority)

### Brand Routes (User-Specific)
All routes follow pattern: `/users/:userId/brands/*`

- [ ] **GET /users/:userId/brands** - Index (display all brands for user)
- [ ] **GET /users/:userId/brands/new** - New (display form to create new brand)
- [ ] **POST /users/:userId/brands** - Create (create new brand)
- [ ] **GET /users/:userId/brands/:brandId** - Show (display specific brand details)
- [ ] **GET /users/:userId/brands/:brandId/edit** - Edit (display form to edit brand)
- [ ] **PUT /users/:userId/brands/:brandId** - Update (update specific brand)
- [ ] **DELETE /users/:userId/brands/:brandId** - Delete (delete specific brand)

### Brand Controller & Views
- [ ] Create `controllers/brands.js` with all 7 RESTful route handlers
- [ ] Create `views/brands/index.ejs` - List all user's brands
- [ ] Create `views/brands/new.ejs` - Form to create new brand
- [ ] Create `views/brands/show.ejs` - Display brand details with associated reviews
- [ ] Create `views/brands/edit.ejs` - Form to edit existing brand

### Brand Authorization
- [ ] Verify user is signed in for all brand routes
- [ ] Verify user owns the brand before allowing edit/update/delete
- [ ] Update user.brands[] array when creating/deleting brands

---

## 🚧 Phase 2: Perfume Review Management

### Review Routes (User-Specific)
All routes follow pattern: `/users/:userId/reviews/*`

- [ ] **GET /users/:userId/reviews** - Index (display all reviews for user)
- [ ] **GET /users/:userId/reviews/new** - New (display form to create new review)
- [ ] **POST /users/:userId/reviews** - Create (create new review)
- [ ] **GET /users/:userId/reviews/:reviewId** - Show (display specific review)
- [ ] **GET /users/:userId/reviews/:reviewId/edit** - Edit (display form to edit review)
- [ ] **PUT /users/:userId/reviews/:reviewId** - Update (update specific review)
- [ ] **DELETE /users/:userId/reviews/:reviewId** - Delete (delete specific review)

### Review Controller & Views
- [ ] Create `controllers/reviews.js` with all 7 RESTful route handlers
- [ ] Create `views/reviews/index.ejs` - List all user's reviews
- [ ] Create `views/reviews/new.ejs` - Form to create new review (with brand dropdown)
- [ ] Create `views/reviews/show.ejs` - Display review details with brand info
- [ ] Create `views/reviews/edit.ejs` - Form to edit existing review

### Review Authorization
- [ ] Verify user is signed in for all review routes
- [ ] Verify user owns the review before allowing edit/update/delete
- [ ] Validate that selected brand exists and belongs to user
- [ ] Update user.reviews[] array when creating/deleting reviews

---

## 🚧 Phase 3: Public Routes & Features

### Public Routes
- [ ] **GET /** - Update homepage to fetch and display recent reviews from database
- [ ] **GET /reviews** - Display all public reviews (all users)
- [ ] **GET /brands** - Display all public brands (all users)

### Public Views
- [ ] Update `views/index.ejs` to pull real data from PerfumeReview collection
- [ ] Create `views/all-reviews.ejs` - Public page showing all reviews
- [ ] Create `views/all-brands.ejs` - Public page showing all brands

### Features
- [ ] Homepage displays 6 most recent reviews with author info
- [ ] Public reviews page with pagination
- [ ] Public brands page showing brand names and review counts
- [ ] Proper navigation between public and user-specific pages

---

## 🎨 UI/UX Improvements

### Styling & Design
- [x] Homepage matches wireframe design
- [ ] Style brand pages (index, new, show, edit)
- [ ] Style review pages (index, new, show, edit)
- [ ] Consistent color scheme across all pages
- [ ] Responsive design for mobile devices
- [ ] Form validation and error messages
- [ ] Success messages for CRUD operations

### User Experience
- [ ] Clear navigation between sections (Home, My Brands, My Reviews, Browse)
- [ ] Show/hide edit/delete buttons based on ownership
- [ ] Loading states for database operations
- [ ] 404 page for not found resources
- [ ] Better error handling and user feedback

---

## 🔧 Code Quality & Testing

### Clean Code
- [ ] Consistent naming conventions
- [ ] Remove console.logs used for debugging
- [ ] Proper error handling in all routes
- [ ] Input validation and sanitization
- [ ] Code comments where needed

### Testing
- [ ] Test all brand CRUD operations
- [ ] Test all review CRUD operations
- [ ] Test authorization (users can't edit others' content)
- [ ] Test public routes work for non-authenticated users
- [ ] Test edge cases (empty forms, invalid IDs, etc.)

---

## 📦 Deployment & Final Steps

### Deployment
- [ ] Deploy to hosting service (Render, Railway, or Heroku)
- [ ] Verify all routes work in production
- [ ] Test with production MongoDB connection
- [ ] Update README with deployment link

### Documentation
- [x] README includes routes documentation
- [x] Database schema documented
- [ ] Add screenshots to README
- [ ] Document all environment variables needed
- [ ] Add "Getting Started" instructions for local development

---

## 💡 Database Relationships to Implement

### User → Brand (One-to-Many)
```javascript
// When creating a brand:
user.brands.push(newBrand._id);
await user.save();

// When deleting a brand:
user.brands.pull(brandId);
await user.save();
```

### User → PerfumeReview (One-to-Many)
```javascript
// When creating a review:
user.reviews.push(newReview._id);
await user.save();

// When deleting a review:
user.reviews.pull(reviewId);
await user.save();
```

### Brand → PerfumeReview (One-to-Many)
```javascript
// When deleting a brand, handle associated reviews:
await PerfumeReview.deleteMany({ brandId: brand._id });
```

---

## 🎯 Immediate Next Steps (In Priority Order)

1. ✅ Database models created (User, Brand, PerfumeReview)
2. ✅ Homepage designed to match wireframe
3. ✅ Documentation updated with routes and schema
4. **Create Brand controller** (`controllers/brands.js`)
5. **Implement Brand routes** in server.js
6. **Build Brand views** (start with new.ejs and index.ejs)
7. **Test Brand CRUD** operations thoroughly
8. **Create Review controller** (`controllers/reviews.js`)
9. **Implement Review routes** in server.js
10. **Build Review views** (with brand selection dropdown)
11. **Test Review CRUD** operations thoroughly
12. **Update homepage** to fetch real reviews from database
13. **Create public routes** for browsing all reviews and brands
14. **Polish UI/UX** and add consistent styling
15. **Deploy** to production
16. **Final testing** and bug fixes

---

## 📋 Stretch Goals (Future Enhancements)

- [ ] User profiles showing all their reviews and brands
- [ ] Search functionality for reviews and brands
- [ ] Filter reviews by brand, rating, or date
- [ ] Rating system for perfumes (1-5 stars)
- [ ] Image upload for perfume bottles
- [ ] Comments on reviews
- [ ] Favorite/bookmark system
- [ ] Social features (follow users, like reviews)
- [ ] Advanced search with multiple filters
- [ ] Export reviews to PDF
- [ ] Email notifications

---

**Last Updated:** October 1, 2025
