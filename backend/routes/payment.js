import express from 'express';
import {
	confrimTransaction,
	createPayment,
	getPayments,
	getPayment,updatePayment
} from '../controllers/payment.js';
import auth from '../middlewares/auth.js';
const router = express.Router();
router.get('/', auth, getPayments);
router.get('/:id', auth, getPayment);
router.post('/', auth, createPayment);
router.post('/update-payment', auth, updatePayment);
router.post('/confirm-payment', auth, confrimTransaction);
export default router;
