import React, { useEffect } from 'react';
import Inputs from '../../models/Inputs';
import Slider from 'rc-slider';

// title, slider and number input

type Props = {
    range?: boolean;
    min: number;
    max: number;
    value: number | number[];
    markNumbers: number[];
    onChange: (value: number | number[]) => void;
    title: string;
    step?: number;
}

const SliderRow = ({ min, max, markNumbers, onChange, title, range, step }: Props) => {

    const marks = markNumbers.reduce((o, number) => ({ ...o, [number]: { label: number } }), {})

    return <>
        <p className={"label"}>{title}</p>
        <Slider range={range} min={min} max={max} marks={marks} onChange={onChange}
            className={"mb-4"} step={step}
        />
    </>
}

export default SliderRow;