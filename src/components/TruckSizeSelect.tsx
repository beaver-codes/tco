import React from 'react';
import { useText } from '../contexts/TextContext';
import Inputs from "../models/Inputs";

const sizes: Inputs["truckSize"][] = ['small', 'medium', 'large']

const ICONS = {
    small: 'bi bi-box',
    medium: 'bi bi-box-fill',
    large: 'bi bi-boxes'
}

interface Props {
    onUpdate: (truckSize: Inputs["truckSize"]) => void;
    truckSize: Inputs["truckSize"];
}

const TruckSizeSelect = ({ onUpdate, truckSize }: Props) => {
    const text = useText()
    return (
        <div className="">
            <div>
                {sizes.map((size: Inputs["truckSize"]) => {
                    return (
                        <React.Fragment key={size}>
                            <input type="radio" className="btn-check" name="btnradio"
                                checked={truckSize === size}
                                onChange={() => onUpdate(size)}
                                id={size} value={size} />
                            <label className="btn btn-outline-left-primary me-2 my-1" htmlFor={size}>
                                {text.truckSelect[size]}  <i className={`ms-2 ${ICONS[size]}`} />
                            </label>
                        </React.Fragment>

                    )
                })}
            </div>
        </div >


    );
}

export default TruckSizeSelect;