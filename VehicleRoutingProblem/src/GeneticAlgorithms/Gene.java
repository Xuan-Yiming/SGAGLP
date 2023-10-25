package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;

public class Gene {
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
    public Gene(Vehicle vehicle, Node depot){
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
        this.route.add(depot);
        this.totalTime = vehicle.getTotalTime();
    }

    // Methods

    public double calculateFitness(){
        double fitness = 0;
        for (int i = 0; i < route.size()-1; i++) {
            fitness += Math.sqrt(Math.pow(route.get(i).getPosicion().getX() - route.get(i+1).getPosicion().getX(), 2) + Math.pow(route.get(i).getPosicion().getY() - route.get(i+1).getPosicion().getY(), 2));
        }
        return fitness;
    }

    public double consumoGLP(double distancia){
        return distancia * pesoNeto / 180;
    }

    public void addNode(Node node){
        this.route.add(node);
        if(node.getTipo() == 'C'){
            this.cargaGLP -= node.getCantidad();
            this.cargaPetroleo -= consumoGLP(distanceToANode(node));
            this.totalTime += timeToANode(distanceToANode(node));
        }else if(node.getTipo() == 'D') {
            switch (this.type){
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
        this.pesoNeto = this.pesoBruto + this.cargaGLP/2;
    }

    public boolean canDeliver(Node custumor){
        //si tiene suficiente GLP
        if(this.cargaGLP < custumor.getCantidad()){
            return false;
        }
        int distancia = distanceToANode(custumor);

        //si puede llegar antes de que termine el dia
        if(totalTime + timeToANode(distancia) > MINUTES_IN_A_DAY){
            return false;
        }
        //si puede llegar a tiempo
        if(totalTime + timeToANode(distancia) > custumor.getFechaFinal().getTime() - custumor.getFechaInicio().getTime()){
            return false;
        }
        //si tiene suficiente petroleo
        if(this.cargaPetroleo < consumoGLP(distancia)){
            return false;
        }
        return true;
    }

    public int distanceToANode(Node node){
        return (int) Math.sqrt(Math.pow(node.getPosicion().getX() - this.route.get(this.route.size()-1).getPosicion().getX(), 2) + Math.pow(node.getPosicion().getY() - this.route.get(this.route.size()-1).getPosicion().getY(), 2));
    }

    public int timeToANode(int distancia){
        //time to a node in minutes
        return (int)(distancia/this.velocidad * 60);
    }

    public Node bestDepot(ArrayList<Node> depots){
        int shortestDistance = Integer.MAX_VALUE;
        Node bestDepot = null;
        for(Node depot: depots){
            if(canDeliver(depot)){
                if (distanceToANode(depot) < shortestDistance){
                    shortestDistance = distanceToANode(depot);
                    bestDepot = depot;
                }
            }
        }
        double maxCapacidadGLP = 0;
        switch (this.type){
            case 'A':
                maxCapacidadGLP = 25;
                break;
            case 'B':
                maxCapacidadGLP = 15;
                break;
            case 'C':
                maxCapacidadGLP = 10;
                break;
            case 'D':
                maxCapacidadGLP = 5;
                break;
        }
        bestDepot.setCapacidad(bestDepot.getCapacidad()-(maxCapacidadGLP - this.cargaGLP));
        return bestDepot;
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
