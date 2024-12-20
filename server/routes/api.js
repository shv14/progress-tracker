const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

// Add a new candidate
router.post(
    '/candidates',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const candidate = new Candidate(req.body);
            await candidate.save();
            res.status(201).json(candidate);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// Fetch all candidates
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find().populate('tasks');
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch a specific candidate with tasks
router.get('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id).populate('tasks');
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a task to a candidate
router.post(
    '/tasks',
    body('title').notEmpty().withMessage('Title is required'),
    body('candidateId').notEmpty().withMessage('Candidate ID is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, candidateId, scoreValue } = req.body;
            const candidate = await Candidate.findById(candidateId);
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }

            const task = new Task({ 
                title, 
                description, 
                candidate: candidateId,
                scoreValue: scoreValue || 0
            });
            await task.save();

            candidate.tasks.push(task._id);
            await candidate.save();

            res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// Update task status and recalculate score
router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['not-started', 'in-progress', 'completed', 'failed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.status = status;
        await task.save();

        const candidate = await Candidate.findById(task.candidate).populate('tasks');
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Recalculate the candidate's total score
        let totalScore = 0;
        candidate.tasks.forEach((t) => {
            if (t.status === 'completed') {
                totalScore += t.scoreValue;
            }
        });
        candidate.score = totalScore;
        await candidate.save();

        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().populate('candidate');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch a specific task
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('candidate');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const candidate = await Candidate.findById(task.candidate);
        if (candidate) {
            candidate.tasks = candidate.tasks.filter((taskId) => taskId.toString() !== req.params.id);
            await candidate.save();
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a candidate and their tasks
router.delete('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        await Task.deleteMany({ candidate: req.params.id });
        res.status(200).json({ message: 'Candidate and their tasks deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post(
    '/candidates/:candidateId/tasks',
    body('title').notEmpty().withMessage('Title is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, scoreValue } = req.body;
            const { candidateId } = req.params;

            // Find the candidate by ID from the URL params
            const candidate = await Candidate.findById(candidateId);
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }

            // Create a new task associated with the candidate
            const task = new Task({ 
                title, 
                description, 
                candidate: candidateId, 
                scoreValue: scoreValue || 0 
            });
            await task.save();

            // Add the task to the candidate's task list
            candidate.tasks.push(task._id);
            await candidate.save();

            res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;