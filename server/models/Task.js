const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { 
        type: String, 
        enum: ['not-started', 'in-progress', 'completed', 'failed'], 
        default: 'not-started' 
    },
    scoreValue: { type: Number, default: 0 }, // The weight or points for the task
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }, // Reference to Candidate
});

module.exports = mongoose.model('Task', TaskSchema);
