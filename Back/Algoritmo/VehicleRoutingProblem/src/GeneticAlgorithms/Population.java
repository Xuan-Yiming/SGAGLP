package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

//conjunto de soluciones
public class Population {
    private int populationSize ;
    private ArrayList<Individual> individuals;
    
    public Population(GAProblem problem) {
        this.populationSize = problem.populationSize;
        
        individuals = new ArrayList<>();
        for (int i = 0; i < populationSize; i++) {
            individuals.add(new Individual(problem));
        }
    }

    // Methods
    public void calculateFitness(){
        for (int i = 0; i < populationSize; i++) {
            individuals.get(i).calculateFitness();
        }
    }

    public Individual getFittest(){
        int fittest = 0;
        for (int i = 0; i < populationSize; i++) {
            if (individuals.get(fittest).calculateFitness() <= individuals.get(i).calculateFitness()){
                fittest = i;
            }
        }
        return individuals.get(fittest);
    }

    public Individual getSecondFittest(){
        int fittest = 0;
        int secondFittest = 0;
        for (int i = 0; i < populationSize; i++) {
            if (individuals.get(fittest).calculateFitness() <= individuals.get(i).calculateFitness()){
                secondFittest = fittest;
                fittest = i;
            }else if (individuals.get(secondFittest).calculateFitness() <= individuals.get(i).calculateFitness()){
                secondFittest = i;
            }
        }
        return individuals.get(secondFittest);
    }

    public void replaceLastFittest(Individual fittestOffspring) {
        //replace the lowest fitness
        double lowestFitness = Double.MAX_VALUE;
        int lowestFitnessIndex = 0;

        for (Individual individual : individuals) {
            if (lowestFitness >= individual.getFitness()){
                lowestFitness = individual.getFitness();
                lowestFitnessIndex = individuals.indexOf(individual);
            }
        }

        individuals.set(lowestFitnessIndex, fittestOffspring);

    }
}
