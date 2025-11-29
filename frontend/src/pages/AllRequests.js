import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AllRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        api.get('/leaves/all').then(res => setRequests(res.data)).catch(console.error);
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>All Leave History</h2>
            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Type</th>
                            <th>Dates</th>
                            <th>Days</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.userId?.name}</td>
                                <td style={{ textTransform: 'capitalize' }}>{req.leaveType}</td>
                                <td>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                                <td>{req.totalDays}</td>
                                <td>
                                    <span className={`badge badge-${req.status}`}>{req.status}</span>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No history found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
