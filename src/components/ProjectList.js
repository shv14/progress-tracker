import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Projects</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Candidate</th>
                        <th>Status</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.candidate}</td>
                            <td>{project.status}</td>
                            <td>{project.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectList;
