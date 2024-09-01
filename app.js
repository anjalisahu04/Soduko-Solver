const grid = [
    [5 , 3 , ".", ".", 7, ".", ".", ".", "."],
    [6 , ".", ".", 1, 9, 5, ".", ".",  "."],
    [".", ".", 8, ".", ".", ".", ".", 6, "."],
    [8, ".", ".", ".", 6, ".", ".", ".", 3],
    [4, ".", ".", 8, ".", 3, ".", ".", 1],
    [7, ".", ".", ".", 2, ".", ".", ".", 6],
    [".", 6, ".", ".", ".", ".", 2, 8, "."],
    [".", ".", ".", 4, 1, 9, ".", ".", 5],
    ["." , ".", ".", ".", 8, ".", ".", 7, 9]
  ];
  
  function solveSudoku() {
    const result = solve(0, 0);
    if (result) {
      updateGrid();
    } else {
      alert("No solution exists!");
    }
  }
  
  function solve(row, col) {
    if (row === 9) {
      return true; // Sudoku solved
    }
  
    if (col === 9) {
      return solve(row + 1, 0); // Move to the next row
    }
  
    if (grid[row][col] !== ".") {
      return solve(row, col + 1); // Cell already filled, move to the next cell
    }
  
    for (let num = 1; num <= 9; num++) {
      if (isValid(row, col, num)) {
        grid[row][col] = num;
  
        if (solve(row, col + 1)) {
          return true;
        }
  
        grid[row][col] = "."; // Backtrack
      }
    }
  
    return false; // No valid number found, need to backtrack
  }
  
  function isValid(row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }
  
    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function updateGrid() {
    const sudokuGrid = document.getElementById("sudoku-grid");
    sudokuGrid.innerHTML = "";
  
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = grid[row][col];
        sudokuGrid.appendChild(cell);
      }
    }
  }
  
  document.getElementById("solve-btn").addEventListener("click", solveSudoku);
  updateGrid();
  
