import Models.Block;
import Models.Car;
import Models.Node;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String arg[]) throws IOException, InterruptedException{
    	
    	// Default parameters
        //get the relative path of the world file

//    	String worldFile = "C:\\Users\\xuany\\Downloads\\PathPlanningGeneticAlgorithm-main\\PathPlanningGeneticAlgorithm-main\\img\\world.png";
        int population = 100;
        int lenghtOfDNA = 300;
        double selectionRate = 0.30;
        double mutuationRate = 0.005;
        int threadSleep = 20;
        int distanceMethod = 1; 
    	
//    	if (arg.length > 0)
//    	{
//    		if (arg.length == 7)
//    		{
//    			worldFile = arg[0];
//    			threadSleep = Integer.parseInt(arg[1]);
//    			population = Integer.parseInt(arg[2]);
//    			lenghtOfDNA = Integer.parseInt(arg[3]);
//    			selectionRate = Double.parseDouble(arg[4]);
//    			mutuationRate = Double.parseDouble(arg[5]);
//    			distanceMethod = Integer.parseInt(arg[6]);
//    		}
//    		else
//    		{
//    			System.err.println("Wrong number of parameters");
//    			System.exit(-1);
//    		}
//    	}
    	
//        Map p = new Map(worldFile);
        Node[][] map = new Node[70][50];
        List<Block> obstacles = new ArrayList<>();

        for (Block obstacle: obstacles) {
            map[obstacle.getX()][obstacle.getY()] = obstacle;
        }

        Map p = new Map(map);
        
        // Set start-stop point
        p.setStart(1, 1); // center
        p.setStop(50, 45); // top-left corner
        
        int numOfGeneration=0;
        int cont = 1; // continue flag
        Genetic g=new Genetic(population,lenghtOfDNA,p,selectionRate, mutuationRate, distanceMethod);
//        p.updateDrawings();
        Vehicle solution = new Vehicle(0, p);
        while (cont == 1){
            numOfGeneration++;
            System.out.println("GENERATION: " + numOfGeneration);
//            p.clearDrawings();
            g.selection();
            g.crossover();
            g.mutuation();

            if((solution = g.showFitness()) != null) {
                cont = 0;
            }
//            p.updateDrawings();
            Thread.sleep(threadSleep);
        }

        for (Point point: solution.dna) {
            map[point.x][point.y] = new Car();
        }


        // Print the map
        System.out.println("Solution: ");
        for(int i = 0; i < 50; i++) {
        	for(int j = 0; j < 70; j++) {
        		if (map[j][i] == null)
        			System.out.print(" ");
        		else if (map[j][i] instanceof Car)
        			System.out.print("C");
        		else if (map[j][i] instanceof Block)
        			System.out.print("B");
        		else if (map[j][i] instanceof Node)
        			System.out.print("N");
        	}
        	System.out.println();
        }

    }
}

