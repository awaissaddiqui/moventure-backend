import mongoose from 'mongoose';

const temporaryTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const TemporaryToken = mongoose.model('temp-token', temporaryTokenSchema);
export { TemporaryToken };