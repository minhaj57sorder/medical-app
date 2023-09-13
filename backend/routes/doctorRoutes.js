import express from "express";
import {    getDoctors,
    getDoctorById,
    deleteDoctor,
    createDoctor,
    updateDoctor,
    createDoctorReview,
    getTopDoctors} from '../controllers/doctorController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getDoctors).post(protect, createDoctor)
router.route('/topRated').get(getTopDoctors)
router.route('/:id/reviews').post(protect, createDoctorReview)
router.route('/:id')
    .get(getDoctorById)
    .delete(protect, deleteDoctor)
    .put(protect, updateDoctor)



export default router