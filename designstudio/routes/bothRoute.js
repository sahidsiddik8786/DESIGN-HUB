import express from 'express';
import { loginController } from '../controllers/user&staffController.js';

const router = express.Router();

// Route for user login
router.post('/login', loginController);

// Route for staff login
router.post('/loginstaff', loginController);

export default router;
