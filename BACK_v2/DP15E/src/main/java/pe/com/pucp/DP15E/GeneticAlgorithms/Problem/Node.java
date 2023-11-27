package pe.com.pucp.DP15E.GeneticAlgorithms.Problem;

import java.awt.*;
import java.util.Date;

public class Node implements Cloneable {
    private String id;
    private Point posicion;
    private char tipo; // C: Customer, D: Depot, B: Block
    private Date fechaInicio;
    private Date fechaFinal;

    // Customer
    private double cantidad;

    // Depot
    private double capacidad;

    // Constructor
    public Node(int id, int x, int y, Date fechaInicio, Date fechaFinal) {
        // Block
        this.posicion = new Point(x, y);
        this.tipo = 'B';
        this.id = "B" + id;
        this.fechaInicio = new Date();
        this.fechaFinal = new Date();
    }

    public Node(String id, int x, int y, double cantidad, Date fechaInicio, Date fechaFinal) {
        // Customer
        this.id = "C" + id;
        this.posicion = new Point(x, y);
        this.tipo = 'C';
        this.cantidad = cantidad;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
    }

    public Node(int id, int x, int y, double capacidad) {
        // Depot
        this.id = "D" + id;
        this.posicion = new Point(x, y);
        this.tipo = 'D';
        this.capacidad = capacidad;
        this.fechaInicio = new Date();
        this.fechaFinal = new Date();
    }

    @Override
    public Node clone() {
        try {
            return (Node) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();  // This should not happen.
        }
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

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public double getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(double capacidad) {
        this.capacidad = capacidad;
    }
}
