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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

const options: ChartOptions<"bar"> = {
    plugins: {
        title: {
            display: true,
            text: 'TODO: Text',
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

export default function OutputComponent() {

    const labels = ['TruckA', 'TruckB', 'TruckC', 'TruckD'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 20, 20, 30],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: [10, 10],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Dataset 3',
                data: [10, 10],
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Dataset 3',
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
