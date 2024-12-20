const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Fetch all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new project
router.post('/', async (req, res) => {
    const { title, description, candidate } = req.body;
    const project = new Project({ title, description, candidate });
    try {
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update project status and score
router.patch('/:id', async (req, res) => {
    const { status, score } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.status = status || project.status;
            project.score = score !== undefined ? score : project.score;
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
