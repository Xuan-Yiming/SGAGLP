package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Date;

//una solucion
public class Individual {
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


}
