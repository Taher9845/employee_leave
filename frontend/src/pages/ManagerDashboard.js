import React, { useEffect, useState } from 'react';
import api from '../api';
import StatCard from '../components/StatCard';

export default function ManagerDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get('/dashboard/manager').then(res => setStats(res.data)).catch(console.error);
    }, []);

    if (!stats) return <div>Loading stats...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>Manager Dashboard</h2>

            <div className="stats-grid">
                <StatCard
                    title="Total Employees"
                    value={stats.totalEmployees}
                    icon="👥"
                    color="99, 102, 241"
                />
                <StatCard
                    title="On Leave Today"
                    value={stats.onLeaveToday}
                    icon="📅"
                    color="239, 68, 68"
                />~
                <StatCard
                    title="Pending Requests"
                    value={stats.pendingRequests}
                    icon="🔔"
                    color="245, 158, 11"
                />
                <StatCard
                    title="Approved Requests"
                    value={stats.approvedRequests}
                    icon="✅"
                    color="16, 185, 129"
                />
            </div>
        </div>
    );
}
