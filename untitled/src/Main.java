import Algoritmos.BeeColony;
import Algoritmos.Clases.ABCSolution;
import Algoritmos.Clases.ABCSolutionLine;
import Algoritmos.HungarianAlgorithm;
import Clases.Flota;
import Clases.Mapa;
import Clases.Ruta;

import java.util.Arrays;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        // Define the problem
        int numCars = 3;
        String[] locations = {"A", "B", "C", "D", "E"};
        int[][] distances = {
                {0, 10, 20, 30, 40},
                {10, 0, 15, 25, 35},
                {20, 15, 0, 14, 29},
                {30, 25, 14, 0, 18},
                {40, 35, 29, 18, 0}
        };

        // Initialize the solution
        BeeColony beeColony = new BeeColony();
        ABCSolution solution = beeColony.employeedBee(new Mapa(distances.length, distances.length), new Flota[numCars]);

        // Repeat steps 4-6 until a stopping criterion is met
        int numIterations = 100;
        for (int i = 0; i < numIterations; i++) {
            // Employed bees phase
            for (int j = 0; j < numCars; j++) {
                ABCSolutionLine newSolutionLine = beeColony.updateSolutionLine(solution.solutionLines[j], solution.solutionLines[(j + 1) % numCars]);
                solution.solutionLines[j] = newSolutionLine;
            }

            // Onlooker bees phase
            solution = beeColony.onlookerBee(solution, new Mapa(distances.length, distances.length), new Flota[numCars]);

            // Scout bees phase
            ABCSolutionLine bestSolutionLine = beeColony.scoutBee(solution, new Mapa(distances.length, distances.length), new Flota[numCars]);
            solution.solutionLines[0] = bestSolutionLine;
        }

        // Output the best solution
        System.out.println("Best solution:");
        for (int i = 0; i < numCars; i++) {
            String[] ruta = new String[locations.length];
            for (int j = 0; j < locations.length; j++) {
                if (solution.solutionLines[i].foodSource[0] == j) {
                    ruta[ruta.length-1]= locations[j];
                }
            }
            System.out.println("Car " + (i + 1) + ": " + Arrays.toString(ruta));
        }
    }
}
//public class Main {
//    public static void main(String[] args) {
//        double[][] costMatrix = {
//                {3, 5, 6, 7},
//                {5, 5, 2, 3},
//                {7, 7, 9, 5},
//                {1, 8, 8, 3}
//        };
//
//
//        HungarianAlgorithm hbm = new HungarianAlgorithm(costMatrix);
//        int[] result = hbm.execute();
//        int [][] assigment = new int[4][4];
//        for (int i = 0; i < 4; i++) {
//            assigment[i][result[i]] = (int)costMatrix[i][result[i]];
//        }
//
//        for (int i = 0; i < 4; i++) {
//            System.out.println(Arrays.toString(assigment[i]));
//        }
//    }
//
//}