import React from 'react'
import TruckSizeSelect from './TruckSizeSelect'
import Inputs from '../models/Inputs';

interface InputProps {
  inputState: Inputs;
  setInputState: (inputs: Inputs) => void;
}

export default function InputsComponent({ inputState, setInputState }: InputProps) {

  return (<div className=''>
    <TruckSizeSelect onUpdate={(size) => {
      setInputState({ ...inputState, truckSize: size })
    }} truckSize={inputState.truckSize} />
    {/* <BehaviorSelectSliders onUpdate={setInputState} inputs={inputState} /> */}
  </div>
  )
}
