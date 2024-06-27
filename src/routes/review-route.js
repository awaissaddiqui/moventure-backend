import express from 'express';
import { reviewController } from '../controllers/index.js';
import { validateAndSanitize, isAuthenticated, asyncHandler, isValidId } from '../middlewares/index.js';
import { validateCreateReview, validateUpdateReview } from '../validators/index.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(reviewController.getAllReviews),
);

router.post(
    '/',
    [isAuthenticated, validateAndSanitize(validateCreateReview)],
    asyncHandler(reviewController.createReview),
);

router.get(
    '/:reviewId',
    isValidId,
    asyncHandler(reviewController.getReview),
);

router.put(
    '/:reviewId',
    [isAuthenticated, isValidId, validateAndSanitize(validateUpdateReview)],
    asyncHandler(reviewController.updateReview),
);

router.delete(
    '/:reviewId',
    [isValidId, isAuthenticated],
    asyncHandler(reviewController.deleteReview),
);

export default router;
