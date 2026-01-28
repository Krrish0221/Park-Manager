import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '80px', // Offset for navbar
            background: 'radial-gradient(circle at 50% 50%, #151515 0%, #050505 100%)'
        }}>
            <div className="container animate-slide-up">
                {/* Dynamic Background Elements (Abstract) */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0,
                    animation: 'float 6s ease-in-out infinite'
                }}></div>

                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Manage Your Park <br />
                    <span style={{
                        background: 'linear-gradient(90deg, #fff 0%, #666 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Like a Pro</span>
                </h1>

                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 3rem auto',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Experience the premium standard in park administration.
                    Streamlined, efficient, and elegantly designed for modern needs.
                </p>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/login">
                        <button style={{
                            padding: '1rem 3rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#000',
                            background: '#fff',
                            borderRadius: '50px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
                            }}
                        >
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>

            {/* Decorative footer line */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }}></div>
        </div>
    );
};

export default Home;
