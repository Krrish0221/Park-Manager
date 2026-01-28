import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon,
    FileText,
    DollarSign,
    CreditCard,
    Zap,
    Bell,
    Lock,
    Wrench,
    Palette,
    ChevronRight,
    Moon,
    Sun,
    Monitor,
    Edit2,
    Save,
    X,
    CheckCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [isEditing, setIsEditing] = useState(false);
    const { theme, setTheme } = useTheme();

    // Reset editing state when switching sections
    useEffect(() => {
        setIsEditing(false);
    }, [activeSection]);

    const options = [
        { id: 'general', label: 'General', icon: <SettingsIcon size={20} />, color: '#9e9e9e' },
        { id: 'rules', label: 'Parking rules', icon: <FileText size={20} />, color: '#4caf50' },
        { id: 'pricing', label: 'Pricing', icon: <DollarSign size={20} />, color: '#2196f3' },
        { id: 'payments', label: 'Payments', icon: <CreditCard size={20} />, color: '#9c27b0' },
        { id: 'ev', label: 'EV Settings', icon: <Zap size={20} />, color: '#e91e63' },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, color: '#ff5722' },
        { id: 'security', label: 'Security', icon: <Lock size={20} />, color: '#ffc107' },
        { id: 'system', label: 'System', icon: <Wrench size={20} />, color: '#ff9800' },
        { id: 'theme', label: 'Theme', icon: <Palette size={20} />, color: '#8d6e63' },
    ];

    const getInputStyle = (isEditing) => ({
        width: '100%',
        padding: '12px',
        background: isEditing ? 'var(--input-bg)' : 'transparent',
        border: isEditing ? '1px solid var(--input-border)' : '1px solid transparent', // clean look
        borderRadius: '8px',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'all 0.3s',
        opacity: isEditing ? 1 : 0.9,
        cursor: isEditing ? 'text' : 'default'
    });

    const labelStyle = {
        display: 'block',
        color: 'var(--text-secondary)',
        marginBottom: '8px',
        fontSize: '0.9rem'
    };

    const handleSave = () => {
        // Here you would typically save to backend
        setIsEditing(false);
        // Show success toast ideally
    };

    const RenderActionButtons = ({ label = "Save Changes" }) => (
        <div style={{ marginTop: '30px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            {isEditing ? (
                <div style={{ display: 'flex', gap: '15px', animation: 'fadeIn 0.3s ease' }}>
                    <button
                        onClick={handleSave}
                        style={{ padding: '12px 25px', background: '#00E676', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Save size={18} /> {label}
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        style={{ padding: '12px 25px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--input-border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <X size={18} /> Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    style={{ padding: '12px 25px', background: 'var(--sidebar-active-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }}
                >
                    <Edit2 size={18} /> Edit Settings
                </button>
            )}
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>Settings</h1>

            <div style={{ flex: 1, display: 'flex', gap: '30px', overflow: 'hidden' }}>

                {/* LEFT SIDEBAR: OPTIONS LIST */}
                <div className="glass-card" style={{ width: '300px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffb74d', marginBottom: '15px', paddingLeft: '10px' }}>
                        Setting options for admin:-
                    </h3>

                    {options.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setActiveSection(opt.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '12px 15px',
                                borderRadius: '8px',
                                background: activeSection === opt.id ? 'var(--sidebar-active-bg)' : 'transparent',
                                border: 'none',
                                color: activeSection === opt.id ? 'var(--sidebar-text-active)' : 'var(--sidebar-text-color)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                fontSize: '1rem'
                            }}
                        >
                            <div style={{ color: opt.color, display: 'flex' }}>{opt.icon}</div>
                            <span style={{ flex: 1, fontWeight: activeSection === opt.id ? '600' : '400' }}>{opt.label}</span>
                            {activeSection === opt.id && <ChevronRight size={16} color="var(--text-secondary)" />}
                        </button>
                    ))}
                </div>

                {/* RIGHT PANEL: CONTENT */}
                <div className="glass-card" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

                    {/* GENERAL SETTINGS */}
                    {activeSection === 'general' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <SettingsIcon size={24} color="#9e9e9e" /> General Settings
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* Parking Name */}
                                <div>
                                    <label style={labelStyle}>Parking Name</label>
                                    <input
                                        type="text"
                                        defaultValue="City Center Plaza Parking"
                                        style={getInputStyle(isEditing)}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Location / Address */}
                                <div>
                                    <label style={labelStyle}>Location / Address</label>
                                    <textarea
                                        rows="3"
                                        defaultValue="123, Tech Park Avenue, Silicon Valley, KA - 560100"
                                        style={{ ...getInputStyle(isEditing), resize: isEditing ? 'vertical' : 'none' }}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    {/* Contact Number */}
                                    <div>
                                        <label style={labelStyle}>Contact Number</label>
                                        <input
                                            type="tel"
                                            defaultValue="+91 98765 43210"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label style={labelStyle}>Email Support</label>
                                        <input
                                            type="email"
                                            defaultValue="support@parkmanager.com"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div>
                                    <label style={labelStyle}>Working Hours</label>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: 'var(--sidebar-active-bg)', borderRadius: '6px', cursor: isEditing ? 'pointer' : 'default', border: '1px solid #00E676', opacity: isEditing ? 1 : 0.7 }}>
                                            <input type="radio" name="hours" defaultChecked disabled={!isEditing} />
                                            <span style={{ color: 'var(--text-primary)' }}>24x7 Open</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: 'transparent', borderRadius: '6px', cursor: isEditing ? 'pointer' : 'default', border: '1px solid var(--input-border)', opacity: isEditing ? 1 : 0.7 }}>
                                            <input type="radio" name="hours" disabled={!isEditing} />
                                            <span style={{ color: 'var(--text-secondary)' }}>Custom Schedule</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Upload Logo */}
                                <div>
                                    <label style={labelStyle}>Brand Logo</label>
                                    <div style={{ padding: '20px', border: `2px ${isEditing ? 'dashed' : 'solid'} var(--input-border)`, borderRadius: '8px', textAlign: 'center', background: 'var(--input-bg)', cursor: isEditing ? 'pointer' : 'default', opacity: isEditing ? 1 : 0.8 }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(150,150,150,0.1)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Palette size={24} color="var(--text-secondary)" />
                                        </div>
                                        {isEditing ? (
                                            <>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Click or Drag to upload new logo</p>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.7 }}>Max size: 2MB (PNG, JPG)</p>
                                            </>
                                        ) : (
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current Logo Set</p>
                                        )}
                                    </div>
                                </div>

                                <RenderActionButtons label="Save General Settings" />
                            </div>
                        </div>
                    )}

                    {/* PARKING RULES */}
                    {activeSection === 'rules' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <FileText size={24} color="#4caf50" /> Parking Rules
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Total Capacity */}
                                <div>
                                    <label style={labelStyle}>Total Parking Capacity</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="500"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>Slots</span>
                                    </div>
                                </div>

                                {/* Vehicle Types Enabled */}
                                <div>
                                    <label style={{ ...labelStyle, marginBottom: '12px' }}>Vehicle Types Enabled</label>
                                    <div style={{ display: 'flex', gap: '20px', opacity: isEditing ? 1 : 0.7 }}>
                                        {['Car', 'Bike', 'EV'].map(type => (
                                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: isEditing ? 'pointer' : 'default' }}>
                                                <input type="checkbox" defaultChecked style={{ accentColor: '#4caf50', scale: '1.2' }} disabled={!isEditing} />
                                                <span style={{ color: 'var(--text-primary)' }}>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Grace Time */}
                                <div>
                                    <label style={labelStyle}>Grace Time (Free Exit)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="15"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>Minutes</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Vehicles exiting within this time won't be charged.</p>
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>

                                {/* Toggles: Override & Re-entry */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Allow Manual Slot Override</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Admins can force-assign occupied slots</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--input-border)', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Allow Re-entry within Grace Time</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Same ticket valid if re-entered quickly</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#4caf50', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                <RenderActionButtons label="Update Rules" />
                            </div>
                        </div>
                    )}

                    {/* PRICING */}
                    {activeSection === 'pricing' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <DollarSign size={24} color="#2196f3" /> Pricing Configuration
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Hourly Rates */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Car Price / Hour</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                            <input
                                                type="number"
                                                defaultValue="50"
                                                style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Bike Price / Hour</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                            <input
                                                type="number"
                                                defaultValue="20"
                                                style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Daily Max */}
                                <div>
                                    <label style={labelStyle}>Daily Max Charge</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                        <input
                                            type="number"
                                            defaultValue="500"
                                            style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Night Charge Toggle */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Night Surcharge</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Apply 1.5x multiplier from 11 PM - 6 AM</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2196f3', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Lost Ticket Penalty */}
                                <div>
                                    <label style={labelStyle}>Penalty for Lost Ticket</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                        <input
                                            type="number"
                                            defaultValue="300"
                                            style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>

                                {/* EV Charging Price */}
                                <div>
                                    <label style={labelStyle}>EV Charging Price</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ position: 'relative', flex: 1 }}>
                                            <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                            <input
                                                type="number"
                                                defaultValue="15"
                                                style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <select style={{ ...getInputStyle(isEditing), width: 'auto' }} disabled={!isEditing}>
                                            <option>per kWh</option>
                                            <option>per Minute</option>
                                        </select>
                                    </div>
                                </div>

                                <RenderActionButtons label="Update Prices" />
                            </div>
                        </div>
                    )}

                    {/* PAYMENTS */}
                    {activeSection === 'payments' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <CreditCard size={24} color="#9c27b0" /> Payment Configuration
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Allowed Payment Methods */}
                                <div>
                                    <label style={{ ...labelStyle, marginBottom: '12px' }}>Allowed Payment Methods</label>
                                    <div style={{ display: 'flex', gap: '20px', opacity: isEditing ? 1 : 0.7 }}>
                                        {['Cash', 'UPI', 'Card'].map(method => (
                                            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: isEditing ? 'pointer' : 'default' }}>
                                                <input type="checkbox" defaultChecked style={{ accentColor: '#9c27b0', scale: '1.2' }} disabled={!isEditing} />
                                                <span style={{ color: 'var(--text-primary)' }}>{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Auto-generate Receipt */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Auto-generate Receipt</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Send digital receipt automatically</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#9c27b0', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>

                                {/* GST Settings */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>GST Enabled</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Include tax in billing</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#9c27b0', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* GST Percentage */}
                                <div>
                                    <label style={labelStyle}>GST Percentage</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="18"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>%</span>
                                    </div>
                                </div>

                                <RenderActionButtons label="Save Payment Settings" />
                            </div>
                        </div>
                    )}

                    {/* EV SETTINGS */}
                    {activeSection === 'ev' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <Zap size={24} color="#e91e63" /> EV Station Settings
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Number of EV Slots */}
                                <div>
                                    <label style={labelStyle}>Number of EV Slots</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="60"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>Slots</span>
                                    </div>
                                </div>

                                {/* Charger Type */}
                                <div>
                                    <label style={labelStyle}>Default Charger Type</label>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: 'var(--sidebar-active-bg)', borderRadius: '6px', cursor: isEditing ? 'pointer' : 'default', border: '1px solid #e91e63', opacity: isEditing ? 1 : 0.7 }}>
                                            <input type="radio" name="charger" defaultChecked disabled={!isEditing} />
                                            <span style={{ color: 'var(--text-primary)' }}>Fast Charging (DC)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: 'transparent', borderRadius: '6px', cursor: isEditing ? 'pointer' : 'default', border: '1px solid var(--input-border)', opacity: isEditing ? 1 : 0.7 }}>
                                            <input type="radio" name="charger" disabled={!isEditing} />
                                            <span style={{ color: 'var(--text-secondary)' }}>Normal (AC)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Max Charging Time */}
                                <div>
                                    <label style={labelStyle}>Max Charging Time Limit</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="120"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>Minutes</span>
                                    </div>
                                </div>

                                {/* Auto Stop Charging */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Auto-stop Charging</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stop when battery reaches 100% or time limit</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px', opacity: isEditing ? 1 : 0.6 }}>
                                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#e91e63', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Charging Price Override */}
                                <div>
                                    <label style={labelStyle}>Charging Price Override</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                        <input
                                            type="number"
                                            defaultValue="15"
                                            style={{ ...getInputStyle(isEditing), paddingLeft: '35px' }}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <RenderActionButtons label="Update EV Settings" />
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeSection === 'notifications' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <Bell size={24} color="#ff5722" /> Notifications
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                {/* Notification Toggles */}
                                {[
                                    { label: 'Entry Notification', desc: 'Alert when vehicle enters' },
                                    { label: 'Exit Notification', desc: 'Alert when vehicle exits' },
                                    { label: 'Payment Confirmation', desc: 'Notify on successful payment' },
                                    { label: 'Parking Full Alert (Admin)', desc: 'Notify admins when capacity reached' }
                                ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--sidebar-active-bg)', borderRadius: '8px', opacity: isEditing ? 1 : 0.8 }}>
                                        <div>
                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.label}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                                        </div>
                                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                                            <input type="checkbox" defaultChecked={idx !== 3} style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                            <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isEditing ? '#ff5722' : 'var(--input-border)', transition: '.4s', borderRadius: '34px' }}>
                                                <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: idx !== 3 ? '30px' : '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                            </span>
                                        </label>
                                    </div>
                                ))}

                                <button style={{ marginTop: '10px', padding: '12px', background: 'transparent', border: '1px solid #ff5722', color: '#ff5722', borderRadius: '6px', cursor: 'pointer' }}>
                                    Test Notification System
                                </button>

                                <RenderActionButtons label="Save Preferences" />
                            </div>
                        </div>
                    )}

                    {/* SECURITY */}
                    {activeSection === 'security' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <Lock size={24} color="#ffc107" /> Security Settings
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Session Timeout */}
                                <div>
                                    <label style={labelStyle}>Session Timeout</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            defaultValue="30"
                                            style={getInputStyle(isEditing)}
                                            disabled={!isEditing}
                                        />
                                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: 'var(--text-secondary)' }}>Minutes</span>
                                    </div>
                                </div>

                                {/* Actions - Always active as they are buttons */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <button style={{ padding: '15px', background: 'rgba(255,193,7,0.1)', border: '1px solid #ffc107', borderRadius: '8px', color: '#ffc107', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                        <Lock size={20} />
                                        Change Admin Password
                                    </button>
                                    <button style={{ padding: '15px', background: 'var(--sidebar-active-bg)', border: '1px solid var(--input-border)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                        <FileText size={20} />
                                        View Activity Logs
                                    </button>
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>

                                {/* Force Logout - Always active */}
                                <div style={{ padding: '20px', border: '1px solid #f44336', borderRadius: '8px', background: 'rgba(244,67,54,0.05)' }}>
                                    <h4 style={{ color: '#f44336', marginBottom: '10px' }}>Danger Zone</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>This will immediately log out all active staff sessions except yours.</p>
                                    <button style={{ padding: '10px 20px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                                        Force Logout All Staff
                                    </button>
                                </div>

                                <RenderActionButtons label="Update Security Settings" />
                            </div>
                        </div>
                    )}

                    {/* SYSTEM */}
                    {activeSection === 'system' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <Wrench size={24} color="#ff9800" /> System Configuration
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Maintenance Mode */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,152,0,0.1)', borderRadius: '8px', border: '1px solid rgba(255,152,0,0.3)', opacity: isEditing ? 1 : 0.8 }}>
                                    <div>
                                        <div style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '1.1rem' }}>Maintenance Mode</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Disable user access for updates</div>
                                    </div>
                                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} disabled={!isEditing} />
                                        <span style={{ position: 'absolute', cursor: isEditing ? 'pointer' : 'default', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isEditing ? 'var(--input-border)' : 'var(--input-border)', transition: '.4s', borderRadius: '34px' }}>
                                            <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Backup & Restore */}
                                <div>
                                    <label style={labelStyle}>Data Management</label>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button style={{ flex: 1, padding: '12px', background: '#ff9800', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Backup Data Now
                                        </button>
                                        <button style={{ flex: 1, padding: '12px', background: 'transparent', color: '#ff9800', border: '1px solid #ff9800', borderRadius: '6px', cursor: 'pointer' }}>
                                            Restore from Backup
                                        </button>
                                    </div>
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>

                                {/* App Info */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>App Version</span>
                                    <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', background: 'var(--sidebar-active-bg)', padding: '5px 10px', borderRadius: '4px' }}>v2.4.0-beta</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Local Cache</span>
                                    <button style={{ color: '#f44336', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                                        Clear Cache
                                    </button>
                                </div>

                                <RenderActionButtons label="Update System Settings" />
                            </div>
                        </div>
                    )}

                    {/* THEME SETTINGS (NEW) */}
                    {activeSection === 'theme' && (
                        <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                                <Palette size={24} color="#8d6e63" /> Appearance
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <p style={{ color: 'var(--text-secondary)' }}>Customize how Park Manager looks on your device.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                    {/* Dark Theme */}
                                    <button
                                        onClick={() => setTheme('dark')}
                                        style={{
                                            background: 'var(--glass-card-bg)',
                                            border: `2px solid ${theme === 'dark' ? '#00E676' : 'var(--input-border)'}`,
                                            borderRadius: '12px',
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{ width: '50px', height: '50px', background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                                            <Moon size={24} color="#fff" />
                                        </div>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Dark Mode</span>
                                    </button>

                                    {/* Light Theme */}
                                    <button
                                        onClick={() => setTheme('light')}
                                        style={{
                                            background: 'var(--glass-card-bg)',
                                            border: `2px solid ${theme === 'light' ? '#00E676' : 'var(--input-border)'}`,
                                            borderRadius: '12px',
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{ width: '50px', height: '50px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd' }}>
                                            <Sun size={24} color="#f57c00" />
                                        </div>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Light Mode</span>
                                    </button>

                                    {/* System Default */}
                                    <button
                                        onClick={() => setTheme('system')}
                                        style={{
                                            background: 'var(--glass-card-bg)',
                                            border: `2px solid ${theme === 'system' ? '#00E676' : 'var(--input-border)'}`,
                                            borderRadius: '12px',
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #000 50%, #fff 50%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--input-border)' }}>
                                            <Monitor size={24} color="#888" style={{ mixBlendMode: 'difference' }} />
                                        </div>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>System</span>
                                    </button>
                                </div>

                                <div style={{ marginTop: '20px', padding: '15px', background: 'var(--sidebar-active-bg)', borderRadius: '8px', borderLeft: '4px solid #8d6e63' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        Current Active Theme: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{theme}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
