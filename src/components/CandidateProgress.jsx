import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CandidateProgress({ candidateId }) {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/candidates/${candidateId}`)
            .then((response) => setCandidate(response.data))
            .catch((err) => console.error(err));
    }, [candidateId]);

    if (!candidate) return <div>Loading...</div>;

    return (
        <div>
            <h2>{candidate.name}'s Progress</h2>
            <p>Score: {candidate.score}</p>
            <ul>
                {candidate.tasks.map((task) => (
                    <li key={task._id}>{task.title} - {task.isCompleted ? 'Completed' : 'Pending'}</li>
                ))}
            </ul>
        </div>
    );
}

export default CandidateProgress;
