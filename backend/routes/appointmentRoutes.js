import express from "express";
import {
    getAppointments,
    getAppointmentById,
    deleteAppointment,
    createAppointment,
    updateAppointment
} from '../controllers/appointmentController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getAppointments).post(protect,createAppointment)
router.route('/:id')
    .get(getAppointmentById)
    .delete(protect, deleteAppointment)
    .put(protect, updateAppointment)



export default router