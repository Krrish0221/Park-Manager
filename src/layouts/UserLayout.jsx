import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

const UserLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
            <UserSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                overflowY: 'auto',
                height: '100vh',
                background: 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, #000 100%)' // Cyber-Industrial background
            }}>
                <div className="animate-fade-in" style={{ padding: '2rem', height: '100%' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserLayout;
