// Import necessary libraries
import { createCanvas } from 'canvasjs';

// Define the Fractal class
class Fractal {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
  }

  // Draw the Mandelbrot fractal
  mandelbrot() {
    const xMin = -2;
    const xMax = 1;
    const yMin = -1.5;
    const yMax = 1.5;
    const scaleX = this.width / (xMax - xMin);
    const scaleY = this.height / (yMax - yMin);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const real = xMin + x * scaleX;
        const imag = yMin + y * scaleY;
        let zReal = real;
        let zImag = imag;
        let i = 0;
        while (zReal * zReal + zImag * zImag < 4 && i < 100) {
          const temp = zReal * zReal - zImag * zImag + real;
          zImag = 2 * zReal * zImag + imag;
          zReal = temp;
          i++;
        }
        const color = i === 100? 'black' : `rgb(${255 - i * 2}, ${i * 2}, ${i * 2})`;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Example usage
const canvas = createCanvas(800, 800);
const fractal = new Fractal(canvas, 800, 800);
fractal.mandelbrot();
