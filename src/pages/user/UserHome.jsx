import React, { useState } from 'react';
import {
    Bell,
    User,
    Car,
    Bike,
    Zap,
    Clock,
    MapPin,
    ArrowRight,
    Wallet,
    QrCode,
    RotateCcw,
    Droplets,
    CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();
    const [isParked, setIsParked] = useState(false); // Toggle for demo

    // Mock Data
    const greeting = "Good Evening, Krish";
    const tier = "Park Manager Member • Gold Tier";

    // Stats Matrix Data
    const walletBalance = "450.00";
    const vehicle = "GJ-01-AB-1234";

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>

            {/* Module 1: Smart Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '4px'
                    }}>
                        {greeting}
                    </h1>
                    <p style={{
                        color: '#a0a0a0',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            background: '#FFD700', // Gold
                            borderRadius: '50%',
                            boxShadow: '0 0 8px #FFD700'
                        }}></span>
                        {tier}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="glass-card" style={{
                        padding: '10px',
                        borderRadius: '12px',
                        position: 'relative',
                        cursor: 'pointer'
                    }}>
                        <Bell size={20} color="#fff" />
                        <span style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '8px',
                            height: '8px',
                            background: '#FF5252',
                            borderRadius: '50%',
                            border: '1px solid #000'
                        }}></span>
                    </div>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        border: '2px solid rgba(59, 130, 246, 0.5)', // Blue glow
                        background: 'url(https://i.pravatar.cc/150?u=krish) center/cover no-repeat', // Placeholder avatar
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
                    }}></div>
                </div>
            </header>

            {/* Module 2: The "State-Switching" Hero */}
            <section className="glass-card" style={{
                padding: '2rem',
                marginBottom: '2rem',
                border: isParked ? '1px solid #00E676' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: isParked ? '0 0 20px rgba(0, 230, 118, 0.1)' : 'none',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Effect */}
                <div style={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0, left: 0,
                    background: isParked
                        ? 'radial-gradient(circle at 80% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 60%)'
                        : 'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <span style={{
                                padding: '6px 12px',
                                background: isParked ? 'rgba(0, 230, 118, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                color: isParked ? '#00E676' : '#60a5fa',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                display: 'inline-block'
                            }}>
                                {isParked ? '● LIVE SESSION' : 'READY TO BOOK'}
                            </span>

                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                marginBottom: '0.5rem',
                                lineHeight: '1.2'
                            }}>
                                {isParked ? '01:42:15' : 'Reserve Your Spot'}
                            </h2>

                            <p style={{ color: '#a0a0a0', fontSize: '1rem', marginBottom: '2rem', maxWidth: '400px' }}>
                                {isParked
                                    ? 'Floor L2 • Slot B-45'
                                    : 'Secure a premium slot near the elevator. Pre-booking saves 10%.'
                                }
                            </p>
                        </div>

                        {/* Interactive Toggle for Demo */}
                        <button onClick={() => setIsParked(!isParked)} style={{ opacity: 0.3, fontSize: '0.7rem' }}>
                            [Toggle State]
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button onClick={() => navigate(isParked ? '/user/live' : '/user/find-parking')} style={{
                            padding: '14px 32px',
                            background: isParked ? '#ef4444' : 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: isParked ? '0 4px 15px rgba(239, 68, 68, 0.3)' : '0 4px 15px rgba(37, 99, 235, 0.3)'
                        }}>
                            {isParked ? 'Pay & Exit' : 'Book Parking Now'} <ArrowRight size={18} />
                        </button>

                        {!isParked && (
                            <button style={{
                                background: 'transparent',
                                color: '#a0a0a0',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                textDecoration: 'underline'
                            }}>
                                Scan QR at Gate
                            </button>
                        )}

                        {isParked && (
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Current Bill</div>
                                <div style={{ color: '#00E676', fontSize: '1.5rem', fontWeight: 'bold' }}>₹85.00</div>
                            </div>
                        )}
                    </div>
                    {!isParked && (
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            right: '2rem',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.8rem'
                        }}>
                            Starts at <span style={{ fontWeight: 'bold' }}>₹40/hr</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Module 3: Availability & Pricing Grid */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Car Slot */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: '8px', color: '#00E676' }}>
                            <Car size={24} />
                        </div>
                        <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: '#a0a0a0', fontSize: '0.75rem', height: 'fit-content' }}>
                            ₹40/hr
                        </span>
                    </div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>45 Free</h3>
                    <p style={{ color: '#00E676', fontSize: '0.9rem' }}>Available</p>
                </div>

                {/* Bike Slot */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#60a5fa' }}>
                            <Bike size={24} />
                        </div>
                        <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: '#a0a0a0', fontSize: '0.75rem', height: 'fit-content' }}>
                            ₹20/hr
                        </span>
                    </div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>12 Free</h3>
                    <p style={{ color: '#60a5fa', fontSize: '0.9rem' }}>Available</p>
                </div>

                {/* EV Slot */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#f59e0b' }}>
                            <Zap size={24} />
                        </div>
                        <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: '#a0a0a0', fontSize: '0.75rem', height: 'fit-content' }}>
                            ₹15/kWh
                        </span>
                    </div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>02 Free</h3>
                    <p style={{ color: '#f59e0b', fontSize: '0.9rem' }}>Limited</p>
                </div>
            </section>

            {/* Module 4: The "Quick Stats" Matrix */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Card 1: Wallet */}
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#a0a0a0' }}>Wallet Balance</span>
                        <div style={{ cursor: 'pointer', padding: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                            <ArrowRight size={14} color="#fff" />
                        </div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                        ₹ {walletBalance}
                    </div>
                    {/* Mini Visual Graph */}
                    <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '60%', height: '100%', background: '#60a5fa' }}></div>
                    </div>
                </div>

                {/* Card 2: My Vehicle */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#a0a0a0' }}>My Vehicle</span>
                        <Car size={18} color="#a0a0a0" />
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                        {vehicle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00E676', fontSize: '0.9rem' }}>
                        <CheckCircle size={14} /> FASTag Active
                    </div>
                </div>

                {/* Card 3: Active Service / Offer */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#a0a0a0' }}>Service Status</span>
                        <Droplets size={18} color="#60a5fa" />
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                        Car Wash: Queued
                    </div>
                    <div style={{ color: '#f59e0b', fontSize: '0.9rem' }}>Est. Wait: 25 mins</div>
                </div>

                {/* Card 4: Recent History */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#a0a0a0' }}>Recent</span>
                        <RotateCcw size={18} color="#a0a0a0" />
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        City Center Mall
                    </div>
                    <button style={{
                        background: 'transparent',
                        color: '#60a5fa',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        padding: 0,
                        display: 'flex', alignItems: 'center', gap: '4px'
                    }}>
                        Re-book <ArrowRight size={14} />
                    </button>
                </div>
            </section>

            {/* Module 5: Floating Action Button (Mobile Only) */}
            <div style={{
                position: 'fixed',
                bottom: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
                // Only show on small screens usually, but for now show always as requested
                display: 'flex',
                justifyContent: 'center'
            }} className="md:hidden">
                {/* Note: md:hidden Tailwind class might depend on setup, using inline style to ensure visibility or media query logic in CSS if strict. 
                   For now, assuming this is desired. The prompt said "If you are viewing this on a phone screen". 
                   I will make it responsive if I could, but for this specific "Admin UI" request, I'll place it but usually only mobile layouts show FABs. 
                   I'll remove the className "md:hidden" so it's visible for the user to see, or add a media query via style. 
                */}
                <button style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#2563eb',
                    color: '#fff',
                    border: '4px solid rgba(0,0,0,0.5)',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <QrCode size={28} />
                </button>
            </div>

        </div>
    );
};

export default UserHome;
