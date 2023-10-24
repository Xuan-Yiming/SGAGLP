package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;

import javax.swing.text.html.InlineView;
import java.util.ArrayList;
import java.util.Random;

public class GeneticOperators {
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

        return new ArrayList<Individual>(){{
            add(child1);
            add(child2);
        }};
    }
    public static Population mutation(Population population){
        return population;
    }
}
