import React, { useState, useMemo } from 'react';
import { Users, Search, Filter, Plus, Mail, Phone, Shield, DollarSign, Clock, TrendingUp, Briefcase, FileText, CheckCircle, Download, Award, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

// --- MOCK DATA GENERATOR ---
const generateMockStaff = () => {
    const roles = ['Valet', 'Security', 'Maintenance', 'Cleaning', 'Admin', 'Manager'];
    const statuses = ['On-Duty', 'Available', 'On Leave', 'Offline'];

    // Base list to ensure specific key people exist
    const baseStaff = [
        { id: 1, name: 'Suresh Das', role: 'Valet Lead', status: 'On-Duty', phone: '+91 98765 00001', email: 'suresh@parkmanager.in', salary: 28000, ot: 1200, deductions: 500, bonus: 2000, joinDate: '2023-01-15' },
        { id: 2, name: 'Ramesh Patel', role: 'Valet', status: 'Available', phone: '+91 98765 00002', email: 'ramesh@parkmanager.in', salary: 20000, ot: 800, deductions: 200, bonus: 1500, joinDate: '2023-03-10' },
        { id: 3, name: 'Vikram Singh', role: 'Security Head', status: 'On-Duty', phone: '+91 98765 00003', email: 'vikram@parkmanager.in', salary: 32000, ot: 2500, deductions: 800, bonus: 1000, joinDate: '2022-11-05' },
        { id: 4, name: 'Anita Roy', role: 'Admin Manager', status: 'On-Duty', phone: '+91 98765 00004', email: 'anita@parkmanager.in', salary: 45000, ot: 0, deductions: 2000, bonus: 5000, joinDate: '2022-05-20' },
        { id: 5, name: 'Rajiv M.', role: 'Maintenance', status: 'Busy', phone: '+91 98765 00005', email: 'rajiv@parkmanager.in', salary: 22000, ot: 1500, deductions: 300, bonus: 500, joinDate: '2023-06-12' },
    ];

    const firstNames = ['Amit', 'Rahul', 'Priya', 'Sneha', 'Arjun', 'Karan', 'Pooja', 'Neha', 'Vijay', 'Sanjay', 'Deepak', 'Anjali', 'Riya', 'Mohit', 'Sunil', 'Kavya', 'Krish', 'Rohan', 'Ishaan', 'Aditya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Yadav', 'Mishra', 'Reddy', 'Nair', 'Iyer', 'Khan', 'Joshi', 'Mehta', 'Malhotra', 'Bhat', 'Rao', 'Desai', 'More', 'Kulkarni', 'Jain'];

    const generated = Array.from({ length: 40 }, (_, i) => {
        const role = roles[Math.floor(Math.random() * roles.length)];
        const baseSalary = role === 'Manager' ? 50000 : role === 'Admin' ? 35000 : role === 'Security' ? 18000 : role === 'Valet' ? 20000 : 15000;

        return {
            id: baseStaff.length + i + 1,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            role: role,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
            email: `staff${baseStaff.length + i + 1}@parkmanager.in`,
            salary: baseSalary + Math.floor(Math.random() * 5000),
            ot: Math.random() > 0.5 ? Math.floor(Math.random() * 2000) : 0,
            deductions: Math.floor(Math.random() * 1000),
            bonus: Math.random() > 0.8 ? Math.floor(Math.random() * 3000) : 0,
            joinDate: `202${3 + Math.floor(Math.random())}-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')}`
        };
    });

    return [...baseStaff, ...generated];
};

const StaffManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [staff] = useState(generateMockStaff());
    const [searchTerm, setSearchTerm] = useState('');

    // --- DERIVED METRICS (useMemo) ---
    const financialMetrics = useMemo(() => {
        const stats = {
            totalPayroll: 0,
            totalOT: 0,
            totalDeductions: 0,
            deptCosts: {}
        };

        staff.forEach(s => {
            stats.totalPayroll += s.salary;
            stats.totalOT += s.ot;
            stats.totalDeductions += s.deductions;

            // Group by Department (Role)
            const dept = s.role.split(' ')[0]; // 'Valet Lead' -> 'Valet'
            stats.deptCosts[dept] = (stats.deptCosts[dept] || 0) + s.salary + s.ot + s.bonus;
        });

        // Format for Chart
        const deptChartData = Object.keys(stats.deptCosts).map(key => ({
            name: key,
            value: stats.deptCosts[key],
            color: key === 'Valet' ? '#00E676' :
                key === 'Security' ? '#2979FF' :
                    key === 'Admin' ? '#ba68c8' :
                        key === 'Maintenance' ? '#FFC107' : '#FF5722' // Cleaning/Manager
        }));

        return { ...stats, deptChartData };
    }, [staff]);

    const attendanceLogs = useMemo(() => {
        // Generate attendance for top 15 staff for today for the view
        return staff.slice(0, 15).map(s => ({
            id: s.id,
            name: s.name,
            role: s.role,
            checkIn: `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} AM`,
            checkOut: Math.random() > 0.7 ? `0${5 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} PM` : '--',
            status: Math.random() > 0.2 ? 'Active' : Math.random() > 0.5 ? 'Completed' : 'Late',
            hours: (Math.random() * 8 + 1).toFixed(1)
        }));
    }, [staff]);

    // --- FILTERS ---
    const filteredStaff = staff.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Staff Management</h1>
                    <p style={{ color: '#888' }}>Manage personnel, payroll & performance ({staff.length} Employees)</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setActiveTab('overview')} className="glass-btn" style={{ padding: '10px 20px', borderRadius: '8px', background: activeTab === 'overview' ? '#fff' : 'rgba(255,255,255,0.05)', color: activeTab === 'overview' ? '#000' : '#888' }}>
                        Staff Directory
                    </button>
                    <button onClick={() => setActiveTab('financials')} className="glass-btn" style={{ padding: '10px 20px', borderRadius: '8px', background: activeTab === 'financials' ? '#fff' : 'rgba(255,255,255,0.05)', color: activeTab === 'financials' ? '#000' : '#888' }}>
                        Financials & Payroll
                    </button>
                    <button onClick={() => setActiveTab('attendance')} className="glass-btn" style={{ padding: '10px 20px', borderRadius: '8px', background: activeTab === 'attendance' ? '#fff' : 'rgba(255,255,255,0.05)', color: activeTab === 'attendance' ? '#000' : '#888' }}>
                        Attendance Logs
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '5px' }}>

                {/* 1. STAFF LIST OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0 15px', borderRadius: '8px', width: '300px', border: '1px solid #333' }}>
                                <Search size={18} color="#666" />
                                <input
                                    type="text"
                                    placeholder="Search staff by name or role..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ background: 'transparent', border: 'none', padding: '12px', color: '#fff', width: '100%', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button className="glass-btn" style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Filter size={16} /> Filter
                                </button>
                                <button style={{ padding: '10px 20px', background: '#00E676', color: '#000', borderRadius: '8px', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <Plus size={18} /> Add New Staff
                                </button>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid #333' }}>
                                    <tr>
                                        <th style={{ padding: '15px', color: '#888' }}>NAME</th>
                                        <th style={{ padding: '15px', color: '#888' }}>ROLE</th>
                                        <th style={{ padding: '15px', color: '#888' }}>CONTACT</th>
                                        <th style={{ padding: '15px', color: '#888' }}>JOINED</th>
                                        <th style={{ padding: '15px', color: '#888' }}>STATUS</th>
                                        <th style={{ padding: '15px', color: '#888' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStaff.map(s => (
                                        <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#aaa', border: '1px solid #444' }}>
                                                    {s.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{s.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>ID: EMP-{s.id.toString().padStart(3, '0')}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {s.role.includes('Security') ? <Shield size={14} color="#2196f3" /> :
                                                        s.role.includes('Valet') ? <Briefcase size={14} color="#00E676" /> :
                                                            s.role.includes('Manager') ? <Award size={14} color="#FFC107" /> : <Users size={14} color="#aaa" />}
                                                    {s.role}
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontSize: '0.9rem' }}>{s.phone}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#555' }}>{s.email.split('@')[0]}...</div>
                                            </td>
                                            <td style={{ padding: '15px', color: '#888', fontSize: '0.9rem' }}>{s.joinDate}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    background: s.status === 'On-Duty' ? 'rgba(0, 230, 118, 0.1)' :
                                                        s.status === 'Busy' ? 'rgba(255, 87, 34, 0.1)' : 'rgba(255,255,255,0.05)',
                                                    color: s.status === 'On-Duty' ? '#00E676' :
                                                        s.status === 'Busy' ? '#FF5722' : '#888',
                                                    border: `1px solid ${s.status === 'On-Duty' ? 'rgba(0, 230, 118, 0.2)' : 'transparent'}`
                                                }}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <button style={{ color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                                                <button style={{ color: '#FF5252', background: 'none', border: 'none', cursor: 'pointer' }}> Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 2. FINANCIALS DASHBOARD */}
                {activeTab === 'financials' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Top Metrics */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}><DollarSign size={16} /> Total Monthly Payroll</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{(financialMetrics.totalPayroll / 100000).toFixed(2)}L</div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>Base Salaries</div>
                            </div>
                            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} /> Overtime Payout</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FFC107' }}>₹{financialMetrics.totalOT.toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>This Month</div>
                            </div>
                            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} /> Avg Salary</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00E676' }}>₹{Math.floor(financialMetrics.totalPayroll / staff.length).toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>Per Employee</div>
                            </div>
                            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={16} /> Total Deductions</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF5252' }}>₹{financialMetrics.totalDeductions.toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>PF / Tax</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', height: '350px' }}>
                            {/* Department Breakdown */}
                            <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Department-wise Cost Distribution</h3>
                                <div style={{ flex: 1 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={financialMetrics.deptChartData}>
                                            <XAxis dataKey="name" stroke="#555" />
                                            <YAxis stroke="#555" tickFormatter={(val) => `₹${val / 1000}k`} />
                                            <Tooltip
                                                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                                formatter={(val) => [`₹${val.toLocaleString()}`, 'Cost']}
                                            />
                                            <Bar dataKey="value" fill="#00E676" radius={[4, 4, 0, 0]}>
                                                {financialMetrics.deptChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Workforce Expenses Donut */}
                            <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <h3 style={{ fontWeight: 'bold' }}>Budget Utilization</h3>
                                    <button className="glass-btn" style={{ fontSize: '0.8rem', padding: '5px 10px', background: '#00E676', color: '#000', borderRadius: '6px' }}>Generate Report</button>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PieChart width={220} height={220}>
                                            <Pie
                                                data={[
                                                    { name: 'Base Salary', value: financialMetrics.totalPayroll, color: '#00E676' },
                                                    { name: 'Overtime', value: financialMetrics.totalOT, color: '#FFC107' },
                                                    { name: 'Bonuses', value: financialMetrics.totalPayroll * 0.1, color: '#2979FF' }, // Est bonus
                                                ]}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {financialMetrics.deptChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>

                                        <div style={{ position: 'absolute', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{((financialMetrics.totalPayroll + financialMetrics.totalOT) / 100000).toFixed(1)}L</span>
                                            <span style={{ fontSize: '0.8rem', color: '#888' }}>Total Spend</span>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#00E676', borderRadius: '2px' }} /> Base Salary</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#FFC107', borderRadius: '2px' }} /> Overtime</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#2979FF', borderRadius: '2px' }} /> Bonuses</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Salary Slips Table */}
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Payroll Entries (All Staff)</h3>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-secondary)', zIndex: 10 }}>
                                        <tr style={{ borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '10px', color: '#888' }}>ID</th>
                                            <th style={{ padding: '10px', color: '#888' }}>EMPLOYEE</th>
                                            <th style={{ padding: '10px', color: '#888' }}>BASE</th>
                                            <th style={{ padding: '10px', color: '#888' }}>OT</th>
                                            <th style={{ padding: '10px', color: '#888' }}>BONUS</th>
                                            <th style={{ padding: '10px', color: '#888' }}>NET PAY</th>
                                            <th style={{ padding: '10px', color: '#888' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStaff.map(s => (
                                            <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '15px', color: '#666', fontSize: '0.8rem' }}>#{s.id}</td>
                                                <td style={{ padding: '15px', fontWeight: '500' }}>{s.name} <div style={{ fontSize: '0.7rem', color: '#888' }}>{s.role}</div></td>
                                                <td style={{ padding: '15px' }}>₹{s.salary.toLocaleString()}</td>
                                                <td style={{ padding: '15px', color: '#FFC107' }}>{s.ot > 0 ? `+₹${s.ot}` : '-'}</td>
                                                <td style={{ padding: '15px', color: '#00E676' }}>{s.bonus > 0 ? `+₹${s.bonus}` : '-'}</td>
                                                <td style={{ padding: '15px', fontWeight: 'bold' }}>₹{(s.salary + s.ot + s.bonus - s.deductions).toLocaleString()}</td>
                                                <td style={{ padding: '15px' }}>
                                                    <button style={{ background: 'none', border: 'none', color: '#2979FF', cursor: 'pointer' }}><Download size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. ATTENDANCE LOGS */}
                {activeTab === 'attendance' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 'bold' }}>Live Attendance Tracker</h3>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>{new Date().toLocaleDateString()}</div>
                            </div>
                            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px', color: '#888' }}>STAFF</th>
                                        <th style={{ padding: '10px', color: '#888' }}>ROLE</th>
                                        <th style={{ padding: '10px', color: '#888' }}>CLOCK IN</th>
                                        <th style={{ padding: '10px', color: '#888' }}>CLOCK OUT</th>
                                        <th style={{ padding: '10px', color: '#888' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceLogs.map(log => (
                                        <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px', fontWeight: '500' }}>{log.name}</td>
                                            <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>{log.role}</td>
                                            <td style={{ padding: '15px' }}>{log.checkIn}</td>
                                            <td style={{ padding: '15px' }}>{log.checkOut}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{
                                                    display: 'flex', alignItems: 'center', gap: '6px',
                                                    color: log.status === 'Active' ? '#00E676' : log.status === 'Late' ? '#FF5722' : '#888',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {log.status === 'Late' ? <AlertCircle size={14} /> : <CheckCircle size={14} />} {log.status}
                                                </span>
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

export default StaffManagement;
