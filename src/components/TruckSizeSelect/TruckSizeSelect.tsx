import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import Inputs from "../../models/Inputs";
import "./TruckSizeSelect.css"

const sizes: [Inputs["truckSize"], Inputs["truckSize"], Inputs["truckSize"]] = ['small', 'medium', 'large']

interface Props {
    onUpdate: (truckSize: Inputs["truckSize"]) => void;
    truckSize: Inputs["truckSize"];
}

const TruckSizeSelect = ({ onUpdate, truckSize }: Props) => {

    return (
        <div className="truck-size-container">
            {sizes.map((size: Inputs["truckSize"]) => {
                return (
                    <div
                        className={`truck-alternative ${truckSize === size ? "selected" : null}`}
                        onClick={() => onUpdate(size)}
                    ><div>

                            {size} Truck
                        </div>
                    </div>
                )
            })}
        </div >


    );
}

export default TruckSizeSelect;