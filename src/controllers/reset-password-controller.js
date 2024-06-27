import crypto from 'node:crypto';

import { User, TemporaryToken } from '../models/index.js';
import { transporter } from '../configurations/index.js';
import { sendResponse } from '../utilities/format-response.js';


// Render the reset password page
export const getResetPasswordPage = async (request, response) => {
    // Your code to render the reset password page goes here
};

// Handle user clicking the email link
export const getPageByClickingEmailLink = async (request, response) => {
    // Your code to handle user clicking the email link goes here
};

// Send reset password link via email
export const sendLink = async (request, response) => {
    const user = await User.findOne({ email: request.validatedData.email });
    if (!user) return sendResponse(response, 404, 'User not found');

    // Generate a new token if one doesn't exist for the user
    let token = await TemporaryToken.findOne({ userId: user._id });
    if (!token) {
        token = new TemporaryToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });
        await token.save();
    }

    const link = `${process.env.BASE_URL}/api/reset-password/${user._id}/${token.token}`;

    // Send password reset link via email
    await transporter.sendMail({
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: 'Moventure: Password Reset Link',
        text: link,
    });
    // Todo: remove link to send to user.
    sendResponse(response, 200,'Password reset link sent via email: ' + link );
};

// Reset password using the provided link
export const resetByLink = async (request, response) => {
    const user = await User.findById(request.params.userId);
    if (!user) return sendResponse(response, 400, 'Invalid or expired link');

    const token = await TemporaryToken.findOne({
        userId: user._id,
        token: request.params.token,
    });
    if (!token) return sendResponse(response, 400, 'Invalid or expired link');

    // Hash the new password and update user's password
    user.password = request.validatedData.password;
    await user.save();

    // Delete the used token
    await TemporaryToken.findByIdAndDelete(token._id);

    sendResponse(response, 201, 'Password reset successfully');
};