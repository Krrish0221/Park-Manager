import React, { useState } from 'react';
import { CarFront, Plus, Trash2, Edit2 } from 'lucide-react';

const MyVehicles = () => {
    // Mock Data
    const [vehicles, setVehicles] = useState([
        { id: 1, plate: 'GJ-01-AB-1234', model: 'Tesla Model 3', type: 'EV', color: '#ef4444' }, // Red Tesla
        { id: 2, plate: 'MH-02-CP-9999', model: 'Honda City', type: 'Petrol', color: '#3b82f6' }, // Blue Honda
    ]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>My Vehicles</h1>
                <button style={{
                    padding: '10px 20px',
                    background: '#00E676',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Plus size={18} /> Add New Vehicle
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {vehicles.map(v => (
                    <div key={v.id} className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: v.color, filter: 'blur(50px)', opacity: 0.3 }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CarFront size={24} color="#fff" />
                            </div>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '20px',
                                background: v.type === 'EV' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255,255,255,0.1)',
                                color: v.type === 'EV' ? '#00E676' : '#888',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                height: 'fit-content'
                            }}>
                                {v.type}
                            </span>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{v.plate}</h2>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>{v.model}</p>

                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <button style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <Edit2 size={16} /> Edit
                            </button>
                            <button style={{ padding: '10px', background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.3)', color: '#FF5252', borderRadius: '6px', cursor: 'pointer' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <div style={{
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '250px',
                    cursor: 'pointer',
                    color: '#888',
                    transition: 'all 0.3s'
                }} className="hover:bg-white/5">
                    <Plus size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <span>Register Another Vehicle</span>
                </div>
            </div>
        </div>
    );
};

export default MyVehicles;
