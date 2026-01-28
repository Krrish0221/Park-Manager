import React, { useState, useEffect } from 'react';
import {
    Shield, AlertTriangle, Eye, Video, UserX, AlertOctagon,
    FileWarning, Lock, Unlock, Siren, Flame, Zap,
    ClipboardCheck, Database, History, Search, Camera,
    TrendingUp, Activity, CheckCircle, XCircle, MoreHorizontal
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Security = () => {
    const [activeTab, setActiveTab] = useState('surveillance');
    const [lockdownMode, setLockdownMode] = useState(false);
    const [pulseStatus, setPulseStatus] = useState('Secure');

    // --- MOCK DATA ---

    // 1. AI Surveillance
    const [threats, setThreats] = useState([
        { id: 1, type: 'Tailgating', location: 'Gate B2-Exit', time: '10:45 AM', severity: 'High', status: 'Active' },
        { id: 2, type: 'Loitering', location: 'Zone C (Pillars)', time: '10:48 AM', severity: 'Medium', status: 'Active' },
    ]);
    const [alprLog, setAlprLog] = useState([
        { id: 101, plate: 'MH-01-AB-1234', status: 'Clean', check: 'National DB', time: '10:55:12' },
        { id: 102, plate: 'KA-05-XX-9999', status: 'Flagged', check: 'Stolen DB', time: '10:52:30' },
        { id: 103, plate: 'DL-02-YY-7777', status: 'Clean', check: 'National DB', time: '10:50:11' }
    ]);

    // 2. Enforcement
    const [violations, setViolations] = useState([
        { id: 1, plate: 'MH-12-QQ-1111', type: 'Overstay (>4hrs)', zone: 'B1-A12', fine: 'Pending' },
        { id: 2, plate: 'WB-01-ZZ-2222', type: 'Unauthorized EV Spot', zone: 'B2-E04', fine: 'Issued' },
    ]);

    // 3. Physical Safety
    const [sosAlerts, setSosAlerts] = useState([]); // Empty = system quiet
    const [sensors, setSensors] = useState({
        smoke: 'Normal',
        co: 'Normal',
        leaks: 'None',
        lighting: '98% Optimal'
    });

    // 4. Compliance & Audit
    const [adminLogs, setAdminLogs] = useState([
        { id: 1, user: 'Admin_Krish', action: 'Override Gate B1', time: '10:30 AM', reason: 'Sensor Fail' },
        { id: 2, user: 'Guard_Ramesh', action: 'View Evidence #402', time: '09:15 AM', reason: 'Dispute' },
    ]);

    // 5. Fraud Prevention
    const [fraudStats, setFraudStats] = useState({
        ticketSwaps: 0,
        gateCount: 450,
        paymentCount: 448, // Discrepancy of 2
    });

    // Mock Chart Data
    const violationData = [
        { name: 'Overstay', count: 12 },
        { name: 'Wrong Park', count: 8 },
        { name: 'Tailgate', count: 3 },
        { name: 'Speeding', count: 5 },
    ];

    const COLORS = ['#FFBB28', '#FF8042', '#FF5252', '#0088FE'];

    // --- LOGIC ---
    useEffect(() => {
        // Pulse Effect for Header
        const interval = setInterval(() => {
            setPulseStatus(prev => prev === 'Secure' ? 'Secure' : 'Secure');
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const triggerLockdown = () => {
        if (window.confirm("CRITICAL: ACTIVATE LOCKDOWN? This will CLOSE ALL GATES and alert police.")) {
            setLockdownMode(true);
            setPulseStatus('LOCKDOWN');
        }
    };

    const clearLockdown = () => {
        if (window.confirm("Deactivate Lockdown mode?")) {
            setLockdownMode(false);
            setPulseStatus('Secure');
        }
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>

            {/* 1. SECURITY PULSE HEADER */}
            <div className="glass-card" style={{
                padding: '15px 25px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: lockdownMode ? 'rgba(255, 82, 82, 0.2)' : 'rgba(0, 230, 118, 0.05)',
                border: lockdownMode ? '1px solid #FF5252' : '1px solid rgba(0, 230, 118, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="animate-pulse" style={{
                            width: '12px', height: '12px', borderRadius: '50%',
                            background: lockdownMode ? '#FF5252' : '#00E676'
                        }}></div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: lockdownMode ? '#FF5252' : '#00E676' }}>
                            STATUS: {pulseStatus.toUpperCase()}
                        </h2>
                    </div>
                    <div style={{ width: '1px', height: '20px', background: '#444' }}></div>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#ccc' }}>
                        <span>Active Threats: <b style={{ color: threats.length > 0 ? '#FFC107' : '#fff' }}>{threats.length}</b></span>
                        <span>Compliance: <b style={{ color: '#00E676' }}>100%</b></span>
                        <span>Last Audit: <b>2 hours ago</b></span>
                    </div>
                </div>

                {/* Emergency Controls */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    {lockdownMode ? (
                        <button onClick={clearLockdown} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#fff', color: '#FF5252', fontWeight: 'bold', cursor: 'pointer' }}>
                            DEACTIVATE LOCKDOWN
                        </button>
                    ) : (
                        <>
                            <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #FF5252', background: 'rgba(255,82,82,0.1)', color: '#FF5252', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Siren size={16} /> EVACUATE
                            </button>
                            <button onClick={triggerLockdown} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#FF5252', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Lock size={16} /> LOCKDOWN
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* 2. NAVIGATION TABS */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                {[
                    { id: 'surveillance', label: 'AI Surveillance', icon: <Eye size={18} /> },
                    { id: 'enforcement', label: 'Enforcement', icon: <FileWarning size={18} /> },
                    { id: 'safety', label: 'Physical Safety', icon: <Shield size={18} /> },
                    { id: 'compliance', label: 'Compliance & Audit', icon: <ClipboardCheck size={18} /> },
                    { id: 'fraud', label: 'Fraud Prevention', icon: <UserX size={18} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px',
                            background: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab.id ? '#000' : '#888', border: 'none', cursor: 'pointer', fontWeight: '600', whiteSpace: 'nowrap'
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* 3. CONTENT AREA */}
            <div style={{ flex: 1, overflowY: 'auto' }}>

                {/* --- TAB: AI SURVEILLANCE --- */}
                {activeTab === 'surveillance' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Threat Feed */}
                            <div className="glass-card" style={{ padding: '20px' }}>
                                <h3 style={{ marginBottom: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <AlertOctagon size={20} color="#FF5252" /> Real-Time Threat Detection
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {threats.map(t => (
                                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.2)', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ padding: '10px', background: '#FF5252', borderRadius: '8px', color: '#fff' }}>
                                                    <Video size={20} />
                                                </div>
                                                <div>
                                                    <h4 style={{ fontWeight: 'bold', color: '#fff' }}>{t.type} Detected</h4>
                                                    <p style={{ fontSize: '0.85rem', color: '#ffbaba' }}>Location: {t.location} • Time: {t.time}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button style={{ padding: '6px 12px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Clip</button>
                                                <button style={{ padding: '6px 12px', background: '#fff', color: '#FF5252', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Dispatch Guard</button>
                                            </div>
                                        </div>
                                    ))}
                                    {threats.length === 0 && <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>No active threats detected.</p>}
                                </div>
                            </div>

                            {/* ALPR Live Feed */}
                            <div className="glass-card" style={{ padding: '20px' }}>
                                <h3 style={{ marginBottom: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Camera size={20} /> ALPR Watchlist Monitor
                                </h3>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ color: '#888', textAlign: 'left', borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '10px' }}>Plate Number</th>
                                            <th style={{ padding: '10px' }}>Database Check</th>
                                            <th style={{ padding: '10px' }}>Timestamp</th>
                                            <th style={{ padding: '10px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alprLog.map(log => (
                                            <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '1rem' }}>{log.plate}</td>
                                                <td style={{ padding: '10px' }}>{log.check}</td>
                                                <td style={{ padding: '10px' }}>{log.time}</td>
                                                <td style={{ padding: '10px' }}>
                                                    <span style={{
                                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                                        background: log.status === 'Flagged' ? 'rgba(255,82,82,0.2)' : 'rgba(0,230,118,0.2)',
                                                        color: log.status === 'Flagged' ? '#FF5252' : '#00E676'
                                                    }}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Panel: Analytics */}
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Violation Trends</h3>
                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={violationData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="count"
                                        >
                                            {violationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                {violationData.map((entry, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[index % COLORS.length] }}></div>
                                            <span>{entry.name}</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold' }}>{entry.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: ENFORCEMENT --- */}
                {activeTab === 'enforcement' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Active Violations</h3>
                            <button style={{ padding: '8px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Generate Fine Report</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {violations.map(v => (
                                <div key={v.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid #FFC107' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h2 style={{ fontSize: '1.4rem', fontFamily: 'monospace' }}>{v.plate}</h2>
                                            <p style={{ color: '#FFC107', marginTop: '4px' }}>{v.type}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#888' }}>Zone</span>
                                            <p>{v.zone}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                        <button style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>View Evidence</button>
                                        <button style={{ flex: 1, padding: '8px', background: '#fff', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Issue Fine</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB: PHYSICAL SAFETY --- */}
                {activeTab === 'safety' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Flame size={20} color="#FF9800" /> Hazard Sensors
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                {Object.entries(sensors).map(([key, val]) => (
                                    <div key={key} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                        <span style={{ textTransform: 'capitalize', color: '#888' }}>{key}</span>
                                        <h4 style={{ fontSize: '1.2rem', marginTop: '5px', color: '#00E676' }}>{val}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Zap size={20} color="#2979FF" /> SOS Stations
                            </h3>
                            {sosAlerts.length === 0 ? (
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', border: '2px dashed #444', borderRadius: '8px' }}>
                                    No SOS Calls Active
                                </div>
                            ) : (
                                <div>Calls Active!</div>
                            )}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Lighting Audit</h4>
                                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span>Basement Level 2 (Zone C)</span>
                                        <span style={{ color: '#FFC107' }}>Low Visibility</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px' }}>
                                        <div style={{ width: '60%', height: '100%', background: '#FFC107', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: COMPLIANCE --- */}
                {activeTab === 'compliance' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 'bold' }}>Privacy & Data Retention</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: '#888' }}>Auto-Delete Data (48hrs)</span>
                                    <div style={{ width: '40px', height: '20px', background: '#00E676', borderRadius: '10px', position: 'relative' }}>
                                        <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                                    </div>
                                </div>
                            </div>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>GDPR/DPDP Compliant. Personal vehicle data is automatically purged after exit + retention period.</p>
                        </div>

                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Admin Access Logs</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: '#888', borderBottom: '1px solid #333' }}>
                                        <th style={{ padding: '10px' }}>User</th>
                                        <th style={{ padding: '10px' }}>Action</th>
                                        <th style={{ padding: '10px' }}>Time</th>
                                        <th style={{ padding: '10px' }}>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminLogs.map(log => (
                                        <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '10px' }}>{log.user}</td>
                                            <td style={{ padding: '10px', color: '#fff' }}>{log.action}</td>
                                            <td style={{ padding: '10px', color: '#888' }}>{log.time}</td>
                                            <td style={{ padding: '10px', fontStyle: 'italic', color: '#aaa' }}>"{log.reason}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- TAB: FRAUD PREVENTION --- */}
                {activeTab === 'fraud' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Ticket Swap Detection</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.2)', borderRadius: '8px' }}>
                                <CheckCircle size={32} color="#00E676" />
                                <div>
                                    <h4 style={{ fontWeight: 'bold' }}>All Clear</h4>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Entry/Exit images matching 100% for last 50 cars.</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Revenue Reconciliation</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <p style={{ color: '#888' }}>Gate Openings</p>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{fraudStats.gateCount}</h2>
                                </div>
                                <div>
                                    <p style={{ color: '#888' }}>Payments Received</p>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{fraudStats.paymentCount}</h2>
                                </div>
                            </div>
                            <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(255, 193, 7, 0.1)', color: '#FFC107', borderRadius: '4px', fontSize: '0.9rem' }}>
                                ⚠ Discrepancy detected: 2 vehicles. Investigate manual overrides.
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Security;
