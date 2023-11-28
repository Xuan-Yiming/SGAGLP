package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Solucion;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Calendar;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations;

    private GAProblem problem = null;

    private Solucion solucion;
    private boolean findSolution = false;

    // Test
    public GeneticAlgorithmVRP(char mode){
        if (this.problem == null) {
            this.problem = new GAProblem();
        }

        try {
            problem.validate();

        } catch (Exception e) {
            e.printStackTrace();
        }

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

        // add the first depot to the beginning and end of each route

        for (int j = 0; j < fittest.getChromosome().genes.size(); j++) {
            fittest.getChromosome().genes.get(j).getRoute().add(0, problem.getDepots().get(0));
            fittest.getChromosome().genes.get(j).getRoute().add(problem.getDepots().get(0));
        }

        this.findSolution = isFittest;

        if(!isFittest) {
            System.out.println("Solution not found!");
            // print the fitness
            System.out.println("Fitness: " + fittest.getFitness());
            
        } else {
            System.out.println("Solution found!");
        }

        if (mode == 'T') {
            if (isFittest) {
                System.out.println("Generation: " + i);
                fittest.getChromosome().print();
                System.out.println("Fitness: " + population.getFittest().getFitness());
            } else {
                System.out.println("Solution not found!");
                System.out.println("Solution found!");
                System.out.println("Generation: " + i);
                fittest.getChromosome().print();
                System.out.println("Fitness: " + population.getFittest().getFitness());

            }
        } else {
            try{
                this.solucion = new Solucion(problem, fittest);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

    // Real
    public GeneticAlgorithmVRP(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks) throws Exception {

        this.problem = new GAProblem(orders, vehicles, blocks);

        this.problem.validate();

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

        for (int j = 0; j < fittest.getChromosome().genes.size(); j++) {
            fittest.getChromosome().genes.get(j).getRoute().add(0, problem.getDepots().get(0));
            fittest.getChromosome().genes.get(j).getRoute().add(problem.getDepots().get(0));
        }

        this.solucion = new Solucion(problem, fittest);

        // if (!isFittest) {
        //     throw new Exception("Solution not found!");
        // }
    }

    public void setProblem(GAProblem problem) {
        this.problem = problem;
    }

    public Solucion getSolucion() {
        return this.solucion;
    }

    public static void excute() {

    }

}
