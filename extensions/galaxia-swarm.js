// Import necessary libraries
import { random } from 'athjs';

// Define the Particle Swarm Optimization class
class ParticleSwarmOptimization {
  constructor(populationSize, iterations, w, c1, c2) {
    this.populationSize = populationSize;
    this.iterations = iterations;
    this.w = w;
    this.c1 = c1;
    this.c2 = c2;
    this.population = [];
  }

  // Initialize the population
  initPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      const particle = {
        position: [],
        velocity: [],
        bestPosition: [],
        bestFitness: Infinity,
      };
      for (let j = 0; j < 10; j++) {
        particle.position.push(random(-10, 10));
        particle.velocity.push(random(-1, 1));
      }
      this.population.push(particle);
    }
  }

  // Evaluate the fitness of each particle
  evaluateFitness() {
    this.population.forEach((particle) => {
      const fitness = particle.position.reduce((acc, x) => acc + x ** 2, 0);
      if (fitness < particle.bestFitness) {
        particle.bestFitness = fitness;
        particle.bestPosition = [...particle.position];
      }
    });
  }

  // Update the velocity and position of each particle
  updateParticles() {
    this.population.forEach((particle) => {
      for (let i = 0; i < particle.position.length; i++) {
const r1 = random(0, 1);
        const r2 = random(0, 1);
        const pBest = particle.bestPosition[i];
        const gBest = this.population.reduce((acc, p) => (p.bestFitness < acc.bestFitness? p : acc)).bestPosition[i];
        const newVelocity = this.w * particle.velocity[i] + this.c1 * r1 * (pBest - particle.position[i]) + this.c2 * r2 * (gBest - particle.position[i]);
        particle.velocity[i] = newVelocity;
        particle.position[i] += newVelocity;
      }
    });
  }

  // Run the particle swarm optimization
  run() {
    this.initPopulation();
    for (let i = 0; i < this.iterations; i++) {
      this.evaluateFitness();
      this.updateParticles();
    }
    return this.population;
  }
}

// Example usage
const pso = new ParticleSwarmOptimization(100, 100, 0.8, 2, 2);
const result = pso.run();
console.log(result);
