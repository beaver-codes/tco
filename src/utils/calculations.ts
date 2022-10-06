import Inputs from "../models/Inputs";

export const calculateInvestment = (inputs: Inputs): number[] => {
    const { truckSize } = inputs;
    let investments = [10, 10, 10, 10];

    if (truckSize === 'medium') {
        investments = investments.map(i => i * 1.8);
    } else if (truckSize === 'large') {
        investments = investments.map(i => i * 3.5);
    }

    return investments;
}
