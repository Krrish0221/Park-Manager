// Shared LIVE Data Store for Admin Dashboard Synchronization
// Now simulating Granular Service & Occupancy State

class LiveAdminStore {
    constructor() {
        this.listeners = [];

        // Initialize Mock Data Arrays
        this.slots = this.initSlots();
        this.chargers = this.initChargers();
        this.washQueue = [
            { id: 101, plate: 'MH-12-AB-1234', model: 'Audi Q7', tier: 'Ceramic Coating', status: 'In Progress', staff: 'Rajesh', exitTime: '18:30', location: 'Wash Bay 1', img: true },
            { id: 102, plate: 'GJ-01-XY-9999', model: 'BMW 5 Series', tier: 'Basic Exterior', status: 'Pending', staff: null, exitTime: '17:45', location: 'Wash Bay 2', img: false },
            { id: 103, plate: 'MH-04-QQ-2222', model: 'Creta', tier: 'Basic Exterior', status: 'In Progress', staff: 'Amit', exitTime: '18:00', location: 'Wash Bay 3', img: true }
        ];
        this.valetQueue = [
            { id: 'REQ-101', type: 'incoming', user: 'Priya Mehta', car: 'Mercedes GLC', plate: 'MH-02-AZ-9999', priority: 'VIP', time: 2, status: 'Waiting' },
            { id: 'REQ-102', type: 'retrieval', user: 'Arjun Rampal', car: 'BMW X5', plate: 'KA-01-EQ-1212', priority: 'Standard', time: 12, status: 'Retrieving' }
        ];

        this.state = {
            revenue: {
                daily: 154230,
                weekly: 1045000,
                trend: '+12.5%',
                breakdown: { parking: 98000, services: 35000, subscriptions: 85000, fines: 21230 }
            },
            occupancy: {
                rate: 0, // Calculated
                count: 0, // Calculated
                total: 500,
                trend: '+5%'
            },
            services: {
                active: 0, // Calculated
                details: ''
            },
            alerts: { count: 3, critical: 1 },
            recentTransactions: [
                { id: 1, plate: 'MH-12-DE-1234', amount: 150, type: 'Parking', method: 'FASTag', time: 'Just now' }
            ],
            recentAlerts: [
                { id: 1, text: 'Revenue Leakage: Gate B2', time: '10m ago', level: 'high' },
                { id: 2, text: 'Sensor Sync Fail: Zone A', time: '45m ago', level: 'med' },
                { id: 3, text: 'Overstaying: MH-04-AB-9999', time: '2h ago', level: 'low' }
            ],
            graphs: { trend: [], forecast: [] },

            // Expose lists for Components
            chargers: this.chargers,
            washQueue: this.washQueue,
            valetQueue: this.valetQueue,
            slots: this.slots
        };

        this.recalcStats(); // Initial calc
        this.refreshGraphs();
        this.startSimulation();
        this.startGraphUpdates();
    }

    // --- INIT HELPERS ---
    initSlots() {
        // 500 Slots distributed across 3 floors (B1, B2, B3)
        return Array.from({ length: 500 }, (_, i) => ({
            id: `SL-${i + 100}`,
            floorId: i % 3, // 0, 1, 2 maps to B1, B2, B3
            status: Math.random() > 0.15 ? 'occupied' : 'empty', // ~85% Occ
            plate: Math.random() > 0.15 ? `MH-0${Math.floor(Math.random() * 9)}-${String.fromCharCode(65 + Math.random() * 25)}` : null
        }));
    }

    initChargers() {
        return Array.from({ length: 60 }, (_, i) => ({
            id: `EV-${(i % 20) + 1}`,
            status: Math.random() > 0.5 ? 'charging' : 'idle',
            power: (Math.random() * 20 + 7).toFixed(1),
            battery: Math.floor(Math.random() * 100),
            time: '00:00'
        }));
    }

    // --- CORE LOGIC ---
    recalcStats() {
        // 1. Calculate Occupancy
        const occupied = this.slots.filter(s => s.status === 'occupied').length;
        const rate = Math.floor((occupied / 500) * 100);

        // 2. Calculate Active Services
        const activeEV = this.chargers.filter(c => c.status === 'charging').length;
        const activeWash = this.washQueue.length;
        const activeValet = this.valetQueue.length;
        const totalServices = activeEV + activeWash + activeValet;

        this.state.occupancy = { ...this.state.occupancy, count: occupied, rate };
        this.state.services = {
            active: totalServices,
            details: `${activeWash} Wash, ${activeEV} EV`
        };

        // Sync Lists
        this.state.slots = [...this.slots];
        this.state.chargers = [...this.chargers];
        this.state.washQueue = [...this.washQueue];
        this.state.valetQueue = [...this.valetQueue];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        listener(this.state);
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    }

    notify() {
        this.listeners.forEach(listener => listener({ ...this.state }));
    }

    startSimulation() {
        setInterval(() => {
            this.simulationStep();
        }, 3000); // 3s tick
    }

    simulationStep() {
        // 1. Random Transaction (Revenue)
        this.generateRandomTransaction();

        // 2. Flux Occupancy (One car enters/leaves)
        const randSlot = Math.floor(Math.random() * 500);
        this.slots[randSlot].status = this.slots[randSlot].status === 'occupied' ? 'empty' : 'occupied';

        // 3. Flux EV Chargers
        const randEv = Math.floor(Math.random() * 60);
        if (Math.random() > 0.7) {
            this.chargers[randEv].status = this.chargers[randEv].status === 'charging' ? 'idle' : 'charging';
        }

        this.recalcStats();
        this.notify();
    }

    startGraphUpdates() {
        setInterval(() => {
            this.refreshGraphs();
            this.notify();
        }, 300000);
    }

    refreshGraphs() {
        this.state.graphs.trend = this.generateTrendData(24, 40, 30);
        this.state.graphs.forecast = this.generateTrendData(24, 60, 15);
    }

    generateRandomTransaction() {
        const types = ['Parking', 'Service', 'Subscription', 'Fine'];
        const methods = ['FASTag', 'UPI', 'Cash', 'Wallet'];
        const type = types[Math.floor(Math.random() * types.length)];
        const amount = type === 'Parking' ? 150 : type === 'Service' ? 450 : 1000;

        this.state.revenue.daily += amount;

        // Correctly map types to PLURAL state keys
        if (type === 'Parking') this.state.revenue.breakdown.parking += amount;
        if (type === 'Service') this.state.revenue.breakdown.services += amount;
        if (type === 'Subscription') this.state.revenue.breakdown.subscriptions += amount;
        if (type === 'Fine') this.state.revenue.breakdown.fines += amount;

        const newTx = {
            id: Date.now(),
            plate: `MH-${Math.floor(Math.random() * 99)}`,
            amount, type, method: methods[0], time: 'Just now'
        };
        this.state.recentTransactions = [newTx, ...this.state.recentTransactions].slice(0, 5);
    }

    generateTrendData(points = 24, base = 50, variance = 20) {
        const data = [];
        let value = base;
        for (let i = 0; i < points; i++) {
            const hour = i;
            const timeOfDayFactor = (hour > 9 && hour < 19) ? 1.5 : 0.8;
            const randomChange = (Math.random() - 0.5) * variance;
            value = Math.max(10, Math.min(100, value + randomChange));
            const adjustedValue = Math.floor(value * timeOfDayFactor);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            data.push({
                time: `${displayHour} ${ampm}`,
                value: adjustedValue,
                expected: Math.floor(adjustedValue * 1.1)
            });
        }
        return data;
    }
}

export const adminStore = new LiveAdminStore();
