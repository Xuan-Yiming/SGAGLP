package Genetic.MDVRP;

import Genetic.GA.Components.Individual;
import Genetic.GA.Components.Route;
import Genetic.GA.Metrics;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/*
Data wrapper class to represent a solution to the problem
 */
public class Solution {
    private final List<CrowdedDepot> depots;
    private final Individual individual;
    private final Map<Integer, List<Integer>> routesDemand;
    private final Map<Integer, List<Double>> routesDistance;


    public Solution(List<CrowdedDepot> depots, Individual individual, Metrics metrics) {
        this.depots = depots;
        this.individual = individual;

        Map<Integer, List<Integer>> routesDemand = new HashMap<>();
        Map<Integer, List<Double>> routesDistance = new HashMap<>();

        for (Map.Entry<Integer, List<Route>> entry : individual.getChromosome().entrySet()) {
            int depotID = entry.getKey();
            routesDemand.put(depotID, new ArrayList<>());
            routesDistance.put(depotID, new ArrayList<>());
            List<Route> chromosomeDepot = entry.getValue();
            for (Route route : chromosomeDepot) {
                int routeDemand = metrics.getRouteDemand(route.getRoute());
                double routeDistance = metrics.getRouteDistance(depotID, route.getRoute());

                routesDemand.get(depotID).add(routeDemand);
                routesDistance.get(depotID).add(routeDistance);
            }
        }
        this.routesDemand = routesDemand;
        this.routesDistance = routesDistance;
    }

    // Getters
    public Individual getIndividual() {
        return individual;
    }

    public List<CrowdedDepot> getDepots() {
        return depots;
    }

    public Map<Integer, List<Integer>> getRoutesDemand() {
        return routesDemand;
    }

    public Map<Integer, List<Double>> getRoutesDistance() {
        return routesDistance;
    }
}
