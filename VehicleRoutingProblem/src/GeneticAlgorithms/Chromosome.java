package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

public class Chromosome {
    public ArrayList<Gene> genes;
    private GAProblem problem;

    public Chromosome(GAProblem problem){
        // copy the problem
        this.problem = problem.clone();

        Random random = new Random();

        genes = new ArrayList<>();
        for (int i = 0; i < this.problem.getVehicles().size(); i++) {
            //agregar los vehiculos que no estan en mantenimiento
            if (this.problem.getDate() != this.problem.getVehicles().get(i).getMantenimiento()) {
                genes.add(new Gene(this.problem.getVehicles().get(i), this.problem.getDepots().get(0)));
            }
        }

        for (int i = 0; i < this.problem.getOrders().size(); i++) {
            int vehicleIndex = random.nextInt(genes.size());
            // si se puede entregar el pedido
            if (this.problem.getVehicles().get(vehicleIndex).canDeliver(this.problem.getOrders().get(i))){
                genes.get(vehicleIndex).addNode(this.problem.getOrders().get(i));
            }else{
                // si no se puede entregar el pedido, se dirige al mejor deposito
                genes.get(vehicleIndex).addNode(genes.get(vehicleIndex).bestDepot(this.problem.getDepots()));
                i--;
            }
        }

    }

    public double calculateFitness(){
        double fitness = 0;
        for (int i = 0; i < genes.size(); i++) {
            fitness += genes.get(i).calculateFitness();
        }
        return fitness;
    }

}
