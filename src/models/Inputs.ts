interface Inputs {
    truckSize: 'small' | 'medium' | 'large';
    depreciation?: number;
    distancePerDay?: number[];
    daysPerWeek?: number;
    hoursPerDay?: number;
}

export default Inputs;
