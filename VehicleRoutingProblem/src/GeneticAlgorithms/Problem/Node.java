package GeneticAlgorithms.Problem;

import java.awt.*;
import java.util.Date;

public class Node {
    private String id;
    private Point posicion;
    private char tipo; // C: Customer, D: Depot, B: Block
    private Date fechaInicio;
    private Date fechaFinal;

    // Customer
    private double pedido;

    // Depot
    private double capacidad;

    // Constructor
    public Node(int x, int y) {
        // Block
        this.posicion = new Point(x, y);
        this.tipo = 'B';
        this.fechaInicio = new Date();
        this.fechaFinal = new Date();
    }

    public Node(int x, int y, double pedido, Date fechaInicio, Date fechaFinal) {
        // Customer
        this.posicion = new Point(x, y);
        this.tipo = 'C';
        this.pedido = pedido;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
    }

    public Node(int x, int y, double capacidad) {
        // Depot
        this.posicion = new Point(x, y);
        this.tipo = 'D';
        this.capacidad = capacidad;
        this.fechaInicio = new Date();
        this.fechaFinal = new Date();
    }

    //getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Point getPosicion() {
        return posicion;
    }

    public void setPosicion(Point posicion) {
        this.posicion = posicion;
    }

    public char getTipo() {
        return tipo;
    }

    public void setTipo(char tipo) {
        this.tipo = tipo;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public double getPedido() {
        return pedido;
    }

    public void setPedido(double pedido) {
        this.pedido = pedido;
    }

    public double getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(double capacidad) {
        this.capacidad = capacidad;
    }
}
