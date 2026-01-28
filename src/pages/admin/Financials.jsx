import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, PieChart, Activity, Download, FileText, Zap, Users, AlertCircle, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { adminStore } from '../../data/adminData';

const Financials = () => {
    // SYNC STATE WITH LIVE STORE
    const [data, setData] = useState(adminStore.state);

    useEffect(() => {
        // Subscribe to store updates
        const unsubscribe = adminStore.subscribe((newState) => {
            setData(newState);
        });
        return () => unsubscribe();
    }, []);

    // 1. REVENUE STREAMS DATA (Dynamic from Live Store)
    const revenueStreams = [
        { title: 'Parking Fees', amount: `₹${data.revenue.breakdown.parking.toLocaleString()}`, trend: '+12%', color: '#00E676', icon: <IndianRupee size={20} /> },
        { title: 'Service Add-ons', amount: `₹${data.revenue.breakdown.services.toLocaleString()}`, trend: '+8%', color: '#2979FF', icon: <Zap size={20} /> },
        { title: 'Subscriptions', amount: `₹${data.revenue.breakdown.subscriptions.toLocaleString()}`, trend: 'Stable', color: '#ba68c8', icon: <Users size={20} /> },
        { title: 'Fines & Late Fees', amount: `₹${data.revenue.breakdown.fines.toLocaleString()}`, trend: '-2%', color: '#FF5252', icon: <AlertCircle size={20} /> },
    ];

    // 2. PAYMENT METHODS (Static Chart Data for now)
    const paymentMethods = [
        { label: 'FASTag', value: 65, color: '#aa00ff', icon: <CreditCard size={14} /> },
        { label: 'UPI / Wallet', value: 25, color: '#00E676', icon: <Smartphone size={14} /> },
        { label: 'Cash', value: 10, color: '#ff9100', icon: <Banknote size={14} /> },
    ];

    // 3. COST TRACKING (Static Mock Data)
    const costs = [
        { label: 'Electricity (EV & Light)', value: '₹18,500', percent: 65 },
        { label: 'Staffing (Valet & Security)', value: '₹42,000', percent: 80 },
        { label: 'Maintenance & Repairs', value: '₹8,200', percent: 20 },
    ];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '5px' }}>

            {/* 0. LIVE REVENUE PULSE (Synced Data) */}
            <div className="glass-card" style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid #00E676' }}>
                <div style={{ fontWeight: 'bold', color: '#00E676', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={18} className="animate-pulse" /> REVENUE PULSE:
                </div>
                <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', gap: '30px' }}>
                    {data.recentTransactions.map(tx => (
                        <span key={tx.id} className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                            <span style={{ fontFamily: 'monospace', color: '#ccc' }}>[{tx.method}] {tx.plate}</span>
                            <span style={{ fontWeight: 'bold', color: '#fff' }}>₹{tx.amount}</span>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>({tx.type})</span>
                            <span style={{ color: '#00E676' }}>✅</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* 1. REVENUE STREAMS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                {revenueStreams.map((item, idx) => (
                    <RevenueCard key={idx} item={item} />
                ))}
            </div>

            {/* ROW 2: SPLIT VIEW */}
            <div style={{ display: 'flex', gap: '20px', minHeight: '300px' }}>

                {/* 2. TRANSACTION RECONCILIATION */}
                <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PieChart size={18} /> Payment Analysis
                    </h3>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        {/* CSS Pie Chart Hack */}
                        <div style={{
                            width: '120px', height: '120px', borderRadius: '50%',
                            background: `conic-gradient(
                                ${paymentMethods[0].color} 0% 65%, 
                                ${paymentMethods[1].color} 65% 90%, 
                                ${paymentMethods[2].color} 90% 100%
                            )`
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {paymentMethods.map(m => (
                                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: m.color }} />
                                    <span>{m.label}</span>
                                    <span style={{ fontWeight: 'bold', color: '#ccc' }}>{m.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                        <h4 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>FASTag Settlement Log</h4>
                        <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Batch #FA-9092</span>
                                <span style={{ color: '#00E676' }}>Settled (14m ago)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Batch #FA-9093</span>
                                <span style={{ color: '#FFC107' }}>Processing...</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. COST & OPERATIONAL TRACKING */}
                <div className="glass-card" style={{ flex: 1, padding: '20px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={18} /> Operational Costs
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {costs.map(cost => (
                            <div key={cost.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                                    <span>{cost.label}</span>
                                    <span style={{ fontWeight: 'bold' }}>{cost.value}</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${cost.percent}%`, height: '100%', background: cost.percent > 75 ? '#FF5252' : '#2979FF', borderRadius: '3px' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '5px', color: '#888' }}>Staffing Efficiency</h4>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹42 / car served</div>
                        <p style={{ fontSize: '0.75rem', color: '#00E676' }}>↓ 5% from last month (Automation ROI)</p>
                    </div>
                </div>

                {/* 4. PRICING & PROJECTIONS */}
                <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={18} /> Yield & BI
                        </h3>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Projected Revenue (Next Weekend)</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ba68c8' }}>₹4,50,000</div>
                            <div style={{ fontSize: '0.75rem', color: '#888' }}>Based on AI trend analysis</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Surge Pricing Impact</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00E676' }}>+₹12,400</div>
                            <div style={{ fontSize: '0.75rem', color: '#888' }}>Generated during 6PM-9PM peak</div>
                        </div>
                    </div>

                    <button style={{ width: '100%', padding: '12px', background: '#333', border: '1px solid #555', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginTop: 'auto' }}>
                        <Download size={16} /> Export Audit Report (PDF)
                    </button>
                </div>

            </div>
        </div>
    );
};

// Extracted REVENUE CARD for Animation
const RevenueCard = ({ item }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(timer);
    }, [item.amount]);

    return (
        <div className="glass-card" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#888', fontSize: '0.85rem' }}>
                {item.title}
                <div style={{ padding: '6px', background: `${item.color}22`, borderRadius: '6px', color: item.color }}>{item.icon}</div>
            </div>
            <div
                className={animate ? 'animate-pop' : ''}
                style={{ fontSize: '1.5rem', fontWeight: 'bold', transition: 'color 0.2s', color: animate ? item.color : '#fff' }}
            >
                {item.amount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: item.trend.includes('+') ? '#00E676' : item.trend.includes('-') ? '#FF5252' : '#888' }}>
                {item.trend.includes('+') ? <TrendingUp size={14} /> : item.trend.includes('-') ? <TrendingDown size={14} /> : null}
                {item.trend} vs last week
            </div>
        </div>
    );
};

export default Financials;
