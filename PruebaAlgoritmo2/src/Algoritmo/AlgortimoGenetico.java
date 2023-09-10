package Algoritmo;

import Clases.Mapa;
import Clases.Pedido;
import Clases.Route;
import Clases.Vehiculo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class AlgortimoGenetico {

    private static final int POPULATION_SIZE = 1000;
    private static final double MUTATION_RATE = 0.01;
    private static final int NUM_GENERATIONS = 1000;

    private static Random random = new Random();

    public static void main(String[] args) {

        for(int i=0;i<20;i++){

        }
        correrAlgoritmo();

    }

    private  static void correrAlgoritmo(){
        Mapa mapa = new Mapa(40,20);

        llenarMapa(mapa);
        Vehiculo vehiculo =mapa.getVehiculo(0);
        Pedido pedTrans = new Pedido(vehiculo.getX(),vehiculo.getY());

        List<Pedido> deliveryPoints = new ArrayList<>();
        // Populate your list of delivery points here.
        deliveryPoints = mapa.getPedidos();

        List<Route> population = generateInitialPopulation(deliveryPoints,pedTrans);

        for (int generation = 0; generation < NUM_GENERATIONS; generation++) {
            population = evolvePopulation(population);
        }

        mapa.printMap();
        // At this point, the best route can be found in the 'population' list.
        Route bestRoute = Collections.min(population, (r1, r2) -> Double.compare(r1.fitness, r2.fitness));
        System.out.println("Best Route: " + bestRoute.points);
        //System.out.println("Fitness: " + bestRoute.fitness);
    }

    private static List<Route> generateInitialPopulation(List<Pedido> pedidos,Pedido depot) {
        List<Route> population = new ArrayList<>();
        List<Pedido> remainingPedidos = new ArrayList<>(pedidos);

        while (!remainingPedidos.isEmpty()) {
            Collections.shuffle(remainingPedidos);
            // Add the depot at the beginning and end of the route
            List<Pedido> routePoints = new ArrayList<>(remainingPedidos);
            routePoints.add(0, depot);
            //routePoints.add(depot);
            population.add(new Route(routePoints));
            remainingPedidos.clear();
        }

        return population;
    }

    private static List<Route> evolvePopulation(List<Route> population) {
        int populationSize = population.size();
        List<Route> newPopulation = new ArrayList<>(populationSize);

        // Keep the best route from the current population
        Route bestRoute = Collections.min(population, (r1, r2) -> Double.compare(r1.fitness, r2.fitness));
        newPopulation.add(bestRoute);

        // Perform selection, crossover, and mutation to create the next generation
        while (newPopulation.size() < populationSize) {
            Route parent1 = selectRoute(population);
            Route parent2 = selectRoute(population);

            Route child = crossover(parent1, parent2,populationSize);
            mutate(child);

            newPopulation.add(child);
        }

        return newPopulation;
    }

    private static Route selectRoute(List<Route> population) {
        // Implement a selection mechanism here (e.g., roulette wheel selection, tournament selection, etc.)
        // Select a route based on its fitness.
        // The higher the fitness, the more likely it is to be selected.
        // Return the selected route.
        // You can also experiment with different selection strategies.

        double totalFitness = 0.0;
        for (Route route : population) {
            totalFitness += route.fitness;
        }

        double randomValue = random.nextDouble() * totalFitness;
        double currentSum = 0.0;

        for (Route route : population) {
            currentSum += route.fitness;
            if (currentSum >= randomValue) {
                // Select this route
                return route;
            }
        }

        // In case of rare rounding errors, return the last route
        return population.get(population.size() - 1);
    }

    private static Route crossover(Route parent1, Route parent2,int populationSize) {
        int size = populationSize;
        int startIdx = random.nextInt(size); // Start index for the segment to be inherited from parent1
        int endIdx = random.nextInt(size - startIdx) + startIdx; // End index for the segment

        // Create a child route with the same number of points as the parents
        List<Pedido> childPoints = new ArrayList<>(size);

        // Inherit the segment from parent1
        for (int i = startIdx; i <= endIdx; i++) {
            childPoints.add(parent1.points.get(i));
        }

        // Fill the remaining points from parent2 in the order they appear
        for (int i = 0; i < size; i++) {
            Pedido point = parent2.points.get(i);
            if (!childPoints.contains(point)) {
                childPoints.add(point);
            }
        }

        return new Route(childPoints);
    }

    private static void mutate(Route route) {
        List<Pedido> points = route.points;
        int size = points.size();

        // Randomly select a start and end index for the segment to be shuffled
        Random random = new Random();
        int startIndex = random.nextInt(size);
        int endIndex = random.nextInt(size);

        // Ensure that endIndex is greater than startIndex
        if (startIndex > endIndex) {
            int temp = startIndex;
            startIndex = endIndex;
            endIndex = temp;
        }

        // Shuffle the segment of the route
        List<Pedido> segment = points.subList(startIndex, endIndex + 1);
        Collections.shuffle(segment);
    }
    private static void llenarMapa(Mapa mapa){
        Vehiculo primero = new Vehiculo(21,1);

        mapa.addVehiculo(primero);

        mapa.plantaPrincipal.setX(30);
        mapa.plantaPrincipal.setY(10);
        mapa.plantaPrincipal.setCapacidad(99999999);

        mapa.plantaSecundaria1.setX(10);
        mapa.plantaSecundaria1.setY(10);
        mapa.plantaSecundaria1.setCapacidad(500);

        mapa.plantaSecundaria2.setX(15);
        mapa.plantaSecundaria2.setY(10);
        mapa.plantaSecundaria2.setCapacidad(300);

        /*Pedido ped1 = new Pedido(15,10);
        Pedido ped2 = new Pedido(11,6);
        Pedido ped3 = new Pedido(5,15);
        Pedido ped4 = new Pedido(19,1);
        Pedido ped5 = new Pedido(10,3);
*/
        Pedido ped1 = new Pedido(1,18);
        Pedido ped2 = new Pedido(1,1);
        Pedido ped3 = new Pedido(12,4);
        Pedido ped4 = new Pedido(10,13);
        Pedido ped5 = new Pedido(9,19);

        mapa.addPedido(ped1);
        mapa.addPedido(ped2);
        mapa.addPedido(ped3);
        mapa.addPedido(ped4);
        //mapa.addPedido(ped5);
    }

}
