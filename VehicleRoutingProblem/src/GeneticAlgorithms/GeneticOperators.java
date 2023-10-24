package GeneticAlgorithms;

import java.util.ArrayList;

public class GeneticOperators {
    public static ArrayList<Individual> selection(Population population){
        ArrayList<Individual> parents = new ArrayList<>();
        parents.add(population.getFittest());
        parents.add(population.getSecondFittest());
        return parents;
    }
    public static Population crossover(Population population){
        return population;
    }
    public static Population mutation(Population population){
        return population;
    }
}
