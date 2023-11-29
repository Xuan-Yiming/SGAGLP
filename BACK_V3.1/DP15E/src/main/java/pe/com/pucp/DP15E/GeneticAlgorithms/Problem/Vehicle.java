package pe.com.pucp.DP15E.GeneticAlgorithms.Problem;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;

public class Vehicle implements Cloneable {
    private static final int MINUTES_IN_A_DAY = 1440;
    private int id;
    private Point posicion;
    private char type;
    private double pesoBruto; // ton
    private double cargaGLP; // peso carga GLP = carga GLP/2 ton
    private double pesoNeto; // ton
    private double velocidad = 50; // 50 km/h
    private double cargaPetroleo = 25; // 25 Galones
    private Date mantenimiento; // 1 mes
    private ArrayList<Node> route;
    private int totalTime;


    // Methods
    @Override
    public Vehicle clone() {
        try {
            return (Vehicle) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // This should not happen.
        }
    }
    
    public void addNode(Node node) {
        if (node.getTipo() == 'C') {
            
        } else if (node.getTipo() == 'D') {
            switch (this.type) {
                case 'A':
                    this.pesoBruto = 2.5;
                    this.cargaGLP = 25;
                    break;
                case 'B':
                    this.pesoBruto = 2;
                    this.cargaGLP = 15;
                    break;
                case 'C':
                    this.pesoBruto = 1.5;
                    this.cargaGLP = 10;
                    break;
                case 'D':
                    this.pesoBruto = 1;
                    this.cargaGLP = 5;
                    break;
            }
        }
        this.posicion = node.getPosicion();
        route.add(node);
    }

    // Constructor
    public Vehicle(int id, char type, Date mantenimiento) {
        this.id = id;
        this.type = type;
        switch (type){
            case 'A':
                this.pesoBruto = 2.5;
                this.cargaGLP = 25;
                break;
            case 'B':
                this.pesoBruto = 2;
                this.cargaGLP = 15;
                break;
            case 'C':
                this.pesoBruto = 1.5;
                this.cargaGLP = 10;
                break;
            case 'D':
                this.pesoBruto = 1;
                this.cargaGLP = 5;
                break;
        }
        this.pesoNeto = this.pesoBruto + this.cargaGLP/2;
        this.mantenimiento = mantenimiento;
        this.route = new ArrayList<>();
        this.posicion = new Point(12,8);
    }

    public Vehicle(int id, char type, int x, int y, double pesoBruto,double cargaGLP, double pesoNeto,
                   double velocidad, double cargaPetroleo,int totalTime,Date mantenimiento) {
        this.id = id;
        this.type = type;

        switch (type){
            case 'A':
                this.pesoBruto = 2.5;
                this.cargaGLP = 25;
                break;
            case 'B':
                this.pesoBruto = 2;
                this.cargaGLP = 15;
                break;
            case 'C':
                this.pesoBruto = 1.5;
                this.cargaGLP = 10;
                break;
            case 'D':
                this.pesoBruto = 1;
                this.cargaGLP = 5;
                break;
        }
        this.pesoNeto = this.pesoBruto + this.cargaGLP/2;
        this.mantenimiento = mantenimiento;
        this.route = new ArrayList<>();
        this.posicion = new Point(12,8);
    }

    // getters and setters

    public Point getPosicion() {
        return posicion;
    }

    public void setPosicion(Point posicion) {
        this.posicion = posicion;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public char getType() {
        return type;
    }

    public void setType(char type) {
        this.type = type;
    }

    public double getPesoBruto() {
        return pesoBruto;
    }

    public void setPesoBruto(double pesoBruto) {
        this.pesoBruto = pesoBruto;
    }

    public double getCargaGLP() {
        return cargaGLP;
    }

    public void setCargaGLP(double cargaGLP) {
        this.cargaGLP = cargaGLP;
    }

    public double getPesoNeto() {
        return pesoNeto;
    }

    public void setPesoNeto(double pesoNeto) {
        this.pesoNeto = pesoNeto;
    }

    public double getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(double velocidad) {
        this.velocidad = velocidad;
    }

    public double getCargaPetroleo() {
        return cargaPetroleo;
    }

    public void setCargaPetroleo(double cargaPetroleo) {
        this.cargaPetroleo = cargaPetroleo;
    }

    public Date getMantenimiento() {
        return mantenimiento;
    }

    public void setMantenimiento(Date mantenimiento) {
        this.mantenimiento = mantenimiento;
    }

    public ArrayList<Node> getRoute() {
        return route;
    }

    public void setRoute(ArrayList<Node> route) {
        this.route = route;
    }
}
