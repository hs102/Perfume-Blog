# Perfume Blog - Quick Route Reference

## Authentication Routes (Public)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/sign-up` | Display sign up form |
| POST | `/auth/sign-up` | Create new user account |
| GET | `/auth/sign-in` | Display login form |
| POST | `/auth/sign-in` | Authenticate user |
| GET | `/auth/sign-out` | Logout user |

## General Routes (Public)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Display homepage with recent reviews |
| GET | `/reviews` | Display all public reviews |
| GET | `/brands` | Display all public brands |

## Brand Routes (User-Specific, Protected)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users/:userId/brands` | Display all brands for user |
| GET | `/users/:userId/brands/new` | Display form to create new brand |
| POST | `/users/:userId/brands` | Create new brand |
| GET | `/users/:userId/brands/:brandId` | Display specific brand details |
| GET | `/users/:userId/brands/:brandId/edit` | Display form to edit brand |
| PUT | `/users/:userId/brands/:brandId` | Update specific brand |
| DELETE | `/users/:userId/brands/:brandId` | Delete specific brand |

## Perfume Review Routes (User-Specific, Protected)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users/:userId/reviews` | Display all reviews for user |
| GET | `/users/:userId/reviews/new` | Display form to create new review |
| POST | `/users/:userId/reviews` | Create new review |
| GET | `/users/:userId/reviews/:reviewId` | Display specific review |
| GET | `/users/:userId/reviews/:reviewId/edit` | Display form to edit review |
| PUT | `/users/:userId/reviews/:reviewId` | Update specific review |
| DELETE | `/users/:userId/reviews/:reviewId` | Delete specific review |

---

## Implementation Notes

### All user-specific routes require:
1. `isSignedIn` middleware - Verify user is authenticated
2. User ID verification - Ensure the :userId matches the logged-in user
3. Ownership verification (for edit/update/delete) - Ensure user owns the resource

### Example Route Setup:
```javascript
// Brand routes
router.get('/users/:userId/brands', isSignedIn, brandsCtrl.index);
router.get('/users/:userId/brands/new', isSignedIn, brandsCtrl.new);
router.post('/users/:userId/brands', isSignedIn, brandsCtrl.create);
router.get('/users/:userId/brands/:brandId', isSignedIn, brandsCtrl.show);
router.get('/users/:userId/brands/:brandId/edit', isSignedIn, brandsCtrl.edit);
router.put('/users/:userId/brands/:brandId', isSignedIn, brandsCtrl.update);
router.delete('/users/:userId/brands/:brandId', isSignedIn, brandsCtrl.delete);
```

### URL Examples:
- User 1's brands: `/users/507f1f77bcf86cd799439011/brands`
- Create new brand: `/users/507f1f77bcf86cd799439011/brands/new`
- Edit brand: `/users/507f1f77bcf86cd799439011/brands/507f191e810c19729de860ea/edit`
- User's reviews: `/users/507f1f77bcf86cd799439011/reviews`
- Specific review: `/users/507f1f77bcf86cd799439011/reviews/507f191e810c19729de860eb`
