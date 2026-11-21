function RecentIssues() {
    return (
        <section className="recent-issues">
            <div className="section-header">
                <h2>Recent Issues</h2>
                <div>
                <p>Track the latest Maintenance reports.</p>
                </div>
                <button className="view-all-button">
                    View all
                </button>
                </div>

                <div className="issues-table-wrapper">
                    <table className="issues-table">
                        <thead>
                            <tr>
                                <th>Issue</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Date Reported</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Broken classroom lights</td>
                            <td>Electrical</td>
                            <td>Block A</td>
                            <td>
                                <span className="priority-badge priority-high">High</span>
                            </td>
                            <td>
                                <span className="status-badge status-pending">Pending</span>
                            </td>
                            <td>NOV 20, 2026</td>
                            </tr>

                            <tr>
                                <td>Leaking bathroom tap</td>
                                <td>Plumbing</td>
                                <td>Hostel</td>
                                <td>
                                    <span className="priority-badge priority-medium">Medium</span>
                                </td>
                                <td>
                                    <span
                                       className="status-badge status-in-progress"
                                    >In Progress</span>
                                </td>
                                <td>Nov 19, 2026</td>
                            </tr>

                            <tr>
                                <td>Damaged lecture chairs</td>
                                <td>Furniture</td>
                                <td>Block C</td>
                                <td>
                                    <span className="priority-badge priority-low">Low</span>
                                </td>
                                <td>
                                    <span className="status-badge status-resolved">Resolved</span>
                                </td>
                                <td>Nov 18, 2026</td>
                            </tr>

                            <tr>
                                <td>Blocked drainage system</td>
                                <td>Cleaning</td>
                                <td>Mian Campus</td>
                                <td>
                                    <span className="priority-badge priority-high">High</span>
                                </td>
                                <td>
                                    <span className="status-badge status-in-progress">In Progress</span>
                                </td>
                                <td>Nov 17, 2026</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            
        </section>
    );
}

export default RecentIssues;