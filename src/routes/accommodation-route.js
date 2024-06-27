import express from 'express';
import { accommodationController } from '../controllers/index.js';
import { validateAndSanitize, isAuthenticated, asyncHandler, isValidId } from '../middlewares/index.js';
import { validateCreateAccommodation, validateUpdateAccommodation } from '../validators/index.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(accommodationController.getAllAccommodations)
);

router.post(
    '/',
    [isAuthenticated, validateAndSanitize(validateCreateAccommodation)],
    asyncHandler(accommodationController.createAccommodation)
);

router.get(
    '/:accommodationId',
    isValidId,
    asyncHandler(accommodationController.getAccommodation)
);

router.put(
    '/:accommodationId',
    [isAuthenticated, isValidId, validateAndSanitize(validateUpdateAccommodation)],
    asyncHandler(accommodationController.updateAccommodation)
);

router.delete(
    '/:accommodationId',
    [isValidId, isAuthenticated],
    asyncHandler(accommodationController.deleteAccommodation)
);

export default router;
