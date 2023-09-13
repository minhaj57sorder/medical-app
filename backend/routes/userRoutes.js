import express from "express"
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect,  getUsers)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id')
    .delete(protect,  deleteUser)
    .get(protect,  getUserById)
    .put(protect, updateUser)

export default router