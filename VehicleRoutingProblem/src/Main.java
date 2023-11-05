
import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.Problem.Solucion;

public class Main {

    public static void main(String[] args) {
        GeneticAlgorithmVRP algorithmVRP;

        switch ('T'){
            case 'T':
                algorithmVRP = new GeneticAlgorithmVRP('T');
                break;
            case 'R':
                algorithmVRP = new GeneticAlgorithmVRP('R');

                Solucion solucion = algorithmVRP.getSolucion();

                System.out.println(solucion.elementosEstaticosTemporalesToJson());
                break;
        }



    }
}