import React from "react";
import 'rc-slider/assets/index.css';
import "./BehaviorSelectSliders.css";
import { useText } from "../../contexts/TextContext";

import Inputs from "../../models/Inputs";
import SliderRow, { SliderRowProps } from "./SliderRow";

type SliderInputs = Pick<Inputs, 'depreciationPeriod' | 'daysPerWeek' | 'hoursPerDay' | 'kilometersPerDay'>

type Props = {
    onUpdate: (newState: Inputs) => void;
    inputs: Inputs;
}

const settings: (Pick<SliderRowProps, 'min' | 'max' | 'markNumbers' | 'range' | 'step'> & { inputName: keyof SliderInputs })[] = [
    {
        inputName: "depreciationPeriod",
        min: 5,
        max: 8,
        markNumbers: [5, 6, 7, 8],
    },
    {
        inputName: "daysPerWeek",
        min: 1,
        max: 7,
        markNumbers: [1, 2, 3, 4, 5, 6, 7],
    },
    {
        inputName: "hoursPerDay",
        min: 0,
        max: 24,
        markNumbers: [0, 6, 12, 18, 24],
    },
    {
        inputName: "kilometersPerDay",
        range: true,
        min: 0,
        max: 2000,
        step: 10,
        markNumbers: [0, 500, 1000, 1500, 2000],
    }
]

const BehaviorSelectSliders = ({ onUpdate, inputs }: Props) => {

    // What behaviors?
    /*
    Behaviour parameters:
    Depreciation: 5, 6, 7, 8 years
    Days per week: 1-7
    Distance, Kilometer per working day 0-2000
    Hours per working day (drives personal cost, constant that does not affect the climate footprint)
    */

    const text = useText();

    const singleNumberUpdate = (value: number | number[], forInput: keyof
        SliderInputs) => {
        if (typeof value !== "number") {
            console.log("Received multiple values from slider:", value)
            return
        }
        onUpdate({ ...inputs, [forInput]: value })
    }

    const singleValueCurry = (forInput: keyof SliderInputs) => {
        return (value: number | number[]) => singleNumberUpdate(value, forInput)
    }

    const rangeValueUpdate = (value: number | number[], type: keyof SliderInputs) => {
        if (!Array.isArray(value)) {
            console.error("Range update got value that is not array", value)
            return
        }
        if (Array.isArray(value) && value.length !== 2) {
            console.error("Expected array of length 2, got", value)
            return
        }
        onUpdate({ ...inputs, [type]: value });
    }

    return <div className="slider-container">
        {settings.map((s) => {
            const { inputName } = s;
            return <SliderRow
                key={inputName}
                {...s}
                title={text.sliderTitles[inputName]}
                value={inputs[inputName]}
                onChange={s.range
                    ? (value) => rangeValueUpdate(value, inputName)
                    : singleValueCurry(inputName)
                }
            />
        })}
    </div>
}

export default BehaviorSelectSliders;