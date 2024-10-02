import express from 'express';
const router = express.Router();
import {
	createTrip,
	createTrips,
	getTrips,
	getTrip,
} from '../controllers/trip.js';

router.post('/', createTrip);
// router.post('/trips', createTrips);
router.get('/', getTrips);
router.get('/:id', getTrip);

export default router;
