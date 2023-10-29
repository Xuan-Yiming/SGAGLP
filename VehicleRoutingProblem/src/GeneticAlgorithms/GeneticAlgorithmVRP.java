package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations;

    public GeneticAlgorithmVRP() {
        // ArrayList<Node> orders = new ArrayList<>();
        // ArrayList<Vehicle> vehicles = new ArrayList<>();
        // ArrayList<Node> depots = new ArrayList<>();
        // ArrayList<Node> blocks = new ArrayList<>();
        //
        // GAProblem problem = new GAProblem(orders, vehicles, depots, blocks);
        GAProblem problem = new GAProblem();
        population = new Population(problem);
        maxGenerations = problem.maxGenerations;
        boolean isFittest = false;
        int i = 0;

        Individual fittest = population.getFittest();

        if (fittest.calculateFitness() != problem.getOrders().size()) {
            for (; i < maxGenerations; i++) {
                GeneticOperators geneticOperators = new GeneticOperators(problem);
                ArrayList<Individual> parents = geneticOperators.selection(population);
                parents = geneticOperators.crossover(parents);
                parents = geneticOperators.mutation(parents);
                Individual fittestOffspring = geneticOperators.getFittestOffspring(parents);
                population.replaceLastFittest(fittestOffspring);
                fittest = population.getFittest();
                if (fittest.calculateFitness() == problem.getOrders().size()) {
                    isFittest = true;
                    break;
                }
            }
        } else {
            isFittest = true;
        }

        if (isFittest) {
            System.out.println("Solution found!");
            System.out.println("Generation: " + i);
            System.out.println("Genes:");
            population.getFittest().getChromosome().print();
            System.out.println("Fitness: " + population.getFittest().getFitness());
        } else {
            System.out.println("Solution not found!");
        }

    }

    public static void excute() {

    }

}
