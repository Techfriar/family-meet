import express from 'express';
import { getHome, postFormData } from '../controllers/controllers.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });

// Define routes and map them to controller functions
router.get('/', getHome); // Home route
router.post('/submit-form', upload.single('picture'), postFormData);

export default router;