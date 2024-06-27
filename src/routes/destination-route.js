import express from 'express';
import { destinationController } from '../controllers/index.js';
import { validateAndSanitize, isAuthenticated, asyncHandler, isValidId } from '../middlewares/index.js';
import { validateCreateDestination, validateUpdateDestination } from '../validators/index.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(destinationController.getAllDestinations),
);

router.post(
    '/',
    [isAuthenticated, validateAndSanitize(validateCreateDestination)],
    asyncHandler(destinationController.createDestination),
);

router.get(
    '/:destinationId',
    isValidId,
    asyncHandler(destinationController.getDestination),
);

router.put(
    '/:destinationId',
    [isAuthenticated,isValidId, validateAndSanitize(validateUpdateDestination)],
    asyncHandler(destinationController.updateDestination),
);

router.delete(
    '/:destinationId',
    [isValidId, isAuthenticated],
    asyncHandler(destinationController.deleteDestination),
);

export default router;
