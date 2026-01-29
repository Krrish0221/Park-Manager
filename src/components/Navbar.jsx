import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const [userRole, setUserRole] = React.useState(localStorage.getItem('userRole'));
    const navigate = useNavigate();

    React.useEffect(() => {
        // Simple event listener for storage changes (works across tabs, but also good for re-renders on mount)
        const checkUser = () => setUserRole(localStorage.getItem('userRole'));
        window.addEventListener('storage', checkUser);

        // Also check on location change as login happens in same tab
        checkUser();

        return () => window.removeEventListener('storage', checkUser);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        setUserRole(null);
        navigate('/login');
    };

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: 'rgba(5, 5, 5, 0.5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        letterSpacing: '1px',
        color: '#fff',
        textTransform: 'uppercase',
        background: 'linear-gradient(45deg, #fff, #888)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };

    const linkStyle = {
        marginLeft: '2rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0
    };

    const activeLinkStyle = {
        ...linkStyle,
        color: '#fff'
    };

    return (
        <nav style={navStyle}>
            <div style={logoStyle}>
                Park Manager
            </div>
            <div>
                <Link
                    to="/"
                    style={location.pathname === '/' ? activeLinkStyle : linkStyle}
                >
                    HOME
                </Link>

                {userRole === 'user' && (
                    <Link
                        to="/user/dashboard"
                        style={location.pathname === '/user/dashboard' ? activeLinkStyle : linkStyle}
                    >
                        DASHBOARD
                    </Link>
                )}

                {userRole ? (
                    <button
                        onClick={handleLogout}
                        style={linkStyle}
                    >
                        LOGOUT
                    </button>
                ) : (
                    <Link
                        to="/login"
                        style={location.pathname === '/login' ? activeLinkStyle : linkStyle}
                    >
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
