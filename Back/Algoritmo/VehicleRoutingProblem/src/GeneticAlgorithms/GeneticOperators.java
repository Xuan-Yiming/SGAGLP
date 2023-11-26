package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;

import javax.swing.text.html.InlineView;
import java.util.ArrayList;
import java.util.Random;

public class GeneticOperators {
    private GAProblem problem;
    private double mutationRate;

    public GeneticOperators(GAProblem problem) {
        this.problem = problem;
        this.mutationRate = problem.mutationRate;
    }

    public ArrayList<Individual> selection(Population population) {
        ArrayList<Individual> parents = new ArrayList<>();
        parents.add(population.getFittest());
        parents.add(population.getSecondFittest());
        return parents;
    }

    public ArrayList<Individual> crossover(ArrayList<Individual> parents) {
        Random random = new Random();
        int maxVehicle = parents.get(0).getChromosome().genes.size();
        int maxNode = 0;
        Individual child1 = parents.get(0).clone();
        Individual child2 = parents.get(1).clone();

        for (int i = 0; i < maxVehicle; i++) {
            child1.getChromosome().genes.get(i).setRoute(new ArrayList<>());
            child2.getChromosome().genes.get(i).setRoute(new ArrayList<>());
        }

        for (int i = 0; i < maxVehicle; i++) {
            if (parents.get(0).getChromosome().genes.get(i).getRoute().size() > maxNode) {
                maxNode = parents.get(0).getChromosome().genes.get(i).getRoute().size();
            }
            if (parents.get(1).getChromosome().genes.get(i).getRoute().size() > maxNode) {
                maxNode = parents.get(1).getChromosome().genes.get(i).getRoute().size();
            }
        }

        if (maxNode == 0 || maxVehicle == 0) {
            return parents;
        }
        int verticalCrossPoint = random.nextInt(maxVehicle);
        int horizontalCrossPoint = random.nextInt(maxNode);

        /*
        * 1111111111222222
        * 1111111111222222
        * 1111111111222222
        * 1111111111222222
        * 1111111111222222
        * 1111111111222222
        *
        * */
        if (random.nextDouble() < 0.5) {

            for (int i = 0; i < parents.get(0).getChromosome().genes.size(); i++) {
                for (int j = 0; j < parents.get(0).getChromosome().genes.get(i).getRoute().size(); j++) {
                    if (j < horizontalCrossPoint) {
                        // if before the cross point
                        child1.getChromosome().genes.get(i).getRoute()
                                .add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                    } else {
                        int index = 0;
                        if (i + verticalCrossPoint >= maxVehicle){
                            index = (i + verticalCrossPoint) - maxVehicle;
                        }else {
                            index = i + verticalCrossPoint;
                        }
                        child1.getChromosome().genes.get(index).getRoute()
                                .add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                    }
                }
            }

            for (int i = 0; i < parents.get(1).getChromosome().genes.size(); i++) {
                for (int j = 0; j < parents.get(1).getChromosome().genes.get(i).getRoute().size(); j++) {
                    if (j < horizontalCrossPoint) {
                        // if before the cross point
                        child2.getChromosome().genes.get(i).getRoute()
                                .add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                    } else {
                        int index = 0;
                        if (i + verticalCrossPoint >= maxVehicle){
                            index = (i + verticalCrossPoint) - maxVehicle;
                        }else {
                            index = i + verticalCrossPoint;
                        }
                        child2.getChromosome().genes.get(index).getRoute()
                                .add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                    }
                }
            }

        }

        return new ArrayList<Individual>() {
            {
                add(child1);
                add(child2);
            }
        };
    }

    public ArrayList<Individual> mutation(ArrayList<Individual> parents) {
        Random random = new Random();
        int maxVehicle = parents.get(0).getChromosome().genes.size();

        Individual child1 = parents.get(0).clone();
        Individual child2 = parents.get(1).clone();

        while (random.nextDouble() < this.mutationRate) {
            int mutationVehicle1 = random.nextInt(maxVehicle);
            int maxNode = child1.getChromosome().genes.get(mutationVehicle1).getRoute().size();
            if (maxNode == 0) {
                continue;
            }
            int mutationNode1 = random.nextInt(maxNode);

            int mutationVehicle2 = random.nextInt(maxVehicle);
            maxNode = child2.getChromosome().genes.get(mutationVehicle2).getRoute().size();
            int mutationNode2 = random.nextInt(maxNode);

            // check if the node exits in the route, if not continue the loop
            if (child1.getChromosome().genes.get(mutationVehicle2).getRoute().size() < mutationNode2) {
                continue;
            }

            if (child2.getChromosome().genes.get(mutationVehicle1).getRoute().size() < mutationNode1) {
                continue;
            }

            // swap the nodes
            Node temp = child1.getChromosome().genes.get(mutationVehicle1).getRoute().get(mutationNode1);
            child1.getChromosome().genes.get(mutationVehicle1).getRoute().set(mutationNode1,
                    child2.getChromosome().genes.get(mutationVehicle2).getRoute().get(mutationNode2));
            child2.getChromosome().genes.get(mutationVehicle2).getRoute().set(mutationNode2, temp);

        }

        

        return new ArrayList<Individual>() {
            {
                add(child1);
                add(child2);
            }
        };
    }

    public Individual getFittestOffspring(ArrayList<Individual> parents) {
        if (parents.get(0).getFitness() > parents.get(1).getFitness()) {
            return parents.get(0);
        } else {
            return parents.get(1);
        }
    }
}
