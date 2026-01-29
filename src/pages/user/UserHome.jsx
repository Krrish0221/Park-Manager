import React from 'react';
import { Car, Bike, Zap, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();

    // Mock Data
    const slots = [
        { type: 'Car', count: 42, total: 120, icon: <Car size={20} />, color: '#60a5fa' }, // Blue
        { type: 'Bike', count: 18, total: 50, icon: <Bike size={20} />, color: '#34d399' }, // Green
        { type: 'EV', count: 5, total: 15, icon: <Zap size={20} />, color: '#f59e0b' }, // Amber
    ];

    const hasActiveSession = true; // Simulating active parking

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>Welcome back, Driver</h1>
                <p style={{ color: '#888' }}>Find a spot or manage your current session.</p>
            </header>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {slots.map((slot, index) => (
                    <div key={index} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: slot.color }}>
                                {slot.icon}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>{slot.type}</span>
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{slot.count}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>Available spots</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Active Session Card */}
                {hasActiveSession ? (
                    <div className="glass-card" style={{
                        padding: '2rem',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        gridColumn: 'span 2'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Clock /> Active Parking Session
                                </h2>
                                <p style={{ color: '#aaa', marginTop: '5px' }}>Parked at: City Center Plaza • Floor B2</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>01h : 42m</div>
                                <div style={{ color: '#60a5fa' }}>Current Bill: ₹85.00</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button onClick={() => navigate('/user/live')} style={{
                                padding: '12px 24px',
                                background: '#3b82f6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                View Session Details <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '2rem', gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Ready to Park?</h2>
                            <p style={{ color: '#888' }}>Find the nearest spot and book in seconds.</p>
                        </div>
                        <button onClick={() => navigate('/user/find-parking')} style={{
                            padding: '12px 24px',
                            background: '#00E676',
                            color: '#000',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Find Parking Now
                        </button>
                    </div>
                )}

                {/* Find Parking Card */}
                <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <MapPin size={30} color="#fff" />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Find a Spot</h3>
                    <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Check real-time availability on the map.</p>
                    <button onClick={() => navigate('/user/find-parking')} style={{
                        width: '100%',
                        padding: '12px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}>
                        Open Map
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserHome;
