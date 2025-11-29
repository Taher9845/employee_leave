import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyRequests from './pages/MyRequests';
import PendingRequests from './pages/PendingRequests';
import AllRequests from './pages/AllRequests';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Layout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <div className="dashboard-grid">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  </div>
);

const PrivateRoute = ({ children, roles }) => {
  const { token, user, loading } = useSelector(state => state.auth);

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" />;

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={
          user?.role === 'manager' ? <ManagerDashboard /> : <EmployeeDashboard />
        } />

        {/* Employee Routes */}
        <Route path="/apply-leave" element={<PrivateRoute roles={['employee']}><ApplyLeave /></PrivateRoute>} />
        <Route path="/my-requests" element={<PrivateRoute roles={['employee']}><MyRequests /></PrivateRoute>} />

        {/* Manager Routes */}
        <Route path="/pending-requests" element={<PrivateRoute roles={['manager']}><PendingRequests /></PrivateRoute>} />
        <Route path="/all-requests" element={<PrivateRoute roles={['manager']}><AllRequests /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
