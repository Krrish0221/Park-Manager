import React, { useState, useEffect } from 'react';
import { Zap, Droplets, Car, BarChart3, Wrench, Battery, Clock, AlertTriangle, UserPlus, Power } from 'lucide-react';
import { FLOORS, WASH_AREAS } from '../../config/constants';
import ValetHub from './ValetHub';
import Financials from './Financials';
import Maintenance from './Maintenance';
import { adminStore } from '../../data/adminData'; // Synced Store

const ServiceHub = () => {
    const [activeTab, setActiveTab] = useState('ev');

    // SYNC STATE WITH LIVE STORE
    const [data, setData] = useState(adminStore.state);

    useEffect(() => {
        const unsubscribe = adminStore.subscribe((newState) => {
            setData(newState);
        });
        return () => unsubscribe();
    }, []);

    const chargers = data.chargers; // Use global list
    const washQueue = data.washQueue; // Use global list

    // Local Smart Queue (can stay local or move to store if needed, keeping local for now as it's UI interactions)
    const [queue, setQueue] = useState([
        { id: 1, name: 'Rahul K.', car: 'Mercedes Benz EV', waitTime: '12m' },
        { id: 2, name: 'Kavyaa P.', car: 'KIA EV', waitTime: '05m' },
    ]);

    const tabs = [
        { id: 'ev', label: 'EV Command', icon: <Zap size={18} /> },
        { id: 'wash', label: 'Wash & Detail', icon: <Droplets size={18} /> },
        { id: 'valet', label: 'Valet Hub', icon: <Car size={18} /> },
        { id: 'finance', label: 'Financials', icon: <BarChart3 size={18} /> },
        { id: 'maint', label: 'Maintenance', icon: <Wrench size={18} /> },
    ];

    // Computed Stats (Derived from Global Data)
    const activeSessions = chargers.filter(c => c.status === 'charging').length;
    const totalPower = chargers.reduce((acc, curr) => acc + (parseFloat(curr.power) || 0), 0).toFixed(0);
    const idleCount = chargers.filter(c => c.status === 'idle').length;
    const faultyCount = chargers.filter(c => c.status === 'faulty').length;

    const getStatusColor = (status) => {
        switch (status) {
            case 'charging': return '#00E676'; // Bright Green
            case 'idle': return '#FFC107'; // Amber
            case 'faulty': return '#FF5252'; // Red
            default: return '#2979FF'; // Blue (Available/Preparing)
        }
    };

    const getTierColor = (tier) => {
        switch (tier) {
            case 'Ceramic Coating': return 'linear-gradient(45deg, #ffd700, #b8860b)'; // Gold
            case 'Interior Deep Clean': return 'linear-gradient(45deg, #2196f3, #00bcd4)'; // Blue
            default: return 'linear-gradient(45deg, #9e9e9e, #616161)'; // Grey
        }
    };

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* HEADER & TABS */}
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Service Hub</h1>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                background: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.05)',
                                color: activeTab === tab.id ? '#000' : '#888',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* BODY CONTENT */}
            <div style={{ flex: 1, display: 'flex', gap: '20px', overflow: 'hidden' }}>

                {activeTab === 'ev' && (
                    <>
                        {/* MAIN GRID: EV CHARGERS */}
                        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                            {/* Quick Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
                                <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(0, 230, 118, 0.15)', borderRadius: '8px', color: '#00E676' }}><Power size={20} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{totalPower} kW</h3>
                                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Total Load</p>
                                    </div>
                                </div>
                                <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(41, 121, 255, 0.15)', borderRadius: '8px', color: '#2979FF' }}><Zap size={20} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{activeSessions}/60</h3>
                                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Active Sessions</p>
                                    </div>
                                </div>
                                <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(255, 193, 7, 0.15)', borderRadius: '8px', color: '#FFC107' }}><AlertTriangle size={20} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{idleCount}</h3>
                                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Idle Penalties</p>
                                    </div>
                                </div>
                                <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(255, 82, 82, 0.15)', borderRadius: '8px', color: '#FF5252' }}><Wrench size={20} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{faultyCount}</h3>
                                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Faulty Units</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Scroll Area */}
                            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                                    {chargers.map(charger => (
                                        <div key={charger.id} className="glass-card" style={{
                                            padding: '15px',
                                            position: 'relative',
                                            borderTop: `3px solid ${getStatusColor(charger.status)}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{charger.id}</span>
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    background: `${getStatusColor(charger.status)}22`, // 22 hex = ~13% opacity
                                                    color: getStatusColor(charger.status),
                                                    textTransform: 'uppercase',
                                                    fontWeight: '700'
                                                }}>
                                                    {charger.status}
                                                </span>
                                            </div>

                                            {/* Location Info (Mocked if missing in store, or handled) */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888' }}>
                                                <span>Floor {Math.floor(parseInt(charger.id.split('-')[1] || 0) / 20)}</span> {/* Helper logic if needed */}
                                                <span>Zone A</span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccc', marginTop: '5px' }}>
                                                <Battery size={16} />
                                                <span>{charger.battery}%</span>
                                                {charger.status === 'charging' && <span className="animate-pulse" style={{ color: '#00E676', marginLeft: 'auto' }}>⚡ {charger.power} kW</span>}
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                                <Clock size={14} color="#888" />
                                                <span style={{ fontSize: '0.85rem', color: '#888' }}>{charger.time}</span>
                                                {charger.status === 'idle' && (
                                                    <span style={{ marginLeft: 'auto', color: '#FFC107', fontSize: '1.2rem' }}>⚠️</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR: SMART QUEUE */}
                        <div className="glass-card" style={{ flex: 1, maxWidth: '300px', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 'bold' }}>Smart Queue</h3>
                                <span style={{ background: '#2979FF', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{queue.length} Waiting</span>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {queue.map(q => (
                                    <div key={q.id} style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderLeft: '3px solid #777'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '600' }}>{q.name}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{q.waitTime}</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#888' }}>{q.car}</div>
                                    </div>
                                ))}

                                {queue.length === 0 && <div style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>Queue is empty</div>}
                            </div>

                            <button style={{
                                marginTop: '20px',
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: 'pointer'
                            }}
                                onClick={() => setQueue([...queue, { id: Date.now(), name: 'Guest User', car: 'Unknown EV', waitTime: 'Just now' }])}
                            >
                                <UserPlus size={18} />
                                Join Queue
                            </button>
                        </div>
                    </>
                )}

                {/* WASH & DETAIL TAB */}
                {activeTab === 'wash' && (
                    <div style={{ width: '100%', display: 'flex', gap: '2rem' }}>
                        {/* KANBAN COLUMNS */}
                        {['Pending', 'In Progress', 'Ready'].map(status => (
                            <div key={status} style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
                                <div style={{
                                    marginBottom: '1rem',
                                    padding: '10px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>{status.toUpperCase()}</span>
                                    <span style={{
                                        background: '#333',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem'
                                    }}>
                                        {washQueue.filter(i => i.status === status).length}
                                    </span>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {washQueue.filter(i => i.status === status).map(item => (
                                        <div key={item.id} className="glass-card" style={{ padding: '15px', position: 'relative', borderLeft: `4px solid ${status === 'Ready' ? '#4caf50' : status === 'In Progress' ? '#2196f3' : '#ff9800'}` }}>
                                            {/* Service Badge */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: getTierColor(item.tier),
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                            }}>
                                                {item.tier}
                                            </div>

                                            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '15px' }}>{item.plate}</h4>

                                            {/* Car + Location Info */}
                                            <div style={{ marginBottom: '10px' }}>
                                                <p style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>{item.model}</p>
                                                <p style={{ color: '#4fc3f7', fontSize: '0.8rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Wrench size={12} /> {item.location}
                                                </p>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <Clock size={14} color="#f44336" />
                                                    <span style={{ color: '#fff' }}>Exit: {item.exitTime}</span>
                                                </div>
                                                {item.staff ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#eee', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                                            {item.staff.charAt(0)}
                                                        </div>
                                                        <span style={{ color: '#aaa' }}>{item.staff}</span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: '#666', fontStyle: 'italic' }}>Unassigned</span>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
                                                {item.img && (
                                                    <button style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                        📷 Validated
                                                    </button>
                                                )}
                                                {!item.img && (
                                                    <button style={{ flex: 1, padding: '6px', border: '1px dashed #666', background: 'transparent', borderRadius: '4px', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                        + Upload
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* VALET HUB TAB */}
                {activeTab === 'valet' && <ValetHub />}

                {/* FINANCIALS TAB */}
                {activeTab === 'finance' && <Financials />}

                {/* MAINTENANCE TAB */}
                {activeTab === 'maint' && <Maintenance />}

                {/* PLACEHOLDERS FOR OTHER TABS */}
                {activeTab !== 'ev' && activeTab !== 'wash' && activeTab !== 'valet' && activeTab !== 'finance' && activeTab !== 'maint' && (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#888' }}>
                        <Wrench size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
                        <h2>Module Under Construction</h2>
                        <p>This section is being built as part of Phase 2.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ServiceHub;
