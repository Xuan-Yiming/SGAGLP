
import java.io.FileWriter;

import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.Problem.Solucion;

public class Main {

    public static void main(String[] args) {
        GeneticAlgorithmVRP algorithmVRP;

        try{
        switch ('R'){
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
        }}
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}