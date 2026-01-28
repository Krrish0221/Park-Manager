import React, { useState, useEffect } from 'react';
import {
    Activity, Battery, Wifi, AlertTriangle, RefreshCw, PenTool,
    Droplets, Lightbulb, Zap, Server, ShieldCheck, Database,
    ClipboardList, Clock, Wrench, CheckCircle, XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Maintenance = () => {
    // --- MOCK DATA ---
    const [sensors, setSensors] = useState([]);
    const [infraTasks, setInfraTasks] = useState([
        { id: 1, type: 'Lighting', title: 'Basement Level 2 Audit', status: 'Pending', due: 'Today' },
        { id: 2, type: 'Cleaning', title: 'EV Zone Oil Spill Check', status: 'Done', due: 'Yesterday' },
        { id: 3, type: 'Drainage', title: 'Monsoon Prep - Drain A', status: 'Pending', due: 'Tomorrow' },
        { id: 4, type: 'Signage', title: 'Repaint Slot 45-50', status: 'In Progress', due: 'Today' },
    ]);
    const [evFirmware, setEvFirmware] = useState({ version: 'v2.4.1', updateAvailable: true, progress: 0 });
    const [softwareHealth, setSoftwareHealth] = useState([
        { id: 1, name: 'Database Backup', status: 'Healthy', lastCheck: '2h ago', icon: <Database size={16} /> },
        { id: 2, name: 'FASTag API', status: 'Healthy', lastCheck: 'LIVE', icon: <Server size={16} /> },
        { id: 3, name: 'Payment Gateway', status: 'Unstable', lastCheck: '5m ago', icon: <Activity size={16} /> },
        { id: 4, name: 'CCTV Storage', status: 'Healthy', lastCheck: '45% Full', icon: <ShieldCheck size={16} /> },
    ]);
    const [tickets, setTickets] = useState([
        { id: 'TKT-901', title: 'Boom Barrier 2 Motor Fail', assignee: 'Ramesh Tech', priority: 'High', status: 'Open' },
        { id: 'TKT-902', title: 'Sensor 42 False Occupancy', assignee: 'Suresh IoT', priority: 'Medium', status: 'In Progress' },
        { id: 'TKT-903', title: 'EV Stn 5 Screen Glitch', assignee: 'Vendor Support', priority: 'Low', status: 'Closed' },
    ]);

    // Initialize Mock Sensors
    useEffect(() => {
        const initSensors = Array.from({ length: 8 }, (_, i) => ({
            id: `S-${100 + i}`,
            battery: Math.floor(Math.random() * 80) + 20,
            signal: Math.floor(Math.random() * 100),
            status: Math.random() > 0.9 ? 'Offline' : 'Online',
            cycles: Math.floor(Math.random() * 12000),
        }));
        setSensors(initSensors);
    }, []);

    // Firmware Update Simulation
    const startUpdate = () => {
        if (evFirmware.progress > 0) return;
        let prog = 0;
        const interval = setInterval(() => {
            prog += 10;
            setEvFirmware(prev => ({ ...prev, progress: prog }));
            if (prog >= 100) {
                clearInterval(interval);
                setEvFirmware(prev => ({ ...prev, version: 'v2.5.0', updateAvailable: false, progress: 0 }));
            }
        }, 500);
    };

    // Recalibrate Simulation
    const recalibrateSensor = (id) => {
        const span = document.getElementById(`cal-${id}`);
        if (span) {
            span.innerText = 'Calibrating...';
            setTimeout(() => { span.innerText = 'Done'; }, 1500);
            setTimeout(() => { span.innerText = 'Calibrate'; }, 3000);
        }
    };

    // MTTR Mock Data
    const mttrData = [
        { day: 'Mon', hrs: 4.2 }, { day: 'Tue', hrs: 3.8 }, { day: 'Wed', hrs: 5.1 },
        { day: 'Thu', hrs: 2.5 }, { day: 'Fri', hrs: 3.0 }, { day: 'Sat', hrs: 4.5 }, { day: 'Sun', hrs: 3.2 }
    ];

    // Status Colors
    const getStatusColor = (status) => {
        if (['Healthy', 'Done', 'Online', 'Closed'].includes(status)) return '#00E676';
        if (['Pending', 'In Progress', 'Unstable'].includes(status)) return '#FFC107';
        return '#FF5252';
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflow: 'hidden' }}>

            {/* 1. HEALTH PULSE (Top Bar) */}
            <div className="glass-card" style={{
                padding: '15px 25px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(90deg, rgba(0,230,118,0.1) 0%, rgba(255,255,255,0.05) 50%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="animate-pulse" style={{ padding: '8px', background: '#00E676', borderRadius: '50%', boxShadow: '0 0 10px #00E676' }}>
                        <Activity size={24} color="#000" />
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#00E676' }}>SYSTEM HEALTHY</h3>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>All critical nodes operational</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '40px', textAlign: 'center' }}>
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>99.9%</h4>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>Uptime</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFC107' }}>3</h4>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>Pending Fixes</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2979FF' }}>24ms</h4>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>API Latency</p>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', gap: '20px', overflow: 'hidden' }}>

                {/* LEFT COLUMN: IoT & HARDWARE (Scrollable) */}
                <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', overflowY: 'auto' }}>

                    {/* IoT Sensors */}
                    <div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: 'bold' }}>
                            <Wifi size={20} color="#2979FF" /> IoT Sensor Health
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {sensors.map(s => (
                                <div key={s.id} style={{
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderLeft: `3px solid ${s.status === 'Online' ? '#00E676' : '#FF5252'}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <span style={{ fontWeight: '600' }}>{s.id}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: s.battery < 20 ? '#FF5252' : '#ccc' }}>
                                            <Battery size={14} /> {s.battery}%
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ccc' }}>
                                            <Wifi size={14} /> {s.signal}dBm
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {s.status === 'Offline' && <span className="animate-pulse" style={{ color: '#FF5252', fontWeight: 'bold', fontSize: '0.8rem' }}>OFFLINE</span>}
                                        <button
                                            onClick={() => recalibrateSensor(s.id)}
                                            style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
                                        >
                                            <span id={`cal-${s.id}`}>Calibrate</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gate Diagnostics */}
                    <div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: 'bold' }}>
                            <Wrench size={20} color="#FF9800" /> Gate Diagnostics
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <p style={{ color: '#888', fontSize: '0.8rem' }}>Main Entry Barrier</p>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>12,450 <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>cycles</span></h4>
                                <div style={{ marginTop: '8px', padding: '4px', background: 'rgba(255, 82, 82, 0.2)', color: '#FF5252', fontSize: '0.7rem', textAlign: 'center', borderRadius: '4px' }}>
                                    Lubrication Rqd
                                </div>
                            </div>
                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <p style={{ color: '#888', fontSize: '0.8rem' }}>Exit Barrier B</p>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>8,200 <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>cycles</span></h4>
                                <div style={{ marginTop: '8px', padding: '4px', background: 'rgba(0, 230, 118, 0.1)', color: '#00E676', fontSize: '0.7rem', textAlign: 'center', borderRadius: '4px' }}>
                                    Optimal
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CENTER COLUMN: INFRA & SOFTWARE */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Infrastructure Tasks */}
                    <div className="glass-card" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: 'bold' }}>
                            <ClipboardList size={20} color="#E040FB" /> Infrastructure Logs
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {infraTasks.map(task => (
                                <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            padding: '8px',
                                            borderRadius: '8px',
                                            background: task.type === 'Lighting' ? 'rgba(255, 235, 59, 0.1)' : task.type === 'Cleaning' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(156, 39, 176, 0.1)',
                                            color: task.type === 'Lighting' ? '#FFEB3B' : task.type === 'Cleaning' ? '#2196F3' : '#ce93d8'
                                        }}>
                                            {task.type === 'Lighting' ? <Lightbulb size={16} /> : task.type === 'Cleaning' ? <Droplets size={16} /> : <PenTool size={16} />}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{task.title}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#888' }}>Due: {task.due}</p>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem',
                                        background: getStatusColor(task.status) + '22',
                                        color: getStatusColor(task.status)
                                    }}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Software Health */}
                    <div className="glass-card" style={{ flex: 1, padding: '20px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: 'bold' }}>
                            <Server size={20} color="#00E676" /> Software & Security
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {softwareHealth.map(s => (
                                <div key={s.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{s.name}</span>
                                        {s.icon}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(s.status) }}></div>
                                        <span style={{ fontWeight: 'bold', color: getStatusColor(s.status) }}>{s.status}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>{s.lastCheck}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: EV TECH & TASKS */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* EV Firmware Manager */}
                    <div className="glass-card" style={{ padding: '20px', background: 'linear-gradient(180deg, rgba(0,229,255,0.05) 0%, rgba(0,0,0,0) 100%)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: 'bold', color: '#00E5FF' }}>
                            <Zap size={20} /> EV Tech Support
                        </h3>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ color: '#ccc' }}>Current Firmware</span>
                                <span style={{ fontFamily: 'monospace' }}>{evFirmware.version}</span>
                            </div>
                            {evFirmware.updateAvailable ? (
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                                        <span style={{ color: '#FFC107' }}>Update Available (v2.5.0)</span>
                                        <span>{evFirmware.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${evFirmware.progress}%`, height: '100%', background: '#00E5FF', transition: 'width 0.3s' }}></div>
                                    </div>
                                    <button
                                        onClick={startUpdate}
                                        disabled={evFirmware.progress > 0}
                                        style={{ marginTop: '10px', width: '100%', padding: '8px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid #00E5FF', borderRadius: '6px', color: '#00E5FF', cursor: 'pointer' }}
                                    >
                                        {evFirmware.progress > 0 ? 'Updating...' : 'Push Update to All Units'}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: '6px', color: '#00E676', textAlign: 'center', fontSize: '0.9rem' }}>
                                    <CheckCircle size={16} style={{ marginBottom: '-3px', marginRight: '5px' }} />
                                    System Up-to-Date
                                </div>
                            )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '10px' }}>
                            <span>Cooling Systems</span>
                            <span style={{ color: '#00E676' }}>Optimal (24°C)</span>
                        </div>
                    </div>

                    {/* Task Management */}
                    <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <ClipboardList size={20} /> Work Orders
                            </h3>
                            <button style={{ padding: '6px 12px', background: '#fff', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
                                + Create Ticket
                            </button>
                        </div>

                        {/* Ticket List */}
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px' }}>
                            {tickets.map(t => (
                                <div key={t.id} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', borderLeft: `3px solid ${t.priority === 'High' ? '#FF5252' : t.priority === 'Medium' ? '#FFC107' : '#2979FF'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{t.id}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#888' }}>{t.status}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}>{t.title}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#666' }}>
                                        <Wrench size={12} /> {t.assignee}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* MTTR Analytics Micro-Chart */}
                        <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Mean Time To Repair (Last 7 Days)</p>
                            <div style={{ height: '80px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mttrData}>
                                        <Line type="monotone" dataKey="hrs" stroke="#2979FF" strokeWidth={2} dot={false} />
                                        <Tooltip
                                            contentStyle={{ background: '#333', border: 'none', borderRadius: '4px', fontSize: '0.8rem' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Maintenance;
