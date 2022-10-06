import React from 'react';
import './App.scss';
import InputsComponent from './components/InputsComponent';
import OutputComponent from './components/OutputComponent';
import { useText } from './contexts/TextContext';
import Inputs from './models/Inputs';

function App() {
  const [inputs, setInputs] = React.useState<Inputs>({
    truckSize: 'small',
    depreciation: 6,
    daysPerWeek: 5,
    distancePerDay: [40, 500],
    hoursPerDay: 8
  });
  const text = useText();

  return (
    <div className='container'>
      <h1>{text.header}</h1>
      <p>{text.mainDescription}</p>

      <InputsComponent inputState={inputs} setInputState={setInputs} />
      <OutputComponent />
    </div>
  );
}

export default App;
