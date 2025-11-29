import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (err) {
      // Error handled by slice
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box card">
        <h2 style={{ textAlign: 'center', marginBottom: 30, fontSize: '2rem' }}>Register</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: 20, textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handle}>
          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email Address"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="input-group">
            <label className="input-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <Button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>
        <p style={{ marginTop: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
