import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    speachiality: {
        type: String,
        required: true,
    },
    visitingFee: {
        type: Number,
        required: true,
        default: 0
    },
    time: {
        type: String,
        required: true,
        default: '00:00 am'
    },
    reviews: [reviewsSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor