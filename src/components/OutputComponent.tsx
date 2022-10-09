import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useText } from '../contexts/TextContext';
import Inputs from '../models/Inputs';
import { calculateInvestment } from '../utils/calculations';
import TruckType from '../models/truckType';
import CalculationResult from '../models/CalculationResult';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

interface Props {
    inputs: Inputs;
}

const ORDER = [TruckType.FOSSIL_DIESEL, TruckType.FOSSIL_FREE, TruckType.BIO_GAS, TruckType.ELECTRIC];

export default function OutputComponent(props: Props) {
    const text = useText();
    const options: ChartOptions<"bar"> = {
        plugins: {
            title: {
                display: true,
                text: text.header,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        indexAxis: "y",
    };

    const labelDefinitions = {
        [TruckType.BIO_GAS]: text.bioGas,
        [TruckType.FOSSIL_DIESEL]: text.fossilDiesel,
        [TruckType.FOSSIL_FREE]: text.fossilFree,
        [TruckType.ELECTRIC]: text.electric,
    }
    const labels = ORDER.map((truckType) => labelDefinitions[truckType]);
    const orderCalculationResolt = (result: CalculationResult) => ORDER.map((truckType) => result[truckType]);

    const data = {
        labels,
        datasets: [
            {
                label: text.personalCost,
                data: [10, 20, 20, 30],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: text.serviceCost,
                data: [10, 10],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: text.energyCost,
                data: [10, 10],
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: text.overheadCost,
                data: [10, 10],
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: text.investment,
                data: orderCalculationResolt(calculateInvestment(props.inputs)),
                backgroundColor: '#3ea54a',
            },
        ],
    };
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}
