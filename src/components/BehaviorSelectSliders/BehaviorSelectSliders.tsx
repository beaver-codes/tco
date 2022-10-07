import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./BehaviorSelectSliders.css";
import { useText } from "../../contexts/TextContext";

import Inputs from "../../models/Inputs";
import SliderRow from "./SliderRow";
import { markAsUntransferable } from "worker_threads";

type Props = {
    onUpdate: (newState: Inputs) => void;
    inputs: Inputs;
}
console.log()

const BehaviorSelectSliders = ({ onUpdate, inputs }: Props) => {

    // What behaviors?
    /*
    Behaviour parameters:
    Depreciation: 5, 6, 7, 8 years
    Days per week: 1-7
    Distance, Kilometer per working day 0-2000
    Hours per working day (drives personal cost, constant that does not affect the climate footprint)
    */

    console.log(Object.keys(inputs))

    const inputKeys = Object.keys(inputs)


    const text = useText();

    const settings = {
        deprecationPeriod: {
            min: 5,
            max: 8,
            title: text.depreciationPeriod,
            value: inputs.depreciationPeriod,
            markNumbers: [5, 6, 7, 8],
        },
    }

    const marksArrays = {
        depreciationPeriod: [5, 6, 7, 8],
        daysPerWeek: [1, 2, 3, 4, 5, 6, 7],
        hoursPerDay: [0, 6, 12, 18, 24],
        kilometersPerDay: [0, 500, 1000, 1500, 2000],
    }

    const singleNumberUpdate = (value: number | number[], forInput: string) => {
        if (!(inputKeys.includes(forInput))) {
            console.error(`${forInput} not allowed input type to update`)
        }
        if (typeof value !== "number") {
            console.log("Received multiple values from slider:", value)
            return
        }
        onUpdate({ ...inputs, [forInput]: value })
    }

    const rangeValueUpdate = (value: number | number[], type: "kilometersPerDay") => {
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
        <SliderRow
            min={5} max={8}
            value={inputs.depreciationPeriod}
            title={text.depreciationPeriod}
            onChange={(value) => singleNumberUpdate(value, "depreciationPeriod")}
            markNumbers={marksArrays.depreciationPeriod}
        />
        <SliderRow
            min={1} max={7}
            title={text.daysPerWeek}
            value={inputs.daysPerWeek}
            onChange={(value) => singleNumberUpdate(value, "daysPerWeek")}
            markNumbers={marksArrays.daysPerWeek}
        />
        <SliderRow
            min={0} max={24}
            title={text.hoursPerDay}
            value={inputs.hoursPerDay}
            markNumbers={marksArrays.hoursPerDay}
            onChange={(value) => singleNumberUpdate(value, "hoursPerDay")}
        />
        <p>{text.kilometersPerDay}</p>
        <SliderRow
            range
            min={0}
            max={2000}
            title={text.kilometersPerDay}
            value={inputs.kilometersPerDay}
            markNumbers={marksArrays.kilometersPerDay}
            onChange={(value) => rangeValueUpdate(value, "kilometersPerDay")}
            step={10}
        />
        <SliderRow
            {...settings.deprecationPeriod}
            onChange={(value) => singleNumberUpdate(value, "deprecationPeriod")}
        />
    </div>
}

export default BehaviorSelectSliders;