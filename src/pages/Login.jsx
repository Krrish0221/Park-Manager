import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Toggle for Admin/User
    const [isRegister, setIsRegister] = useState(false); // Toggle for Login/Register
    const [focusedInput, setFocusedInput] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Demo Logic
        if (isAdmin) {
            navigate('/admin/dashboard');
        } else {
            // Set user role (normally handled by backend/auth context)
            localStorage.setItem('userRole', 'user');
            navigate('/user/home');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Registration successful! Please login.");
        setIsRegister(false);
    };

    const inputStyle = (name) => ({
        width: '100%',
        padding: '1rem',
        marginBottom: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: focusedInput === name ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: '#fff',
        outline: 'none',
        transition: 'border-color 0.3s'
    });

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'radial-gradient(circle at 50% 50%, #151515 0%, #050505 100%)'
        }}>
            <div className="glass-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Abstract Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: isAdmin
                        ? 'radial-gradient(circle at 50% 50%, rgba(200, 50, 50, 0.05), transparent 60%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(50, 200, 255, 0.05), transparent 60%)',
                    transition: 'background 0.5s ease',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {isRegister ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {isRegister ? 'Join Park Manager as' : 'Login as'} <span style={{ color: '#fff', fontWeight: 'bold' }}>{isAdmin ? 'Admin' : 'User'}</span>
                        </p>
                    </div>

                    {/* Role Toggle Switch */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50px',
                        padding: '4px',
                        marginBottom: '2rem',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: '4px',
                            top: '4px',
                            bottom: '4px',
                            width: 'calc(50% - 4px)',
                            background: '#fff',
                            borderRadius: '46px',
                            transform: isAdmin ? 'translateX(100%)' : 'translateX(0)',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        }}></div>

                        <button
                            type="button"
                            onClick={() => setIsAdmin(false)}
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                borderRadius: '50px',
                                background: 'transparent',
                                color: !isAdmin ? '#000' : '#888',
                                fontWeight: '600',
                                transition: 'color 0.3s',
                                zIndex: 1
                            }}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAdmin(true)}
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                borderRadius: '50px',
                                background: 'transparent',
                                color: isAdmin ? '#000' : '#888',
                                fontWeight: '600',
                                transition: 'color 0.3s',
                                zIndex: 1
                            }}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={isRegister ? handleRegister : handleLogin}>
                        {isRegister && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                style={inputStyle('name')}
                                onFocus={() => setFocusedInput('name')}
                                onBlur={() => setFocusedInput(null)}
                                required
                            />
                        )}

                        <input
                            type="email"
                            placeholder={isAdmin ? "Admin Email" : "User Email"}
                            style={inputStyle('email')}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            style={inputStyle('password')}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            required
                        />

                        {isRegister && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                style={inputStyle('confirmPassword')}
                                onFocus={() => setFocusedInput('confirmPassword')}
                                onBlur={() => setFocusedInput(null)}
                                required
                            />
                        )}

                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '8px',
                            background: '#fff',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginTop: '0.5rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 5px 15px rgba(255,255,255,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                            type="submit"
                        >
                            {isRegister ? 'Create Account' : 'Login'}
                        </button>
                    </form>

                    {/* Toggle Login/Register */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        {isRegister ? "Already have an account? " : "Don't have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsRegister(!isRegister)}
                            style={{
                                color: '#fff',
                                textDecoration: 'underline',
                                background: 'none',
                                padding: 0,
                                fontSize: 'inherit'
                            }}
                        >
                            {isRegister ? "Login" : "Create Account"}
                        </button>
                    </p>

                    {!isRegister && (
                        <p style={{
                            textAlign: 'center',
                            marginTop: '0.5rem',
                            fontSize: '0.8rem'
                        }}>
                            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Forgot Password?</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
