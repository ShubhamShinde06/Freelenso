import {Router} from 'express'
import { userFullInvoiceByIdToGet, userInvoiceByIdToGet, userInvoiceCount, userInvoiceGet, userInvoiceMainInfo, userInvoicePost, userInvoicePut } from '../controllers/userInvoice.controller.js'

const router = Router()

router.get('/single/user-invoice/:id', userInvoiceByIdToGet)
router.get('/single/user-full-invoice/:id', userFullInvoiceByIdToGet)
router.get('/get/count/:userId', userInvoiceCount)
router.get('/get/main-info/:userId', userInvoiceMainInfo)

router.post('/create', userInvoicePost)
router.post('/all/user-invoice', userInvoiceGet)

router.put('/update/:id', userInvoicePut)

export default router