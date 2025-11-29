import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      // Error handled by slice
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box card">
        <h2 style={{ textAlign: 'center', marginBottom: 30, fontSize: '2rem' }}>Login</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: 20, textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handle}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p style={{ marginTop: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
