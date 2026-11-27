
import { useState, useEffect } from 'react';
import { getMyIssues } from '../../services/issueService';
import { Link } from 'react-router-dom';

function MyIssues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await getMyIssues();

                if (response.success) {
                    setIssues(response.data || []);
                } else {
                    setError('Failed to load your issues.');
                }

            } catch (error) {
                console.error('Error fetching issues:', error);
                setError('Unable to retrieve your issues.');
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) {
        return <p>Loading your issues...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="my-issues-page">

            <div className="my-issues-header">
                <div>
                    <h1>My Issues</h1>
                    <p>Track and manage the maintenance issues you have reported.</p>
                </div>

                <span className="issue-count">
                    {issues.length} Reports
                </span>
            </div>

            {issues.length === 0 ? (
                <div className="empty-issues">
                    <h3>No issues reported yet</h3>
                    <p>Your submitted maintenance reports will appear here.</p>
                </div>
            ) : (

                <div className="my-issues-list">

                    {issues.map((issue) => (

                        <Link 
                           to={`/my-issues/${issue.id || issue._id}`}
                           className='my-issue-card'
                           key={issue.id || issue._id}>


                            <div className="my-issue-top">
                                <h3>{issue.title}</h3>

                                <span className={`status-badge ${issue.status.toLowerCase().replace(' ', '-')}`}>
                                    {issue.status}
                                </span>
                            </div>

                            <p className="my-issue-description">
                                {issue.description}
                            </p>

                            <div className="my-issue-details">
                                <span>{issue.category}</span>
                                <span>{issue.location}</span>
                                <span className={`priority-badge ${issue.priority.toLowerCase()}`}>
                                    {issue.priority} Priority
                                </span>
                            </div>

                            <small>
                                Reported on: {new Date(issue.createdAt).toLocaleDateString()}
                            </small>

                        </Link>

                    ))}

                </div>
            )}

        </div>
    );
}

export default MyIssues;
