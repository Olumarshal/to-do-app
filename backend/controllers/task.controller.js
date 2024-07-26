const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
    const { title, description, due_date, status } = req.body;
    const user_id = req.user.id;

    try {
        const task = await Task.create({ user_id, title, description, due_date, status });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.getAllTasks = async (req, res) => {
    const user_id = req.user.id;

    try {
        const tasks = await Task.findAll({ where: { user_id } });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.getTaskById = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;

    try {
        const task = await Task.findOne({ where: { id, user_id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.updateTask = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

    try {
        const task = await Task.findOne({ where: { id, user_id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.due_date = due_date || task.due_date;
        task.status = status || task.status;

        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.deleteTask = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;

    try {
        const task = await Task.findOne({ where: { id, user_id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};
