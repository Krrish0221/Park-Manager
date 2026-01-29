import React, { useState } from 'react';
import { Zap, Clock, Battery, Droplets, User } from 'lucide-react';

const LiveSession = () => {
    // Mock State
    const [charging, setCharging] = useState(true);

    return (
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

            {/* Left Panel: Parking Status */}
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock color="#60a5fa" /> Parking Monitor
                </h2>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>01:42:18</div>
                    <div style={{ color: '#888' }}>Duration Parked</div>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#aaa' }}>Entry Time</span>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>10:42 AM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#aaa' }}>Current Rate</span>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>₹50 / hr</span>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '15px 0' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#fff', fontSize: '1.1rem' }}>Total Bill</span>
                        <span style={{ color: '#60a5fa', fontSize: '1.5rem', fontWeight: 'bold' }}>₹85.00</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Services</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <button style={{ padding: '15px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <Droplets size={24} /> Request Wash
                        </button>
                        <button style={{ padding: '15px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', color: '#f59e0b', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <User size={24} /> Request Valet
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel: EV Mode */}
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Zap color="#00E676" /> EV Charging
                </h2>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #00E676', borderTopColor: 'transparent', transform: 'rotate(45deg)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#00E676' }}>72%</div>
                            <div style={{ color: '#888' }}>BATTERY</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '2rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>POWER</div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>11 kW</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>ADDED</div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>8.4 kWh</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>COST</div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>₹42.00</div>
                    </div>
                </div>

                <button
                    onClick={() => setCharging(!charging)}
                    style={{
                        width: '100%',
                        padding: '15px',
                        background: charging ? '#ef4444' : '#00E676',
                        color: '#fff', // White text for both
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    {charging ? 'STOP CHARGING' : 'START CHARGING'}
                </button>
            </div>
        </div>
    );
};

export default LiveSession;
