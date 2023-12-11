package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;

public class Gene implements Cloneable {
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

    // Constructor

    public Gene() {
    }

    public Gene(Vehicle vehicle) {
        this.id = vehicle.getId();
        this.posicion = vehicle.getPosicion();
        this.type = vehicle.getType();
        this.pesoBruto = vehicle.getPesoBruto();
        this.cargaGLP = vehicle.getCargaGLP();
        this.pesoNeto = vehicle.getPesoNeto();
        this.velocidad = vehicle.getVelocidad();
        this.cargaPetroleo = vehicle.getCargaPetroleo();
        this.mantenimiento = vehicle.getMantenimiento();
        this.route = new ArrayList<>();
        Node node = new Node(0, this.posicion.x, this.posicion.y, Double.MAX_VALUE);
        this.route.add(node);
        for (Node _node : vehicle.getRoute()) {
            this.route.add(_node);
        }
        this.totalTime = vehicle.getTotalTime();
    }

    // Methods

    public void print() {
//        System.out.print("Vehicle: " + this.id);
//        System.out.print(" - Total time: " + totalTime);
//        System.out.println(" - Fitness: " + calculateFitness());
//        System.out.println("Route: ");
        for (int i = 0; i < route.size(); i++) {
            // print in the same line saparated by ' - '
            if (i != 0) {
                System.out.print(route.get(i).getId() +",");
//                System.out.print(route.get(i).getId() + ": (" + route.get(i).getPosicion().getX() + ", "
//                        + route.get(i).getPosicion().getY() + ") - ");
            }
        }
        System.out.println();

//        System.out.println("===================================================");
    }



    public double calculateFitness() {
        double fitness = 0;
        Point _posicion = this.posicion;
        double _cargaGLP = this.cargaGLP;
        double _pesoNeto = this.pesoNeto;
        double _cargaPetroleo = this.cargaPetroleo;
        int _totalTime = this.totalTime;

        for (int i = 0; i < route.size() - 1; i++) {
            // if can deliver to this node then fitness +1
            if (route.get(i) == null) {
                continue;
            }
            if (canDeliver(route.get(i))) {
                this.cargaGLP -= route.get(i).getCantidad();
                this.cargaPetroleo -= consumoGLP(distanceToANode(route.get(i)));
                this.pesoNeto = this.pesoBruto + this.cargaGLP / 2;
                this.totalTime += timeToANode(distanceToANode(route.get(i)));
                this.posicion = route.get(i).getPosicion();
                if (route.get(i).getTipo() == 'C') {
                    fitness++;
                } else if (route.get(i).getTipo() == 'D') {
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
                    this.cargaPetroleo = 25;
                }
            } else {
                break;
            }
            // fitness += Math.sqrt(Math.pow(route.get(i).getPosicion().getX() -
            // route.get(i+1).getPosicion().getX(), 2) +
            // Math.pow(route.get(i).getPosicion().getY() -
            // route.get(i+1).getPosicion().getY(), 2));
        }
        this.posicion = _posicion;
        this.totalTime = _totalTime;
        this.cargaGLP = _cargaGLP;
        this.pesoNeto = _pesoNeto;
        this.cargaPetroleo = _cargaPetroleo;
        return fitness;
    }

    public double consumoGLP(double distancia) {
        return distancia * pesoNeto / 180;
    }

    public void addNode(Node node) {
        this.route.add(node);
    }

    public boolean canDeliver(Node custumor) {
        int distancia = distanceToANode(custumor);
        if (distancia != 0) {
            if (custumor.getTipo() == 'C') {
                // si tiene suficiente GLP
                if (this.cargaGLP < custumor.getCantidad()) {
                    // System.out.print("1");
                    return false;
                }
                // // si puede llegar antes de que termine el dia
                // if (totalTime + timeToANode(distancia) > MINUTES_IN_A_DAY) {
                //     return false;
                // }
                // si puede llegar a tiempo
                int deadline = (int) (custumor.getFechaFinal().getTime() - custumor.getFechaInicio().getTime()) / 60000;
                if (totalTime + timeToANode(
                        distancia) > deadline) {
                    // System.out.print("0");
                    return false;
                }
            }

            // si no tiene suficiente petroleo
            if (this.cargaPetroleo < consumoGLP(distancia)) {
                return false;
            }
        }
        return true;
    }

    public int distanceToANode(Node node) {
        return (int) (Math.abs(node.getPosicion().getX() - this.getPosicion().getX())  + Math.abs(node.getPosicion().getY() - this.getPosicion().getY()));
    }

    public int timeToANode(int distancia) {
        // time to a node in minutes
        return (int) (distancia / this.velocidad * 60);
    }

    @Override
    public Gene clone() {
        try {
            return (Gene) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // This should not happen.
        }
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
