import Genetic.GA.Algorithm;
import Genetic.MDVRP.Customer;
import Genetic.MDVRP.Depot;
import Genetic.MDVRP.Manager;
import Genetic.MDVRP.Solution;
import GeneticAlgorithms.GeneticAlgorithmVRP;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Main {

    public static void main(String[] args){
        new GeneticAlgorithmVRP();
    }
    public static void main2(String[] args) {

        int iterations = 10;
        double[] algorithm1Costs = new double[iterations];
        long [] algorithm1Times = new long[iterations];

        // define the general parameters for the problem
        Random r = new Random();

        int nVehicles = 25;
        int nCustomers = 200;// 50 - 100 - 200
        int nDepots = 3;
        int nObstacles = 20;

        int height = 100;
        int width = 100;

        List<Integer> maxRouteDurationsPerDepot = new ArrayList<>();
        List<Integer> maxLoadEachVehiclePerDepot = new ArrayList<>();

        for (int i = 0; i < nDepots; i++) {
            maxRouteDurationsPerDepot.add(500);
            maxLoadEachVehiclePerDepot.add(100);
        }

        for (int x = 0; x< iterations;x++){
            try {
                // define the problem

                List<Customer> customers = new ArrayList<>();
                for (int i = nDepots; i < nCustomers+nDepots; i++) {
                    customers.add(new Customer(i, r.nextInt(width), r.nextInt(height), r.nextInt(24), r.nextInt(100)));
                }

                List<Depot> depots = new ArrayList<>();
                for (int i = 0; i < nDepots; i++) {
                    depots.add(new Depot(i, r.nextInt(width), r.nextInt(height), nVehicles, maxRouteDurationsPerDepot.get(i), maxLoadEachVehiclePerDepot.get(i)));
                }

                List<Point> obstacles = new ArrayList<>();
                for(int i = 0; i < nObstacles; i++) {
                    obstacles.add(new Point(r.nextInt(width), r.nextInt(height)));
                    // if the point is already an depot o customer, we remove it
                    for (Customer customer : customers) {
                        if (customer.getX() == obstacles.get(i).x && customer.getY() == obstacles.get(i).y) {
                            obstacles.remove(i);
                            i--;
                            break;
                        }
                    }
                    for (Depot depot : depots) {
                        if (depot.getX() == obstacles.get(i).x && depot.getY() == obstacles.get(i).y) {
                            obstacles.remove(i);
                            i--;
                            break;
                        }
                    }
                }

                // first algorithm
                long startTime = System.nanoTime();
                // ------------------------ Genetic + A* ------------------------ //
                // initialize the problem

                Manager manager = new Manager(0.5, obstacles, width, height);
                manager.setCustomers(customers);
                manager.setDepots(depots);
                manager.calculateDistanceMatrix();

                // run the algorithm
                Algorithm ga = new Algorithm(manager);
                Solution solution = ga.run();

                // save the results
                double solutionCost = solution.getIndividual().getFitness();
                algorithm1Costs[x] = solutionCost;
                long endTime = System.nanoTime();
                long duration = (endTime - startTime) / 1000000;
                algorithm1Times[x] = duration;


            }catch (Exception e){
                System.out.println(e.getMessage());
                x--;
            }
        }

        for (int i = 0; i < iterations; i++) {
            System.out.println("Algorithm 1: " + algorithm1Costs[i] + " - " + algorithm1Times[i]);
        }

    }
}