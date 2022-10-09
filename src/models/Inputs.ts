export type TruckSize = 'small' | 'medium' | 'large';

interface Inputs {
    truckSize: TruckSize;
    depreciationPeriod: number;
    kilometersPerDay: number[];
    daysPerWeek: number;
    hoursPerDay: number;
}

export default Inputs;
