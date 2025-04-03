// Grid.jsx
import React from 'react';
import './Grid.css';


const Grid = ({ grid, toggleCell }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            className={`cell ${cell ? 'alive' : ''}`}
            key={`${rowIndex}-${colIndex}`}
            style={{
              gridColumn: rowIndex + 1,
              gridRow: colIndex + 1
            }}
            onClick={() => toggleCell(rowIndex, colIndex)}
          ></div>
        ))
      ))}
    </div>
  );
};

export default Grid;