import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Clock, CheckCircle, AlertCircle, RefreshCw, XCircle, CreditCard, Download } from 'lucide-react';
import { PRICING } from '../../config/constants';

const TicketManagement = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTickets, setActiveTickets] = useState([]);
    const [historyLogs, setHistoryLogs] = useState([]);

    // Generate Mock Data on Load
    useEffect(() => {
        const names = ['Rahul K.', 'Priya S.', 'Vikram R.', 'Amit B.', 'Sneha J.', 'Kavyaa P.', 'Rohan D.', 'Anjali M.', 'Suresh T.', 'Deepak L.', 'Meera W.', 'Arjun K.', 'Pooja V.', 'Karan S.'];
        const cars = ['Tesla Model 3', 'Nexon EV', 'Creta', 'Honda City', 'Swift', 'Innova', 'Fortuner', 'BMW 5 Series', 'Audi Q7', 'Thar'];

        // Helper to get random item
        const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // Helper to Calculate Fee
        const calculateFee = (durationHours, isEV = false, kwh = 0) => {
            if (durationHours <= PRICING.FREE_HOURS) return 0;
            const parkingFee = (durationHours - PRICING.FREE_HOURS) * PRICING.CAR_HOURLY;
            const evFee = isEV ? (kwh * PRICING.EV_KWH_RATE) : 0;
            return parkingFee + evFee;
        };

        // Generate Active Tickets (~140)
        const generatedActive = Array.from({ length: 140 }, (_, i) => {
            const hours = Math.floor(Math.random() * 4) + 1; // 1 to 5 hours
            const isEV = Math.random() > 0.8; // 20% EVs
            const kwh = isEV ? Math.floor(Math.random() * 30 + 10) : 0;

            return {
                id: `TKT-${8000 + i}`,
                name: rand(names),
                plate: `MH-${Math.floor(Math.random() * 14 + 1).toString().padStart(2, '0')}-${String.fromCharCode(65 + Math.random() * 25)}${String.fromCharCode(65 + Math.random() * 25)}-${Math.floor(Math.random() * 9000 + 1000)}`,
                type: Math.random() > 0.6 ? 'Advance' : 'Walk-In',
                status: Math.random() > 0.8 ? 'Reserved' : 'Active',
                entryTime: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
                duration: `${hours}h ${Math.floor(Math.random() * 59)}m`,
                slot: `${['B1', 'B2', 'B3'][Math.floor(Math.random() * 3)]}-${String.fromCharCode(65 + Math.random() * 5)}${Math.floor(Math.random() * 20 + 1)}`,
                // Active tickets are usually "Running" or just show current accrued
                fee: `₹${calculateFee(hours, isEV, kwh)}`
            }
        });

        // Generate History Logs (~260)
        const generatedHistory = Array.from({ length: 260 }, (_, i) => {
            const hours = Math.floor(Math.random() * 5 + 1); // 1 to 6 hours
            const isEV = Math.random() > 0.85;
            const kwh = isEV ? Math.floor(Math.random() * 40 + 10) : 0;

            return {
                id: `LOG-${5000 + i}`,
                name: rand(names),
                plate: `KA-${Math.floor(Math.random() * 14 + 1).toString().padStart(2, '0')}-${String.fromCharCode(65 + Math.random() * 25)}${String.fromCharCode(65 + Math.random() * 25)}-${Math.floor(Math.random() * 9000 + 1000)}`,
                date: 'Jan 16, 2026',
                exitTime: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} PM`,
                duration: `${hours}h`,
                amount: calculateFee(hours, isEV, kwh), // Precise calc
                method: rand(['UPI', 'FASTag', 'Cash', 'Card']),
                status: 'Closed'
            }
        });

        setActiveTickets(generatedActive);
        setHistoryLogs(generatedHistory);
    }, []);

    // Calculate Total Revenue
    const totalDailyRevenue = historyLogs.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return { bg: 'rgba(0, 230, 118, 0.1)', color: '#00E676' };
            case 'Reserved': return { bg: 'rgba(255, 193, 7, 0.1)', color: '#FFC107' };
            case 'Closed': return { bg: 'rgba(158, 158, 158, 0.1)', color: '#9e9e9e' };
            default: return { bg: '#333', color: '#fff' };
        }
    };

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Ticket Management</h1>
                    <p style={{ color: '#888' }}>manage reservations, validations & history</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="glass-btn" onClick={() => setActiveTab('active')} style={{
                        background: activeTab === 'active' ? '#fff' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'active' ? '#000' : '#888',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: '600'
                    }}>
                        Active Tickets ({activeTickets.length})
                    </button>
                    <button className="glass-btn" onClick={() => setActiveTab('history')} style={{
                        background: activeTab === 'history' ? '#fff' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'history' ? '#000' : '#888',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: '600'
                    }}>
                        History ({historyLogs.length})
                    </button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0 15px', borderRadius: '8px', flex: 1, border: '1px solid #333' }}>
                    <Search size={18} color="#666" />
                    <input
                        type="text"
                        placeholder="Search Ticket ID, Name, Plate..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', padding: '12px', color: '#fff', width: '100%', outline: 'none' }}
                    />
                </div>
                <button className="glass-btn" style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#ccc' }}>
                    <Filter size={18} /> Filter
                </button>
                <button className="glass-btn" style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#ccc' }}>
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            {/* Content Area */}
            <div className="glass-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* ACTIVE TICKETS VIEW */}
                {activeTab === 'active' && (
                    <div style={{ overflowY: 'auto', flex: 1 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0 }}>
                                <tr>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>TICKET ID</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>NAME / PLATE</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>TYPE</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>SLOT</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>ENTRY / DURATION</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>STATUS</th>
                                    <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTickets.filter(t => t.plate.toLowerCase().includes(searchTerm.toLowerCase()) || t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())).map((ticket) => {
                                    const statusStyle = getStatusColor(ticket.status);
                                    return (
                                        <tr key={ticket.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px', fontWeight: 'bold' }}>{ticket.id}</td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontWeight: '500' }}>{ticket.name}</div>
                                                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#888' }}>{ticket.plate}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{ padding: '4px 8px', borderRadius: '4px', background: ticket.type === 'Advance' ? '#2196f333' : '#9c27b033', color: ticket.type === 'Advance' ? '#64b5f6' : '#ba68c8', fontSize: '0.8rem' }}>
                                                    {ticket.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px', color: '#ccc' }}>{ticket.slot}</td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontSize: '0.9rem' }}>{ticket.entryTime}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#888' }}>{ticket.duration !== '--' ? `(Running: ${ticket.duration})` : 'Not Checked In'}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{ padding: '4px 10px', borderRadius: '12px', background: statusStyle.bg, color: statusStyle.color, fontWeight: '600', fontSize: '0.8rem' }}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button title="Validate Info" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}><FileText size={18} /></button>
                                                    {ticket.status === 'Active' && <button title="Process Payment" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00E676' }}><CreditCard size={18} /></button>}
                                                    {ticket.status === 'Reserved' && <button title="Cancel Booking" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF5252' }}><XCircle size={18} /></button>}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* HISTORY VIEW */}
                {activeTab === 'history' && (
                    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>

                        {/* TOTAL REVENUE HEADER */}
                        <div style={{ padding: '20px', background: 'rgba(0, 230, 118, 0.05)', borderBottom: '1px solid rgba(0, 230, 118, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#00E676' }}>Total Amount (Today)</h3>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Aggregated from {historyLogs.length} closed transactions</p>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                ₹{totalDailyRevenue}
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>TICKET ID</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>NAME / PLATE</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>DATE / EXIT</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>DURATION</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>AMOUNT</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>METHOD</th>
                                        <th style={{ padding: '15px', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>RECEIPT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyLogs.filter(t => t.plate.toLowerCase().includes(searchTerm.toLowerCase()) || t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((log) => (
                                        <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: 0.7 }}>
                                            <td style={{ padding: '15px' }}>{log.id}</td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontWeight: '500' }}>{log.name}</div>
                                                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#888' }}>{log.plate}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div>{log.date}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>{log.exitTime}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>{log.duration}</td>
                                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#fff' }}>₹{log.amount}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{ border: '1px solid #444', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>{log.method}</span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#64b5f6', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                    <Download size={16} /> PDF
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketManagement;
