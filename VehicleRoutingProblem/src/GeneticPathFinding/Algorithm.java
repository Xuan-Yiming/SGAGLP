package GeneticPathFinding;

import Hungarian.Algorihm;

import java.awt.*;
import java.util.List;
import java.util.Stack;

import static java.lang.Thread.sleep;

public class Algorithm {
    private double fitness;
    public Algorithm(Point start, Point stop, List<Point> obstacles, int width, int height) throws InterruptedException {
        // Default parameters
        int population = 100;
        int lenghtOfDNA = 300;
        double selectionRate = 0.30;
        double mutuationRate = 0.005;
        int threadSleep = 20;
        int distanceMethod = 1;

        World p = new World(obstacles, width, height);

        // Set start-stop point
        p.setStart(start.x, start.y); // center
        p.setStop(stop.x, stop.y); // top-left corner


        int cont = 1; // continue flag
        Genetic g=new Genetic(population,lenghtOfDNA,p,selectionRate, mutuationRate, distanceMethod);
        //p.updateDrawings();
        while (cont == 1){
            p.clearDrawings();
            g.selection();
            g.crossover();
            g.mutuation();
            if(g.showFitness()>0){
                this.fitness = g.showFitness();
                cont = 0;
            }

            sleep(threadSleep);
        }
    }

    public Algorithm(Point start, Point stop, List<Point> obstacles) {
    }

    public double getCost(){
        return this.fitness;
    }
}
