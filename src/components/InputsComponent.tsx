import React, { useState } from 'react'
import TruckSizeSelect from './TruckSizeSelect'
import Inputs from '../models/Inputs';

export default function InputsComponent() {
  const [truckSize, setTruckSize] = useState<Inputs["truckSize"]>('small')

  return (<div>
    <div>Inputs</div>
    <TruckSizeSelect onUpdate={(size) => {
      console.log(size);
      setTruckSize(size);
    }} />
    <div>Selected: {truckSize}</div>
  </div>
  )
}
