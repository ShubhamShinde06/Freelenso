import {Router} from 'express'
import {userAllProjects, userProjectByIdToGet, userProjectGet, userProjectPost, userProjectPut, userProjects} from '../controllers/userProject.controller.js'

const router = Router()

router.get('/single/user-project/:id', userProjectByIdToGet)
router.get('/get/:clientId', userProjects)
router.get('/all/user-project/:userId', userAllProjects)

router.post('/create', userProjectPost)
router.post('/all/user-project', userProjectGet)

router.put('/update/:id', userProjectPut)

export default router