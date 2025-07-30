import {Router} from 'express'
import { userLogout, userPost, userVerify } from '../controllers/user.controller.js'

const router = Router()

router.post('/sign', userPost)
router.get('/verify', userVerify)
router.post('/logout', userLogout)

export default router