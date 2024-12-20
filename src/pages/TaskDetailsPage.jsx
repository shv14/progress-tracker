import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TaskDetailsPage() {
    const { taskId } = useParams(); // Extract taskId from the URL
    const [task, setTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!taskId) return;

        setLoading(true);
        axios
            .get(`http://localhost:5000/api/tasks/${taskId}`)
            .then((response) => {
                setTask(response.data);
                setUpdatedStatus(response.data.status);
                setUpdatedDescription(response.data.description);
            })
            .catch((error) => {
                console.error('Error fetching task details:', error);
            })
            .finally(() => setLoading(false));
    }, [taskId]);

    const handleUpdateTask = () => {
        setSaving(true);
        axios
            .put(`http://localhost:5000/api/tasks/${taskId}`, {
                status: updatedStatus,
                description: updatedDescription,
            })
            .then((response) => {
                setTask(response.data);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            })
            .finally(() => setSaving(false));
    };

    if (loading) {
        return <div className="container mt-5"><p>Loading task details...</p></div>;
    }

    return (
        <div className="container mt-5">
            {task ? (
                <div>
                    <h2>{task.title}</h2>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Score Value:</strong> {task.scoreValue}</p>
                    <p><strong>Assigned Candidate:</strong> {task.candidate?.name || 'Not Assigned'}</p>

                    <button
                        className="btn btn-secondary mt-3 me-2"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => setShowModal(true)}
                    >
                        Update Task
                    </button>

                    {showModal && (
                        <div
                            className="modal show d-block"
                            tabIndex="-1"
                            style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Task</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={updatedStatus}
                                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                            >
                                                <option value="not-started">Not Started</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                rows="3"
                                                value={updatedDescription}
                                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleUpdateTask}
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Task not found.</p>
            )}
        </div>
    );
}

export default TaskDetailsPage;
