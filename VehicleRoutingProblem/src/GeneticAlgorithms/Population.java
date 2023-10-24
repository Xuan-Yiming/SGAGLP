package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

//conjunto de soluciones
public class Population {
    private int populationSize = 100;
    private ArrayList<Individual> individuals ;
    public Population(GAProblem problem){
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
        Individual fittest = individuals.get(0);
        for (int i = 0; i < populationSize; i++) {
            if (fittest.calculateFitness() <= individuals.get(i).calculateFitness()){
                fittest = individuals.get(i);
            }
        }
        return fittest;
    }

    public Individual getSecondFittest(){
        Individual fittest = individuals.get(0);
        Individual secondFittest = individuals.get(0);
        for (int i = 0; i < populationSize; i++) {
            if (fittest.calculateFitness() <= individuals.get(i).calculateFitness()){
                secondFittest = fittest;
                fittest = individuals.get(i);
            }else if (secondFittest.calculateFitness() <= individuals.get(i).calculateFitness()){
                secondFittest = individuals.get(i);
            }
        }
        return secondFittest;
    }
}
