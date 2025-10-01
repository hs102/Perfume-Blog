# Perfume Blog - Project Progress Tracker

Hey! This document tracks where we're at with the project requirements. I'll be updating this as I go.

---

## ✅ What's Already Done

### Authentication & Core Setup
- [x] **Session-based authentication** - Sign up, sign in, and sign out all work with express-session
- [x] **EJS templates** - Views are rendering properly with EJS
- [x] **User model** - Got the User schema set up with username and password
- [x] **Password hashing** - Using bcrypt to hash passwords before saving
- [x] **Authorization middleware** - `isSignedIn` middleware protects routes
- [x] **MongoDB connection** - Connected to MongoDB Atlas and it's working
- [x] **Environment variables** - Using dotenv for sensitive config
- [x] **File organization** - Project follows MVC structure (models, views, controllers, middleware)

### Server & Middleware
- [x] Express server running on port 3000
- [x] Method override for PUT/DELETE requests
- [x] Morgan for HTTP request logging
- [x] Session storage with MongoDB (connect-mongo)
- [x] User data passed to all views via middleware

---

## 🚧 What Still Needs to Be Done

### MVP Requirements

#### Data Model & CRUD
- [ ] **Add a Perfume model** (or whatever the main entity is)
  - Needs to have a relationship with User (like userId field)
  - Should include fields like: name, brand, notes, rating, image, etc.
- [ ] **Implement full CRUD for perfumes**
  - CREATE: Form to add new perfume reviews
  - READ: Show all perfumes, show individual perfume details
  - UPDATE: Edit existing perfume reviews
  - DELETE: Remove perfume reviews
- [ ] **Authorization on CRUD operations**
  - Only signed-in users can create/edit/delete
  - Users can only edit/delete their own perfumes

#### Routing
- [ ] Set up RESTful routes for perfumes
  - GET /perfumes (index)
  - GET /perfumes/new (form)
  - POST /perfumes (create)
  - GET /perfumes/:id (show)
  - GET /perfumes/:id/edit (edit form)
  - PUT /perfumes/:id (update)
  - DELETE /perfumes/:id (delete)

#### Controllers
- [ ] Create a perfumes controller to handle all perfume-related logic
- [ ] Move route handlers into the controller

### UI/UX Requirements

#### Styling & Design
- [ ] **Create a visual theme**
  - Pick a color palette (maybe something elegant for perfumes?)
  - Apply consistent styling across all pages
- [ ] **Use CSS Flexbox or Grid** for layouts
- [ ] **Style all buttons** - Right now they're just default HTML buttons
- [ ] **Add navigation menu** - Links to Home, All Perfumes, Add Perfume, Sign Out
- [ ] **Check color contrast** - Make sure text is readable (WCAG AA standards)
- [ ] **Pre-fill edit forms** - When editing a perfume, show current values
- [ ] **Add alt text to images** - For accessibility
- [ ] **Hide edit/delete UI** - Only show to the perfume's creator

#### User Experience
- [ ] Make the site easy to navigate for first-time users
- [ ] Ensure no text overlaps images in an inaccessible way
- [ ] Add a proper home page explaining what the site is about

### Code Quality

#### Clean Code
- [ ] Remove any console.logs used for debugging
- [ ] Delete commented-out code sections
- [ ] Check for dead code (unused functions/routes)
- [ ] Verify proper indentation throughout
- [ ] Use plural names for arrays (like `perfumes`, not `perfume`)
- [ ] Make sure there are no errors in terminal or browser console

### Git & GitHub

#### Repository
- [ ] **Rename the repo** if needed - "Perfume-Blog" is good!
- [ ] **Commit regularly** with descriptive messages
  - Current status: Need to start making commits that show incremental progress
- [ ] Make sure I'm the only contributor shown on GitHub
- [ ] Keep the repo public

### README

#### Documentation
- [ ] Add a screenshot of the app (or logo)
- [ ] Write a description of what the app does
- [ ] Include a "Getting Started" section
  - Link to deployed app
  - Link to planning materials (Trello/wireframes?)
- [ ] List technologies used
- [ ] Add attributions for any external resources
- [ ] Document "Next Steps" (future enhancements/stretch goals)

### Deployment
- [ ] **Deploy to a hosting service** (Render, Railway, or Heroku)
- [ ] Make sure the deployed app works properly
- [ ] Add deployment link to README

---

## 💡 Ideas for the Perfume Model

Just brainstorming what fields might make sense:

```javascript
{
  name: String (required),
  brand: String,
  description: String,
  notes: {
    top: String,
    middle: String,
    base: String
  },
  rating: Number (1-5 or 1-10),
  season: String (Spring, Summer, Fall, Winter),
  occasion: String (Daily, Evening, Special),
  imageUrl: String,
  userId: ObjectId (reference to User who created it),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Next Steps (In Order)

1. **Create the Perfume model** with relationship to User
2. **Build out CRUD routes and controller** for perfumes
3. **Create views** for perfume index, show, new, and edit
4. **Add basic CSS styling** - start with layout and color scheme
5. **Test authorization** - make sure users can only edit their own stuff
6. **Clean up code** - remove console.logs, check indentation
7. **Write the README** properly
8. **Deploy the app**
9. **Final testing** - go through everything one more time
10. **Prepare presentation**

---

## 📝 Notes to Self

- The authentication system is solid, so I can focus on building the perfume CRUD functionality
- Need to think about whether to allow public viewing of perfumes (guests can see but not edit) or make everything require login
- Should probably add some sample/seed data to make the app look nice during presentation
- Consider adding a search or filter feature as a stretch goal
- Maybe add ability to "favorite" other users' perfume reviews?

---

**Last Updated:** October 1, 2025
