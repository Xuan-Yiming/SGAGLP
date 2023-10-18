package Genetic;


import AStar.AStar;
import Genetic.GA.Algorithm;
import Genetic.MDVRP.Customer;
import Genetic.MDVRP.Depot;
import Genetic.MDVRP.Manager;
import Genetic.MDVRP.Solution;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Genetic {
    public static void main(String[] args) {
        // set a timer

        // ------------------- PARAMS -------------------- //
        // Problem
        int nVehicles = 25;
        int nCustomers = 100;// 50 - 100 - 500
        int nDepots = 3;

        int height = 100;
        int width = 100;

        // Block
        List<Point> obstacles = new ArrayList<>();
        obstacles.add(new Point(10, 10));
        obstacles.add(new Point(10, 11));
        obstacles.add(new Point(10, 12));
        obstacles.add(new Point(10, 13));
        obstacles.add(new Point(10, 14));
        obstacles.add(new Point(10, 15));
        obstacles.add(new Point(10, 16));
        obstacles.add(new Point(10, 17));
        obstacles.add(new Point(10, 18));
        obstacles.add(new Point(10, 19));
        obstacles.add(new Point(10, 20));
        obstacles.add(new Point(10, 21));
        obstacles.add(new Point(10, 22));

        List<Integer> maxRouteDurationsPerDepot = new ArrayList<>();
        List<Integer> maxLoadEachVehiclePerDepot = new ArrayList<>();

        for (int i = 0; i < nDepots; i++) {
            maxRouteDurationsPerDepot.add(500);
            maxLoadEachVehiclePerDepot.add(100);
        }

        List<Customer> customers = new ArrayList<>();
        Random r = new Random();
        for (int i = nDepots; i < nCustomers+nDepots; i++) {
            customers.add(new Customer(i, r.nextInt(width), r.nextInt(height), r.nextInt(24), r.nextInt(100)));
        }

        List<Depot> depots = new ArrayList<>();
        for (int i = 0; i < nDepots; i++) {
            depots.add(new Depot(i, r.nextInt(width), r.nextInt(height), nVehicles, maxRouteDurationsPerDepot.get(i), maxLoadEachVehiclePerDepot.get(i)));
        }

        Manager manager = new Manager(0.5, obstacles, width, height);

        manager.setCustomers(customers);
        manager.setDepots(depots);
        manager.calculateDistanceMatrix();

//        AStar algorithm = new AStar(manager.getWidth(), manager.getHeight(), manager.getObstacles(), new Point(customers.get(1).getX(), customers.get(1).getY()), new Point(customers.get(10).getX(), customers.get(10).getY()));
//        System.out.println(algorithm.getDistance());

        // Algorithm
        Algorithm ga = new Algorithm(manager);

        Solution solution = ga.run();                                                           // Run algorithm



        //List<CrowdedDepot> depots = solution.getDepots();

        double solutionCost = solution.getIndividual().getFitness();
        System.out.println("\nTotal distance best solution: " + solutionCost);

        String userdir = System.getProperty("user.dir");


       Manager.saveSolution(solution, userdir + "/data/solutions/solution.res");        // Save solution to file
    }
}
