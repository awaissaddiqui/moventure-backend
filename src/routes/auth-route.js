import express from 'express';

import { authController } from '../controllers/index.js';
import { validateAndSanitize, isAuthenticated, asyncHandler } from '../middlewares/index.js';
import { validateLogin, validateSignup} from '../validators/index.js';

const router = express.Router();

router.post('/signup', validateAndSanitize(validateSignup), asyncHandler(authController.signup));
router.post('/login', validateAndSanitize(validateLogin), asyncHandler(authController.login));
router.delete('/logout', isAuthenticated, asyncHandler(authController.logout));

export default router;