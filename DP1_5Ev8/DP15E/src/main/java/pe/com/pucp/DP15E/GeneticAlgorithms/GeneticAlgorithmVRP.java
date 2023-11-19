package pe.com.pucp.DP15E.GeneticAlgorithms;

import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Solucion;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations;

    private GAProblem problem = null;

    private Solucion solucion;

    // Test
    public GeneticAlgorithmVRP(char mode) throws Exception {
        if (this.problem == null) {
            this.problem = new GAProblem();
        }

        problem.validate();

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
        } else {
            this.solucion = new Solucion(problem, fittest);
        }

    }

    // Simulation
    public GeneticAlgorithmVRP(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks, Date date)
            throws Exception {

        this.solucion = new Solucion();

        ArrayList<Node> depots = new ArrayList<>();
        depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        depots.add(new Node(2, 42, 42, 160.0));
        depots.add(new Node(3, 63, 3, 160.0));

        this.problem = new GAProblem(orders, vehicles, depots, blocks, date);

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
        if (!isFittest) {
            throw new Exception("Solution not found!");
        }

    }

    // planificacion
    public GeneticAlgorithmVRP(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks,
            Solucion solucion, int clock) throws Exception {

        ArrayList<Node> depots = new ArrayList<>();
        depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        depots.add(new Node(2, 42, 42, 160.0));
        depots.add(new Node(3, 63, 3, 160.0));

       // this.problem = new GAProblem(orders, vehicles, depots, blocks, solucion, clock);

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

        if (!isFittest) {
            throw new Exception("Solution not found!");
        }
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
