import CalculationResult from "../models/CalculationResult";
import Inputs, { TruckSize } from "../models/Inputs";
import TruckType from "../models/truckType";

const BASE_INVESTMENT: Record<TruckSize, number> = {
    small: 1750000,
    medium: 2200000,
    large: 3500000,
}
const BIOGAS_INVETMENT_SURCHARGE = 250000;
const ELECTRIC_INVESTMENT: Record<TruckSize, number> = {
    small: 3600000,
    medium: 4000000,
    large: 5200000,
};


export const calculateInvestment = (inputs: Inputs): CalculationResult => {
    const { truckSize } = inputs;
    const baseInvetment = BASE_INVESTMENT[truckSize];
    const electricInvestment = ELECTRIC_INVESTMENT[truckSize];

    return {
        [TruckType.BIO_GAS]: baseInvetment + BIOGAS_INVETMENT_SURCHARGE,
        [TruckType.FOSSIL_DIESEL]: baseInvetment,
        [TruckType.FOSSIL_FREE]: baseInvetment,
        [TruckType.ELECTRIC]: electricInvestment,
    };
}
