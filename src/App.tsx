import React from 'react';
import './App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
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

  return (<>
    <div className='row m-0 h-100'>
      <div className='col-12 col-lg-4 left-section'>
        <div className='container'>

          <h1 className=''>Total Cost of <span className='bold'>OWNERSHIP</span></h1>

          <p className='mb-5'>{text.mainDescription}</p>
          <InputsComponent inputState={inputs} setInputState={setInputs} />
        </div>
      </div>

      <div className='col-12 col-lg-8 center'>
        <div className='w-100'>

          <OutputComponent inputs={inputs} />
        </div>

      </div>
    </div>
  </>
  );
}

export default App;
