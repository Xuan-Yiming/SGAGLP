package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Random;

public class Chromosome {
    public ArrayList<ArrayList<Gene>> genes;

    public Chromosome(GAProblem problem){
        Random random = new Random();
        genes = new ArrayList<>();
        for (int i = 0; i < problem.getVehicles().size(); i++) {
            genes.add(new ArrayList<>());
        }

        for (int i = 0; i < problem.getOrders().size(); i++) {
            int vehicleIndex = random.nextInt(problem.getVehicles().size());
            if (problem.getVehicles().get(vehicleIndex).canDeliver(problem.getOrders().get(i))){
                problem.getVehicles().get(vehicleIndex).addNode(problem.getOrders().get(i));
            }else{
                problem.getVehicles().get(vehicleIndex).addNode(problem.getVehicles().get(vehicleIndex).bestDepot(problem.getDepots()));
                problem.getVehicles().get(vehicleIndex).addNode(problem.getOrders().get(i));
            }
            genes.get(vehicleIndex).add(new Gene(problem.getOrders().get(i)));
        }

    }
}
