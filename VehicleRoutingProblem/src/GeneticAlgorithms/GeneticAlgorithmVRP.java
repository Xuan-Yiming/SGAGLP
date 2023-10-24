package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class GeneticAlgorithmVRP {
    private Population population;
    private int iterations = 100;
    public GeneticAlgorithmVRP(){
        ArrayList<Node> orders = new ArrayList<>();
        ArrayList<Vehicle> vehicles = new ArrayList<>();
        ArrayList<Node> depots = new ArrayList<>();
        ArrayList<Node> blocks = new ArrayList<>();

        GAProblem problem = new GAProblem(orders, vehicles, depots, blocks);

        population = new Population(problem);

        Individual fittest = population.getFittest();

        for (int i = 0; i < iterations; i++) {
            ArrayList<Individual> parents = GeneticOperators.selection(population);
            parents = GeneticOperators.crossover(parents);
            population = GeneticOperators.mutation(population);
            if (population.getFittest().calculateFitness() < fittest.calculateFitness()){
                fittest = population.getFittest();
            }
        }

    }
    public static void excute(){

    }


}
