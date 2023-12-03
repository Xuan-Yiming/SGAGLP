package pe.com.pucp.DP15E.GeneticAlgorithms.Problem;

import pe.com.pucp.DP15E.GeneticAlgorithms.AStar.AStar;
import pe.com.pucp.DP15E.GeneticAlgorithms.GAProblem;
import pe.com.pucp.DP15E.GeneticAlgorithms.Gene;
import pe.com.pucp.DP15E.GeneticAlgorithms.Individual;
import com.google.gson.Gson;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Solucion {
     ArrayList<SolucionNodo> elementosEstaticosTemporales;
     ArrayList<SolucionRuta> elementosCamiones;

    public Solucion(GAProblem problem, Individual finalSolution){
         elementosEstaticosTemporales = new ArrayList<>();
         elementosCamiones = new ArrayList<>();

        for (Node order: problem.getOrders()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'C';
            solucionNodo.id = order.getId();
            solucionNodo.x = order.getPosicion().x;
            solucionNodo.y = order.getPosicion().y;
            solucionNodo.inicio = (int)(order.getFechaInicio().getTime() - problem.getDate().getTime())/1000/72;
            solucionNodo.fin = (int)(order.getFechaFinal().getTime() - problem.getDate().getTime())/1000/72;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node depots: problem.getDepots()) {
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'D';
            solucionNodo.id = depots.getId();
            solucionNodo.x = depots.getPosicion().x;
            solucionNodo.y = depots.getPosicion().y;
            solucionNodo.inicio = 0;
            solucionNodo.fin = 24*50;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        for (Node block: problem.getBlocks()){
            SolucionNodo solucionNodo = new SolucionNodo();
            solucionNodo.tipo = 'B';
            solucionNodo.id = block.getId();
            solucionNodo.x = block.getPosicion().x;
            solucionNodo.y = block.getPosicion().y;
            solucionNodo.inicio = (int)(block.getFechaInicio().getTime() - problem.getDate().getTime())/1000/72;
            solucionNodo.fin = (int)(block.getFechaFinal().getTime() - problem.getDate().getTime())/1000/72;
            elementosEstaticosTemporales.add(solucionNodo);
        }

        List<Point> obstaculos = new ArrayList<>();

        for (Node block: problem.getBlocks()){
            obstaculos.add(block.getPosicion());
        }

        for(Gene vehiculo: finalSolution.getChromosome().genes){
            int totalTime = 0;
            for (int i = 0; i < vehiculo.getRoute().size()-1; i++) {
                AStar aStar = new AStar(70, 50, obstaculos, vehiculo.getRoute().get(i).getPosicion(), vehiculo.getRoute().get(i+1).getPosicion());
                List<Point> ruta = aStar.getPath();
                for(Point node: ruta){
                    SolucionRuta solucionRuta = new SolucionRuta();
                    solucionRuta.tipo = 'C';
                    solucionRuta.id = "T" + vehiculo.getType() + vehiculo.getId();
                    solucionRuta.x = node.x;
                    solucionRuta.y = node.y;
                    solucionRuta.time = totalTime;
                    elementosCamiones.add(solucionRuta);
                    totalTime++;
                }
            }
        }

    }

    public String elementosEstaticosTemporalesToJson(){
        return new Gson().toJson(elementosEstaticosTemporales);
    }

    public String elementosCamionesToJson(){
        return new Gson().toJson(elementosCamiones);
    }
}
