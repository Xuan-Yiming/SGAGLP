package GeneticAlgorithms;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Random;

import GeneticAlgorithms.Problem.Node;

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
             genes.add(new Gene(this.problem.getVehicles().get(i), this.problem.getDepots().get(0)));
         }

        // ordenar las ordenes por fecha final
        this.problem.getOrders().sort((o1, o2) -> {
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
                // get the closest depot
                Node lastNode = genes.get(vehicleIndex).getRoute().get(genes.get(vehicleIndex).getRoute().size() - 1);
                genes.get(vehicleIndex).addNode(getClosetDepot(this.problem.getDepots(), lastNode.getPosicion()));
                i--;
            } else {
                genes.get(vehicleIndex).addNode(this.problem.getOrders().get(i));
            }
        }

    }
    
    public Node getClosetDepot(ArrayList<Node> depots, Point position) {
        double minDistance = Double.MAX_VALUE;
        Node closestDepot = null;
        for (Node depot : depots) {
            double distance = Math.sqrt(Math.pow(depot.getPosicion().x - position.x, 2)
                    + Math.pow(depot.getPosicion().y - position.y, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestDepot = depot;
            }
        }
        return closestDepot;
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
