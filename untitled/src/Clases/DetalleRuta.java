package Clases;

import java.util.Date;

public class DetalleRuta {
    private Date fechaLlegada;
    private char accion;
    private double cost;
    private Nodo nodo;

    public DetalleRuta(Date fechaLlegada, char accion, double cost) {
        this.fechaLlegada = fechaLlegada;
        this.accion = accion;
        this.cost = cost;
    }

    public Nodo getNodo() {
        return nodo;
    }

    public void setNodo(Nodo nodo) {
        this.nodo = nodo;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Date getFechaLlegada() {
        return fechaLlegada;
    }

    public void setFechaLlegada(Date fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    public char getAccion() {
        return accion;
    }

    public void setAccion(char accion) {
        this.accion = accion;
    }
}
