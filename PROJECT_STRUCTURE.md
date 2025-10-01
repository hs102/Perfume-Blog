# Perfume Blog - Project Structure

## Database Schema (ERD)

### User Model
- `_id`: ObjectId (Primary Key)
- `username`: String
- `password`: String (hashed)
- `reviews`: Array of PerfumeReview references
- `brands`: Array of Brand references

**Relationships:**
- One User can create many PerfumeReviews (owns)
- One User can create many Brands (creates)

### Brand Model
- `_id`: ObjectId (Primary Key)
- `name`: String
- `owner`: ObjectId (reference to User)

**Relationships:**
- Many-to-One with User (a brand is created by one user)
- One-to-Many with PerfumeReview (categorizes many reviews)

### PerfumeReview Model
- `_id`: ObjectId (Primary Key)
- `name`: String (perfume name)
- `notes`: String (review notes/description)
- `owner`: ObjectId (reference to User who created the review)
- `brandId`: ObjectId (reference to Brand)

**Relationships:**
- Many-to-One with User (a review is owned by one user)
- Many-to-One with Brand (a review belongs to one brand)

---

## Application Routes

### Authentication Routes
| Action | Route | HTTP Verb | Description |
|--------|-------|-----------|-------------|
| Sign Up Form | `/auth/sign-up` | GET | Display sign up form |
| Sign Up | `/auth/sign-up` | POST | Create new user account |
| Sign In Form | `/auth/sign-in` | GET | Display login form |
| Sign In | `/auth/sign-in` | POST | Authenticate user |
| Sign Out | `/auth/sign-out` | GET | Logout user |

### Brand Routes (User-Specific)
| Action | Route | HTTP Verb | Description |
|--------|-------|-----------|-------------|
| Index | `/users/:userId/brands` | GET | Display all brands for user |
| New | `/users/:userId/brands/new` | GET | Display form to create new brand |
| Create | `/users/:userId/brands` | POST | Create new brand |
| Show | `/users/:userId/brands/:brandId` | GET | Display specific brand details |
| Edit | `/users/:userId/brands/:brandId/edit` | GET | Display form to edit brand |
| Update | `/users/:userId/brands/:brandId` | PUT | Update specific brand |
| Delete | `/users/:userId/brands/:brandId` | DELETE | Delete specific brand |

### Perfume Review Routes (User-Specific)
| Action | Route | HTTP Verb | Description |
|--------|-------|-----------|-------------|
| Index | `/users/:userId/reviews` | GET | Display all reviews for user |
| New | `/users/:userId/reviews/new` | GET | Display form to create new review |
| Create | `/users/:userId/reviews` | POST | Create new review |
| Show | `/users/:userId/reviews/:reviewId` | GET | Display specific review |
| Edit | `/users/:userId/reviews/:reviewId/edit` | GET | Display form to edit review |
| Update | `/users/:userId/reviews/:reviewId` | PUT | Update specific review |
| Delete | `/users/:userId/reviews/:reviewId` | DELETE | Delete specific review |

### General Routes (Public)
| Action | Route | HTTP Verb | Description |
|--------|-------|-----------|-------------|
| Home | `/` | GET | Display homepage with recent reviews |
| All Reviews | `/reviews` | GET | Display all public reviews |
| All Brands | `/brands` | GET | Display all public brands |

---

## Application Flow

### For Guest Users (Not Logged In):
1. Visit homepage to see recent reviews
2. Browse all public reviews and brands
3. Sign up to create an account
4. Sign in with credentials

### For Authenticated Users:
1. Sign in to access personal dashboard
2. Create and manage brands (CRUD operations)
3. Create and manage perfume reviews (CRUD operations)
4. Link reviews to specific brands
5. View their personal collection of brands and reviews
6. Sign out when done

---

## Key Features to Implement

### Phase 1 (Current - Authentication) ✅
- [x] User registration and authentication
- [x] Session management
- [x] Password hashing and security
- [x] Basic homepage design

### Phase 2 (Brand Management) 🚧
- [ ] Create Brand model and schema
- [ ] Implement Brand CRUD routes
- [ ] Create Brand views (index, new, show, edit)
- [ ] Link brands to user accounts

### Phase 3 (Review Management) 🚧
- [ ] Create PerfumeReview model and schema
- [ ] Implement Review CRUD routes
- [ ] Create Review views (index, new, show, edit)
- [ ] Link reviews to brands and users

### Phase 4 (Public Features) 📋
- [ ] Public reviews page showing all reviews
- [ ] Public brands page showing all brands
- [ ] Search and filter functionality
- [ ] Rating system

### Phase 5 (Enhancement) 📋
- [ ] User profiles
- [ ] Image uploads for perfumes
- [ ] Comments on reviews
- [ ] Favorite/bookmark system
- [ ] Advanced search and filtering

---

## Technical Considerations

### Security
- Passwords are hashed using bcrypt
- Session-based authentication with express-session
- User-specific routes require authentication middleware
- Authorization checks to ensure users can only edit/delete their own content

### Database Design
- MongoDB with Mongoose ODM
- Proper references between collections
- Indexes on frequently queried fields (user IDs, brand IDs)

### User Experience
- Responsive design for mobile and desktop
- Intuitive navigation
- Clear feedback for user actions
- Form validation and error handling

### Code Organization
- MVC pattern (Models, Views, Controllers)
- Middleware for authentication and authorization
- Modular route handlers
- Reusable view components (EJS partials)
