import React from 'react';
import './App.scss';
import InputsComponent from './components/InputsComponent';
import OutputComponent from './components/OutputComponent';
// import Inputs from './models/Inputs';

function App() {
  // const [inputs, setInputs] = React.useState<Inputs>({} as any);

  return (
    <div className='container'>
      <h1>Total Cost of Ownership</h1>
      <p>Great thinkgs to come!</p>

      <InputsComponent />
      <OutputComponent />
    </div>
  );
}

export default App;
