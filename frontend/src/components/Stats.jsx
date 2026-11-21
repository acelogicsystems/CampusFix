import StatCard from "./StatCard";

function Stats() {
    return (
        <section className="stats-grid">
            <StatCard 
                 title='TOTAL ISSUES'
                 value="128"
                 desription="ALL reported issues" />
            
            <StatCard 
                title='PENDING'
                value='24'
                description="Awaiting attention" />

            <StatCard 
                title="IN PROGRESS"
                value="36"
                description="Currently being worked on" />
            
            <StatCard 
                title="RESOLVED"
                value="68"
                description="Successfully completed" />

        </section>
    );
}

export default Stats;