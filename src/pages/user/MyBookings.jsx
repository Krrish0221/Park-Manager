import React from 'react';
import { Ticket, Download, Clock, MapPin } from 'lucide-react';

const MyBookings = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>My Bookings</h1>

            {/* Active Ticket Section */}
            <div className="glass-card" style={{
                padding: '0',
                marginBottom: '3rem',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
            }}>
                <div style={{ padding: '2rem', borderBottom: '1px dashed rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ padding: '6px 12px', background: 'rgba(0, 230, 118, 0.1)', color: '#00E676', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem' }}>ACTIVE TICKET</span>
                        <span style={{ color: '#888', fontFamily: 'monospace' }}>#TKT-8492</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>GJ-01-AB-1234</h2>
                            <p style={{ color: '#aaa' }}>Tesla Model 3 • Electric</p>
                        </div>
                        <div style={{ textAlign: 'center', background: '#fff', padding: '10px', borderRadius: '8px' }}>
                            {/* Placeholder QR */}
                            <div style={{ width: '80px', height: '80px', background: '#000' }}></div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', marginBottom: '5px' }}>
                            <MapPin size={16} /> Slot
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>B2-A12</div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', marginBottom: '5px' }}>
                            <Clock size={16} /> Entry Time
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>10:42 AM</div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', marginBottom: '5px' }}>
                            <Ticket size={16} /> Est. Cost
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60a5fa' }}>₹85.00</div>
                    </div>
                </div>
            </div>

            {/* History Logs */}
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Past Bookings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Ticket color="#888" />
                            </div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: 'bold' }}>City Center Plaza</div>
                                <div style={{ color: '#888', fontSize: '0.9rem' }}>Jan 2{i}, 2026 • 2h 15m</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#fff' }}>₹120.00</div>
                            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MyBookings;
