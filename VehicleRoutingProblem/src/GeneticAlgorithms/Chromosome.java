package GeneticAlgorithms;

import java.util.ArrayList;
import java.util.Random;

public class Chromosome {
    public ArrayList<Gene> genes;
    private GAProblem problem;
    private  double DEPOTRATE;

    public Chromosome(GAProblem problem) {

        this.DEPOTRATE = problem.DEPOTRATE;
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
            double ifGoToDepot = random.nextDouble();
            if (ifGoToDepot < DEPOTRATE) {
                // si se dirige al deposito, se dirige al mejor deposito
                genes.get(vehicleIndex).addNode(genes.get(vehicleIndex).bestDepot(this.problem.getDepots()));
                i--;
            } else {
                genes.get(vehicleIndex).addNode(this.problem.getOrders().get(i));
            }
        }
    }

    public double calculateFitness() {
        double fitness = 0;
        for (int i = 0; i < genes.size(); i++) {
            fitness += genes.get(i).calculateFitness();
        }
        return fitness;
    }
    
    
    public void print() {
        System.out.println("Chromosome: ");
        for (int i = 0; i < genes.size(); i++) {
            genes.get(i).print();
        }
    }

}
