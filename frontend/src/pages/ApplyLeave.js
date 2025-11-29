import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Calculate total days (simple approximation)
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      await api.post('/leaves', { ...formData, totalDays });
      navigate('/my-requests');
    } catch (err) {
      alert('Failed to apply for leave');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Apply for Leave</h2>
      <div className="card" style={{ maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation Leave</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="input-field"
              rows="4"
              required
            ></textarea>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </div>
    </div>
  );
}
