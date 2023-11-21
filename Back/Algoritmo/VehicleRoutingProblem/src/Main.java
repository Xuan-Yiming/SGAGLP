
import java.io.FileWriter;
import java.util.ArrayList;

import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.pathFinding;
import GeneticAlgorithms.Problem.Solucion;
import java.awt.Point;


public class Main {

    public static void main(String[] args) {
        GeneticAlgorithmVRP algorithmVRP;

        try {
            switch ('T') {
                case 'T':
                    algorithmVRP = new GeneticAlgorithmVRP('T');
                    break;
                case 'R':
                    algorithmVRP = new GeneticAlgorithmVRP('R');

                    Solucion solucion = algorithmVRP.getSolucion();

                    System.out.println(solucion.solucionToJson());
                    // write the solucion to a file save it to the desktop

                    //get the default desktop path
                    //                 String desktopPath = System.getProperty("user.home") + "/Desktop";
                    //                 FileWriter fileWriter = new FileWriter(desktopPath + "/solucion.json");
                    //                 fileWriter.write(solucion.solucionToPrettyJson());

                    break;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    // public static void main(String[] args) {
    //     ArrayList<Point> obstacles = new ArrayList<>();
    //     obstacles.add(new Point(10, 20));
    //     try{
    //     System.out.println(new pathFinding().findPath(70, 50, obstacles, new Point(12, 8), new Point(64 ,13)));

    // } catch (Exception e) {
    //     System.out.println(e.getMessage());
    // }
    // }
}
