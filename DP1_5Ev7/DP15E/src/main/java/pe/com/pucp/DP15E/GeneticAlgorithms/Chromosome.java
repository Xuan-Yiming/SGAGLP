package pe.com.pucp.DP15E.GeneticAlgorithms;

import java.util.ArrayList;
import java.util.Random;

import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node;

public class Chromosome implements Cloneable {
    public ArrayList<Gene> genes;
    private GAProblem problem;
    private double depotRate;

    // Constructors

    public Chromosome() {
    }

    public Chromosome(GAProblem problem) {

        this.depotRate = problem.depotRate;
        // copy the problem
        this.problem = problem.clone();

        Random random = new Random();

        genes = new ArrayList<>();
        for (int i = 0; i < this.problem.getVehicles().size(); i++) {
            // agregar los vehiculos que no estan en mantenimiento
            if (this.problem.getDate() != this.problem.getVehicles().get(i).getMantenimiento()) {
                genes.add(new Gene(this.problem.getVehicles().get(i), this.problem.getDepots().get(0)));
            }
        }

        this.problem.getDepots().sort((o1, o2) -> {
            int result = o1.getFechaFinal().compareTo(o2.getFechaFinal());
            if (result > 0) {
                return 1;
            } else if (result < 0) {
                return -1;
            } else {
                return 0;
            }
        });

        for (int i = 0; i < this.problem.getOrders().size(); i++) {
            int vehicleIndex = random.nextInt(genes.size());
            double ifGoToDepot = random.nextDouble();
            if (ifGoToDepot < depotRate) {
                // si se dirige al deposito, se dirige al mejor deposito
                // get a random depot
                int depotIndex = random.nextInt(this.problem.getDepots().size());
                genes.get(vehicleIndex).addNode(this.problem.getDepots().get(depotIndex));
                i--;
            } else {
                genes.get(vehicleIndex).addNode(this.problem.getOrders().get(i));
            }
        }

        // for (int i = 0; i < this.problem.getOrders().size(); i++) {
        // int vehicleIndex = random.nextInt(genes.size());
        // genes.get(vehicleIndex).addNode(this.problem.getOrders().get(i));
        // }
    }
    

    public double calculateFitness() {
        double fitness = 0;
        for (int i = 0; i < genes.size(); i++) {
            fitness += genes.get(i).calculateFitness();
        }

        return fitness;
    }

    public void print() {
        for (int i = 0; i < genes.size(); i++) {
            genes.get(i).print();
        }
    }

    @Override
    public Chromosome clone() {
        try {
            return (Chromosome) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // This should not happen.
        }
    }

    // getters and setters
    public void setGAProblem(GAProblem problem) {
        this.problem = problem;
    }

    public void setDepotRate(double depotRate) {
        this.depotRate = depotRate;
    }
}
