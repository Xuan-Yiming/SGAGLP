package GeneticAlgorithms.Problem;

import GeneticAlgorithms.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Solucion {
    // private int numOfDays = 1;
    public ArrayList<SolucionNodo> elementosEstaticosTemporales;
    public ArrayList<SolucionClock> elementosEnCadaClock;

    public Solucion() {
        elementosEstaticosTemporales = new ArrayList<>();
        elementosEnCadaClock = new ArrayList<>();
    }

    public Solucion(GAProblem problem, Individual finalSolution) throws Exception {
        ArrayList<SolucionCamion> elementosCamiones = new ArrayList<>();
        elementosEstaticosTemporales = new ArrayList<>();
        elementosEnCadaClock = new ArrayList<>();

        // elementos estaticos
        for (Node order : problem.getOrders()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'C';
            solucionNodo.id = order.getId();
            solucionNodo.x = order.getPosicion().x;
            solucionNodo.y = order.getPosicion().y;
            solucionNodo.hora = order.getFechaFinal();
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node depots : problem.getDepots()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'D';
            solucionNodo.id = depots.getId();
            solucionNodo.x = depots.getPosicion().x;
            solucionNodo.y = depots.getPosicion().y;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node block : problem.getBlocks()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'B';
            solucionNodo.id = block.getId();
            solucionNodo.x = block.getPosicion().x;
            solucionNodo.y = block.getPosicion().y;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        // elementos en cada clock
        ArrayList<Point> obstaculos = new ArrayList<>();

        for (Node block : problem.getBlocks()) {
            obstaculos.add(block.getPosicion());
        }

        for (Gene vehiculo : finalSolution.getChromosome().genes) {
            int totalClock = 0;

            SolucionCamion solucionCamion = new SolucionCamion();
            solucionCamion.id = "T" + vehiculo.getType() + vehiculo.getId();

            solucionCamion.rutas = new ArrayList<>();
            for (int i = 0; i < vehiculo.getRoute().size() - 1; i++) {
                // calcular la ruta
                List<Point> ruta = new pathFinding().findPath(70, 50, obstaculos,
                        vehiculo.getRoute().get(i).getPosicion(), vehiculo.getRoute().get(i + 1).getPosicion());

                for (Point node : ruta) {
                    SolucionRuta solucionRuta = new SolucionRuta();
                    solucionRuta.x = node.x;
                    solucionRuta.y = node.y;
                    solucionRuta.idPedido = vehiculo.getRoute().get(i+1).getId();
                    solucionRuta.placa = "T" + vehiculo.getType() + vehiculo.getId();
                    solucionRuta.time = totalClock;
                    solucionCamion.rutas.add(solucionRuta);


                    totalClock++;
                }
            }
            elementosCamiones.add(solucionCamion);
        }
        int maxTime = 0;
        while (true) {
            SolucionClock solucionClock = new SolucionClock();
            solucionClock.clock = maxTime;
            solucionClock.nodos = new ArrayList<>();
            for (SolucionCamion solucionCamion : elementosCamiones) {
                for (SolucionRuta solucionRuta : solucionCamion.rutas) {
                    if (solucionRuta.time == maxTime) {
                        solucionClockNode node = new solucionClockNode();
                        node.x = solucionRuta.x;
                        node.y = solucionRuta.y;
                        node.idPedido = solucionRuta.idPedido;
                        node.placa = solucionRuta.placa;
                        solucionClock.nodos.add(node);
                    }
                }
            }
            if (solucionClock.nodos.size() == 0) {
                break;
            }
            elementosEnCadaClock.add(solucionClock);
            maxTime++;
        }
    }

    public String solucionToJson() throws Exception {
        return new Gson().toJson(this);
    }

    public String solucionToPrettyJson() {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(this);
        return json;
    }


}


