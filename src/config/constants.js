export const FLOORS = [
    { id: 'BL1', name: 'Basement Level 1', short: 'B1' },
    { id: 'BL2', name: 'Basement Level 2', short: 'B2' },
    { id: 'BL3', name: 'Basement Level 3', short: 'B3' },
];

export const WASH_AREAS = [
    { id: 'WA1', name: 'Wash Bay A', floorId: 'BL1' },
    { id: 'WA2', name: 'Wash Bay B', floorId: 'BL2' },
    { id: 'WA3', name: 'Wash Bay C', floorId: 'BL3' },
];

export const PRICING = {
    CAR_HOURLY: 50,
    BIKE_HOURLY: 20,
    EV_KWH_RATE: 40,
    WASH_STD: 800,
    VALET_FEE: 75,
    MONTHLY_PASS: 5000,
    FREE_HOURS: 1
};
