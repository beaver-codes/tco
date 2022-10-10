import React from 'react';
import Slider from 'rc-slider';

// title, slider and number input

export type SliderRowProps = {
    range?: boolean;
    min: number;
    max: number;
    value: number | number[];
    markNumbers: number[];
    onChange: (value: number | number[]) => void;
    title: string;
    step?: number;
}

const SliderRow = ({ min, max, markNumbers, value, onChange, title, range, step }: SliderRowProps) => {

    const marks = markNumbers.reduce((o, number) => ({ ...o, [number]: { label: number } }), {})

    return <>
        <p className={"label"}>{title}</p>
        <Slider range={range} min={min} max={max} marks={marks} onChange={onChange} value={value}
            className={"mb-4"} step={step}
        />
    </>
}

export default SliderRow;