package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class GeneticAlgorithmVRP {
    private Population population;
    public GeneticAlgorithmVRP(){
        ArrayList<Node> orders = new ArrayList<>();
        ArrayList<Vehicle> vehicles = new ArrayList<>();
        ArrayList<Node> depots = new ArrayList<>();
        ArrayList<Node> blocks = new ArrayList<>();

        GAProblem problem = new GAProblem(orders, vehicles, depots, blocks);

        population = new Population(problem);

    }
    public static void excute(){

    }


}
