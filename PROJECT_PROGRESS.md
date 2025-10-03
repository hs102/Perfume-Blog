# Perfume Blog - Project Progress

Quick tracker of what I built and what's left to do.

---

## Done

### Initial Setup
- [x] Set up MEN stack template (MongoDB, Express, Node)
- [x] User authentication (sign up, sign in, sign out)
- [x] Session management with bcrypt
- [x] Database models (User, Brand, Review)

### Design & Pages
- [x] Homepage with wireframe design
- [x] Auth pages (sign up/sign in) with CSS
- [x] Homepage structure + added images to README

### Brand CRUD
- [x] All 7 RESTful routes for brands
- [x] Views: index, new, show, edit
- [x] Authorization (users can only edit their own brands)

### Review CRUD  
- [x] All 7 RESTful routes for reviews
- [x] Views: index, new, show, edit
- [x] Brand dropdown in create form
- [x] Authorization (users can only edit their own reviews)

### Homepage Updates
- [x] Display real reviews from database (removed dummy data)
- [x] Dynamic navigation based on login status
- [x] Recent reviews section with author info

### Public Access
- [x] Public pages for viewing all brands and reviews
- [x] Guest users can browse without signing up
- [x] Edit buttons only show for content owners

### Deployment
- [x] Deployed to Render
- [x] Connected to MongoDB Atlas
- [x] Live at: https://perfume-blog.onrender.com

---

## Todo (if i have time)

- [ ] Add search functionality
- [ ] Image uploads for perfume bottles
- [ ] Rating system (1-5 stars)
- [ ] Better error pages (404, 500)

---

## Notes

The app is fully functional but could use some polish. Main functionality works well - users can create brands and reviews, everything is protected, and guests can browse.

---

Last Updated: October 4, 2025
(made by yaseen with help from instructors khalil and dennis 🌚)
