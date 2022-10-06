import { useText } from '../../contexts/TextContext';
import Inputs from "../../models/Inputs";
import "./TruckSizeSelect.css"

const sizes: Inputs["truckSize"][] = ['small', 'medium', 'large']


interface Props {
    onUpdate: (truckSize: Inputs["truckSize"]) => void;
    truckSize: Inputs["truckSize"];
}

const TruckSizeSelect = ({ onUpdate, truckSize }: Props) => {
    const text = useText()
    return (
        <div className="truck-size-container">
            {sizes.map((size: Inputs["truckSize"]) => {
                return (
                    <div
                        className={`truck-alternative ${truckSize === size ? "selected" : null}`}
                        onClick={() => onUpdate(size)}
                    ><div>

                            {text.truckSelect[size]}
                        </div>
                    </div>
                )
            })}
        </div >


    );
}

export default TruckSizeSelect;