import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/employee').then(res => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Welcome back, {user?.name}</h2>

      <div className="stats-grid">
        <StatCard
          title="Leave Balance (Sick)"
          value={stats.balance?.sickLeave || 0}
          icon="🏥"
          color="16, 185, 129"
        />
        <StatCard
          title="Leave Balance (Casual)"
          value={stats.balance?.casualLeave || 0}
          icon="🏖️"
          color="59, 130, 246"
        />
        <StatCard
          title="Leave Balance (Vacation)"
          value={stats.balance?.vacation || 0}
          icon="✈️"
          color="245, 158, 11"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pending}
          icon="⏳"
          color="236, 72, 153"
        />
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{ marginTop: 20 }}>
          <Link to="/apply-leave" className="btn btn-primary">Apply for Leave</Link>
        </div>
      </div>
    </div>
  );
}
