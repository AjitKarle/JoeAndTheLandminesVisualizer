import './App.css';
import Maze from './Maze';
import React, { useState } from 'react';
import ModalInFunctionalComponent from './Modal';
import { Box } from '@material-ui/core';

function App() {
  return (
    <div>
      <Box style={{ border: "10px solid blue" }}>
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
      </Box>
    </div>
  );
}

export default App;