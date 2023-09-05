package Algoritmos;

import Clases.Flota;
import Clases.Mapa;
import Clases.Pedido;
import Clases.Ruta;
import java.util.List;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PathFind {
    public void solution(Mapa mapa, List<Flota> flotas, List<Pedido> pedidos) {
        int x = mapa.getAncho();
        int y = mapa.getLargo();
        int n = flotas.size();
        int t = pedidos.size();
        for (int iter = 0; iter < t/n; iter++) {

            //ordenar pedidos por la prioridad
            List<Pedido> sortedPedidos = pedidos.stream()
                .sorted((p1, p2) -> Double.compare(p1.getPrioridad(), p2.getPrioridad()))
                .toList();

            //tomar los n primeros pedidos
            if (pedidos.size() < n) {
                n = pedidos.size();
            }

            //crear matriz de costos
            /*
             * i/j   p1  p2  p3  p4
             * f1    [a]  []  []  []
             * f2    []  [b]  []  []
             * f3    []  []  [c]  []
             * f4    []  []  []  [d]
             * */
            double [][] cost = new double[n][n];

            //llenar calcular costo de cada pedido para cada flota
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (canDeliver(sortedPedidos.get(1), flotas.get(i))) {
                        cost[i][j] = getDistance(sortedPedidos.get(j), flotas.get(i));
                    }else {
                        cost[i][j] = 999;
                    }
                }
            }

            //Copiar la matriz de costos
            double [][] source = new double[n][n];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    source[i][j] = cost[i][j];
                }
            }

            //aplicar hungarian algorithm para obtener la asignacion de pedidos a flotas
            HungarianAlgorithm hbm = new HungarianAlgorithm(source);
            int[] result = hbm.execute();

            for (int i = 0; i < n; i++) {
                //asignar el costo de cada pedido a la flota
                int costo = (int)cost[i][result[i]];
                //agregar el pedido a la ruta
                //flota[i] add Ruta add Pedido[result[i]];
            }

            //eliminar los pedidos asignados
        }
    }



    private boolean canDeliver(Pedido pedido, Flota flota) {
        return true;
    }

    private int getDistance(Pedido pedido, Flota flota) {
        return 0;
    }
}
