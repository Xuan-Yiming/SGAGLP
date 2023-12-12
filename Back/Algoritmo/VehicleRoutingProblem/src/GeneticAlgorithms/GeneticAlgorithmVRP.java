package GeneticAlgorithms;

import GeneticAlgorithms.Extra.CurrentVehicle;
import GeneticAlgorithms.Extra.InputData;
import GeneticAlgorithms.Extra.PendingOrders;
import GeneticAlgorithms.Problem.Solucion;

import java.util.ArrayList;
import java.util.Date;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class GeneticAlgorithmVRP {
    private Population population;
    private int maxGenerations;

    private GAProblem problem = null;

    private Solucion solucion;

    // simulacion
    // Mode = 'S' -> Simulacion
    // Mode = 'P' -> Planificacion
    public GeneticAlgorithmVRP(Date startDate, Date enDate, String _data, char mode, int maxclock)
            throws Exception {

        // Create a Gson object
        Gson gson = new Gson();

        // Define the type of the ArrayList<PendingOrders>
        TypeToken<InputData> typeToken = new TypeToken<InputData>() {
        };

        // Convert the JSON string to ArrayList<PendingOrders>
        InputData data = gson.fromJson(_data, typeToken.getType());

        this.problem = new GAProblem(startDate, enDate, data.vehiculos, data.pedidos, mode);
        this.problem.maxclock = maxclock;
        problem.validate();

        population = new Population(problem);
        maxGenerations = problem.maxGenerations;
        boolean isFittest = false;
        int i = 0;

        Individual fittest = population.getFittest();

        if (fittest.calculateFitness() < problem.getOrders().size()) {
            for (i = 0; i < maxGenerations; i++) {
                GeneticOperators geneticOperators = new GeneticOperators(problem);
                ArrayList<Individual> parents = geneticOperators.selection(population);
                parents = geneticOperators.crossover(parents);
                parents = geneticOperators.mutation(parents);
                Individual fittestOffspring = geneticOperators.getFittestOffspring(parents);
                population.replaceLastFittest(fittestOffspring);
                fittest = population.getFittest();
                double fittestFitness = fittest.calculateFitness();
                if (fittestFitness >= problem.getOrders().size()*problem.acceptRate ) {
                    isFittest = true;
                    break;
                }
                if (i % 1000 == 0) {
                    System.out.println("Generation: " + i);
                    System.out.println("Fitness: " + fittestFitness);
                }
            }
        } else {
            isFittest = true;
        }

        this.solucion = new Solucion(problem, fittest, problem.maxclock);

        if (isFittest) {
            System.out.println("Solution found! Generation: " + i + " - Fitness: " + fittest.getFitness());
            fittest.getChromosome().print();
        } else {
                        fittest.getChromosome().print();

            throw new Exception("Solution not found! Fitness: " + fittest.getFitness());

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
