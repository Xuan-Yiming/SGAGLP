package Genetic.Utils;

import AStar.AStar;
import Genetic.MDVRP.Manager;

import java.awt.*;
import java.util.List;

public class Euclidian {
    /*
    Returns euclidean distance between a pair of (x,y)-coordinates
     */
    public static double distance(int[] coordinatesA, int[] coordinatesB, Manager manager) {
//        float xDistance = Math.abs(coordinatesA[0] - coordinatesB[0]);
//        float yDistance = Math.abs(coordinatesA[1] - coordinatesB[1]);

        AStar algorithm = new AStar(manager.getWidth(), manager.getHeight(), manager.getObstacles(), new Point(coordinatesA[0], coordinatesA[1]), new Point(coordinatesB[0], coordinatesB[1]));

        //return Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
        return algorithm.getDistance();
    }

    public static double distance(int ID_A, int ID_B, Manager manager) {
        return manager.getDistanceMatrix()[ID_A][ID_B];
    }
}
