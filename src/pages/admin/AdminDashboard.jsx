import React, { useState, useEffect } from 'react';
import { Car, IndianRupee, Activity, AlertTriangle, ArrowUpRight, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { adminStore } from '../../data/adminData';

const AdminDashboard = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    // SYNC STATE WITH LIVE STORE
    const [data, setData] = useState(adminStore.state);

    useEffect(() => {
        const unsubscribe = adminStore.subscribe((newState) => {
            setData(newState);
        });
        return () => unsubscribe();
    }, []);

    const stats = [
        { title: 'Occupancy', value: `${data.occupancy.rate}%`, subtext: `${data.occupancy.count}/${data.occupancy.total} Slots`, icon: <Car />, color: '#fff' },
        { title: 'Daily Revenue', value: `₹${data.revenue.daily.toLocaleString()}`, subtext: `${data.revenue.trend} vs yesterday`, icon: <IndianRupee />, color: '#4caf50' },
        { title: 'Active Services', value: `${data.services.active}`, subtext: data.services.details, icon: <Activity />, color: '#2196f3' },
        { title: 'Pending Alerts', value: `${data.alerts.count}`, subtext: 'Requires Attention', icon: <AlertTriangle />, color: '#ff9800' },
    ];

    // Graph Data (Stable from Store)
    const graphData = data.graphs.trend.map(d => ({
        time: d.time,
        occupancy: d.value
    }));

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate a network request
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Real-time updates | {new Date().toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleRefresh}
                        style={{
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        <RefreshCw
                            size={20}
                            style={{
                                animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
                            }}
                        />
                    </button>
                    <button style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        Download Report
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: stat.color }}>
                                {stat.icon}
                            </div>
                            {index === 1 && <span style={{ fontSize: '0.8rem', color: '#4caf50', display: 'flex', alignItems: 'center' }}>+12% <ArrowUpRight size={14} /></span>}
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{stat.title}</p>
                        <p style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.85rem', color: '#888' }}>{stat.subtext}</p>
                    </div>
                ))}
            </div>

            {/* Second Row: Graphs and Alerts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>

                {/* Graph Section */}
                <div className="glass-card" style={{ padding: '1.5rem', height: '400px', gridColumn: 'span 2' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Occupancy Trends</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={graphData}>
                                <defs>
                                    <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="#888"
                                    tick={{ fill: '#888', fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={3}
                                />
                                <YAxis
                                    stroke="#888"
                                    tick={{ fill: '#888', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ background: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="occupancy"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorOcc)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Alerts Section */}
                <div className="glass-card" style={{ padding: '1.5rem', height: '400px', gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: 'bold' }}>Pending Alerts</h3>
                        <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'rgba(255, 152, 0, 0.2)', color: 'orange', borderRadius: '4px' }}>{data.alerts.count} New</span>
                    </div>

                    <ul style={{ listStyle: 'none' }}>
                        {data.recentAlerts.map((alert) => (
                            <li key={alert.id} style={{
                                padding: '12px 0',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'start'
                            }}>
                                <div style={{
                                    marginTop: '4px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: alert.level === 'high' ? '#ff4444' : alert.level === 'med' ? '#ffbb33' : '#00C851',
                                    boxShadow: `0 0 5px ${alert.level === 'high' ? '#ff4444' : alert.level === 'med' ? '#ffbb33' : '#00C851'}`
                                }}></div>
                                <div>
                                    <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>{alert.text}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#888' }}>{alert.time}</p>
                                </div>
                                {alert.level === 'high' && (
                                    <button style={{
                                        marginLeft: 'auto',
                                        fontSize: '0.7rem',
                                        padding: '4px 8px',
                                        border: '1px solid #ff4444',
                                        color: '#ff4444',
                                        borderRadius: '4px',
                                        background: 'transparent'
                                    }}>Action</button>
                                )}
                            </li>
                        ))}
                    </ul>

                    <button style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                    }}>
                        View All Alerts
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
