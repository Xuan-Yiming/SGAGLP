package GeneticAlgorithms.Problem;

import GeneticAlgorithms.AStar.AStar;
import GeneticAlgorithms.Chromosome;
import GeneticAlgorithms.GAProblem;
import GeneticAlgorithms.Gene;
import GeneticAlgorithms.Individual;
import com.google.gson.Gson;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Solucion {
    private int numOfDays = 1;
    private ArrayList<SolucionNodo> elementosEstaticosTemporales;
    private ArrayList<SolucionRuta> elementosCamiones;

    public Solucion() {
        elementosEstaticosTemporales = new ArrayList<>();
        elementosCamiones = new ArrayList<>();
    }

    public Solucion(GAProblem problem, Individual finalSolution) {
        elementosEstaticosTemporales = new ArrayList<>();
        elementosCamiones = new ArrayList<>();

        for (Node order : problem.getOrders()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'C';
            solucionNodo.id = order.getId();
            solucionNodo.x = order.getPosicion().x;
            solucionNodo.y = order.getPosicion().y;
            solucionNodo.inicio = (int) (order.getFechaInicio().getTime() - problem.getDate().getTime()) / 1000 / 72;
            solucionNodo.fin = (int) (order.getFechaFinal().getTime() - problem.getDate().getTime()) / 1000 / 72;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node depots : problem.getDepots()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'D';
            solucionNodo.id = depots.getId();
            solucionNodo.x = depots.getPosicion().x;
            solucionNodo.y = depots.getPosicion().y;
            solucionNodo.inicio = 0;
            solucionNodo.fin = 24 * 50;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node block : problem.getBlocks()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'B';
            solucionNodo.id = block.getId();
            solucionNodo.x = block.getPosicion().x;
            solucionNodo.y = block.getPosicion().y;
            solucionNodo.inicio = (int) (block.getFechaInicio().getTime() - problem.getDate().getTime()) / 1000 / 72;
            solucionNodo.fin = (int) (block.getFechaFinal().getTime() - problem.getDate().getTime()) / 1000 / 72;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        List<Point> obstaculos = new ArrayList<>();

        for (Node block : problem.getBlocks()) {
            obstaculos.add(block.getPosicion());
        }

        for (Gene vehiculo : finalSolution.getChromosome().genes) {
            int totalTime = 0;
            for (int i = 0; i < vehiculo.getRoute().size() - 1; i++) {
                AStar aStar = new AStar(70, 50, obstaculos, vehiculo.getRoute().get(i).getPosicion(),
                        vehiculo.getRoute().get(i + 1).getPosicion());
                List<Point> ruta = aStar.getPath();
                for (Point node : ruta) {
                    SolucionRuta solucionRuta = new SolucionRuta();
                    solucionRuta.x = node.x;
                    solucionRuta.y = node.y;
                    solucionRuta.idPedido = vehiculo.getRoute().get(i).getId();
                    solucionRuta.placa = "T" + vehiculo.getType() + vehiculo.getId();
                    solucionRuta.time = totalTime;
                    elementosCamiones.add(solucionRuta);
                    totalTime++;
                    if (totalTime == 24 * 50) {
                        break;
                    }
                }
                if (totalTime == 24 * 50) {
                    break;
                }
            }
            if (totalTime < 24 * 50) {
                for(;totalTime < 24 * 50; totalTime++) {
                    SolucionRuta solucionRuta = new SolucionRuta();
                    solucionRuta.x = vehiculo.getRoute().get(vehiculo.getRoute().size() - 1).getPosicion().x;
                    solucionRuta.y = vehiculo.getRoute().get(vehiculo.getRoute().size() - 1).getPosicion().y;
                    solucionRuta.idPedido = vehiculo.getRoute().get(vehiculo.getRoute().size() - 1).getId();
                    solucionRuta.placa = "T" + vehiculo.getType() + vehiculo.getId();
                    solucionRuta.time = totalTime;
                    elementosCamiones.add(solucionRuta);
                }
            }

        }
        this.numOfDays++;
    }

    public void addSolucion(Solucion solucion) {
        this.numOfDays++;
        this.elementosEstaticosTemporales.addAll(solucion.getElementosEstaticosTemporales());
        for (SolucionRuta solucionRuta : solucion.getElementosCamiones()) {
            solucionRuta.time += 24 * 50 * (this.numOfDays - 1);
            this.elementosCamiones.add(solucionRuta);
        }
    }

    public String elementosEstaticosTemporalesToJson() {
        return new Gson().toJson(elementosEstaticosTemporales);
    }

    public String elementosCamionesToJson() {
        return new Gson().toJson(elementosCamiones);
    }

    public String solucionToJson() {
        return new Gson().toJson(this);
    }

    // getters and setters

    public ArrayList<SolucionNodo> getElementosEstaticosTemporales() {
        return elementosEstaticosTemporales;
    }

    public void setElementosEstaticosTemporales(ArrayList<SolucionNodo> elementosEstaticosTemporales) {
        this.elementosEstaticosTemporales = elementosEstaticosTemporales;
    }

    public ArrayList<SolucionRuta> getElementosCamiones() {
        return elementosCamiones;
    }

    public void setElementosCamiones(ArrayList<SolucionRuta> elementosCamiones) {
        this.elementosCamiones = elementosCamiones;
    }
}
