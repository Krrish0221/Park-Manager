import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Car, Clock, Shield, Users, Key, Camera, MapPin, MessageSquare, Send, Package, Bell, Battery, Fuel, ChevronDown, X } from 'lucide-react';
import { FLOORS } from '../../config/constants';
import { adminStore } from '../../data/adminData'; // Synced Store

const ValetHub = () => {
    // SYNC STATE WITH LIVE STORE
    const [data, setData] = useState(adminStore.state);

    useEffect(() => {
        const unsubscribe = adminStore.subscribe((newState) => {
            setData(newState);
        });
        return () => unsubscribe();
    }, []);

    const requests = data.valetQueue; // Use global list

    // 2. DIGITAL CUSTODY (Keys - From Global Slots)
    const [currentFloor, setCurrentFloor] = useState(FLOORS[0]);

    // Filter slots for the current floor
    const keys = useMemo(() => {
        // Find index of current floor to match adminData floorId (0, 1, 2)
        const floorIndex = FLOORS.findIndex(f => f.id === currentFloor.id);

        return data.slots.filter(s => s.floorId === floorIndex).map(s => ({
            id: s.id,
            status: s.status,
            plate: s.plate
        }));
    }, [currentFloor, data.slots]);

    // 3. WORKFORCE (Local UI state for interaction demo)
    const [attendants, setAttendants] = useState([
        { id: 1, name: 'Suresh D.', status: 'On-Duty', activeTask: 'Retrieving REQ-102', avatar: 'S' },
        { id: 2, name: 'Ramesh P.', status: 'Available', activeTask: null, avatar: 'R' },
        { id: 3, name: 'Vikram S.', status: 'Break', activeTask: null, avatar: 'V' },
    ]);

    // 4. INSPECTION STATE
    const [selectedRequest, setSelectedRequest] = useState(null); // Init null safely
    const [inspectionData, setInspectionData] = useState({ fuel: 75, damagePoints: [] });

    // Set first request as selected when data loads
    useEffect(() => {
        if (!selectedRequest && requests.length > 0) {
            setSelectedRequest(requests[0]);
        }
    }, [requests]);

    // 5. CHAT STATE
    const [activeChatAttendant, setActiveChatAttendant] = useState(null);
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'admin', text: 'Please prioritize the VIP guest at the entrance.', time: '10:30 AM' },
        { id: 2, sender: 'attendant', text: 'On it, moving the Mercedes now.', time: '10:31 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setChatMessages([...chatMessages, {
            id: Date.now(),
            sender: 'admin',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');

        // Mock auto-reply
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'attendant',
                text: 'Copy that!',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 2000);
    };

    useEffect(() => {
        if (activeChatAttendant) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, activeChatAttendant]);

    const getPriorityColor = (p) => p === 'VIP' ? '#f50057' : '#2196f3';
    const getTimerColor = (m) => m < 5 ? '#00E676' : m < 15 ? '#FFC107' : '#FF5252';

    return (
        <div style={{ display: 'flex', gap: '20px', height: '100%', width: '100%', overflow: 'hidden', position: 'relative' }}>

            {/* CHAT MODAL OVERLAY */}
            {activeChatAttendant && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)',
                    zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setActiveChatAttendant(null)}>
                    <div className="glass-card" style={{ width: '400px', height: '500px', display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>

                        {/* Chat Header */}
                        <div style={{ padding: '15px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {activeChatAttendant.avatar}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>{activeChatAttendant.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: '#00E676' }}>Online</span>
                                </div>
                            </div>
                            <button onClick={() => setActiveChatAttendant(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        {/* Chat Body */}
                        <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {chatMessages.map(msg => (
                                <div key={msg.id} style={{
                                    alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.sender === 'admin' ? 'flex-end' : 'flex-start'
                                }}>
                                    <div style={{
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        borderTopRightRadius: msg.sender === 'admin' ? '2px' : '12px',
                                        borderTopLeftRadius: msg.sender === 'admin' ? '12px' : '2px',
                                        background: msg.sender === 'admin' ? '#2196f3' : 'rgba(255,255,255,0.1)',
                                        color: msg.sender === 'admin' ? '#fff' : '#ddd',
                                        fontSize: '0.9rem'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <span style={{ fontSize: '0.65rem', color: '#666', marginTop: '4px' }}>{msg.time}</span>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSendMessage} style={{ padding: '15px', borderTop: '1px solid #333', display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.2)' }}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #444', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                                autoFocus
                            />
                            <button type="submit" style={{ padding: '10px', background: '#00E676', border: 'none', borderRadius: '6px', color: '#000', cursor: 'pointer' }}>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* COL 1: ACTIVE OPERATIONS (Left) */}
            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Car size={18} /> Active Queue
                    </h3>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#333', borderRadius: '4px' }}>In: {requests.filter(r => r.type === 'incoming').length}</span>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#333', borderRadius: '4px' }}>Out: {requests.filter(r => r.type === 'retrieval').length}</span>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {requests.map(req => (
                        <div
                            key={req.id}
                            onClick={() => setSelectedRequest(req)}
                            style={{
                                padding: '12px',
                                background: selectedRequest?.id === req.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                borderLeft: `4px solid ${req.type === 'incoming' ? '#00E676' : '#FF9100'}`,
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{req.plate}</span>
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    background: getPriorityColor(req.priority),
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                    {req.priority}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '5px' }}>{req.car} • {req.user}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                <span style={{ color: '#888', textTransform: 'uppercase' }}>{req.type}</span>
                                <span style={{ color: getTimerColor(req.time), fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} /> {req.time}m ago
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COL 2: DIGITAL CUSTODY & INSPECTION (Center) */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* 2a. Key Cabinet */}
                <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '350px' }}>

                    {/* Header with Floor Switcher */}
                    <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Key size={16} /> Key Cabinet 2.0
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>{keys.length} Slots</span>
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={currentFloor.id}
                                    onChange={(e) => setCurrentFloor(FLOORS.find(f => f.id === e.target.value))}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '6px',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        fontSize: '0.8rem',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {FLOORS.map(f => (
                                        <option key={f.id} value={f.id} style={{ background: '#222' }}>{f.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Key Grid */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '8px' }}>
                            {keys.map(k => (
                                <div key={k.id} style={{
                                    aspectRatio: '1',
                                    background: k.status === 'occupied' ? 'rgba(33, 150, 243, 0.2)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${k.status === 'occupied' ? '#2196f3' : '#444'}`,
                                    borderRadius: '6px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }} title={k.plate ? `Plate: ${k.plate}` : k.id}>
                                    <span style={{ fontSize: '0.6rem', color: '#888', marginBottom: '2px' }}>{k.id.split('-')[1]}</span>
                                    {k.status === 'occupied' ? (
                                        <Key size={12} color="#2196f3" />
                                    ) : (
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#444' }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2b. Safety & Inspection */}
                <div className="glass-card" style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Shield size={16} /> Smart Inspection
                        </h3>
                        <div style={{ fontSize: '0.9rem', color: '#888' }}>
                            {selectedRequest?.plate || 'Select a vehicle'}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
                        {/* Blueprint Mock */}
                        <div style={{ flex: 1, border: '1px dashed #444', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                            <div style={{ textAlign: 'center', color: '#666' }}>
                                <Car size={64} style={{ margin: '0 auto 10px' }} />
                                <p style={{ fontSize: '0.8rem' }}>Interactive Car Blueprint</p>
                                <p style={{ fontSize: '0.7rem' }}>Tap used to mark dents</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {/* Photo Log */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                                {['Front', 'Back', 'Left', 'Right'].map(side => (
                                    <button key={side} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: '#ccc', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                        <Camera size={14} /> {side}
                                    </button>
                                ))}
                            </div>

                            {/* Fuel/Battery Slider */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px', color: '#ccc' }}>
                                    <span>Fuel / Charge</span>
                                    <span>{inspectionData.fuel}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={inspectionData.fuel}
                                    onChange={(e) => setInspectionData({ ...inspectionData, fuel: e.target.value })}
                                    style={{ width: '100%', accentColor: '#00E676' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COL 3: WORKFORCE & ACTIONS (Right) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* 3a. Attendant Hub */}
                <div className="glass-card" style={{ padding: '15px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users size={16} /> Attendant Hub
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {attendants.map(att => (
                            <div key={att.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {att.avatar}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{att.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: att.status === 'On-Duty' ? '#00E676' : att.status === 'Break' ? '#FFC107' : '#2979FF' }}>
                                        {att.status} {att.activeTask && `• ${att.activeTask}`}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveChatAttendant(att)}
                                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px' }}
                                    title="Open Chat"
                                >
                                    <MessageSquare size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3b. High-End Actions */}
                <div className="glass-card" style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Premium Actions</h3>

                    <button style={{ padding: '12px', background: 'rgba(33, 150, 243, 0.1)', border: '1px solid #2196f3', borderRadius: '8px', color: '#2196f3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        <Send size={18} /> SMS: Text-to-Retrieve
                    </button>

                    <button style={{ padding: '12px', background: 'rgba(156, 39, 176, 0.1)', border: '1px solid #9c27b0', borderRadius: '8px', color: '#ba68c8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        <Package size={18} /> In-Car Package Drop
                    </button>

                    <button style={{ padding: '12px', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid #00E676', borderRadius: '8px', color: '#00E676', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', marginTop: 'auto' }}>
                        <Bell size={18} /> Notify: Car Ready
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValetHub;
