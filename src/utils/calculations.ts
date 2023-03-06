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

const DAYLY_DISTANCE: Record<TruckSize, number> = {
    small: 100,
    medium: 200,
    large: 500,
}

const BASE_FUEL_CONSUMPTION: Record<TruckSize, number> = {
    small: 34,
    medium: 39,
    large: 43,
}
const BIO_GAS_FUEL_CONSUMPTION: Record<TruckSize, number> = {
    small: 21,
    medium: 24,
    large: 27,
}
const ELECTRIC_FUEL_CONSUMPTION: Record<TruckSize, number> = {
    small: 130,
    medium: 160,
    large: 220,
}

const PRICE_PER_UNIT: Record<TruckType, number> = {
    [TruckType.BIO_GAS]: 18.8,
    [TruckType.FOSSIL_DIESEL]: 22.5,
    [TruckType.FOSSIL_FREE]: 25.8,
    [TruckType.ELECTRIC]: 2.4,
}

const _calculateEnergyPerType = (inputs: Inputs, type: TruckType): number => {
    const yearlyDistance = DAYLY_DISTANCE[inputs.truckSize] * WORK_DAYS;
    let consumptionPer100 = BASE_FUEL_CONSUMPTION[inputs.truckSize];
    if (type === TruckType.BIO_GAS) {
        consumptionPer100 = BIO_GAS_FUEL_CONSUMPTION[inputs.truckSize];
    } else if (type === TruckType.ELECTRIC) {
        consumptionPer100 = ELECTRIC_FUEL_CONSUMPTION[inputs.truckSize];
    }
    const yearlyConsumption = (yearlyDistance / 100) * consumptionPer100;

    return yearlyConsumption * PRICE_PER_UNIT[type];
}

export const calculateEnergy = (inputs: Inputs): CalculationResult => {
    return {
        [TruckType.BIO_GAS]: _calculateEnergyPerType(inputs, TruckType.BIO_GAS),
        [TruckType.FOSSIL_DIESEL]: _calculateEnergyPerType(inputs, TruckType.FOSSIL_DIESEL),
        [TruckType.FOSSIL_FREE]: _calculateEnergyPerType(inputs, TruckType.FOSSIL_FREE),
        [TruckType.ELECTRIC]: _calculateEnergyPerType(inputs, TruckType.ELECTRIC),
    };
}


const BASE_TIRE_COST_PER_10: Record<TruckSize, number> = {
    'small': 3.85,
    'medium': 4.4,
    'large': 5.9,
}
const ELECTRIC_TIRE_SURCHARGE = 0.2;

const BASE_SERVICE_COST_PER_10: Record<TruckSize, number> = {
    'small': 16,
    'medium': 10.1,
    'large': 7.15,
}
const BIOGAS_SERVICE_SURCHARGE = 1;
const ELECTRIC_SERVICE_COST_PER_10: Record<TruckSize, number> = {
    'small': 10.5,
    'medium': 6.6,
    'large': 4.65,
};

const _calculateServicePerType = (inputs: Inputs, type: TruckType): number => {
    const tireCost = type === TruckType.ELECTRIC ? BASE_TIRE_COST_PER_10[inputs.truckSize] + ELECTRIC_TIRE_SURCHARGE : BASE_TIRE_COST_PER_10[inputs.truckSize];
    let serviceCost = BASE_SERVICE_COST_PER_10[inputs.truckSize];
    if (type === TruckType.BIO_GAS) {
        serviceCost += BIOGAS_SERVICE_SURCHARGE;
    } else if (type === TruckType.ELECTRIC) {
        serviceCost = ELECTRIC_SERVICE_COST_PER_10[inputs.truckSize];
    }

    const totalCostPer10 = tireCost + serviceCost;

    const yearlyDistance = DAYLY_DISTANCE[inputs.truckSize] * WORK_DAYS;

    return (yearlyDistance / 10) * totalCostPer10;
}
export const calculateService = (inputs: Inputs): CalculationResult => {
    return {
        [TruckType.BIO_GAS]: _calculateServicePerType(inputs, TruckType.BIO_GAS),
        [TruckType.FOSSIL_DIESEL]: _calculateServicePerType(inputs, TruckType.FOSSIL_DIESEL),
        [TruckType.FOSSIL_FREE]: _calculateServicePerType(inputs, TruckType.FOSSIL_FREE),
        [TruckType.ELECTRIC]: _calculateServicePerType(inputs, TruckType.ELECTRIC),
    };
}