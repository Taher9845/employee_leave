import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const { user } = useSelector(state => state.auth);
    const isManager = user?.role === 'manager';

    return (
        <div className="sidebar">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Dashboard
                </NavLink>

                {!isManager && (
                    <>
                        <NavLink to="/apply-leave" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Apply Leave
                        </NavLink>
                        <NavLink to="/my-requests" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            My Requests
                        </NavLink>
                    </>
                )}

                {isManager && (
                    <>
                        <NavLink to="/pending-requests" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Pending Requests
                        </NavLink>
                        <NavLink to="/all-requests" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            All History
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}
