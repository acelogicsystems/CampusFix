function StatCard({ title, value, description}) {
    return (
        <div className="stat-card">
            <p className="stat-title">{title}</p>

            <h2 className="stat-value">{value}</h2>

            <span className="stat-description">{description}</span>
        </div>
    );
}

export default StatCard;