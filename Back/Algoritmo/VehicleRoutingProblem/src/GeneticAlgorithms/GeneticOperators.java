package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;

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
        parents.add(new Individual(problem));

        return parents;
    }

    public ArrayList<Individual> crossover(ArrayList<Individual> parents) {
        Random random = new Random();
        int maxVehicle = parents.get(0).getChromosome().genes.size();

        Individual child1 = parents.get(0).clone();
        Individual child2 = parents.get(1).clone();

        // child1.getChromosome().print();
        // System.out.println("ini ------------------------");

        while (random.nextDouble() < problem.crossoverRate) {
            int index1 = random.nextInt(maxVehicle);
            int index2 = random.nextInt(maxVehicle);

            if (random.nextDouble() < 0.5) {

                // switch the routes of gen(index) between the two children
                // only switch the routes begin from the second node

                if (child1.getChromosome().genes.get(index1).getRoute().size() <= 2
                        || child1.getChromosome().genes.get(index2).getRoute().size() <= 2 || index1 == index2) {
                    continue;
                }
                // child1.getChromosome().print();
                // System.out.println("ini ------------------------");
                // Get the first node from each route
                ArrayList<Node> initialNodes1 = new ArrayList<>(
                        child1.getChromosome().genes.get(index1).getRoute().subList(0, 2));
                ArrayList<Node> initialNodes2 = new ArrayList<>(
                        child1.getChromosome().genes.get(index2).getRoute().subList(0, 2));

                // Get the remaining route from each child
                ArrayList<Node> remaining1 = new ArrayList<>(
                        child1.getChromosome().genes.get(index1).getRoute().subList(2,
                                child1.getChromosome().genes.get(index1).getRoute().size()));
                ArrayList<Node> remaining2 = new ArrayList<>(
                        child1.getChromosome().genes.get(index2).getRoute().subList(2,
                                child1.getChromosome().genes.get(index2).getRoute().size()));

                // Clear the routes from each child
                child1.getChromosome().genes.get(index1).getRoute().clear();
                child1.getChromosome().genes.get(index2).getRoute().clear();

                // Add the first node back to each route
                child1.getChromosome().genes.get(index1).getRoute().addAll(initialNodes1);
                child1.getChromosome().genes.get(index2).getRoute().addAll(initialNodes2);

                // Switch the remaining routes
                child1.getChromosome().genes.get(index1).getRoute().addAll(remaining2);
                child1.getChromosome().genes.get(index2).getRoute().addAll(remaining1);

                // child1.getChromosome().print();
                // System.out.println("fin ------------------------");
            } else {
                if (child2.getChromosome().genes.get(index1).getRoute().size() <= 2
                        || child2.getChromosome().genes.get(index2).getRoute().size() <= 2 || index1 == index2) {
                    continue;
                }
                // child2.getChromosome().print();
                // System.out.println("ch 2  ini ------------------------");

                // Get the first node from each route
                ArrayList<Node> initialNodes1 = new ArrayList<>(
                        child2.getChromosome().genes.get(index1).getRoute().subList(0, 2));
                ArrayList<Node> initialNodes2 = new ArrayList<>(
                        child2.getChromosome().genes.get(index2).getRoute().subList(0, 2));

                // Get the remaining route from each child
                ArrayList<Node> remaining1 = new ArrayList<>(
                        child2.getChromosome().genes.get(index1).getRoute().subList(2,
                                child2.getChromosome().genes.get(index1).getRoute().size()));
                ArrayList<Node> remaining2 = new ArrayList<>(
                        child2.getChromosome().genes.get(index2).getRoute().subList(2,
                                child2.getChromosome().genes.get(index2).getRoute().size()));

                // Clear the routes from each child
                child2.getChromosome().genes.get(index1).getRoute().clear();
                child2.getChromosome().genes.get(index2).getRoute().clear();

                // Add the first node back to each route
                child2.getChromosome().genes.get(index1).getRoute().addAll(initialNodes1);
                child2.getChromosome().genes.get(index2).getRoute().addAll(initialNodes2);

                // Switch the remaining routes
                child2.getChromosome().genes.get(index1).getRoute().addAll(remaining2);
                child2.getChromosome().genes.get(index2).getRoute().addAll(remaining1);

                // child2.getChromosome().print();
                // System.out.println("ch 2 fin ------------------------");
            }
        }

        // child1.getChromosome().print();

        // System.out.println("cross fin ------------------------");

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

        int minNode = Integer.MAX_VALUE;

        Individual parent1 = parents.get(0);
        Individual parent2 = parents.get(1);

        // mutate the genes
        if (random.nextDouble() < this.mutationRate) {
            if (random.nextDouble() < 0.5) {

                maxVehicle = parent1.getChromosome().genes.size();

                // clear the routes
                for (int i = 0; i < maxVehicle; i++) {
                    child1.getChromosome().genes.get(i).setRoute(new ArrayList<>());
                }

                // get the minimum number of nodes in the routes
                for (int i = 0; i < maxVehicle; i++) {
                    if (parent1.getChromosome().genes.get(i).getRoute().size() < minNode) {
                        minNode = parent1.getChromosome().genes.get(i).getRoute().size();
                    }
                }

                if (minNode == 0 || minNode == 1 || maxVehicle == 0) {
                    return parents;
                }

                // get the cross point
                int verticalCrossPoint = random.nextInt(maxVehicle);

                // make sure the cross point is not the first node or second node
                int horizontalCrossPoint;

                horizontalCrossPoint = random.nextInt(minNode - 1) + 1;

                if (horizontalCrossPoint == 0 || horizontalCrossPoint == 1) {
                    
                } else {
                                    for (int iov = 0; iov < parent1.getChromosome().genes.size(); iov++) {
                    Gene vehicle = parent1.getChromosome().genes.get(iov);
                    for (int ioo = 0; ioo < vehicle.getRoute().size()
                            && ioo < horizontalCrossPoint; ioo++) {
                        // if before the cross point
                        child1.getChromosome().genes.get(iov).getRoute()
                                .add(parent1.getChromosome().genes.get(iov).getRoute().get(ioo));
                    }
                }
                for (int iov = 0; iov < parent1.getChromosome().genes.size(); iov++) {
                    Gene vehicle = parent1.getChromosome().genes.get(iov);
                    for (int ioo = horizontalCrossPoint; ioo < vehicle.getRoute().size(); ioo++) {
                        int index = (iov + verticalCrossPoint) % maxVehicle;
                        child1.getChromosome().genes.get(index).getRoute()
                                .add(parent1.getChromosome().genes.get(iov).getRoute().get(ioo));

                    }
                }
                }



            } else {

                maxVehicle = parent1.getChromosome().genes.size();

                // clear the routes
                for (int i = 0; i < maxVehicle; i++) {
                    child2.getChromosome().genes.get(i).setRoute(new ArrayList<>());
                }

                // get the minimum number of nodes in the routes
                for (int i = 0; i < maxVehicle; i++) {
                    if (parent2.getChromosome().genes.get(i).getRoute().size() < minNode) {
                        minNode = parent2.getChromosome().genes.get(i).getRoute().size();
                    }
                }

                if (minNode == 0 || minNode == 1 || maxVehicle == 0) {
                    return parents;
                }

                // get the cross point
                int verticalCrossPoint = random.nextInt(maxVehicle);

                // make sure the cross point is not the first node
                int horizontalCrossPoint;

                    horizontalCrossPoint = random.nextInt(minNode - 1) + 1;
                if (horizontalCrossPoint == 0 || horizontalCrossPoint == 1)
                {
                    for (int iov = 0; iov < parent2.getChromosome().genes.size(); iov++) {
                        Gene vehicle = parent2.getChromosome().genes.get(iov);
                        for (int ioo = 0; ioo < vehicle.getRoute().size()
                                && ioo < horizontalCrossPoint; ioo++) {
                            // if before the cross point
                            child2.getChromosome().genes.get(iov).getRoute()
                                    .add(parent2.getChromosome().genes.get(iov).getRoute().get(ioo));
                        }
                    }
                    for (int iov = 0; iov < parent2.getChromosome().genes.size(); iov++) {
                        Gene vehicle = parent2.getChromosome().genes.get(iov);
                        for (int ioo = horizontalCrossPoint; ioo < vehicle.getRoute().size(); ioo++) {
                            int index = (iov + verticalCrossPoint) % maxVehicle;
                            child2.getChromosome().genes.get(index).getRoute()
                                    .add(parent2.getChromosome().genes.get(iov).getRoute().get(ioo));

                        }
                    }
                }
            }
        }

        // child1.getChromosome().print();

        // System.out.println("mut fin ------------------------");

        // switch random genes between two individuals
        while (random.nextDouble() < this.mutationRate) {

            // get a random number < 1,
            // if it is less than 0.50 than mutate child1, otherwise mutate child2

            if (random.nextDouble() < 0.50) {

                int mutationVehicle1 = random.nextInt(maxVehicle);
                int maxNode = child1.getChromosome().genes.get(mutationVehicle1).getRoute().size();
                if (maxNode == 0 || maxNode == 1) {
                    continue;
                }
                // make sure the node is not the first one
                int mutationNode1;
                do {
                    mutationNode1 = random.nextInt(minNode - 1) + 1;
                } while (mutationNode1 == 0 || mutationNode1 == 1);

                int mutationVehicle2 = random.nextInt(maxVehicle);
                maxNode = child1.getChromosome().genes.get(mutationVehicle2).getRoute().size();
                if (maxNode == 0 || maxNode == 1) {
                    continue;
                }
                // make sure the node is not the first one
                int mutationNode2;
                do {
                    mutationNode2 = random.nextInt(minNode - 1) + 1;
                } while (mutationNode2 == 0 || mutationNode2 == 1);

                // check if the node exits in the route, if not continue the loop
                if (child1.getChromosome().genes.get(mutationVehicle2).getRoute().size() < mutationNode2) {
                    continue;
                }
                // check if the node exits in the route, if not continue the loop
                if (child1.getChromosome().genes.get(mutationVehicle1).getRoute().size() < mutationNode1) {
                    continue;
                }

                // swap the nodes
                Node temp = child1.getChromosome().genes.get(mutationVehicle1).getRoute().get(mutationNode1);
                child1.getChromosome().genes.get(mutationVehicle1).getRoute().set(mutationNode1,
                        child1.getChromosome().genes.get(mutationVehicle2).getRoute().get(mutationNode2));
                child1.getChromosome().genes.get(mutationVehicle2).getRoute().set(mutationNode2, temp);

                if (random.nextDouble() < 0.50) {
                    // randomly choose a node from the last one of a route to add to another route
                    child1.getChromosome().genes.get(mutationVehicle1).getRoute()
                            .add(child1.getChromosome().genes.get(mutationVehicle2).getRoute().get(
                                    child1.getChromosome().genes.get(mutationVehicle2).getRoute().size() - 1));
                    // remove the last node
                    child1.getChromosome().genes.get(mutationVehicle2).getRoute()
                            .remove(child1.getChromosome().genes.get(mutationVehicle2).getRoute().size() - 1);
                }

            } else {
                int mutationVehicle1 = random.nextInt(maxVehicle);
                int maxNode = child2.getChromosome().genes.get(mutationVehicle1).getRoute().size();
                if (maxNode == 0 || maxNode == 1) {
                    continue;
                }
                int mutationNode1 = random.nextInt(maxNode);

                int mutationVehicle2 = random.nextInt(maxVehicle);
                maxNode = child2.getChromosome().genes.get(mutationVehicle2).getRoute().size();
                if (maxNode == 0 || maxNode == 1) {
                    continue;
                }
                int mutationNode2 = random.nextInt(maxNode);

                // check if the node exits in the route, if not continue the loop
                if (child2.getChromosome().genes.get(mutationVehicle2).getRoute().size() < mutationNode2) {
                    continue;
                }

                if (child2.getChromosome().genes.get(mutationVehicle1).getRoute().size() < mutationNode1) {
                    continue;
                }

                // swap the nodes
                Node temp = child2.getChromosome().genes.get(mutationVehicle1).getRoute().get(mutationNode1);
                child2.getChromosome().genes.get(mutationVehicle1).getRoute().set(mutationNode1,
                        child2.getChromosome().genes.get(mutationVehicle2).getRoute().get(mutationNode2));
                child2.getChromosome().genes.get(mutationVehicle2).getRoute().set(mutationNode2, temp);

                if (random.nextDouble() < 0.50) {
                    // randomly choose a node from the last one of a route to add to another route
                    child2.getChromosome().genes.get(mutationVehicle1).getRoute()
                            .add(child2.getChromosome().genes.get(mutationVehicle2).getRoute().get(
                                    child2.getChromosome().genes.get(mutationVehicle2).getRoute().size() - 1));
                    // remove the last node
                    child2.getChromosome().genes.get(mutationVehicle2).getRoute()
                            .remove(child2.getChromosome().genes.get(mutationVehicle2).getRoute().size() - 1);
                }
            }
        }

        // child1.getChromosome().print();

        // System.out.println("switch fin ------------------------");

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
