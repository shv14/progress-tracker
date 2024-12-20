import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTask() {
    const [candidateId, setCandidateId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Extract candidateId from the URL
        const urlParts = window.location.pathname.split('/');
        const id = urlParts[urlParts.length - 1];
        setCandidateId(id);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!candidateId) {
            alert('Candidate ID is missing!');
            return;
        }
        axios.post(`http://localhost:5000/api/candidates/${candidateId}/tasks`, { title, description })
            .then(() => {
                alert('Task added successfully!');
                setTitle('');
                setDescription('');
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container mt-5">
            <h2>Add Task for Candidate</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="taskTitle"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">
                        Task Description
                    </label>
                    <textarea
                        id="taskDescription"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddTask;
