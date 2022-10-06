import React from 'react'
import TruckSizeSelect from './TruckSizeSelect'
import Inputs from '../models/Inputs';
import BehaviorSelectSliders from './BehaviorSelectSliders';

interface InputProps {
  inputState: Inputs;
  setInputState: (inputs: Inputs) => void;
}

export default function InputsComponent({ inputState, setInputState }: InputProps) {

  return (<div className='center'>
    <TruckSizeSelect onUpdate={(size) => {
      setInputState({ ...inputState, truckSize: size })
    }} truckSize={inputState.truckSize} />
    <BehaviorSelectSliders onUpdate={(newState: Inputs) => { setInputState(newState) }} inputs={inputState} />
  </div>
  )
}
