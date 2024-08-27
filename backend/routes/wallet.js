import express from 'express';
const router = express.Router();
import {getBalance } from '../controllers/wallet.js';

router.get('/', getBalance);

export default router;
