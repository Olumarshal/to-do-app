const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
