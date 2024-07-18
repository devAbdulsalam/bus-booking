import express from 'express';
const router = express.Router();
import {
	registerUser,
	loginUser,
	refreshToken,
	getAdminDashboard,
	getUserDashboard,
} from '../controllers/user.js';
import auth, { verifyPermission } from '../middlewares/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.get(
	'/user/dashboard',
	auth,
	getUserDashboard
);
router.get(
	'/admin/dashboard',
	auth,
	verifyPermission(['ADMIN']),
	getAdminDashboard
);

export default router;
