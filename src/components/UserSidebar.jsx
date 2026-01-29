import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    MapPin,
    Ticket,
    Zap,
    Wallet,
    CarFront,
    UserCog,
    LogOut,
    User,
    MoreVertical
} from 'lucide-react';

const UserSidebar = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/user/home', icon: <LayoutDashboard size={20} /> },
        { name: 'Find Parking', path: '/user/find-parking', icon: <MapPin size={20} /> },
        { name: 'My Bookings', path: '/user/bookings', icon: <Ticket size={20} /> },
        { name: 'Live Session', path: '/user/live', icon: <Zap size={20} /> },
        { name: 'Wallet & Pay', path: '/user/wallet', icon: <Wallet size={20} /> },
        { name: 'My Vehicles', path: '/user/vehicles', icon: <CarFront size={20} /> },
        { name: 'Profile', path: '/user/profile', icon: <UserCog size={20} /> },
    ];

    return (
        <aside style={{
            width: isCollapsed ? '80px' : '260px',
            padding: '2rem 1rem',
            background: '#0a0a0a', // Deep black for Cyber-Industrial
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: '100vh',
            position: 'sticky',
            top: 0
        }}>
            {/* Header / Toggle */}
            <div style={{
                padding: isCollapsed ? '0 0.5rem 3rem' : '0 1rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                minHeight: '80px',
                gap: isCollapsed ? 0 : '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Logo Icon - Always Visible */}
                    <div style={{
                        minWidth: '30px',
                        height: '30px',
                        background: '#3b82f6', // Neon Blue accent
                        borderRadius: '6px',
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                    }}></div>

                    {/* Logo Text - Hides on Collapse */}
                    <div style={{
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'all 0.3s ease',
                        maxWidth: isCollapsed ? 0 : '200px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Park Manager</h2>
                    </div>
                </div>

                <button
                    onClick={toggleSidebar}
                    style={{
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '8px',
                        marginLeft: isCollapsed ? 0 : 'auto',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <MoreVertical size={20} />
                </button>
            </div>

            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                                <Link
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        color: isActive ? '#60a5fa' : '#888', // Neon Blue text for active
                                        background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent', // Blue tint bg
                                        fontWeight: isActive ? '600' : '400',
                                        transition: 'all 0.2s ease',
                                        position: 'relative',
                                        textDecoration: 'none',
                                        border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
                                    }}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <div style={{ minWidth: '20px', display: 'flex', justifyContent: 'center' }}>
                                        {item.icon}
                                    </div>

                                    <span style={{
                                        opacity: isCollapsed ? 0 : 1,
                                        transition: 'all 0.2s ease',
                                        maxWidth: isCollapsed ? 0 : '200px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / User Profile */}
            <div style={{
                padding: isCollapsed ? '1rem 0' : '1rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                marginTop: 'auto',
                flexDirection: isCollapsed ? 'column' : 'row',
                gap: isCollapsed ? '20px' : '0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Avatar - Always Visible */}
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <User size={18} color="#fff" />
                    </div>

                    {/* User Info - Hides on Collapse */}
                    <div style={{
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'all 0.2s ease',
                        maxWidth: isCollapsed ? 0 : '150px',
                        overflow: 'hidden',
                        marginLeft: isCollapsed ? 0 : '10px',
                        whiteSpace: 'nowrap'
                    }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: '500', color: '#fff', margin: 0 }}>Driver</p>
                        <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Basic Plan</p>
                    </div>
                </div>

                <Link to="/login" style={{ color: '#888', display: 'flex' }} title="Logout">
                    <LogOut size={18} />
                </Link>
            </div>
        </aside>
    );
};

export default UserSidebar;
