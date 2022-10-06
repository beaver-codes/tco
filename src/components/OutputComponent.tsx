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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);


export default function OutputComponent() {
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

    const labels = [text.bioGas, text.fossilDiesel, text.fossilFree, text.electric];

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
        ],
    };
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}
