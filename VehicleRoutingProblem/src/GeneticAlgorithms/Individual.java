package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Date;

//una solucion
public class Individual implements Cloneable{
    private Chromosome chromosome;
    private double fitness = 0;
    private GAProblem problem;


    // Constructors
    public Individual(GAProblem problem) {
        this.problem = problem.clone();
        chromosome = new Chromosome(this.problem);
    }

    // Methods
    public double calculateFitness(){
        fitness = chromosome.calculateFitness();
        return fitness;
    }

    @Override
    public Individual clone() {
        try {
            return (Individual) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();  // This should not happen.
        }
    }

    // Getters and Setters
    public Chromosome getChromosome() {
        return chromosome;
    }

    public void setChromosome(Chromosome chromosome) {
        this.chromosome = chromosome;
    }

    public double getFitness() {
        return fitness;
    }

    public void setFitness(double fitness) {
        this.fitness = fitness;
    }
}
