import React from 'react';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';

const Wallet = () => {
    const transactions = [
        { id: 1, type: 'Parking', desc: 'City Center Plaza', date: 'Today, 2:30 PM', amount: '-₹85.00', color: '#fff' },
        { id: 2, type: 'Topup', desc: 'UPI Add Money', date: 'Jan 24, 2026', amount: '+₹500.00', color: '#00E676' },
        { id: 3, type: 'EV', desc: 'Fast Charging', date: 'Jan 22, 2026', amount: '-₹120.00', color: '#fff' },
        { id: 4, type: 'Parking', desc: 'Mall Parking', date: 'Jan 20, 2026', amount: '-₹40.00', color: '#fff' },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>Wallet & Payments</h1>

            {/* Balance Card */}
            <div className="glass-card" style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // Deep blue
                marginBottom: '2rem',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <p style={{ color: '#bfdbfe', marginBottom: '5px' }}>Available Balance</p>
                        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>₹450.00</h2>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                        <WalletIcon color="#fff" size={28} />
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '15px' }}>
                    <button style={{ padding: '12px 24px', background: '#fff', color: '#1e3a8a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Add Money
                    </button>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#bfdbfe' }}>Auto-Deduct (FASTag)</span>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input type="checkbox" defaultChecked />
                            <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#3b82f6', borderRadius: '34px', transition: '.4s' }}>
                                <span style={{ position: 'absolute', content: '""', height: '14px', width: '14px', left: '22px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Recent Transactions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {transactions.map(t => (
                    <div key={t.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: t.amount.startsWith('+') ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {t.amount.startsWith('+') ? <ArrowDownLeft size={20} color="#00E676" /> : <ArrowUpRight size={20} color="#fff" />}
                            </div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '500' }}>{t.desc}</div>
                                <div style={{ color: '#888', fontSize: '0.85rem' }}>{t.date}</div>
                            </div>
                        </div>
                        <div style={{ color: t.color, fontWeight: 'bold' }}>{t.amount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wallet;
