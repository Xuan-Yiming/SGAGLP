package Clases;

import java.util.Date;

public class Pedido extends Nodo {
    private int id;
    private double volumen;
    private int cliente;
    private Date fechaEntrega;
    private Date fechaPedido;
    private double prioridad;
    private char estado;

    public Pedido(int x, int y, char tipo, int id, double volumen, int cliente, Date fechaEntrega, Date fechaPedido, char estado) {
        super(x, y, tipo);
        this.id = id;
        this.volumen = volumen;
        this.cliente = cliente;
        this.fechaEntrega = fechaEntrega;
        this.fechaPedido = fechaPedido;
        this.estado = estado;
    }

    public Pedido(int id, double volumen, int cliente, Date fechaEntrega, Date fechaPedido, char estado) {
        this.id = id;
        this.volumen = volumen;
        this.cliente = cliente;
        this.fechaEntrega = fechaEntrega;
        this.fechaPedido = fechaPedido;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public double getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(double prioridad) {
        this.prioridad = prioridad;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getVolumen() {
        return volumen;
    }

    public void setVolumen(double volumen) {
        this.volumen = volumen;
    }

    public int getCliente() {
        return cliente;
    }

    public void setCliente(int cliente) {
        this.cliente = cliente;
    }

    public Date getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(Date fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public Date getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(Date fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public char getEstado() {
        return estado;
    }

    public void setEstado(char estado) {
        this.estado = estado;
    }
}
