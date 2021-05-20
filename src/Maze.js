import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";      // wrapper for react components.
import Grid from '@material-ui/core/Grid';
import Cell from './Cell';
import joe2 from './joe2.jpg';
import home from './home.png';
import landmine2 from './landmine5.png';
import { Box, Button, TextField} from '@material-ui/core';
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
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [matrix, setMatrix] = useState("");
  const [paths, setPaths] = useState("");
  const classes = useStyles();
  let rows = 4;
  let columns = 4;
  //let matrix = Array(rows).fill().map(() => Array(columns).fill(0));
  //let list = [[1, 0], [1,2], [2, 0], [2, 2]];
  //addLandmine(list, matrix, 0, 0);
  useEffect(() => {
    let newMatrix = Array(rows).fill().map(() => Array(columns).fill(0));
    newMatrix[1][0] = 1;
    newMatrix[1][2] = 1;
    newMatrix[2][0] = 1;
    newMatrix[2][2] = 1;
    setMatrix(newMatrix);
    let tempPath = calculatePaths(matrix, 0, 0, rows, columns);
    setPaths(tempPath);
    console.log("Inside useEffect", paths);
  }, [matrix]);
  console.log(paths);
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper style={{ height: '300px' }} className={classes.paper}>
              <h2 style={{ color: 'black' }}>Problem Statement</h2>
              <h3 style={{ color: 'red' }}>
                Given a path in the form of a rectangular matrix having few landmines arbitrarily placed,
                 Calculate and show the total number of paths Joe can take to reach home without stepping onto landmine.<br></br>
              </h3>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: '300px' }} className={classes.paper}>
              <div>
                <h2 style={{ color: 'black' }}>Add Landmine</h2>
                <form onSubmit={addLandmineForUser}>
                  <TextField label="X-Coordinate" variant="outlined" value={x} onChange={handleX} />
                  <br></br>
                  <TextField label="Y-Coordinate" variant="outlined" value={y} onChange={handleY} />
                  <br></br><br></br>
                  <Button type="submit" variant="contained" color="secondary"> Add Landmine </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: '300px', overflow: 'auto' }} className={classes.paper}>
              <h2 style={{ color: 'black' }}>Possible paths</h2>
              {possiblePaths(paths)}
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
  function handleX(e) {
    e.preventDefault();
    console.log("Inside handleX");
    setX(e.target.value);
  }
  function handleY(e) {
    e.preventDefault();
    console.log("Inside handleY");
    setY(e.target.value);
  }

  function addLandmineForUser(e) {
    e.preventDefault();
    let tempMatrix = Array(rows).fill().map(() => Array(columns).fill(0));
    tempMatrix[x][y] = 1;
    console.log("Matrix inside addLandmineForUser function is: ", matrix);
    setMatrix(tempMatrix);
    
    return;
  }


  function addLandmine(list, matrix) {
    console.log("Matrix inside addLandmine function is: ", matrix);
    for (let i = 0; i < list.length; i++) {
      matrix[list[i][0]][list[i][1]] = 1;
    }
    return;
  }
  function possiblePaths()  {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
        <ol>
          {paths.map((path) => (
            <li style={{ color: 'brown', font: 'caption' }}> {path} </li>
          ))}
        </ol>
      </div>
    );
  }
  function calculatePaths(matrix, i, j, rows, columns) {
    let pathCount = 0;
    let paths = [];

    let visited = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    calculatePathsUtil(matrix, visited, i, j, rows, columns, []);
    return paths;
    function calculatePathsUtil(matrix, visited, i, j, rows, columns, currentpath) {
      if (i < 0 || i >= rows || j < 0 || j >= columns) return;
      if (matrix[i][j] === 1 || visited[i][j] === 1) return;
      if (i === rows - 1 && j === columns - 1) {
        pathCount++;
        paths.push([...currentpath]);
        visited[i][j] = 0;
        return;
      }
      visited[i][j] = 1;
      // travel upwards
      currentpath.push([i - 1, j]);
      calculatePathsUtil(matrix, visited, i - 1, j, rows, columns, currentpath);
      currentpath.pop();

      // travel downwards
      currentpath.push([i + 1, j]);
      calculatePathsUtil(matrix, visited, i + 1, j, rows, columns, currentpath);
      currentpath.pop();
      // travel right
      currentpath.push([i, j + 1]);
      calculatePathsUtil(matrix, visited, i, j + 1, rows, columns, currentpath);
      currentpath.pop();
      // travel left
      currentpath.push([i, j - 1]);
      calculatePathsUtil(matrix, visited, i, j - 1, rows, columns, currentpath);
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
                  <img style={{ width: "90%" }} alt="complex" src={joe2} />
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
}
export default Maze;

