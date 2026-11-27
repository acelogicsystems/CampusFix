import {useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { getIssueById } from '../../services/issueService';

function IssueDetails() {
    const {id} = useParams();
    const [issue, setIssues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await getIssueById(id);

                if (response.success) {
                    setIssues(response.data);
                } else {
                    setError('Unable to find this issue.')
                }
            } catch (error) {
                console.error('Error fetching issue:', error);
                setError('Failed to retrieve issue details.')
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id])

    if (loading) {
        return <p>Loading issue details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!issue) {
        return <p>Issue not found.</p>
    }

    return (
        <div className='issue-details-page'>
            <Link to="/my-issues" className="back-link">
            ← Back to My Issues
            </Link>
            <div className='issue-details-header'>
                <div>
                    <p className='page-eyebrow'>MAINTENANCE REPORT</p>
                    <h1>{issue.title}</h1>
                    <p>Review the details of your submitted report.</p>
                </div>

                <span className={`status-badge ${issue.status.toLowerCase().replace(' ', '-')}`}>
                    {issue.status}
                </span>
            </div>

            <div className='issue-details-card'>
                <div className='details-section'>
                <h3>Description</h3>
                <p>{issue.description}</p>
            </div>
            
            <div className='details-grid'>
                <div>
                    <span>Category</span>
                    <strong>{issue.category}</strong>
                </div>
                <div>
                <span>Location</span>
                <strong>{issue.location}</strong> 
                </div>
            
            <div>
            <span>Priority</span>
            <strong>{issue.priority}</strong>
            </div>
            <div>
                <span>Date Reported</span>
                <strong>{new Date(issue.createdAt).toLocaleDateString()}</strong>
            </div>
        </div>
    </div>
</div>

    
    );
}

export default IssueDetails;