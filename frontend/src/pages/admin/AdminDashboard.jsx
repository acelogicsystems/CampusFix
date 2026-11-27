import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
   // ClipboardList,
    Clock,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';

import API from '../../services/api';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalIssues: 0,
        pendingIssues: 0,
        inProgressIssues: 0,
        resolvedIssues: 0
    })
    const [issues, setIssues] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        console.log('ADMIN EFFECT STARTED');

    const fetchStats = async () => {
        try {
            const response = await API.get('/issues/stats/overview');
            console.log('FULL AXIOS RESPONSE:', response);
            console.log('RESPONSE DATA:', response.data);
            console.log('RESPONSE DATA DATA:', response.data.data);
            console.log('RESPONSE KEYS:', Object.keys(response.data));

            if (response.data.success === true) {
                console.log('ADMIN SUCCESS CONFIRMED');

                setStats(response.data.data);
                setError('');
            } else {
                console.log('ADMIN SUCCESS FAILED');
                setError('Unable to retrieve dashboard statistics.');
            }
        } catch (error) {
            console.log('REQUEST ERROR:', error);
            setError('Failed to load admin statistics.');
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
    }, []);
 

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await API.get('/issues');

                if (response.data.success) {
                    setIssues(response.data.data || []);
                }
            } catch (error) {
                console.error('Admin issues error:', error);
            }
        }
        fetchIssues();
    }, [])

    return (
        <div className='admin-dashboard'>
           <div className='admin-header'>
            <div>
                <p className='page-eyebrow'>CAMPUSFIX MANAGEMENT</p>
                <h1>Admin Dashboard</h1>
                <p>Monitor and manage campus maintenance reports.</p>
            </div>
           </div>

           {loading ? (
            <p>Loading dashboard statistics...</p>
           ) : error ? (
            <p className='auth-error'>{error}</p>
           ) : (
            <div className='admin-stats-grid'>
                <div className='admin-stat-grid'>
                    <LayoutDashboard size={22} />
                    <p>Total Issues</p>
                    <h2>{stats.totalIssues}</h2>
                </div>

                <div className='admin-stat-card'>
                    <Clock size={22} />
                    <p>Pending Issues</p>
                    <h2>{stats.pendingIssues}</h2>
                </div>
                <div className='admin-stat-card'>
                    <AlertTriangle size={22}/>
                    <p>In Progress</p>
                    <h2>{stats.inProgressIssues}</h2>
                </div>
                <div className='admin-stat-card'>
                    <CheckCircle size={22} />
                    <p>Resolved Issues</p>
                    <h2>{stats.resolvedIssues}</h2>
                </div>
            </div>
           )}

           <div className='admin-issues-section'>
            <div className='admin-section-header'>
                <div>
                    <h2>All Maintenance</h2>
                    <p>Review reports submitted by students.</p>
                </div>

                <span>{issues.length}Reports</span>
            </div>
            <div className='admin-table-wrapper'>
                <table className='admin-issues-table'>
                    <thead>
                        <tr>
                            <th>Issue</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.length === 0 ? (
                            <tr>
                                <td colSpan="6">No maintenance issues found.</td>
                            </tr>
                        ): (
                            issues.map((issue) => (
                                <tr key={issue.id || issue._id}>
                                    <td>{issue.title}</td>
                                    <td>{issue.category}</td>
                                    <td>{issue.location}</td>
                                    <td>{issue.priority}</td>
                                    <td>{issue.status}</td>
                                    <td>
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
           </div>
        </div>
    );
}

export default AdminDashboard;