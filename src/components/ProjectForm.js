import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        candidate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/projects', formData) // Backend server port is 5000
            .then(() => {
                alert('Project added successfully!');
                setFormData({ title: '', description: '', candidate: '' });
                navigate('/'); // Navigate to the home page
            })
            .catch(err => {
                console.error(err);
                alert('Error adding project.');
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Project</h2>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" name="title" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Candidate</label>
                <input type="text" name="candidate" className="form-control" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default ProjectForm;
