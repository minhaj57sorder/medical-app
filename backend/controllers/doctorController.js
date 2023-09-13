import expressAsyncHandler from "express-async-handler";
import Doctor from '../models/doctorModel.js'

// @desc get doctors
// @route Put api/doctors
// @acess Privet
const getDoctors = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Doctor.countDocuments({ ...keyword })
    const doctors = await Doctor.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    
    res.status(200).json({ doctors, page, pages: Math.ceil(count / pageSize) })
})

// @desc get doctor by id
// @route Put api/doctors/:id
// @acess Privet
const getDoctorById = expressAsyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
    if (doctor) {
        
        res.json(doctor)
    } else {
        
        res.status(404)
        throw new Error('Doctor not found')
    }
})

// @desc delete a doctor
// @route Delete api/doctors/:id
// @acess Privet/Admin
const deleteDoctor = expressAsyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
    if (doctor) {
        await doctor.remove()
        
        res.json({ message: 'Doctor removed' })
    } else {
        
        res.status(404)
        throw new Error('Doctor not found')
    }
})

// @desc update a doctor
// @route update api/doctors/
// @acess Privet/Admin
const updateDoctor = expressAsyncHandler(async (req, res) => {
    const {
        user,
        name,
        image,
        description,
        degree,
        speachiality,
        visitingFee,
        time,
    } = req.body
    const doctor = await Doctor.findById(req.params.id)
    if (doctor) {
        doctor.user = user
        doctor.name = name
        doctor.image = image
        doctor.description = description
        doctor.degree = degree
        doctor.speachiality = speachiality
        doctor.visitingFee = visitingFee
        doctor.time = time
        const updatedDoctor = await doctor.save()
        res.status(201).json(updatedDoctor)
    } else {
        res.status(404)
        throw new Error('Doctor not found')
    }
})

// @desc Create new review
// @route update api/doctors/:id/reviews
// @acess Privet/Admin
const createDoctorReview = expressAsyncHandler(async (req, res) => {
    const {
        rating,
        comment,
    } = req.body
    const doctor = await Doctor.findById(req.params.id)
    if (doctor) {
        const alreadyReviewed = doctor.reviews.find(r => r.user.toString() === req.user.id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Doctor reviewed already exist')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        doctor.reviews.push(review)
        doctor.numReviews = doctor.reviews.length
        doctor.rating = doctor.reviews.reduce((acc, item) => item.rating + acc, 0) / doctor.reviews.length
        await doctor.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Doctor not found')
    }
})

// @desc Top rated doctor
// @route update api/doctors/topRated
// @acess public
const getTopDoctors = expressAsyncHandler(async (req, res) => {
    const doctors = await Doctor.find({}).sort({ rating: -1 }).limit(3)
    res.json(doctors)
})

// @desc create a doctor
// @route create api/doctors/
// @acess Privet/Admin
const createDoctor = expressAsyncHandler(async (req, res) => {
    const doctor = new Doctor({
        user: req.user._id,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        degree: req.body.degree,
        speachiality: req.body.speachiality,
        visitingFee: req.body.visitingFee,
        time: req.body.time,
        rating: 0,
        numReviews: 0,

    })
    const createdDoctor = await doctor.save()
    res.status(201).json(createdDoctor)

})

export {
    getDoctors,
    getDoctorById,
    deleteDoctor,
    createDoctor,
    updateDoctor,
    createDoctorReview,
    getTopDoctors
}
