import express from 'express';

import { resetPassword } from '../controllers/index.js';
import { asyncHandler, validateAndSanitize } from '../middlewares/index.js';
import { validateEmail, validatePassword } from '../validators/index.js';

// todo: setup the node-mailer
const router = express.Router();
const {
    getResetPasswordPage, getPageByClickingEmailLink,
    sendLink, resetByLink,
} = resetPassword;

// Route to render the reset password page
router.get('/', asyncHandler(getResetPasswordPage));

// Route to handle user clicking the email link
router.get('/:userId/:token', asyncHandler(getPageByClickingEmailLink));

// Route to send reset password link via email
router.post('/', validateAndSanitize(validateEmail), asyncHandler(sendLink));

// Route to reset password using the provided link
router.patch('/:userId/:token', validateAndSanitize(validatePassword), asyncHandler(resetByLink));

export default router;