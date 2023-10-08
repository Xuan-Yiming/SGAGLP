package Algoritmos;
import Algoritmos.Clases.ABCSolution;
import Algoritmos.Clases.ABCSolutionLine;
import Clases.Flota;
import Clases.Mapa;
import Clases.Ruta;

import java.util.Random;

public class BeeColony {

    public int limitTrial = 1;
    // matrix[row][column]

    //scout bees
    // get the best solution
    public ABCSolutionLine scoutBee(ABCSolution source, Mapa mapa, Flota[] flotas){
        ABCSolutionLine solution = new ABCSolutionLine();

        for (int i = 0; i < flotas.length; i++) {
            if (source.solutionLines[i].trial >= limitTrial) {
                Random random = new Random();
                source.solutionLines[i].foodSource[0] = random.nextInt(mapa.getLargo());
                source.solutionLines[i].foodSource[1] = random.nextInt(mapa.getLargo());
                source.solutionLines[i].maximize = calculateMaximize(source.solutionLines[i].foodSource[0], source.solutionLines[i].foodSource[1]);
                source.solutionLines[i].fitness = calculateFitness((int) source.solutionLines[i].maximize);
                source.solutionLines[i].trial = 0;
            }
            if(source.solutionLines[i].maximize > solution.maximize){
                solution = source.solutionLines[i];
            }
        }
        return solution;
    }

    //onlooker bees
    public ABCSolution onlookerBee(ABCSolution source, Mapa mapa, Flota[] flotas){
        double[] probability = new double[flotas.length];
        double sum = 0;
        for (int i = 0; i < flotas.length; i++) {
            sum += source.solutionLines[i].fitness;
        }
        for (int i = 0; i < flotas.length; i++) {
            probability[i] = source.solutionLines[i].fitness / sum;
        }

        ABCSolution solution = new ABCSolution(flotas.length);
        solution.solutionLines = new ABCSolutionLine[flotas.length];
        int updatecount = 0;
        for (int i = 0; updatecount != flotas.length; i++) {
            double r = new Random().nextDouble()* 2 - 1;
            if (r < probability[i]){
                updatecount++;
                Random random = new Random();
                int randomRow = random.nextInt(flotas.length);
                while (randomRow == i){
                    randomRow = random.nextInt(flotas.length);
                }
                solution.solutionLines[i] = updateSolutionLine(source.solutionLines[i], source.solutionLines[randomRow]);
            }
            solution.solutionLines[i] = source.solutionLines[i];
            if (i == flotas.length - 1){
                i = 0;
            }
        }

        return solution;
    }


    //employeed bees
    public ABCSolution employeedBee(Mapa mapa, Flota[] flotas){

        ABCSolution source = new ABCSolution(flotas.length);
        source.solutionLines = new ABCSolutionLine[flotas.length];
        ABCSolution solution = new ABCSolution(flotas.length);
        solution.solutionLines = new ABCSolutionLine[flotas.length];

        for (int i = 0; i < flotas.length; i++) {
            //seleccionar una posicion aleatoria en el mapa
            Random random = new Random();
            source.solutionLines[i] = new ABCSolutionLine();
            source.solutionLines[i].foodSource[0] = random.nextInt(mapa.getLargo());
            source.solutionLines[i].foodSource[1] = random.nextInt(mapa.getLargo());
            source.solutionLines[i].maximize = calculateMaximize(source.solutionLines[i].foodSource[0], source.solutionLines[i].foodSource[1]);
            source.solutionLines[i].fitness = calculateFitness((int) source.solutionLines[i].maximize);
            source.solutionLines[i].trial = 0;
        }

        for (int i = 0; i < flotas.length; i++) {
            Random random = new Random();
            int randomRow = random.nextInt(flotas.length);
            while (randomRow == i){
                randomRow = random.nextInt(flotas.length);
            }
            solution.solutionLines[i] = updateSolutionLine(source.solutionLines[i], source.solutionLines[randomRow]);
        }

        return solution;
    }

    public ABCSolutionLine updateSolutionLine(ABCSolutionLine source, ABCSolutionLine randomSource){

        ABCSolutionLine solution = new ABCSolutionLine();

        Random random = new Random();
        int randomColumn = random.nextInt(2);
        double phi = random.nextDouble()* 2 - 1;

        int[] newFoodSource = new int[2];
        newFoodSource[randomColumn] = (int) (source.foodSource[randomColumn] + phi * (source.foodSource[randomColumn] - randomSource.foodSource[randomColumn]));
        newFoodSource[Math.abs(randomColumn-1)] = source.foodSource[Math.abs(randomColumn-1)];

        double newMaximize = calculateMaximize(newFoodSource[0], newFoodSource[1]);
        double newFitness = calculateFitness((int) newMaximize);


        if (newFitness < source.fitness){
            solution.foodSource = newFoodSource;
            solution.maximize = newMaximize;
            solution.fitness = newFitness;
            solution.trial = 0;
        }else{
            solution.foodSource = source.foodSource;
            solution.maximize = source.maximize;
            solution.fitness = source.fitness;
            solution.trial += 1;
        }

        return solution;
    }
    private double calculateMaximize(int x, int y){
        return  x*x-x*y+y*y+2*x+4*y+3;
    }

    private  double calculateFitness(int f){
        if (f >= 0){
            return (double) 1 /(f+1);
        }else{
            return 1+Math.abs(f);
        }
    }
}
