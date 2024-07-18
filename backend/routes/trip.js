import express from 'express';
const router = express.Router();
import { createTrip, createTrips, getTrips } from '../controllers/trip.js';

router.post('/', createTrip);
router.post('/trips', createTrips);
router.get('/', getTrips);

export default router;
