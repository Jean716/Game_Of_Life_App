export const createEmptyGrid = (rows = 32, cols = 24) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid.push(Array(cols).fill(false));
    }
    return grid;
  };
  
  export const initializeWorld = (grid, pattern) => {
    const patterns = {
      'Glider': [
        [1, 0], [2, 1], [0, 2], [1, 2], [2, 2]
      ],
      'Lightweight Spaceship': [
        [1, 0], [2, 0], [3, 0], [4, 0],
        [0, 1], [4, 1],
        [4, 2],
        [0, 3], [3, 3]
      ],
      'Beacon': [
        [0, 0], [1, 0], [0, 1], [1, 1], [2, 2], [3, 2], [2, 3], [3, 3]
      ],
      'Pulsar': [
        [4, 2], [5, 2], [6, 2], [10, 2], [11, 2], [12, 2],
        [2, 4], [7, 4], [9, 4], [14, 4],
        [2, 5], [7, 5], [9, 5], [14, 5],
        [2, 6], [7, 6], [9, 6], [14, 6],
        [4, 7], [5, 7], [6, 7], [10, 7], [11, 7], [12, 7],
        [4, 9], [5, 9], [6, 9], [10, 9], [11, 9], [12, 9],
        [2, 10], [7, 10], [9, 10], [14, 10],
        [2, 11], [7, 11], [9, 11], [14, 11],
        [2, 12], [7, 12], [9, 12], [14, 12],
        [4, 14], [5, 14], [6, 14], [10, 14], [11, 14], [12, 14]
      ],
      'Toad': [
        [1, 1], [2, 1], [3, 1], [2, 0], [3, 0], [4, 0]
      ],
      'Funny': [
        (1, 0), (2, 1), (0, 2), (1, 2), (2, 2),
        (10, 10), (11, 10), (12, 10), (13, 10),
        (10, 11), (13, 11),
        (13, 12), 
        (10, 13), (12, 13),
        (20, 5), (21, 5), (22, 5),
        (15, 20), (16, 20), (17, 20),
        (14, 21), (15, 21), (16, 21)
      ]
    };
  
    const initialCells = patterns[pattern] || [];
    initialCells.forEach(([x, y]) => {
      if (x < grid.length && y < grid[0].length) {
        grid[y][x] = true;
      }
    });
  
    return grid;
  };
  
  export const nextGeneration = (grid) => {
    const nextGrid = grid.map(arr => [...arr]);
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
      [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
  
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        let liveNeighbors = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[row].length) {
            if (grid[newRow][newCol]) liveNeighbors++;
          }
        });
  
        if (grid[row][col] && (liveNeighbors < 2 || liveNeighbors > 3)) {
          nextGrid[row][col] = false;
        } else if (!grid[row][col] && liveNeighbors === 3) {
          nextGrid[row][col] = true;
        }
      }
    }
  
    return nextGrid;
  };