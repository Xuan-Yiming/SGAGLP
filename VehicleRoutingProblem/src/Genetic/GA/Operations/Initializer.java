package Genetic.GA.Operations;

import Genetic.GA.Components.Individual;
import Genetic.GA.Components.Route;
import Genetic.GA.Metrics;
import Genetic.MDVRP.CrowdedDepot;
import Genetic.MDVRP.RouteScheduler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
Population initializer
 */
public class Initializer {
    public static List<Individual> init(Integer populationSize, List<CrowdedDepot> depots, Metrics metrics) {
        /*
        Returns a list of new individuals. Each individual chromosome is initialized with depots
        containing the appropriate customers according to depots (initial assignments), but the routes
        within each depot is generated randomly with a bias towards feasibility.
         */

        List<Individual> population = new ArrayList<>();

        for (int i = 0; i < populationSize; i++) {
            Map<Integer, List<Route>> chromosome = new HashMap<>();

            for (CrowdedDepot depot : depots) {
                List<Route> chromosomeDepot = RouteScheduler.getInitialRoutes(depot, metrics);
                chromosome.put(depot.getId(), chromosomeDepot);
            }

            Individual individual = new Individual(chromosome);
            population.add(individual);
        }
        return population;
    }
}
