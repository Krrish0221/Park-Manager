import React from 'react';
import { MapPin } from 'lucide-react';

const FindParking = () => {
    // Mock Dots for Map
    const floors = ['B1', 'B2', 'B3'];
    const cols = 10;
    const rows = 6;

    // Generate some random status
    const getStatus = () => {
        const r = Math.random();
        if (r > 0.7) return 'occupied';
        if (r > 0.6) return 'reserved';
        return 'available';
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Find Parking</h1>
                    <p style={{ color: '#888' }}>Select an available spot (Green) to book.</p>
                </div>
                <div>
                    {/* Filter controls could go here */}
                    <button className="glass-btn">Filter: All</button>
                </div>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                {floors.map(floor => (
                    <div key={floor} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Floor {floor}</h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gap: '10px'
                        }}>
                            {Array.from({ length: cols * rows }).map((_, i) => {
                                const status = getStatus();
                                let color = '#00E676'; // available (green)
                                if (status === 'occupied') color = '#ef4444'; // red
                                if (status === 'reserved') color = '#f59e0b'; // amber

                                return (
                                    <div key={i} className="glass-card" style={{
                                        aspectRatio: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: status === 'available' ? 'pointer' : 'not-allowed',
                                        opacity: status === 'available' ? 1 : 0.5,
                                        border: status === 'available' ? `1px solid ${color}` : 'none',
                                        background: status === 'available' ? `rgba(0, 230, 118, 0.1)` : 'rgba(255,255,255,0.05)'
                                    }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: color,
                                            boxShadow: `0 0 8px ${color}`
                                        }}></div>
                                        {/* Tooltip or data can be added here */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindParking;
