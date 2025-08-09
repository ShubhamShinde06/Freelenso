import {Router} from 'express'
import { userInvoiceByIdToGet, userInvoiceGet, userInvoicePost, userInvoicePut } from '../controllers/userInvoice.controller.js'

const router = Router()

router.get('/single/user-invoice/:id', userInvoiceByIdToGet)

router.post('/create', userInvoicePost)
router.post('/all/user-invoice', userInvoiceGet)

router.put('/update/:id', userInvoicePut)

export default router