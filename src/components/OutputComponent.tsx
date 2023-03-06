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
import { calculateEnergy, calculateInvestment, calculatePersonal, calculateService } from '../utils/calculations';
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
            tooltip: {
                yAlign: "bottom",
            }
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
    const orderAndFormatCalculationResult = (result: CalculationResult) => ORDER.map((truckType) => Math.round(result[truckType]));

    const data = {
        labels,
        datasets: [
            {
                label: text.personalCost,
                data: orderAndFormatCalculationResult(calculatePersonal(props.inputs)),
                backgroundColor: 'rgb(255, 99, 132)',
                image: '/assets/person-fill.svg',
            },
            {
                label: text.serviceCost,
                data: orderAndFormatCalculationResult(calculateService(props.inputs)),
                backgroundColor: 'rgb(75, 192, 192)',
                image: '/assets/gear-wide-connected.svg',
            },
            {
                label: text.energyCost,
                data: orderAndFormatCalculationResult(calculateEnergy(props.inputs)),
                backgroundColor: 'rgb(53, 162, 235)',
                image: '/assets/lightning-charge.svg',
            },
            {
                label: text.investment,
                data: orderAndFormatCalculationResult(calculateInvestment(props.inputs)),
                backgroundColor: '#3ea54a',
                image: '/assets/cash-stack.svg',
            },
        ],
    };

    return (
        <div>
            <Bar data={data} options={options} plugins={[
                {
                    id: "barImageLabel",
                    afterDraw: function (chart, easing) {
                        // Get the canvas context
                        const ctx = chart.ctx;
                        for (let datasetIx = 0; datasetIx < chart.data.datasets.length; datasetIx++) {
                            const dataset = chart.data.datasets[datasetIx];
                            const meta = chart.getDatasetMeta(datasetIx);
                            const imageSrc = (dataset as any).image;
                            if (!imageSrc) {
                                continue;
                            }

                            for (let barIx = 0; barIx < meta.data.length; barIx++) {
                                const bar = meta.data[barIx];
                                const { x, y, width, height } = bar as any;


                                // // Create an image object and load the image
                                const img = new Image();
                                img.src = imageSrc;


                                // const imgX = x / 2 - img.width / 2;
                                const targetHeight = height * 0.5;
                                const targetWidth = img.width * targetHeight / img.height;
                                const imgX = x - (width / 2) - (targetWidth / 2);
                                const imgY = y - targetHeight / 2;


                                // Draw the image on the canvas
                                ctx.drawImage(img, imgX, imgY, targetWidth, targetHeight);
                            };
                        }
                    }
                }
            ]} />
        </div>
    )
}
