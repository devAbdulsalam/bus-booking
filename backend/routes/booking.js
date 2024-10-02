import express from 'express';
const router = express.Router();
import {
	createBooking,
	getbookings,
	getbooking,
    updateBookingStatus
} from '../controllers/booking.js';

import auth, { verifyPermission } from '../middlewares/auth.js';

router.post('/', auth, createBooking);
router.get('/', auth, getbookings);
router.get('/:id', auth, getbooking);
router.patch('/update/:id', auth, verifyPermission(['ADMIN']), updateBookingStatus);

export default router;
