package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class Individual {
    private Chromosome chromosome;
    private double fitness = 0;

    public Individual(GAProblem problem){
        chromosome = new Chromosome(problem);
    }

    public void calculateFitness(){
        for (ArrayList<Gene> genes: chromosome.genes) {
            for (Gene gene: genes){

            }
        }
    }

}
