import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCandidatePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/candidates', formData) // Replace with your backend endpoint
            .then(() => {
                alert('Candidate added successfully!');
                navigate('/'); // Redirect to the Home Page after adding a candidate
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to add candidate.');
            });
    };

    return (
        <div className="container mt-5">
            <h2>Add Candidate</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-control" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddCandidatePage;
