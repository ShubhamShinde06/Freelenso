import {Router} from 'express'
import {userClientByIdToGet, userClientGet, userClientPost, userClientPut} from "../controllers/userClient.controller.js"

const router = Router()

router.get('/single/user-client/:id', userClientByIdToGet)

router.post('/create', userClientPost)
router.post('/all/user-client', userClientGet)

router.put('/update/:id', userClientPut)

export default router