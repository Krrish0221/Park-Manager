import React, { useState, useMemo } from 'react';
import { FLOORS } from '../../config/constants';

const FloorMap = () => {
    const [activeFloor, setActiveFloor] = useState(FLOORS[0].id);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Helper to generate a "Zone" of slots
    const generateZone = (floor, zonePrefix, count, startId = 1, type = 'Standard') => {
        return Array.from({ length: count }, (_, i) => ({
            id: `${floor}-${zonePrefix}${startId + i}`,
            status: Math.random() > 0.6 ? 'occupied' : Math.random() > 0.85 ? 'reserved' : 'empty',
            type: type
        }));
    };

    const floorData = useMemo(() => {
        const data = {};

        FLOORS.forEach(f => {
            data[f.id] = {
                evZone: generateZone(f.short, 'EV', 20, 1, 'EV'),
                zoneA: generateZone(f.short, 'A', 24, 1),
                zoneB: generateZone(f.short, 'B', 24, 1),
                zoneC: generateZone(f.short, 'C', 24, 1),
                zoneD: generateZone(f.short, 'D', 24, 1),
                zoneE: generateZone(f.short, 'E', 24, 1),
                vipZone: generateZone(f.short, 'VIP', 6, 1, 'Standard'),
                bikeZoneA: generateZone(f.short, 'BK1-', 100, 1, 'Bike'),
                bikeZoneB: generateZone(f.short, 'BK2-', 100, 1, 'Bike'),
            };
        });
        return data;
    }, []);
    // ... (lines 33-138 are unchanged logic functions, skipping for brevity in replacement if possible, but replace block needs continuity)
    const getStatusStyle = (slot) => {
        if (slot.type === 'EV') {
            if (slot.status === 'occupied') return { border: '#ff4444', bg: 'rgba(255, 68, 68, 0.2)', icon: '⚡🚗' };
            return { border: '#00ffff', bg: 'rgba(0, 255, 255, 0.1)', icon: '⚡' };
        }

        switch (slot.status) {
            case 'occupied':
                return { border: '#e53935', bg: '#ef535033', icon: '🚗' };
            case 'reserved':
                return { border: '#fb8c00', bg: '#ffa72633', icon: '👑' };
            case 'maintenance':
                return { border: '#8e24aa', bg: '#ab47bc33', icon: '🚧' };
            default:
                if (slot.type === 'Bike') {
                    if (slot.status === 'occupied') return { border: '#ff9800', bg: 'rgba(255, 152, 0, 0.2)', icon: '🛵' };
                    return { border: '#ff9800', bg: 'rgba(255, 152, 0, 0.05)', icon: '🏍️' };
                }
                return { border: '#43a047', bg: '#66bb6a1a', icon: null };
        }
    };

    const Slot = ({ slot, rotation = 0 }) => {
        const style = getStatusStyle(slot);
        const isBike = slot.type === 'Bike';
        return (
            <div
                onClick={() => {
                    if (slot.status === 'occupied' || (slot.type === 'EV' && slot.status === 'occupied')) {
                        setSelectedSlot(slot);
                    } else {
                        // Optional: Handle empty slot click
                    }
                }}
                style={{
                    width: isBike ? '40px' : '50px',
                    height: isBike ? '50px' : '80px',
                    border: `2px solid ${style.border}`,
                    borderTop: 'none',
                    borderRadius: '0 0 6px 6px',
                    background: style.bg,
                    margin: '0 3px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.2s',
                    flexShrink: 0
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.15)`; e.currentTarget.style.zIndex = 10; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`; e.currentTarget.style.zIndex = 1; }}
            >
                <span style={{ fontSize: '0.6rem', color: '#ccc', position: 'absolute', top: '2px' }}>
                    {slot.id.split('-')[1]}
                </span>
                {style.icon && <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>{style.icon}</span>}
            </div>
        );
    };

    const Driveway = ({ label = "DRIVEWAY", direction = "➔", isEntry = false, isExit = false }) => (
        <div style={{
            width: '100%',
            height: '60px',
            borderTop: '2px dashed #444',
            borderBottom: '2px dashed #444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0',
            background: 'rgba(0,0,0,0.2)',
            position: 'relative'
        }}>
            {isEntry && (
                <div style={{
                    position: 'absolute',
                    left: '-20px',
                    background: '#4caf50',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 0 10px #4caf50'
                }}>
                    ENTRY
                </div>
            )}
            <span style={{ color: '#444', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '4px' }}>
                {direction} {label} {direction}
            </span>
            {isExit && (
                <div style={{
                    position: 'absolute',
                    right: '-20px',
                    background: '#ff4444',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 0 10px #ff4444'
                }}>
                    EXIT
                </div>
            )}
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Modal Overlay */}
            {selectedSlot && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setSelectedSlot(null)}>
                    <div className="glass-card" style={{ width: '400px', padding: '25px', position: 'relative', border: '1px solid #444', background: '#222' }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedSlot(null)}
                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            ✕
                        </button>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Slot {selectedSlot.id.split('-')[1]}</h2>
                        <span style={{
                            background: selectedSlot.status === 'occupied' ? '#e53935' : '#00ffff',
                            color: selectedSlot.status === 'occupied' ? '#fff' : '#000',
                            padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>
                            {selectedSlot.type === 'EV' ? 'EV CHARGING' : 'OCCUPIED'}
                        </span>

                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Ticket ID:</span>
                                <span style={{ fontFamily: 'monospace' }}>TKT-{Math.floor(Math.random() * 10000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                <span style={{ color: '#888' }}>License Plate:</span>
                                <span style={{ fontWeight: 'bold' }}>MH-0{Math.floor(Math.random() * 9)}-AB-{Math.floor(Math.random() * 1000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Duration:</span>
                                <span>2h 15m</span>
                            </div>
                            {selectedSlot.type === 'EV' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                    <span style={{ color: '#00ffff' }}>Charge Status:</span>
                                    <span>Active (82%)</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                            <button style={{ flex: 1, padding: '12px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                View Ticket
                            </button>
                            <button style={{ flex: 1, padding: '12px', background: 'rgba(255, 68, 68, 0.2)', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Vacate Slot
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Basement Layout</h1>
                    <p style={{ color: '#888' }}>{floorData[activeFloor].evZone.length} EV Stations | Blocks A-E</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px' }}>
                    {FLOORS.map(floor => (
                        <button
                            key={floor.id}
                            onClick={() => setActiveFloor(floor.id)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '8px',
                                background: activeFloor === floor.id ? '#fff' : 'transparent',
                                color: activeFloor === floor.id ? '#000' : '#888',
                                fontWeight: '700',
                            }}
                        >
                            {floor.name}
                        </button>
                    ))}
                </div>
            </header>

            {/* STATUS LEGEND */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', padding: '10px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#43a047', borderRadius: '50%', border: '1px solid #66bb6a' }}></div>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#e53935', borderRadius: '50%', border: '1px solid #ef5350' }}></div>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Occupied</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#fb8c00', borderRadius: '50%', border: '1px solid #ffa726' }}></div>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Reserved</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#8e24aa', borderRadius: '50%', border: '1px solid #ab47bc' }}></div>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Maintenance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: 'transparent', border: '1px solid #00ffff', borderRadius: '50%', boxShadow: '0 0 5px #00ffff' }}></div>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>EV Station</span>
                </div>
            </div>

            {/* SINGLE SCROLLABLE CONTAINER */}
            <div className="glass-card" style={{
                flex: 1,
                overflow: 'auto',
                background: '#1a1a1a',
                border: '4px solid #333',
                padding: '2rem',
                position: 'relative'
            }}>

                {/* CONTENT WRAPPER */}
                <div style={{ display: 'flex', gap: '50px', minWidth: 'fit-content' }}>

                    {/* LEFT COLUMN: EV & BIKE ZONE A */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                        {/* EV TOWER */}
                        <div style={{
                            border: '2px solid #00aaaa',
                            borderRadius: '12px',
                            background: 'rgba(0, 255, 255, 0.02)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: '220px',
                            height: 'fit-content'
                        }}>
                            <div style={{ color: '#00aaaa', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
                                ⚡<br />EV ZONE
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].evZone.slice(0, 10).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={90} />
                                    ))}
                                </div>
                                <div style={{ width: '2px', background: 'dashed #00aaaa', opacity: 0.3 }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].evZone.slice(10, 20).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={-90} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BIKE ZONE A (Below EV) */}
                        <div style={{
                            border: '2px dashed #ff9800',
                            borderRadius: '12px',
                            background: 'rgba(255, 152, 0, 0.02)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: '220px',
                            height: 'fit-content'
                        }}>
                            <div style={{ color: '#ff9800', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
                                🏍️<br />BIKE ZONE A<br /><span style={{ fontSize: '0.8rem' }}>(100 Spots)</span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].bikeZoneA.slice(0, 50).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={90} />
                                    ))}
                                </div>
                                <div style={{ width: '2px', background: 'dashed #ff9800', opacity: 0.3 }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].bikeZoneA.slice(50, 100).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={-90} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* CENTER: VERTICAL STACK */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', minWidth: '800px' }}>

                        {/* BLOCK A */}
                        <div style={{ width: '100%', background: '#222', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                            <div style={{ color: '#888', marginBottom: '10px', fontWeight: 'bold', paddingLeft: '10px' }}>BLOCK A</div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {floorData[activeFloor].zoneA.map(slot => <Slot key={slot.id} slot={slot} rotation={180} />)}
                            </div>
                        </div>

                        {/* ENTRY LANE */}
                        <Driveway label="MAIN LANE 1" direction="➔" isEntry={true} />

                        {/* BLOCK B */}
                        <div style={{ width: '100%', background: '#222', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                            <div style={{ color: '#888', marginBottom: '10px', fontWeight: 'bold', paddingLeft: '10px' }}>BLOCK B</div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {floorData[activeFloor].zoneB.map(slot => <Slot key={slot.id} slot={slot} rotation={180} />)}
                            </div>
                        </div>

                        {/* BLOCK C */}
                        <div style={{ width: '100%', background: '#222', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                            <div style={{ color: '#888', marginBottom: '10px', fontWeight: 'bold', paddingLeft: '10px' }}>BLOCK C</div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {floorData[activeFloor].zoneC.map(slot => <Slot key={slot.id} slot={slot} rotation={0} />)}
                            </div>
                        </div>

                        {/* EXIT LANE */}
                        <Driveway label="MAIN LANE 2" direction="🠔" isExit={true} />

                        {/* BLOCK D */}
                        <div style={{ width: '100%', background: '#222', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                            <div style={{ color: '#888', marginBottom: '10px', fontWeight: 'bold', paddingLeft: '10px' }}>BLOCK D</div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {floorData[activeFloor].zoneD.map(slot => <Slot key={slot.id} slot={slot} rotation={180} />)}
                            </div>
                        </div>

                        {/* BLOCK E */}
                        <div style={{ width: '100%', background: '#222', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                            <div style={{ color: '#888', marginBottom: '10px', fontWeight: 'bold', paddingLeft: '10px' }}>BLOCK E</div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {floorData[activeFloor].zoneE.map(slot => <Slot key={slot.id} slot={slot} rotation={0} />)}
                            </div>
                        </div>

                    </div>


                    {/* RIGHT: WASH & VIP */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '160px' }}>
                        <div style={{
                            height: '300px',
                            border: '2px dashed #448aff',
                            background: 'rgba(68, 138, 255, 0.05)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '20px',
                            position: 'sticky',
                            top: '20px'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚿</div>
                            <h3 style={{ color: '#448aff', fontWeight: 'bold' }}>WASH BAY</h3>
                        </div>

                        <div style={{
                            border: '1px solid #fb8c00',
                            borderRadius: '12px',
                            padding: '15px',
                            background: 'rgba(251, 140, 0, 0.05)'
                        }}>
                            <div style={{ color: '#fb8c00', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>VIP</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', justifyItems: 'center' }}>
                                {floorData[activeFloor].vipZone.map(slot => (
                                    <Slot key={slot.id} slot={slot} rotation={0} />
                                ))}
                            </div>
                        </div>

                        {/* BIKE ZONE B (Below VIP) */}
                        <div style={{
                            border: '1px solid #ff9800',
                            borderRadius: '12px',
                            padding: '15px',
                            background: 'rgba(255, 152, 0, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div style={{ color: '#ff9800', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>
                                🏍️ BIKE ZONE B<br /><span style={{ fontSize: '0.7rem' }}>(100 Spots)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].bikeZoneB.slice(0, 50).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={90} />
                                    ))}
                                </div>
                                <div style={{ width: '1px', background: '#ff9800', opacity: 0.3 }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {floorData[activeFloor].bikeZoneB.slice(50, 100).map(slot => (
                                        <Slot key={slot.id} slot={slot} rotation={-90} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default FloorMap;
