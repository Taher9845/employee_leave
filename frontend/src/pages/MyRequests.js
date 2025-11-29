import React, { useEffect, useState } from 'react';
import api from '../api';
import Button from '../components/Button';

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    api.get('/leaves/my-requests').then(res => setRequests(res.data)).catch(console.error);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/leaves/${id}`);
      loadRequests();
    } catch (err) {
      alert('Failed to cancel request');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>My Leave Requests</h2>
      <div className="card table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td style={{ textTransform: 'capitalize' }}>{req.leaveType}</td>
                <td>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                <td>{req.totalDays}</td>
                <td>
                  <span className={`badge badge-${req.status}`}>{req.status}</span>
                </td>
                <td>{req.reason}</td>
                <td>
                  {req.status === 'pending' && (
                    <Button variant="danger" onClick={() => handleCancel(req._id)} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
