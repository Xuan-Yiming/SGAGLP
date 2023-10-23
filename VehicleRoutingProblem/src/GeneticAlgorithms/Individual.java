package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Date;

public class Individual {
    private Chromosome chromosome;
    private double fitness = 0;

    // Constructors
    public Individual(GAProblem problem) {
        chromosome = new Chromosome(problem);
    }
    // Methods
    public void calculateFitness(){
        for (ArrayList<Gene> genes: chromosome.genes) {
            for (Gene gene: genes){

            }
        }
    }


}
