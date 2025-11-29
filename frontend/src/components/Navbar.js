import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{
      height: 70,
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 30px',
      background: 'var(--surface)',
      justifyContent: 'space-between'
    }}>
      <h2 style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        LeaveManager
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span>Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
