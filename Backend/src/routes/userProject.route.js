import {Router} from 'express'
import {userProjectByIdToGet, userProjectGet, userProjectPost, userProjectPut, userProjects} from '../controllers/userProject.controller.js'

const router = Router()

router.get('/single/user-project/:id', userProjectByIdToGet)
router.get('/get/:clientId', userProjects)

router.post('/create', userProjectPost)
router.post('/all/user-project', userProjectGet)

router.put('/update/:id', userProjectPut)

export default router