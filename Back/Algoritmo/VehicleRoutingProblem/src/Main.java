
import java.io.FileWriter;
import java.util.ArrayList;

import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.pathFinding;
import GeneticAlgorithms.Problem.Solucion;
import java.awt.Point;


public class Main {

    public static void main(String[] args) {
        GeneticAlgorithmVRP algorithmVRP;

            switch ('R') {
                case 'T':
                    algorithmVRP = new GeneticAlgorithmVRP('T',1200);
                    break;
                case 'R':
                    algorithmVRP = new GeneticAlgorithmVRP('R',1200);

                    Solucion solucion = algorithmVRP.getSolucion();

                    try{
                        // get the default desktop path
                        String desktopPath = System.getProperty("user.home") + "/Desktop";
                        FileWriter fileWriter = new FileWriter(desktopPath + "/solucion.json");
                        fileWriter.write(solucion.solucionToJson());
                        fileWriter.close();
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }


            }

    }

}
