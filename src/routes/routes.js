import express from 'express';
import { getHome, getAbout, postFormData } from '../controllers/controllers.js';

const router = express.Router();

// Define routes and map them to controller functions
router.get('/', getHome); // Home route
router.get('/about', getAbout); // About route
router.post('/submit-form', postFormData); // Example form submission route

export default router;