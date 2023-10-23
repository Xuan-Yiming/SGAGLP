package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class Population {
    private int populationSize;
    private ArrayList<Individual> individuals ;
    public Population(GAProblem problem){
        individuals = new ArrayList<>();
        for (int i = 0; i < populationSize; i++) {
            individuals.add(new Individual(problem));
        }
    }
}
