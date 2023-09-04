import expressAsyncHandler from "express-async-handler";
import Appointment from '../models/appointmentModel.js'

// @desc get appointments
// @route Put api/appointments
// @acess Privet
const getAppointments = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Appointment.countDocuments({ ...keyword })
    const appointments = await Appointment.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json({ appointments, page, pages: Math.ceil(count / pageSize) })
})

// @desc get appointment by id
// @route Put api/appointments/:id
// @acess Privet
const getAppointmentById = expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
    if (appointment) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(appointment)
    } else {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(404)
        throw new Error('Appointment not found')
    }
})

// @desc delete a appointment
// @route Delete api/appointments/:id
// @acess Privet/Admin
const deleteAppointment = expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
    if (appointment) {
        await appointment.remove()
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json({ message: 'Appointment removed' })
    } else {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(404)
        throw new Error('Appointment not found')
    }
})

// @desc update a appointment
// @route update api/appointments/
// @acess Privet/Admin
const updateAppointment = expressAsyncHandler(async (req, res) => {
    const {
        user,
        doctor,
        name,
        phone,
        address,
        desease,
        bookingTime,
        visitingFeePaid,
        visitingFee,
        paymentType,
        transactionId,
    } = req.body
    const appointment = await Appointment.findById(req.params.id)
    if (appointment) {
        appointment.user = user
        appointment.doctor = doctor
        appointment.name = name
        appointment.phone = phone
        appointment.address = address
        appointment.desease = desease
        appointment.bookingTime = bookingTime
        appointment.visitingFeePaid = visitingFeePaid
        appointment.visitingFee = visitingFee
        appointment.paymentType = paymentType
        appointment.transactionId = transactionId
        const updatedAppointment = await appointment.save()
        res.status(201).json(updatedAppointment)
    } else {
        res.status(404)
        throw new Error('Appointment not found')
    }
})

// @desc create a appointment
// @route create api/appointments/
// @acess Privet/Admin
const createAppointment = expressAsyncHandler(async (req, res) => {
    const appointment = new Appointment({
        user: req.user,
        doctor: req.doctor,
        name: req.name,
        phone: req.phone,
        address: req.address,
        desease: req.desease,
        bookingTime: req.bookingTime,
        visitingFeePaid: req.visitingFeePaid,
        visitingFee: req.visitingFee,
        paymentType: req.paymentType,
        transactionId: req.transactionId,

    })
    const createdAppointment = await appointment.save()
    res.status(201).json(createdAppointment)

})

export {
    getAppointments,
    getAppointmentById,
    deleteAppointment,
    createAppointment,
    updateAppointment
}