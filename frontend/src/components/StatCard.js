import React from 'react';

export default function StatCard({ title, value, icon, color }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 5 }}>{title}</p>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 600 }}>{value}</h3>
                </div>
                <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `rgba(${color}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: `rgb(${color})`,
                    fontSize: '1.5rem'
                }}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
