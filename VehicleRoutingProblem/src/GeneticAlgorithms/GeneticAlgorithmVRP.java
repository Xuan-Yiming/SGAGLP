package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Solucion;

import java.util.ArrayList;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations;

    private GAProblem problem = null;

    private Solucion solucion;

    public GeneticAlgorithmVRP(char mode) {
        if (this.problem == null) {
            this.problem = new GAProblem();
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

        if (mode == 'T') {
            if (isFittest) {
                System.out.println("Solution found!");
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
        }

        if (mode == 'R') {
            this.solucion = new Solucion(problem, fittest);
        }

    }
    
    public GeneticAlgorithmVRP(double mutationRate, int populationSize, int maxGenerations, double depotRate) {
        if (this.problem == null) {
            this.problem = new GAProblem();
        }
        this.problem.mutationRate = mutationRate;
        this.problem.populationSize = populationSize;
        this.problem.maxGenerations = maxGenerations;
        this.problem.depotRate = depotRate;

        
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
                System.out.println("Mutation rate: " + problem.mutationRate);
                System.out.println("Population size: " + problem.populationSize);
                System.out.println("Depot generate rate: " + problem.depotRate);
                System.out.println("Generation: " + i);
                fittest.getChromosome().print();
                System.out.println("Fitness: " + population.getFittest().getFitness());
            } else {
                System.out.println("Solution not found!");
                System.out.println("Mutation rate: " + problem.mutationRate);
                System.out.println("Population size: " + problem.populationSize);
                System.out.println("Depot generate rate: " + problem.depotRate);
                System.out.println("Max generation: " + problem.maxGenerations);
                System.out.println("*****************************************************************************");
            }
        


    }

    public void setProblem(GAProblem problem) {
        this.problem = problem;
    }
    public Solucion getSolucion(){
        return this.solucion;
    }

    public static void excute() {

    }

}
