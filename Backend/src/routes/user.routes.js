import {Router} from 'express'
import { userGetByID, userLogout, userPost, userPut, userVerify } from '../controllers/user.controller.js'

const router = Router()

router.post('/sign', userPost)
router.post('/logout', userLogout)

router.get('/verify', userVerify)
router.get('/get/:id', userGetByID)

router.put('/update/:id', userPut)


export default router