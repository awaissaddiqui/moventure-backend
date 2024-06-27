import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true,
    },
    type: {
        type: String,
        enum: ['hotel', 'hostel', 'guesthouse', 'apartment'],
        required: true,
    },
    address: {
        type: String,
        maxLength: 1000,
        required: true,
    },
    city: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true,
    },
    country: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
}, { timestamps: true });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export { Accommodation };
