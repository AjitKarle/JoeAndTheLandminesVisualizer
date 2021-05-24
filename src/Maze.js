import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";      // wrapper for react components.
import Grid from '@material-ui/core/Grid';
import Cell from './Cell';
import joe2 from './joe0.png';
import home from './home.png';
import landmine2 from './landmine5.png';
import { Box, Button, FormHelperText, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';  // standardise the UI on different browsers.
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
  },
   paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function Maze() {
  const classes = useStyles();
  const [showPaths, setShowPaths] = useState(false); 
  //let x = React.createRef();  // React use ref to get input value
  //let y = React.createRef();
  let rows = 4;
  let columns = 4;
  let matrix = Array(rows).fill().map(() => Array(columns).fill(0));
  let limit = 2, count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (count > limit || i === 0 && j === 0 || i === rows-1 && j === columns-1)
        continue;
      let val = Math.floor(Math.random() * 4);
      console.log(val);
      if (val === 1) {
        matrix[i][j] = 1;
        count++;
      }
    }
  }
  let pathsToShow = [];
  let paths = calculatePaths(matrix, 0, 0, rows, columns, pathsToShow);
  console.log(paths);

  let handleClick = (e) => {
      e.preventDefault();
      window.location.reload(false);
      console.log('The link was clicked.');
    } 
    
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper style={{ height: '200px' }} className={classes.paper}>
              <h2 style={{ color: 'black' }}>Problem Statement</h2>
              <h3 style={{ color: 'red' }}>
                Given a path in the form of a rectangular matrix having few landmines arbitrarily placed,
                 Calculate and show the total number of paths Joe can take to reach home without stepping onto landmine.<br></br>
              </h3>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: '200px' }} className={classes.paper}>
              <div>
                <h2 style={{ color: 'black' }}>Redistribute Landmines</h2>
                <h3 style={{ color: 'red' }}>
                  Click this button to randomly distribute landmines accross the grid.
              </h3>
                <form>
                  <br></br>
                  <Button type="submit" variant="contained" color="secondary" onClick={handleClick}> Redistribute Landmines </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: '200px', overflow: 'auto' }} className={classes.paper}>
              <h2 style={{ color: 'black' }}>Possible Paths</h2>
              {possiblePaths(pathsToShow)}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={1} justify="center"  >
        <Box p={8}>
          <Grid style={{ backgroundColor: "#caf0f8" }} container justify="center" >
            <Grid key="0" style={{ backgroundColor: "black" }} container direction="row" spacing={0} item sm={3} >
              {console.log("Initial matrix is: ", matrix)}
              {loadCells(matrix, rows, columns, 0, [])}
            </Grid>
          </Grid>
          <Grid style={{ backgroundColor: "#caf0f0", margin: '5px', font: 'monospace' }} container justify="center">
            <Typography gutterBottom variant="h6">
              Initial Matrix
            </Typography>
          </Grid>
        </Box>
        <Grid style={{ backgroundColor: "yellow", height: "35px", marginTop: "-60px" }} container justify="center">
          <Typography gutterBottom variant="h5">
            Total Paths = {paths.length}
          </Typography>
        </Grid>
        {paths.map((path, index) => {
            return (
              <Grid key={(index + 1).toString()} style={{ backgroundColor: "black", margin: '10px' }} container direction="row" spacing={0} item sm={3}>
                { console.log("matrix at index: ", index + 1, "is: ", matrix)}
                {loadCells(matrix, rows, columns, index + 1, path)}
              </Grid>
            );
        })}
      </Grid>
    </div>
  );
  /*
  function addLandmineForUser(e) {
    e.preventDefault();
    console.log("Matrix inside addLandmineForUser function is: ", matrix);
    matrix[x][y] = 1;
    return;
  }*/
}
  function possiblePaths(pathsToShow)  {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
        <ol>
          {pathsToShow.map((path) => (
            <li style={{ color: 'brown', font: 'caption' }}> {path} </li>
          ))}
        </ol>
      </div>
    );
  }
  function calculatePaths(matrix, i, j, rows, columns, pathsToShow) {
    let pathCount = 0;
    let paths = [];
    let visited = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    calculatePathsUtil(matrix, visited, i, j, rows, columns, [], []);
    return paths;
    function calculatePathsUtil(matrix, visited, i, j, rows, columns, currentpath, currentPathToShow) {
      if (i < 0 || i >= rows || j < 0 || j >= columns) return;
      if (matrix[i][j] === 1 || visited[i][j] === 1) return;
      if (i === rows - 1 && j === columns - 1) {
        pathCount++;
        paths.push([...currentpath]);
        pathsToShow.push([...currentPathToShow]);
        visited[i][j] = 0;
        return;
      }
      visited[i][j] = 1;
      // travel upwards
      currentpath.push([i - 1, j]);
      currentPathToShow.push('U');
      calculatePathsUtil(matrix, visited, i - 1, j, rows, columns, currentpath, currentPathToShow);
      currentPathToShow.pop();
      currentpath.pop();

      // travel downwards
      currentpath.push([i + 1, j]);
      currentPathToShow.push('D');
      calculatePathsUtil(matrix, visited, i + 1, j, rows, columns, currentpath, currentPathToShow);
      currentPathToShow.pop();
      currentpath.pop();
      // travel right
      currentpath.push([i, j + 1]);
      currentPathToShow.push('R');
      calculatePathsUtil(matrix, visited, i, j + 1, rows, columns, currentpath, currentPathToShow);
      currentPathToShow.pop();
      currentpath.pop();
      // travel left
      currentpath.push([i, j - 1]);
      currentPathToShow.push('L');
      calculatePathsUtil(matrix, visited, i, j - 1, rows, columns, currentpath, currentPathToShow);
      currentPathToShow.pop();
      currentpath.pop();

      visited[i][j] = 0;

      return;
    }
  }

  function loadCells(mat, rows, columns, gindex, path) {
    console.log("After coming to loadCells path is: ", path);
    let matrix = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[0].length; j++) {
        matrix[i][j] = mat[i][j];
      }
    }
    path.forEach((cordinate) => {
      console.log(cordinate[0], cordinate[1]);
      matrix[cordinate[0]][cordinate[1]] = 2;
    });

    console.log("Matrix is: ", matrix);

    let cells = [];
    matrix.forEach((rowEle, rindex) => {
      rowEle.forEach((cval, cindex) => {
        if (cval === 1) {
          cells.push(
            <Cell
              key={gindex.toString() + rindex.toString() + cindex.toString()}
              color="#ffccb3"
            >
              <Box height="50px">
                <img style={{ width: "100%", height: "100%" }} alt="complex" src={landmine2} />
              </Box>
            </Cell>
          );
        } else {
          if (rindex === 0 && cindex === 0) {
            cells.push(
              <Cell
                key={gindex.toString() + rindex.toString() + cindex.toString()}
                color="white"
              >
                <Box height="50px">
                  <img style={{ width: "100%", height: "100%" }} alt="complex" src={joe2} />
                </Box>
              </Cell>
            );
          } else if (rindex === rows - 1 && cindex === columns - 1) {
            cells.push(
              <Cell
                key={gindex.toString() + rindex.toString() + cindex.toString()}
                color="white"
              >
                <Box height="50px">
                  <img style={{ width: "100%", height: "100%" }} alt="complex" src={home} />
                </Box>
              </Cell>
            );
          } else if (matrix[rindex][cindex] === 2) {
            cells.push(
              <Cell
                key={gindex.toString() + rindex.toString() + cindex.toString()}
                color="#33FF33"
              >
                <Box height="50px" />
              </Cell>
            );
          } else {
            cells.push(
              <Cell
                key={gindex.toString() + rindex.toString() + cindex.toString()}
                color="#COCOCO"
              >
                <Box height="50px" />
              </Cell>
            );
          }
        }
      });
    });

    return cells;
  }

export default Maze;