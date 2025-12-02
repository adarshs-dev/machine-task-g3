import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', upload.single('attachment'), createTask);
router.put('/:id', upload.single('attachment'), updateTask);
router.delete('/:id', deleteTask);

export default router;
