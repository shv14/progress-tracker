import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddCandidatePage from './pages/AddCandidatePage';
import CandidateProgress from './components/CandidateProgress';
import AddTask from './components/AddTask';
import TaskDetailsPage from './pages/TaskDetailsPage';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Progress Tracker</h1>
                <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<HomePage />} />
                    {/* Add Candidate Page */}
                    <Route path="/add-candidate" element={<AddCandidatePage />} />
                    {/* Candidate Progress Page */}
                    <Route path="/candidate-progress/:candidateId" element={<CandidateProgress />} />
                    {/* Add Task Page */}
                    <Route path="/add-task/:candidateId" element={<AddTask />} />
                    {/* Task Details Page */}
                    <Route path="/task-details/:taskId" element={<TaskDetailsPage />} />
                    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
