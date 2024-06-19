// Import necessary libraries
import { createCanvas } from 'canvasjs';

// Define the Cellular Automaton class
class CellularAutomaton {
  constructor(canvas, width, height, rule) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.rule = rule;
    this.ctx = canvas.getContext('2d');
    this.grid = this.initializeGrid();
  }

  // Initialize the grid
  initializeGrid() {
    const grid = [];
    for (let x = 0; x < this.width; x++) {
      const row = [];
      for (let y = 0; y < this.height; y++) {
        row.push(Math.random() < 0.5? 1 : 0);
      }
      grid.push(row);
    }
    return grid;
  }

  // Apply the cellular automaton rule
  applyRule() {
    const newGrid = [];
    for (let x = 0; x < this.width; x++) {
      const row = [];
      for (let y = 0; y < this.height; y++) {
        const neighbors = this.countNeighbors(x, y);
        const index = this.binaryToDecimal(neighbors);
        row.push(this.rule[index] === 1? 1 : 0);
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }

  // Count the number of neighbors
  countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = (x + i + this.width) % this.width;
        const newY = (y + j + this.height) % this.height;
        count += this.grid[newX][newY];
      }
    }
    return count;
  }

  // Convert binary string to decimal
  binaryToDecimal(binary) {
    return parseInt(binary, 2);
  }

  // Draw the grid
  drawGrid() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const color = this.grid[x][y] === 1? 'black' : 'white';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // Run the cellular automaton
run() {
    for (let i = 0; i < 100; i++) {
      this.applyRule();
      this.drawGrid();
    }
  }
}

// Example usage
const canvas = createCanvas(800, 800);
const rule = [0, 1, 1, 1, 0, 1, 1, 0]; // Rule 110
const ca = new CellularAutomaton(canvas, 800, 800, rule);
ca.run();
