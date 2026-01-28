import React, { useState, useEffect } from 'react';
import {
    Activity, DollarSign, Car, Clock, Zap, AlertTriangle, BarChart as BarChartIcon,
    Download, LayoutDashboard, Map, CloudRain, ShieldCheck,
    Battery, Wind, Server, Wifi, Filter, Search, MoreHorizontal
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { adminStore } from '../../data/adminData'; // Using Live Store instance

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [systemMsg, setSystemMsg] = useState('System Optimal');

    // SYNC STATE WITH LIVE STORE
    const [data, setData] = useState(adminStore.state);

    useEffect(() => {
        const unsubscribe = adminStore.subscribe((newState) => {
            setData(newState);
        });
        return () => unsubscribe();
    }, []);

    // --- STABLE GRAPH DATA (From Store) ---
    const dataWaitTime = data.graphs.trend;
    const dataForecast = data.graphs.forecast;

    const dataServices = [
        { name: 'EV Charging', count: 145 },
        { name: 'Car Wash', count: 86 },
        { name: 'Valet', count: 210 },
        { name: 'Air Check', count: 54 },
    ];

    const occupancyZones = [
        { id: 'Z-01', name: 'Zone A (Premium)', cap: 50, occ: 48, status: 'Full' },
        { id: 'Z-02', name: 'Zone B (General)', cap: 200, occ: 145, status: 'Available' },
        { id: 'Z-03', name: 'Zone C (EV Only)', cap: 20, occ: 12, status: 'Available' },
        { id: 'Z-04', name: 'Basement L1', cap: 150, occ: 110, status: 'filling' },
    ];

    const techLogs = [
        { id: 101, device: 'Gate Cam #4', status: 'Online', ping: '12ms', lastCheck: 'Just now' },
        { id: 102, device: 'IoT Node #8', status: 'Offline', ping: '-', lastCheck: '2m ago' },
        { id: 103, device: 'Server Main', status: 'Online', ping: '4ms', lastCheck: 'Just now' },
        { id: 104, device: 'Pay Kiosk #2', status: 'Warning', ping: '450ms', lastCheck: '1m ago' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const msgs = ["Syncing IoT Mesh...", "Analysing Traffic...", "Optimizing Revenue...", "System Optimal"];
            setSystemMsg(msgs[Math.floor(Math.random() * msgs.length)]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // --- REUSABLE PATTERNS ---
    const StatCard = ({ label, value, subtext, icon, color }) => (
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: color }}>
                    {icon}
                </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{label}</p>
            <p style={{ marginTop: 'auto', paddingTop: '10px', fontSize: '0.85rem', color: '#888' }}>{subtext}</p>
        </div>
    );

    const Table = ({ headers, children }) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
                <tr style={{ color: '#888', textAlign: 'left', borderBottom: '1px solid #333' }}>
                    {headers.map((h, i) => <th key={i} style={{ padding: '10px' }}>{h}</th>)}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>

            {/* HEADER */}
            <div className="glass-card" style={{
                padding: '15px 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '15px', // Responsive wrapping
                background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 auto', minWidth: 'min-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="animate-pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00E676', flexShrink: 0 }}></div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00E676', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>
                            ANALYTICS HQ: {systemMsg.toUpperCase()}
                        </h2>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                    <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}>Last 24h</button>
                    <button style={{ padding: '8px', borderRadius: '6px', border: 'none', background: '#2979FF', color: '#fff' }}><Download size={16} /></button>
                </div>
            </div>

            {/* NAVIGATION */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                {[
                    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
                    { id: 'occupancy', label: 'Occupancy', icon: <Map size={18} /> },
                    { id: 'financials', label: 'Financials', icon: <DollarSign size={18} /> },
                    { id: 'services', label: 'Service Ops', icon: <Zap size={18} /> },
                    { id: 'predictive', label: 'Predictive AI', icon: <CloudRain size={18} /> },
                    { id: 'technical', label: 'Tech Health', icon: <ShieldCheck size={18} /> },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
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

            {/* CONTENT AREA */}
            <div style={{ flex: 1, overflowY: 'auto' }}>

                {/* --- TAB: OVERVIEW (Redesigned for Insights) --- */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* 1. ANALYTICAL KPIS (Efficiency & Trends) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                            <StatCard
                                label="Rev. Efficiency"
                                value={`₹${Math.floor(data.revenue.daily / 500)}/slot`}
                                subtext="Top 10% vs Industry Avg"
                                icon={<Activity size={24} />} color="#00E676"
                            />
                            <StatCard
                                label="Peak Utilization"
                                value="94%"
                                subtext="Occurs daily at 18:00"
                                icon={<BarChartIcon size={24} />} color="#2979FF"
                            />
                            <StatCard
                                label="Service Attach Rate"
                                value="18.5%"
                                subtext="+2.4% conversion WoW"
                                icon={<Zap size={24} />} color="#FFC107"
                            />
                            <StatCard
                                label="Avg Dwell Time"
                                value="2h 14m"
                                subtext="Optimal for Turnover"
                                icon={<Clock size={24} />} color="#ba68c8"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                            {/* 2. WEEKLY COMPARISON CHART */}
                            <div className="glass-card" style={{ padding: '20px' }}>
                                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Weekly Performance (This Week vs Last)</h3>
                                <div style={{ height: '300px' }}>
                                    <ResponsiveContainer>
                                        <BarChart data={dataWaitTime}> {/* Reusing trend data for demo bars */}
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis dataKey="time" stroke="#666" axisLine={false} />
                                            <YAxis stroke="#666" axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                            <Legend />
                                            <Bar dataKey="value" name="This Week" fill="#2979FF" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="expected" name="Last Week" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* 3. ZONE PERFORMANCE RANKING */}
                            <div className="glass-card" style={{ padding: '20px' }}>
                                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Top Performing Zones</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[
                                        { name: 'Zone A (Premium)', score: '98%', rev: '₹42k' },
                                        { name: 'Zone C (EV Only)', score: '92%', rev: '₹28k' },
                                        { name: 'Basement L1', score: '85%', rev: '₹35k' },
                                        { name: 'Zone B (General)', score: '74%', rev: '₹15k' },
                                    ].map((z, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{z.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#00E676' }}>Efficiency: {z.score}</div>
                                            </div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>{z.rev}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(41, 121, 255, 0.1)', borderRadius: '6px', fontSize: '0.85rem', color: '#2979FF' }}>
                                    💡 Insight: Premium zones are generating 2.5x more revenue per sq.ft than General zones.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MOCK CONTENT FOR OTHER TABS --- */}
                {activeTab === 'occupancy' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Zone Status</h3>
                            <Table headers={['Zone ID', 'Name', 'Capacity', 'Status']}>
                                {occupancyZones.map(z => (
                                    <tr key={z.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px 10px', fontFamily: 'monospace' }}>{z.id}</td>
                                        <td style={{ padding: '10px' }}>{z.name}</td>
                                        <td style={{ padding: '10px', color: '#888' }}>{z.occ}/{z.cap}</td>
                                        <td style={{ padding: '10px' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem',
                                                background: z.status === 'Full' ? 'rgba(255,82,82,0.1)' : 'rgba(0,230,118,0.1)',
                                                color: z.status === 'Full' ? '#FF5252' : '#00E676'
                                            }}>
                                                {z.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Occupancy Distribution</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={occupancyZones} dataKey="occ" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                            {occupancyZones.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'financials' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Revenue Trend (Synced)</h3>
                        <div style={{ height: '400px' }}>
                            <ResponsiveContainer>
                                <AreaChart data={dataWaitTime}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="time" stroke="#666" axisLine={false} />
                                    <YAxis stroke="#666" axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                    <Area type="monotone" dataKey="value" stroke="#00E676" fill="rgba(0, 230, 118, 0.1)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Service Utilization</h3>
                        <Table headers={['Service Name', 'Daily Usage', 'Trend', 'Status']}>
                            {dataServices.map((s, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{s.name}</td>
                                    <td style={{ padding: '10px' }}>{s.count} requests</td>
                                    <td style={{ padding: '10px', color: '#00E676' }}>+5%</td>
                                    <td style={{ padding: '10px' }}><span style={{ color: '#00E676' }}>Operational</span></td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                )}

                {activeTab === 'predictive' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Demand Forecast (Next 24 Hours)</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px' }}>Simulate Rain</button>
                                <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px' }}>Simulate Event</button>
                            </div>
                        </div>
                        <div style={{ height: '350px' }}>
                            <ResponsiveContainer>
                                <LineChart data={dataForecast}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="time" stroke="#666" axisLine={false} />
                                    <YAxis stroke="#666" axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                    <Line type="monotone" dataKey="value" stroke="#7C4DFF" strokeWidth={3} dot={false} name="Projects" />
                                    <Line type="monotone" dataKey="expected" stroke="#888" strokeDasharray="5 5" name="Hist. Average" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'technical' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Infrastructure Status Log</h3>
                            <button style={{ padding: '6px 12px', background: '#2979FF', border: 'none', color: '#fff', borderRadius: '4px' }}>Run Diagnostics</button>
                        </div>
                        <Table headers={['Device ID', 'Device Name', 'Status', 'Ping', 'Last Check']}>
                            {techLogs.map(log => (
                                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '12px 10px', fontFamily: 'monospace', color: '#888' }}>#{log.id}</td>
                                    <td style={{ padding: '10px' }}>{log.device}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{
                                            color: log.status === 'Offline' ? '#FF5252' : log.status === 'Warning' ? '#FFC107' : '#00E676',
                                            fontWeight: 'bold'
                                        }}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>{log.ping}</td>
                                    <td style={{ padding: '10px', color: '#888' }}>{log.lastCheck}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Analytics;
