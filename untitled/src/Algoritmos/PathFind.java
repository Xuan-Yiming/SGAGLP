package Algoritmos;

import Clases.*;

import java.util.Date;
import java.util.List;

public class PathFind {
    public void solution(Mapa mapa, List<Flota> flotas, List<Pedido> pedidos) {
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
                    cost[i][j] = calculateCost(flotas.get(i), sortedPedidos.get(j));
                }
            }

            //aplicar hungarian algorithm para obtener la asignacion de pedidos a flotas
            HungarianAlgorithm hbm = new HungarianAlgorithm(cost);
            int[] result = hbm.execute();

            for (int i = 0; i < n; i++) {
                //crear detalle
                DetalleRuta detalleRuta = new DetalleRuta(calculateDeliveryDate(flotas.get(i),sortedPedidos.get(result[i])),'E',(int)cost[i][result[i]]);
                //agregar el pedido a la ruta
                detalleRuta.setNodo(sortedPedidos.get(result[i]));
                flotas.get(i).getRutas().get(flotas.size()-1).getDetalleRutaList().add(detalleRuta);
            }

            //eliminar los pedidos asignados
            for (int i = 0; i < n; i++) {
                pedidos.remove(sortedPedidos.get(result[i]));
            }
        }
    }



    private boolean canDeliver( Flota flota, Pedido pedido) {
        return true;
    }

    private double calculateCost( Flota flota, Pedido pedido) {
        int x1 = flota.getRutas().get(flota.getRutas().size()-1).getDetalleRutaList().get(flota.getRutas().get(flota.getRutas().size()-1).getDetalleRutaList().size()-1).getNodo().getX();
        int y1 = flota.getRutas().get(flota.getRutas().size()-1).getDetalleRutaList().get(flota.getRutas().get(flota.getRutas().size()-1).getDetalleRutaList().size()-1).getNodo().getY();
        int x2 = pedido.getX();
        int y2 = pedido.getY();
        double distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        return distance;
    }

    private Date calculateDeliveryDate( Flota flota, Pedido pedido) {
        return null;
    }

    private Nodo getPlantaMasCerca( Flota flota) {
        return null;
    }

}
