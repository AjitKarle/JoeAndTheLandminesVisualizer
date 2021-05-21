import './App.css';
import Maze from './Maze';
import React, { useState } from 'react';
import ModalInFunctionalComponent from './Modal';

function App() {
  return (
    <div>
      <div>
      <h1 className='heading'>Joe and the Landmines Visualizer</h1>
      </div>
        <div>
          <ModalInFunctionalComponent></ModalInFunctionalComponent>
      </div>
      <br></br><br></br><br></br>
      <div className='maze'>
        <Maze/>
      </div>
    </div>
  );
}

export default App;