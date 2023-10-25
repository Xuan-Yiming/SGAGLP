package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations = 2000;
    public GeneticAlgorithmVRP(){
//        ArrayList<Node> orders = new ArrayList<>();
//        ArrayList<Vehicle> vehicles = new ArrayList<>();
//        ArrayList<Node> depots = new ArrayList<>();
//        ArrayList<Node> blocks = new ArrayList<>();
//
//        GAProblem problem = new GAProblem(orders, vehicles, depots, blocks);
        GAProblem problem = new GAProblem();
        population = new Population(problem);

        boolean isFittest = false;
        int i = 0;

        Individual fittest = population.getFittest();

        if (fittest.calculateFitness() != problem.getOrders().size()){
            for (; i < maxGenerations; i++) {
                ArrayList<Individual> parents = GeneticOperators.selection(population);
                parents = GeneticOperators.crossover(parents);
                parents = GeneticOperators.mutation(parents);
                Individual fittestOffspring = GeneticOperators.getFittestOffspring(parents);
                population.replaceLastFittest(fittestOffspring);
                fittest = population.getFittest();
                if (fittest.calculateFitness() == problem.getOrders().size()){
                    isFittest = true;
                    break;
                }
            }
        }else {
            isFittest = true;
        }

        if (isFittest){
            System.out.println("Solution found!");
            System.out.println("Generation: " + i);
            System.out.println("Genes:");
            System.out.println(population.getFittest().getChromosome().genes);
            System.out.println("Fitness: " + population.getFittest().getFitness());
        }else {
            System.out.println("Solution not found!");
        }

    }
    public static void excute(){

    }


}
