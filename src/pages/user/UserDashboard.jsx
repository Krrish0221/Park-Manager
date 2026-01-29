import React from 'react';
import {
    User,
    Calendar,
    CreditCard,
    Bell,
    Ticket,
    Clock,
    MapPin,
    Car
} from 'lucide-react';

const UserDashboard = () => {
    // Demo Data
    const activeBooking = {
        id: "BK-2024-001",
        spot: "A-12",
        floor: "Floor 1",
        entry: "10:30 AM",
        duration: "2h 30m",
        cost: "$15.00",
        status: "Active"
    };

    const recentHistory = [
        { id: 1, date: "28 Jan, 2024", spot: "B-05", cost: "$12.00", status: "Completed" },
        { id: 2, date: "25 Jan, 2024", spot: "A-08", cost: "$8.50", status: "Completed" },
        { id: 3, date: "22 Jan, 2024", spot: "C-15", cost: "$20.00", status: "Completed" },
    ];

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="glass-card" style={{
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{
                padding: '12px',
                background: `${color}20`,
                borderRadius: '12px',
                color: color
            }}>
                <Icon size={24} />
            </div>
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>{label}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</h3>
            </div>
        </div>
    );

    return (
        <div style={{
            padding: '100px 2rem 2rem 2rem', // Top padding for navbar
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, #050505 100%)'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Welcome back, User
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Where would you like to park today?
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{
                            padding: '12px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            cursor: 'pointer'
                        }}>
                            <Bell size={20} />
                        </button>
                        <button style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            background: '#fff',
                            color: '#000',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Ticket size={20} />
                            New Booking
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <StatCard icon={Car} label="Total Parkings" value="24" color="#4CAF50" />
                    <StatCard icon={Clock} label="Hours Parked" value="68h" color="#2196F3" />
                    <StatCard icon={CreditCard} label="Total Spent" value="$340" color="#FFC107" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Active Booking */}
                    <div className="glass-card" style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%' }}></div>
                            Active Session
                        </h2>

                        <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'monospace' }}>
                                {activeBooking.spot}
                            </h3>
                            <p style={{ color: '#4CAF50', fontWeight: '600' }}>{activeBooking.floor}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Entry Time</p>
                                <p style={{ fontWeight: '600' }}>{activeBooking.entry}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Duration</p>
                                <p style={{ fontWeight: '600' }}>{activeBooking.duration}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="glass-card" style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Recent History</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentHistory.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '12px',
                                    transition: 'background 0.2s'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            padding: '8px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px'
                                        }}>
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.spot}</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: '600' }}>{item.cost}</p>
                                        <p style={{ color: '#4CAF50', fontSize: '0.75rem' }}>{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
