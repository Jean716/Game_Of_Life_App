import { useState, useEffect, useRef } from "react";
import Grid from './components/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStepForward, faStepBackward, faEraser, faPause } from '@fortawesome/free-solid-svg-icons';
import { createEmptyGrid, initializeWorld, nextGeneration } from './gameLogic';
import "./App.css";

function App() {
  const [grid, setGrid] = useState(createEmptyGrid(32, 24)); // create 32x24 empty grid
  const [selectedPattern, setSelectedPattern] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([createEmptyGrid(32, 24)]); // add history state
  const intervalRef = useRef(null);

  const toggleCell = (row, col) => {
    console.log("Toggling cell:", row, col); //add log output
    const newGrid = grid.slice();
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const handleChoosePattern = (pattern) => {
    console.log("Selected pattern:", pattern); // add log output

    const newGrid = initializeWorld(createEmptyGrid(32, 24), pattern);
    setGrid(newGrid);
    setSelectedPattern(pattern);
    setHistory([newGrid]);
  };

  const handleStepBackward = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setGrid(newHistory[newHistory.length - 1]);
    }
  };

  const handleRunPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setGrid(prevGrid => {
          const nextGrid = nextGeneration(prevGrid);
          setHistory(prevHistory => [...prevHistory, nextGrid]);
          return nextGrid;
        });
      }, 500);
    }
    setIsRunning(!isRunning);
  };

  const handleStepForward = () => {
    const nextGrid = nextGeneration(grid);
    setGrid(nextGrid);
    setHistory([...history, nextGrid]);
  };

  const handleReset = () => {
    const newGrid = createEmptyGrid(32, 24);
    setGrid(newGrid);
    setHistory([newGrid]);
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Conway's Game of Life</h1>

      <div className="grid-container">
        <Grid grid={grid} toggleCell={toggleCell} />

        <select className="pattern-select" onChange={(e) => handleChoosePattern(e.target.value)}>
          <option value="">Choose Pattern</option>
          <option value="Glider">Glider</option>
          <option value="Lightweight Spaceship">Lightweight Spaceship</option>
          <option value="Beacon">Beacon</option>
          <option value="Pulsar">Pulsar</option>
          <option value="Toad">Toad</option>
          <option value="Funny">Funny</option>
        </select>
      </div>

      <div className="button-group">
        <button onClick={handleStepBackward}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button onClick={handleRunPause}>
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
        </button>
        <button onClick={handleStepForward}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
        <button onClick={handleReset}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
    </div>
  );
}

export default App;