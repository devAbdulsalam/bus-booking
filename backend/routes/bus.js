import express from 'express';
const router = express.Router();
import {
	createBus,
	getBuses,
	getBus,
	searchBuses,
	updateBus,
	updateBusWithNotification,
	deleteBus,
} from '../controllers/bus.js';

import auth, { verifyPermission } from '../middlewares/auth.js';

router.get('/search', searchBuses);
router.get('/', getBuses);
// router.get('/', auth, getBuses);
router.get('/:id', auth, getBus);
router.post('/', auth, verifyPermission(['ADMIN']), createBus);
router.put('/', auth, updateBus);
router.patch('/:id', auth, updateBusWithNotification);
router.delete('/:id', auth, deleteBus);

export default router;
