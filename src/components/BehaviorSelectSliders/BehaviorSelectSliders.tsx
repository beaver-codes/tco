import React, { useMemo } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./BehaviorSelectSliders.css";

import Inputs from "../../models/Inputs";
import InputsComponent from "../InputsComponent";
import { arrayBuffer } from "stream/consumers";

type Props = {
    onUpdate: (newState: Inputs) => void;
    inputs: Inputs;
}

const BehaviorSelectSliders = ({ onUpdate, inputs }: Props) => {

    // What behaviors?
    /*
    Behaviour parameters:
    Depreciation: 5, 6, 7, 8 years
    Days per week: 1-7
    Distance, Kilometer per working day 10, 20, 30, 40
    Hours per working day (drives personal cost, constant that does not affect the climate footprint)
    */

    const marksGenerator = (min: number, max: number) => { }


    const depreciationMarks = {
        5: { label: 5 },
        6: { label: 6 },
        7: { label: 7 },
        8: { label: 8 },
    }

    const daysPerWeekMarks = {
        1: { label: 1 },
        2: { label: 2 },
        3: { label: 3 },
        4: { label: 4 },
        5: { label: 5 },
        6: { label: 6 },
        7: { label: 7 },
    }

    const hoursPerDayMarks = {
        0: { label: 0 },
        6: { label: 6 },
        12: { label: 12 },
        18: { label: 18 },
        24: { label: 24 },
    }
    const distancePerDayMarks = {
        0: { label: 0 },
        500: { label: 500 },
        1000: { label: 1000 },
        1500: { label: 1500 },
        2000: { label: 2000 },
    }

    const singleNumberUpdate = (value: number | number[], type: "depreciation" | "daysPerWeek" | "hoursPerDay") => {
        if (typeof value !== "number") {
            console.log("Received multiple values from slider:", value)
            return
        }
        onUpdate({ ...inputs, [type]: value })
    }

    const rangeValueUpdate = (value: number | number[], type: "distancePerDay") => {
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
        <p>Depreciation period (years)</p>
        <Slider
            min={5} max={8}
            marks={depreciationMarks}
            value={inputs.depreciation}
            onChange={(value) => singleNumberUpdate(value, "depreciation")}
            className="slider"
        />
        <p>Days per week</p>
        <Slider
            min={1}
            max={7}
            step={null}
            value={inputs.daysPerWeek}
            marks={daysPerWeekMarks}
            onChange={(value) => singleNumberUpdate(value, "daysPerWeek")}
            className="slider"
        />
        <p>Hours per day</p>
        <Slider
            min={0}
            max={24}
            value={inputs.hoursPerDay}
            marks={hoursPerDayMarks}
            onChange={(value) => singleNumberUpdate(value, "hoursPerDay")}
            className="slider"
        />
        <p>Kilometers per working day</p>
        <Slider
            range
            min={0}
            max={2000}
            value={inputs.distancePerDay}
            marks={distancePerDayMarks}
            onChange={(value) => rangeValueUpdate(value, "distancePerDay")}
            step={10}
            className="slider"
        />
    </div>
}

export default BehaviorSelectSliders;