// Import necessary libraries
import { random } from 'athjs';

// Define the Genetic Algorithm class
class GeneticAlgorithm {
  constructor(populationSize, mutationRate, crossoverRate, generations) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.generations = generations;
    this.population = [];
  }

  // Initialize the population
  initPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      const individual = [];
      for (let j = 0; j < 10; j++) {
        individual.push(random(0, 1) < 0.5? 0 : 1);
      }
      this.population.push(individual);
    }
  }

  // Evaluate the fitness of each individual
  evaluateFitness() {
    this.population.forEach((individual) => {
      const fitness = individual.reduce((acc, gene) => acc + gene, 0);
      individual.fitness = fitness;
    });
  }

  // Select parents for crossover
  selectParents() {
    const parents = [];
    for (let i = 0; i < this.populationSize / 2; i++) {
      const parent1 = this.tournamentSelection();
      const parent2 = this.tournamentSelection();
      parents.push([parent1, parent2]);
    }
    return parents;
  }

  // Perform crossover
  crossover(parents) {
    const offspring = [];
    parents.forEach(([parent1, parent2]) => {
      const crossoverPoint = Math.floor(Math.random() * 10);
      const child1 = [...parent1.slice(0, crossoverPoint),...parent2.slice(crossoverPoint)];
      const child2 = [...parent2.slice(0, crossoverPoint),...parent1.slice(crossoverPoint)];
      offspring.push(child1, child2);
    });
    return offspring;
  }

  // Mutate individuals
  mutate(offspring) {
    offspring.forEach((individual) => {
      for (let i = 0; i < individual.length; i++) {
        if (Math.random() < this.mutationRate) {
          individual[i] = individual[i] === 0? 1 : 0;
        }
      }
    });
  }

  // Replace the least fit individuals with the new offspring
  replaceLeastFit(offspring) {
    this.population.sort((a, b) => a.fitness - b.fitness);
    for (let i = 0; i < offspring.length; i++) {
      this.population[i] = offspring[i];
    }
  }

  // Run the genetic algorithm
  run() {
    this.initPopulation();
    for (let i = 0; i < this.generations; i++) {
      this.evaluateFitness();
      const parents = this.selectParents();
      const offspring = this.crossover(parents);
      this.mutate(offspring);
      this.replaceLeastFit(offspring);
    }
    return this.population;
  }
}

// Example usage
const ga = new GeneticAlgorithm(100, 0.01, 0.5, 100);
const result = ga.run();
console.log(result);
