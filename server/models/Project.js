const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    candidate: { type: String, required: true },
    status: { type: String, default: 'Assigned' }, // Assigned, In Progress, Completed
    score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Project', ProjectSchema);
