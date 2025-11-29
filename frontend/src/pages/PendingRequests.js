import React, { useEffect, useState } from 'react';
import api from '../api';
import Button from '../components/Button';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    api.get('/leaves/pending').then(res => setRequests(res.data)).catch(console.error);
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') await api.put(`/leaves/${id}/approve`);
      else await api.put(`/leaves/${id}/reject`);
      loadRequests();
    } catch (err) {
      alert(`Failed to ${action} request`);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Pending Requests</h2>
      <div className="card table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.userId?.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{req.leaveType}</td>
                <td>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                <td>{req.totalDays}</td>
                <td>{req.reason}</td>
                <td>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Button onClick={() => handleAction(req._id, 'approve')} style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'var(--success)' }}>
                      Approve
                    </Button>
                    <Button variant="danger" onClick={() => handleAction(req._id, 'reject')} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No pending requests</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
