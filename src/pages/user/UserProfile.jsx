import React from 'react';
import { User, Lock, Bell, LogOut } from 'lucide-react';

const UserProfile = () => {
    const inputStyle = {
        width: '100%',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: '#fff',
        outline: 'none',
        marginTop: '8px'
    };

    const labelStyle = {
        color: '#888',
        fontSize: '0.9rem'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>Profile & Settings</h1>

            {/* Profile Info */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
                    <User color="#60a5fa" /> Personal Details
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" defaultValue="Aryan Sharma" style={inputStyle} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 00000" style={inputStyle} />
                </div>

                <div style={{ marginBottom: '0' }}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" defaultValue="aryan@example.com" style={inputStyle} />
                </div>
            </div>

            {/* Notifications */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
                    <Bell color="#f59e0b" /> Preferences
                </h3>

                {[
                    { label: 'SMS Alerts for Overstay', desc: 'Get notified 10m before expiry' },
                    { label: 'Promotional Offers', desc: 'Discounts on car wash & valet' }
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i === 0 ? '1.5rem' : 0 }}>
                        <div>
                            <div style={{ color: '#fff' }}>{item.label}</div>
                            <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.desc}</div>
                        </div>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input type="checkbox" defaultChecked />
                            <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#f59e0b', borderRadius: '34px', transition: '.4s' }}>
                                <span style={{ position: 'absolute', content: '""', height: '14px', width: '14px', left: '22px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
                            </span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Security */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
                    <Lock color="#ef4444" /> Security
                </h3>
                <button style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px' }}>
                    Change Password
                </button>
                <button style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={18} /> Logout Device
                </button>
            </div>

        </div>
    );
};

export default UserProfile;
