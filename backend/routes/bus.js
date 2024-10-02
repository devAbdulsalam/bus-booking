import express from 'express';
const router = express.Router();
import {
	createBus,
	getBuses,
	getBus,
	updateBusWithNotification,
	deleteBus,
} from '../controllers/bus.js';

import auth, { verifyPermission } from '../middlewares/auth.js';

router.get('/', getBuses);
router.get('/:id', auth, getBus);
router.post('/', auth, verifyPermission(['ADMIN']), createBus);
router.patch('/:id', auth, updateBusWithNotification);
router.delete('/:id', auth, deleteBus);

export default router;
