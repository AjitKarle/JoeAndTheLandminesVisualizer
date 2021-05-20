import './App.css';
import Maze from './Maze';

function App() {
  return (
    <div>
      <h1 className='heading'>Joe and the Landmines Visualizer</h1>
      <br></br><br></br><br></br>
      <div className='maze'>
        <Maze/>
      </div>
    </div>
  );
}

export default App;

{/* <form onSubmit="addLandmineForUser(list, matrix);">
                   <TextField id="outlined-basic" label="X-Coordinate" variant="outlined" value="x"/>
                   <br></br>
                   <TextField id="outlined-basic" label="Y-Coordinate" variant="outlined" value="y"/>
                     <br></br><br></br>
                     <Button variant="contained" color="secondary"> Add Landmine </Button>
                   </form> */ }