import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    fristName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        
    },
    address: {
        type: String,
        required: true,
    },
    desease: {
        type: String,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    visitingFeePaid: {
        type: String,
        required: true,
        default: false,
    },
    visitingFee: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
    },
    transactionId: {
        type: String,
    },
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment