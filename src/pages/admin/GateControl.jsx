import React, { useState, useEffect } from 'react';
import {
    Shield, Unlock, Lock, AlertTriangle, Camera, Activity,
    FileText, Settings, Users, Truck, Clock, RefreshCw,
    Maximize2, PauseCircle, PlayCircle, Eye
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FLOORS } from '../../config/constants';

const GateControl = () => {
    const [activeTab, setActiveTab] = useState('live');
    const [panicMode, setPanicMode] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState('ALL');

    // --- MOCK DATA ---
    const [gates, setGates] = useState([
        { id: 1, name: 'Main Entry A', floorId: 'BL1', status: 'Closed', type: 'Entry', mode: 'Auto', cam: 'Online' },
        { id: 2, name: 'Main Exit B', floorId: 'BL1', status: 'Closed', type: 'Exit', mode: 'Auto', cam: 'Online' },
        { id: 3, name: 'Service Gate', floorId: 'BL1', status: 'Closed', type: 'Entry/Exit', mode: 'Manual', cam: 'Offline' },
        { id: 4, name: 'B2 Entry Ramp', floorId: 'BL2', status: 'Closed', type: 'Entry', mode: 'Auto', cam: 'Online' },
        { id: 5, name: 'B2 Exit Ramp', floorId: 'BL2', status: 'Closed', type: 'Exit', mode: 'Auto', cam: 'Online' },
        { id: 6, name: 'B3 Secure Entry', floorId: 'BL3', status: 'Closed', type: 'Entry', mode: 'Manual', cam: 'Online' },
        { id: 7, name: 'B3 VIP Exit', floorId: 'BL3', status: 'Closed', type: 'Exit', mode: 'Auto', cam: 'Online' },
    ]);

    const [liveFeed, setLiveFeed] = useState({
        plate: 'MH-02-CP-9090',
        confidence: 98,
        vehicle: 'Toyota Innova',
        status: 'Scanning...',
        timestamp: new Date().toLocaleTimeString(),
        img: null // In a real app, this would be a stream URL
    });

    const [accessList, setAccessList] = useState([
        { id: 1, type: 'VIP', plate: 'KA-01-EQ-7777', name: 'Mr. Sharma (Director)', expiry: '2026-12-31' },
        { id: 2, type: 'Staff', plate: 'MH-12-AB-1234', name: 'Dr. Priya (Medical)', expiry: '2025-06-30' },
        { id: 3, type: 'Blacklist', plate: 'DL-3C-ZZ-0000', name: 'Flagged: Payment Default', expiry: 'Permanent' },
    ]);

    const [snapshots, setSnapshots] = useState([
        { id: 101, time: '10:42 AM', plate: 'MH-04-AB-1234', type: 'Entry', status: 'Approved' },
        { id: 102, time: '10:38 AM', plate: 'KA-05-XY-8888', type: 'Entry', status: 'Approved' },
        { id: 103, time: '10:15 AM', plate: 'TN-01-SS-5555', type: 'Exit', status: 'Approved' },
        { id: 104, time: '09:55 AM', plate: 'WB-02-QQ-1111', type: 'Entry', status: 'Manual Check' },
    ]);

    const [hardwareStats, setHardwareStats] = useState({
        barrierCycles: 14520,
        sensorHealth: 98,
        lastReboot: '3 days ago',
        uptime: '72h 15m'
    });

    // Mock Traffic Data
    const trafficData = [
        { hour: '8AM', entry: 45, exit: 12 },
        { hour: '9AM', entry: 88, exit: 15 },
        { hour: '10AM', entry: 120, exit: 30 },
        { hour: '11AM', entry: 60, exit: 45 },
        { hour: '12PM', entry: 40, exit: 80 },
        { hour: '1PM', entry: 35, exit: 90 },
    ];

    // --- LOGIC ---
    useEffect(() => {
        // Simulating live feed updates
        const interval = setInterval(() => {
            const plates = ['MH-12-JK-1212', 'DL-9C-AA-0001', 'KA-51-ZZ-9999', 'GJ-01-HH-4545'];
            const vehicles = ['Honda City', 'Swift Dzire', 'Hyundai Creta', 'Tata Nexon'];

            setLiveFeed(prev => ({
                ...prev,
                plate: plates[Math.floor(Math.random() * plates.length)],
                vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
                confidence: Math.floor(Math.random() * 5) + 95,
                timestamp: new Date().toLocaleTimeString(),
                status: 'Verified'
            }));
        }, 5000); // New car every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const toggleGate = (id) => {
        setGates(gates.map(g => {
            if (g.id === id) {
                return { ...g, status: g.status === 'Open' ? 'Closed' : 'Open' };
            }
            return g;
        }));
    };

    const handlePanic = () => {
        if (!panicMode) {
            if (window.confirm("EMERGENCY: This will OPEN ALL GATES. Are you sure?")) {
                setPanicMode(true);
                setGates(gates.map(g => ({ ...g, status: 'Open' })));
            }
        } else {
            setPanicMode(false);
            setGates(gates.map(g => ({ ...g, status: 'Closed' })));
        }
    };

    const rebootSystem = () => {
        alert("Initiating Gate System Reboot...");
        setHardwareStats(prev => ({ ...prev, uptime: '0h 0m' }));
    };

    // Filter Logic
    const filteredGates = selectedFloor === 'ALL'
        ? gates
        : gates.filter(g => g.floorId === selectedFloor);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>

            {/* 1. HEADER & CONTROL TABS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gate Control</h1>
                    <p style={{ color: '#888' }}>Live Monitoring & Access Management</p>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

                    {/* Floor Filter - UPDATED VISIBILITY */}
                    <div style={{ background: '#333', border: '1px solid #555', borderRadius: '8px', padding: '4px', display: 'flex', gap: '4px' }}>
                        <button
                            onClick={() => setSelectedFloor('ALL')}
                            style={{
                                padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold',
                                background: selectedFloor === 'ALL' ? '#2979FF' : 'transparent', color: selectedFloor === 'ALL' ? '#fff' : '#ccc'
                            }}
                        >
                            ALL
                        </button>
                        {FLOORS.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setSelectedFloor(f.id)}
                                style={{
                                    padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold',
                                    background: selectedFloor === f.id ? '#2979FF' : 'transparent', color: selectedFloor === f.id ? '#fff' : '#ccc'
                                }}
                            >
                                {f.short}
                            </button>
                        ))}
                    </div>

                    <div style={{ width: '1px', height: '30px', background: '#333' }}></div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[{ id: 'live', label: 'Live Ops', icon: <Activity size={18} /> }, { id: 'access', label: 'Access Lists', icon: <FileText size={18} /> }, { id: 'hardware', label: 'Diagnostics', icon: <Settings size={18} /> }].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px',
                                    background: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.05)',
                                    color: activeTab === tab.id ? '#000' : '#888', border: 'none', cursor: 'pointer', fontWeight: '600'
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. EMERGENCY BAR */}
            <div className="glass-card" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: panicMode ? 'rgba(255, 82, 82, 0.2)' : 'rgba(255,255,255,0.03)', border: panicMode ? '1px solid #FF5252' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {panicMode && <AlertTriangle size={24} color="#FF5252" className="animate-pulse" />}
                    <div>
                        <h3 style={{ fontWeight: 'bold', color: panicMode ? '#FF5252' : '#fff' }}>
                            {panicMode ? 'EMERGENCY MODE ACTIVE - ALL GATES OPEN' : 'System Secure'}
                        </h3>
                        {!panicMode && <p style={{ fontSize: '0.8rem', color: '#888' }}>All barriers operating normally.</p>}
                    </div>
                </div>
                <button
                    onClick={handlePanic}
                    style={{
                        padding: '10px 20px', background: panicMode ? '#fff' : '#FF5252', color: panicMode ? '#FF5252' : '#fff',
                        border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Unlock size={18} /> {panicMode ? 'RESET SYSTEM' : 'EMERGENCY OPEN'}
                </button>
            </div>

            {/* CONTENT AREA */}
            <div style={{ flex: 1, display: 'flex', gap: '20px', overflow: 'hidden' }}>

                {/* --- TAB: LIVE OPS --- */}
                {activeTab === 'live' && (
                    <>
                        {/* LEFT: GATES & CONTROLS */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {filteredGates.length === 0 ? (
                                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                    No gates found for this floor.
                                </div>
                            ) : (
                                filteredGates.map(gate => (
                                    <div key={gate.id} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {gate.status === 'Open' ? <Unlock size={24} color="#00E676" /> : <Lock size={24} color="#FF5252" />}
                                            </div>
                                            <div>
                                                <h3 style={{ fontWeight: 'bold' }}>{gate.name}</h3>
                                                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', marginTop: '4px' }}>
                                                    <span style={{ color: '#aaa', background: 'rgba(255,255,255,0.1)', padding: '0 4px', borderRadius: '4px' }}>
                                                        {FLOORS.find(f => f.id === gate.floorId)?.short || gate.floorId}
                                                    </span>
                                                    <span style={{ color: '#888' }}>{gate.type}</span>
                                                    <span style={{ color: '#aaa', border: '1px solid #444', padding: '0 4px', borderRadius: '4px' }}>{gate.mode}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <span style={{ padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', background: gate.status === 'Open' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 82, 82, 0.1)', color: gate.status === 'Open' ? '#00E676' : '#FF5252' }}>
                                                {gate.status.toUpperCase()}
                                            </span>
                                            <button
                                                onClick={() => toggleGate(gate.id)}
                                                style={{ padding: '8px 15px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                                            >
                                                {gate.status === 'Open' ? 'CLOSE' : 'OPEN'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* Recent Snapshots Grid */}
                            <div className="glass-card" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                                <h3 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                    <Camera size={18} /> Recent Snapshots
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {snapshots.map(snap => (
                                        <div key={snap.id} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                            <div style={{ width: '100%', height: '80px', background: '#111', borderRadius: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                                                <Camera size={24} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                                <span style={{ fontWeight: 'bold' }}>{snap.plate}</span>
                                                <span style={{ color: '#888' }}>{snap.time}</span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', marginTop: '4px', color: snap.status === 'Approved' ? '#00E676' : '#FFC107' }}>
                                                {snap.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: LIVE FEED & ANALYTICS */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Live Cam Mockup */}
                            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '300px' }}>
                                <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 10, display: 'flex', gap: '10px' }}>
                                    <span style={{ background: 'red', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div className="animate-pulse" style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div> LIVE
                                    </span>
                                    <span style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                                        CAM-01 ({selectedFloor === 'ALL' ? 'MAIN ENTRY' : `${selectedFloor} ENTRY`})
                                    </span>
                                </div>
                                <div style={{ width: '100%', height: '100%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Truck size={64} color="#333" />
                                    <p style={{ color: '#444', marginTop: '10px' }}>Waiting for vehicle stream...</p>
                                </div>

                                {/* Overlay Card */}
                                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', padding: '15px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '2px' }}>Recognized Plate</p>
                                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '2px', color: '#fff' }}>{liveFeed.plate}</h2>
                                        <p style={{ color: '#00E676', fontSize: '0.9rem', marginTop: '4px' }}>✓ {liveFeed.status} ({liveFeed.confidence}%)</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ color: '#ccc', fontSize: '1rem', fontWeight: 'bold' }}>{liveFeed.vehicle}</p>
                                        <button style={{ marginTop: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>
                                            Manual Check
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Traffic Analytics */}
                            <div className="glass-card" style={{ flex: 1, padding: '20px' }}>
                                <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Traffic Volume (Today)</h3>
                                <div style={{ width: '100%', height: '200px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={trafficData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis dataKey="hour" stroke="#888" fontSize={10} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#888" fontSize={10} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                contentStyle={{ background: '#222', border: 'none', borderRadius: '8px' }}
                                            />
                                            <Bar dataKey="entry" fill="#00E676" name="Entries" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="exit" fill="#FF5252" name="Exits" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </>
                )}

                {/* --- TAB: ACCESS LISTS --- */}
                {activeTab === 'access' && (
                    <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Vehicle Access Registry</h3>
                            <button style={{ padding: '8px 16px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                + Add Vehicle
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr 1fr 1fr 100px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px 8px 0 0', fontWeight: 'bold', color: '#ccc' }}>
                            <span>Plate Number</span>
                            <span>Name / Owner</span>
                            <span>Type</span>
                            <span>Expiry</span>
                            <span>Action</span>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {accessList.map(item => (
                                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr 1fr 1fr 100px', padding: '15px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{item.plate}</span>
                                    <span>{item.name}</span>
                                    <span>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: item.type === 'Blacklist' ? 'rgba(255, 82, 82, 0.2)' : item.type === 'VIP' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(41, 121, 255, 0.2)',
                                            color: item.type === 'Blacklist' ? '#FF5252' : item.type === 'VIP' ? '#FFC107' : '#2979FF'
                                        }}>
                                            {item.type}
                                        </span>
                                    </span>
                                    <span style={{ color: '#888' }}>{item.expiry}</span>
                                    <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Edit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB: HARDWARE DIAGNOSTICS --- */}
                {activeTab === 'hardware' && (
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                        <div className="glass-card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}><Settings size={20} /> System Status</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Boom Barrier Cycles</p>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{hardwareStats.barrierCycles}</h2>
                                    <p style={{ color: '#FFC107', fontSize: '0.8rem', marginTop: '5px' }}>Maint Due in 480 cycles</p>
                                </div>
                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Sensor Health</p>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00E676' }}>{hardwareStats.sensorHealth}%</h2>
                                    <p style={{ color: '#00E676', fontSize: '0.8rem', marginTop: '5px' }}>Optimal</p>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: '#888' }}>System Uptime</span>
                                    <span style={{ fontFamily: 'monospace' }}>{hardwareStats.uptime}</span>
                                </div>
                                <button
                                    onClick={rebootSystem}
                                    style={{ width: '100%', padding: '12px', background: 'rgba(255, 82, 82, 0.1)', color: '#FF5252', border: '1px solid #FF5252', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                >
                                    <RefreshCw size={18} /> Remote Reboot Controller
                                </button>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Activity size={20} /> Live Sensor Feed</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['PIR-01 (Entry Detect)', 'PIR-02 (Exit Detect)', 'UltraSonic-01 (Boom A)', 'RFID-Reader-01'].map((sensor, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                        <span style={{ fontWeight: '500' }}>{sensor}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="animate-pulse" style={{ width: '8px', height: '8px', background: '#00E676', borderRadius: '50%' }}></div>
                                            <span style={{ color: '#00E676', fontSize: '0.9rem' }}>Active</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default GateControl;
