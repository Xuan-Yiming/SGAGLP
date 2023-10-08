import Algoritmos.BeeColony;
import Algoritmos.Clases.ABCSolution;
import Algoritmos.Clases.ABCSolutionLine;
import Algoritmos.HungarianAlgorithm;
import Algoritmos.PathFind;
import Clases.DetalleRuta;
import Clases.Flota;
import Clases.Mapa;
import Clases.Ruta;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        PathFind pathFind = new PathFind();

        Mapa mapa = new Mapa(100, 100);

        //vehiculos
        Flota flota1 = new Flota(1, "A", "01", 1, 1, 1, 1, 1, 1, 1, null, 'A');
        Flota flota2 = new Flota(2, "A", "02", 1, 1, 1, 1, 1, 1, 1, null, 'A');
        Flota flota3 = new Flota(3, "A", "03", 1, 1, 1, 1, 1, 1, 1, null, 'A');

        flota1.setRutas(Arrays.asList(new Ruta()));
        flota2.setRutas(Arrays.asList(new Ruta()));
        flota3.setRutas(Arrays.asList(new Ruta()));

        flota1.getRutas().get(0).append(new DetalleRuta(null, 1, 'E', 1,));

    }


}