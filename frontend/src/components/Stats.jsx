import { useState, useEffect } from 'react';
import StatCard from "./StatCard";
import { getMyStats } from '../services/issueService';

function Stats() {
    const [stats, setStats] = useState({
        totalIssues: 0,
        pendingIssues: 0,
        inProgressIssues: 0,
        resolvedIssue: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getMyStats();
                
                if (response.success) {
                    setStats(response.stats);
                } else {
                   
                    setError('Failed to load statistics.');
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Unable to load your statistics.')
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading statistics...</p>;
     }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <section className="stats-grid">
            <StatCard 
                 title='Total Issues'
                 value={stats.totalIssues}
                 desription="Issues reported by you" />
            
            <StatCard 
                title='Pending'
                value={stats.pendingIssues}
                description="Awaiting attention" />

            <StatCard 
                title="In Progress"
                value={stats.inProgressIssues}
                description="Currently being handled" />
            
            <StatCard 
                title="Resolved"
                value={stats.resolvedIssue}
                description="Successfully completed" />

        </section>
    );
}

export default Stats;