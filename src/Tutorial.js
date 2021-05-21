import { Box} from '@material-ui/core';
import Backtracking from './Backtracking.png'

function Tutorial() {

        return (
            <div>
                <h1>Introduction</h1>
                <p>Backtracking is an algorithmic-technique for solving problems recursively<br></br>
             by trying to build a solution incrementally, one piece at a time, removing those<br></br>
              solutions that fail to satisfy the constraints of the problem at any point of time <br></br>
              (by time, here, is referred to the time elapsed till reaching any level of the search tree). </p>
                <h1>Definition</h1>
                <p>
                    Backtracking can be defined as a general algorithmic technique that considers searching<br></br>
                    every possible combination in order to solve a computational problem.
                </p>
                <h1>Pictorial Representation</h1>
                 <Box height="200px" width="400px" marginLeft="80px">
                <img style={{ width: "100%", height: "100%" }} alt="complex" src={Backtracking} />
              </Box>
            </div>
        )

}

export default Tutorial;