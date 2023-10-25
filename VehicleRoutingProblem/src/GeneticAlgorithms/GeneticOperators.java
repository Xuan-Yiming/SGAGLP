package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;

import javax.swing.text.html.InlineView;
import java.util.ArrayList;
import java.util.Random;

public class GeneticOperators {
    private static GAProblem problem;
    private static double mutationRate = 0.15;
    public static ArrayList<Individual> selection(Population population){
        ArrayList<Individual> parents = new ArrayList<>();
        parents.add(population.getFittest());
        parents.add(population.getSecondFittest());
        return parents;
    }
    public static ArrayList<Individual> crossover(ArrayList<Individual> parents){
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
            if (parents.get(0).getChromosome().genes.get(i).getRoute().size() > maxNode){
                maxNode = parents.get(0).getChromosome().genes.get(i).getRoute().size();
            }
            if (parents.get(1).getChromosome().genes.get(i).getRoute().size() > maxNode){
                maxNode = parents.get(1).getChromosome().genes.get(i).getRoute().size();
            }
        }

        int verticalCrossPoint = random.nextInt(maxVehicle);
        int horizontalCrossPoint = random.nextInt(maxNode);

        /*
         *  0 0 0 0 0 0 0 0 0 0
         *  0 0 0 0 0 0 0 0 0 0
         *  0 0 0 0 0 0 0 0 0 0
         *  0 0 0 0 0 0 0 0 0 0
         *  0 0 0 0 0 0 0 0 0 0
         *  0 0 0 0 0 0 0 0 0 0
         */

        /*
         *  1 1 1 1 1 1 1 1 1 1
         *  1 1 1 1 1 1 1 1 1 1
         *  1 1 1 1 1 1 1 1 1 1
         *  1 1 1 1 1 1 1 1 1 1
         *  1 1 1 1 1 1 1 1 1 1
         *  1 1 1 1 1 1 1 1 1 1
         */


        if(random.nextDouble()<0.5){
            //horizontal

            /*
             *  1 1 1 1 1 0 0 0 0 0
             *  1 1 1 1 1 0 0 0 0 0
             *  1 1 1 1 1 0 0 0 0 0
             *  1 1 1 1 1 0 0 0 0 0
             *  1 1 1 1 1 0 0 0 0 0
             *  1 1 1 1 1 0 0 0 0 0
             */

            /*
             *  0 0 0 0 0 1 1 1 1 1
             *  0 0 0 0 0 1 1 1 1 1
             *  0 0 0 0 0 1 1 1 1 1
             *  0 0 0 0 0 1 1 1 1 1
             *  0 0 0 0 0 1 1 1 1 1
             *  0 0 0 0 0 1 1 1 1 1
             */

            for(int i = 0; i < parents.get(0).getChromosome().genes.size() ; i++){
               for(int j = 0; j < parents.get(0).getChromosome().genes.get(i).getRoute().size(); j++){
                   if(j<horizontalCrossPoint){
                       // if before the cross point
                       child2.getChromosome().genes.get(i).getRoute().add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                       child1.getChromosome().genes.get(i).getRoute().add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                   }else {
                       child1.getChromosome().genes.get(i).getRoute().add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                       child2.getChromosome().genes.get(i).getRoute().add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                   }
               }
            }
        }else {
            //vertical

            /*
             *  0 0 0 0 0 0 0 0 0 0
             *  0 0 0 0 0 0 0 0 0 0
             *  0 0 0 0 0 0 0 0 0 0
             *  1 1 1 1 1 1 1 1 1 1
             *  1 1 1 1 1 1 1 1 1 1
             *  1 1 1 1 1 1 1 1 1 1
             */

            /*
             *  1 1 1 1 1 1 1 1 1 1
             *  1 1 1 1 1 1 1 1 1 1
             *  1 1 1 1 1 1 1 1 1 1
             *  0 0 0 0 0 0 0 0 0 0
             *  0 0 0 0 0 0 0 0 0 0
             *  0 0 0 0 0 0 0 0 0 0
             */

            for(int i = 0; i < parents.get(0).getChromosome().genes.size() ; i++) {
                for (int j = 0; j < parents.get(0).getChromosome().genes.get(i).getRoute().size(); j++) {
                    if (i < verticalCrossPoint) {
                        // if before the cross point
                        child2.getChromosome().genes.get(i).getRoute().add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                        child1.getChromosome().genes.get(i).getRoute().add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                    } else {
                        child1.getChromosome().genes.get(i).getRoute().add(parents.get(0).getChromosome().genes.get(i).getRoute().get(j));
                        child2.getChromosome().genes.get(i).getRoute().add(parents.get(1).getChromosome().genes.get(i).getRoute().get(j));
                    }
                }
            }
        }

        // find the not used nodes in a child and add them to a list
        ArrayList<Node> notUsedNodesChild1 = (ArrayList<Node>) problem.getOrders().clone();
        ArrayList<Node> notUsedNodesChild2 = (ArrayList<Node>) problem.getOrders().clone();
        for (int i = 0; i< child1.getChromosome().genes.size(); i++){
            for (int j = 0; j < child1.getChromosome().genes.get(i).getRoute().size(); j++){
                notUsedNodesChild1.remove(child1.getChromosome().genes.get(i).getRoute().get(j));
            }
        }
        for (int i = 0; i< child2.getChromosome().genes.size(); i++){
            for (int j = 0; j < child2.getChromosome().genes.get(i).getRoute().size(); j++){
                notUsedNodesChild2.remove(child2.getChromosome().genes.get(i).getRoute().get(j));
            }
        }

        // replace the repeated nodes in a child with the not used nodes
        for (int i = 0; i < child1.getChromosome().genes.size(); i++){
            for (int j = 0; j < child1.getChromosome().genes.get(i).getRoute().size(); j++){
                for (int k = 0; k < child1.getChromosome().genes.size(); k++){
                    for (int l = 0; l < child1.getChromosome().genes.get(k).getRoute().size(); l++){
                        if (child1.getChromosome().genes.get(i).getRoute().get(j).getId() == child1.getChromosome().genes.get(k).getRoute().get(l).getId() && i != k && j != l){
                            child1.getChromosome().genes.get(k).getRoute().set(l, notUsedNodesChild1.get(0));
                            notUsedNodesChild1.remove(0);
                        }
                    }
                }
            }
        }

        for (int i = 0; i < child2.getChromosome().genes.size(); i++){
            for (int j = 0; j < child2.getChromosome().genes.get(i).getRoute().size(); j++){
                for (int k = 0; k < child2.getChromosome().genes.size(); k++){
                    for (int l = 0; l < child2.getChromosome().genes.get(k).getRoute().size(); l++){
                        if (child2.getChromosome().genes.get(i).getRoute().get(j).getId() == child2.getChromosome().genes.get(k).getRoute().get(l).getId() && i != k && j != l){
                            child2.getChromosome().genes.get(k).getRoute().set(l, notUsedNodesChild2.get(0));
                            notUsedNodesChild2.remove(0);
                        }
                    }
                }
            }
        }
        return new ArrayList<Individual>(){{
            add(child1);
            add(child2);
        }};
    }


    public static ArrayList<Individual> mutation(ArrayList<Individual> parents){
        Random random = new Random();
        int maxVehicle = parents.get(0).getChromosome().genes.size();

        Individual child1 = parents.get(0).clone();
        Individual child2 = parents.get(1).clone();

        while (random.nextDouble()<mutationRate){
            int mutationVehicle1 = random.nextInt(maxVehicle);
            int maxNode = child1.getChromosome().genes.get(mutationVehicle1).getRoute().size();
            int mutationNode1 = random.nextInt(maxNode);


            int mutationVehicle2 = random.nextInt(maxVehicle);
            maxNode = child2.getChromosome().genes.get(mutationVehicle2).getRoute().size();
            int mutationNode2 = random.nextInt(maxNode);

            // check if the node exits in the route, if not continue the loop
            if (child1.getChromosome().genes.get(mutationVehicle2).getRoute().size() <  mutationNode2){
                continue;
            }

            if (child2.getChromosome().genes.get(mutationVehicle1).getRoute().size() <  mutationNode1){
                continue;
            }

            // swap the nodes
            Node temp = child1.getChromosome().genes.get(mutationVehicle1).getRoute().get(mutationNode1);
            child1.getChromosome().genes.get(mutationVehicle1).getRoute().set(mutationNode1, child2.getChromosome().genes.get(mutationVehicle2).getRoute().get(mutationNode2));
            child2.getChromosome().genes.get(mutationVehicle2).getRoute().set(mutationNode2, temp);

        }
        return new ArrayList<Individual>(){{
            add(child1);
            add(child2);
        }};
    }

    public static Individual getFittestOffspring(ArrayList<Individual> parents) {
        if (parents.get(0).getFitness() > parents.get(1).getFitness()){
            return parents.get(0);
        }else {
            return parents.get(1);
        }
    }
}
