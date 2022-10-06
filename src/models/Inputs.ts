interface Inputs {
    truckSize: 'small' | 'medium' | 'large';
    depreciationPeriod?: number;
    kilometersPerDay?: number[];
    daysPerWeek?: number;
    hoursPerDay?: number;
}

export default Inputs;
