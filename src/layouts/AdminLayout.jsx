import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    Zap,
    BoomBox,
    ShieldAlert,
    BarChart3,
    Settings,
    LogOut,
    User,
    Ticket,
    Users,
    MoreVertical
} from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Tickets', path: '/admin/tickets', icon: <Ticket size={20} /> },
        { name: 'Floor Map', path: '/admin/floors', icon: <Map size={20} /> },
        { name: 'Service Hub', path: '/admin/services', icon: <Zap size={20} /> },
        { name: 'Gate Control', path: '/admin/gates', icon: <BoomBox size={20} /> },
        { name: 'Security', path: '/admin/security', icon: <ShieldAlert size={20} /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Staff Management', path: '/admin/staff', icon: <Users size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
            {/* Sidebar */}
            <aside style={{
                width: isCollapsed ? '80px' : '260px',
                padding: '2rem 1rem',
                background: 'var(--bg-secondary)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
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
                        <div style={{ minWidth: '30px', height: '30px', background: '#fff', borderRadius: '6px' }}></div>

                        {/* Logo Text - Hides on Collapse */}
                        <div style={{
                            opacity: isCollapsed ? 0 : 1,
                            transition: 'all 0.3s ease',
                            maxWidth: isCollapsed ? 0 : '200px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Park Manager</h2>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '8px',
                            marginLeft: isCollapsed ? 0 : 'auto'
                        }}
                    >
                        <MoreVertical size={20} />
                    </button>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none' }}>
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
                                            color: isActive ? '#000' : 'var(--text-secondary)',
                                            background: isActive ? '#fff' : 'transparent',
                                            fontWeight: isActive ? '600' : '400',
                                            transition: 'all 0.2s ease',
                                            position: 'relative'
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
                            flexShrink: 0
                        }}>
                            <User size={18} />
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
                            <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>Admin User</p>
                            <p style={{ fontSize: '0.75rem', color: 'gray' }}>Online</p>
                        </div>
                    </div>

                    <Link to="/login" style={{ color: 'var(--text-secondary)' }} title="Logout">
                        <LogOut size={18} />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
