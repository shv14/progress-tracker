import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tasks from the backend
        axios.get('http://localhost:5000/api/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });

        // Fetch candidates from the backend
        axios.get('http://localhost:5000/api/candidates')
            .then((response) => {
                setCandidates(response.data);
            })
            .catch((error) => {
                console.error('Error fetching candidates:', error);
            });
    }, []);

    const handleAddTaskClick = (candidateId) => {
        navigate(`/add-task/${candidateId}`);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Assigned Tasks</h2>
                <div>
                    <Link to="/add-candidate" className="btn btn-success me-2">
                        Add Candidate
                    </Link>
                </div>
            </div>
            <div className="row">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div className="col-md-4 mb-4" key={task._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">Status: {task.status}</p>
                                    <p className="card-text">Score Value: {task.scoreValue}</p>
                                    <Link to={`/task-details/${task._id}`} className="btn btn-primary" >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks assigned yet.</p>
                )}
            </div>
            <h2 className="mt-5">Candidates List</h2>
            <div className="row">
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div className="col-md-4 mb-4" key={candidate._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{candidate.name}</h5>
                                    <p className="card-text">Email: {candidate.email}</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleAddTaskClick(candidate._id)}
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No candidates available.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
