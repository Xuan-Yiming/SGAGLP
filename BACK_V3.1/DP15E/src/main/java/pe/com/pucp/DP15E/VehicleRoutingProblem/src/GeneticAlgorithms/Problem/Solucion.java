package pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms.Problem;

import GeneticAlgorithms.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.awt.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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

    public Solucion(GAProblem problem, Individual finalSolution, int maxclock) throws Exception {
        elementosEstaticosTemporales = new ArrayList<>();
        elementosEnCadaClock = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm");

        // elementos estaticos
        for (Node order : problem.getOrders()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'C';
            solucionNodo.id = order.getId();
            solucionNodo.x = order.getPosicion().x;
            solucionNodo.y = order.getPosicion().y;
            solucionNodo.cantidad = order.getCantidad();
            solucionNodo.hora = dateFormat.format(order.getFechaFinal());
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

        for (Vehicle vehicle : problem.getVehicles()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'V';
            solucionNodo.id = "T" + vehicle.getType() + vehicle.getId();
            solucionNodo.x = vehicle.getPosicion().x;
            solucionNodo.y = vehicle.getPosicion().y;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        // elementos en cada clock

        // obstaculos
        ArrayList<Point> obstaculos = new ArrayList<>();

        for (Node block : problem.getBlocks()) {
            obstaculos.add(block.getPosicion());
        }

        //
        for (Gene vehiculo : finalSolution.getChromosome().genes) {
            int totalClock = 0;

            for (int i = 0; i < vehiculo.getRoute().size() - 1; i++) {
                // calcular la ruta
                List<Point> ruta = new pathFinding().findPath(70, 50, obstaculos,
                        vehiculo.getRoute().get(i).getPosicion(), vehiculo.getRoute().get(i + 1).getPosicion());

                // agregar a la solucion
                for (int j = 0; j < ruta.size() - 1; j++) {

                    // si no existe el clock, crearlo
                    if (this.elementosEnCadaClock.size() <= totalClock) {
                        SolucionClock solucionClock = new SolucionClock();
                        solucionClock.clock = totalClock;
                        solucionClock.nodos = new ArrayList<>();
                        this.elementosEnCadaClock.add(solucionClock);
                    }

                    for (int k = j; k < ruta.size() - 1; k++) {
                        solucionClockNode _node = new solucionClockNode();
                        _node.x = ruta.get(k).x;
                        _node.y = ruta.get(k).y;
                        _node.idPedido = vehiculo.getRoute().get(i + 1).getId();
                        _node.placa = "T" + vehiculo.getType() + vehiculo.getId();
                        if (j == ruta.size() - 2 && _node.idPedido.charAt(0) == 'C') {
                            _node.tipo = 'E';
                        } else if (k == j) {
                            _node.tipo = 'I';
                        } else if (k == ruta.size() - 2) {
                            _node.tipo = 'X';
                        } else {
                            _node.tipo = 'R';
                        }
                        this.elementosEnCadaClock.get(totalClock).nodos.add(_node);
                    }
                    totalClock++;
                    if (totalClock >= maxclock) {
                        break;
                    }
                }
                if (totalClock >= maxclock) {
                    break;
                }
            }

            for (int i = totalClock; i < maxclock; i++) {
                if (this.elementosEnCadaClock.size() <= i) {
                    SolucionClock solucionClock = new SolucionClock();
                    solucionClock.clock = i;
                    solucionClock.nodos = new ArrayList<>();
                    this.elementosEnCadaClock.add(solucionClock);
                }

                solucionClockNode _node = new solucionClockNode();
            
                Node lastNode = vehiculo.getRoute().get(vehiculo.getRoute().size() - 1);
                        _node.x = lastNode.getPosicion().x;
                        _node.y = lastNode.getPosicion().y;
                        _node.idPedido = lastNode.getId();
                        _node.placa = "T" + vehiculo.getType() + vehiculo.getId();
                        _node.tipo = 'X';
                        this.elementosEnCadaClock.get(totalClock).nodos.add(_node);
            }
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
