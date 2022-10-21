import CalculationResult from "../models/CalculationResult";
import Inputs, { TruckSize } from "../models/Inputs";
import TruckType from "../models/truckType";

const BASE_INVESTMENT: Record<TruckSize, number> = {
    small: 2150000,
    medium: 2400000,
    large: 3700000,
}
const BIOGAS_INVETMENT_SURCHARGE = 250000;
const ELECTRIC_INVESTMENT: Record<TruckSize, number> = {
    small: 3700000,
    medium: 4100000,
    large: 6200000,
};
const BASE_LIFETIME = 7;
const ELECTRIC_LIFETIME = 8;



export const calculateInvestment = (inputs: Inputs): CalculationResult => {
    const { truckSize } = inputs;
    const baseInvetment = BASE_INVESTMENT[truckSize];
    const electricInvestment = ELECTRIC_INVESTMENT[truckSize];

    return {
        [TruckType.BIO_GAS]: (baseInvetment + BIOGAS_INVETMENT_SURCHARGE) / BASE_LIFETIME,
        [TruckType.FOSSIL_DIESEL]: baseInvetment / BASE_LIFETIME,
        [TruckType.FOSSIL_FREE]: baseInvetment / BASE_LIFETIME,
        [TruckType.ELECTRIC]: electricInvestment / ELECTRIC_LIFETIME,
    };
}

const BASE_HOURLY_RATE = 277;
const HOURS_PER_DAY = 8;
const WORK_DAYS = 250;

export const calculatePersonal = (inputs: Inputs): CalculationResult => {
    const yearlyRate = BASE_HOURLY_RATE * HOURS_PER_DAY * WORK_DAYS;

    return {
        [TruckType.BIO_GAS]: yearlyRate,
        [TruckType.FOSSIL_DIESEL]: yearlyRate,
        [TruckType.FOSSIL_FREE]: yearlyRate,
        [TruckType.ELECTRIC]: yearlyRate,
    };
}
