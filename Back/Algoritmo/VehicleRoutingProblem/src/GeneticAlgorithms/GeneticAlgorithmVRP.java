package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Solucion;
import GeneticAlgorithms.Problem.Vehicle;

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

    // Simulation
    public GeneticAlgorithmVRP(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks)
            throws Exception {

        this.solucion = new Solucion();

        ArrayList<Date> dates = new ArrayList<>();

        // get all the different dates in the orders only considering the date not the
        // time
        for (Node order : orders) {
            boolean isDifferent = true;
            for (Date date : dates) {
                Calendar orderCal = Calendar.getInstance();
                orderCal.setTime(order.getFechaInicio());
                Calendar dateCal = Calendar.getInstance();
                dateCal.setTime(date);
                if (dateCal.get(Calendar.DATE) == orderCal.get(Calendar.DATE)
                        && dateCal.get(Calendar.MONTH) == orderCal.get(Calendar.MONTH)
                        && dateCal.get(Calendar.YEAR) == orderCal.get(Calendar.YEAR)) {
                    isDifferent = false;
                    break;
                }
            }
            if (isDifferent) {
                dates.add(order.getFechaInicio());
            }
        }

        for (Date date : dates) {

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

            this.solucion.addSolucion(new Solucion(problem, fittest));

            if (!isFittest) {
                throw new Exception("Solution not found!");
            }

        }

    }

    // Pacification
    public GeneticAlgorithmVRP(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks,
            Solucion solucion, int clock) throws Exception {

        ArrayList<Node> depots = new ArrayList<>();
        depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        depots.add(new Node(2, 42, 42, 160.0));
        depots.add(new Node(3, 63, 3, 160.0));

        this.problem = new GAProblem(orders, vehicles, depots, blocks, solucion, clock);

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
