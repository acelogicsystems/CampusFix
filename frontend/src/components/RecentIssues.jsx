import { useState, useEffect} from 'react';
import { getMyIssues } from '../services/issueService';

function RecentIssues() {
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
                    setError('failed to load your issues.');
                }
            } catch (error) {
                console.error('Error fetching issues:', error);
                setError('Unable to load your issues.');
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    //show loading message

    if (loading) {
        return <p>Loading your issues...</p>;
    }

    //show error message
    if (error) {
        return <p>{error}</p>
    }

    //Show empty state
    if (issues.length === 0) {
        return (
            <section className='recent-issues'>
                <div className='section header'>
                    <h2>Recent Issues</h2>
                </div>
                <p>You haven't reported any issues yet.</p>
            </section>
        );
    }

    return (
        <section className='recent-issues'>
            <div className='section-header'>
                <h2>Recent Issues</h2>
                <button className='view-all-button'>
                    view all
                </button>
            </div>

            <div className='table-container'>
                <table className='issues-table'>
                    <thead>
                        <tr>
                            <th>Issue</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th> Date Reported</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.slice(0, 5).map((issue) => (
                           <tr key={issue._id || issue._id}>
                            <td>{issue.title}</td>
                            <td>{issue.category}</td>
                            <td>{issue.location}</td>

                            <td>
                                <span className={`priority-badge $ {issue.priority.toLowerCase()}`}>
                                    {issue.priority}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge $ {issue.status.toLowerCase().rplace(' ', '-')}`}>
                                    {issue.status}
                                </span>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default RecentIssues;