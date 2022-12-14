import React from 'react';
import './App.scss';
import InputsComponent from './components/InputsComponent';
import OutputComponent from './components/OutputComponent';
import { useText } from './contexts/TextContext';
import Inputs from './models/Inputs';

function App() {
  const [inputs, setInputs] = React.useState<Inputs>({
    truckSize: 'small',
    depreciationPeriod: 6,
    daysPerWeek: 5,
    kilometersPerDay: [40, 500],
    hoursPerDay: 8
  });
  const text = useText();

  return (
    <div className='container'>
      <h1>{text.header}</h1>
      <p className='mb-5'>{text.mainDescription}</p>

      <InputsComponent inputState={inputs} setInputState={setInputs} />
      <hr className='mt-5 mb-5' />
      <OutputComponent inputs={inputs} />
    </div>
  );
}

export default App;
