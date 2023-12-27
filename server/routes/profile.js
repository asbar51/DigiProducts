import express from 'express'
import { addProfile, getProfile, loginProfile, logout, updateProfile } from '../controllers/profile.js'
import { tokenChecker } from '../middlewares/tokenChecker.js'

const router = express.Router()

router.get('/',tokenChecker,getProfile)
router.post('/sign_up',addProfile)
router.post('/login',loginProfile)
router.put('/update/:username',updateProfile)
router.delete('/delete/:username',logout)

export default router