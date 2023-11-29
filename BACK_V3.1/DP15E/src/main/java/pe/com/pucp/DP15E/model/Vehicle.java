package pe.com.pucp.DP15E.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor

@Data
@Entity(name="Vehicle")
@Table(name="vehiculo_simulacion")
public class Vehicle  implements Serializable {
    private static final int MINUTES_IN_A_DAY = 1440;
    private static int nextId = 0;
    private static final Integer serialVersionUID= 1;
    @Id
    @Column(name="id_vehiculo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="coordenadaX")
    private int x;

    @Column(name="coordenadaY")
    private int y;
    //private Point posicion;
    @Column(name="tipo")
    private String type;

    @Column(name="peso_bruto")
    private Double pesoBruto; // ton
    @Column(name="carga_GLP")
    private Double cargaGLP; // peso carga GLP = carga GLP/2 ton
    @Column(name="peso_neto")
    private Double pesoNeto; // ton
    @Column(name="velocidad")
    private Double velocidad = 50.0; // 50 km/h
    @Column(name="carga_petroleo")
    private Double cargaPetroleo = 25.0; // 25 Galones
    @Column(name="mantenimiento")
    private Date mantenimiento; // 1 mes



    @Column(name = "activo")
    private boolean activo;
    //private ArrayList<Node> route;

    @Column(name="tiempo_total")
    private int totalTime;

    public Vehicle(){
        this.id = nextId++;
        this.x=0;
        this.y=0;
        this.type = "";
        this.cargaGLP = 0.0;
        this.activo = false;
        this.cargaPetroleo=25.0;
        this.mantenimiento = new Date(2023,1,1);
        this.pesoBruto = 0.0;
        this.pesoNeto =0.0;
        this.velocidad =50.0;
        this.totalTime=0;
    }

    public Vehicle(int id, int x, int y, String type){
        this.id = id;
        this.x=x;
        this.y=y;
        this.type = type;
        this.cargaGLP = 0.0;
        this.activo = false;
        this.cargaPetroleo=25.0;
        this.mantenimiento = new Date(2023,1,1);
        this.pesoBruto = 0.0;
        this.pesoNeto =0.0;
        this.velocidad =50.0;
        this.totalTime=0;
    }
    // Methods
    /*public double consumoGLP(double distancia){
        return distancia * pesoNeto / 180;
    }
*//*
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
    }*//*

    public boolean canDeliver(Node custumor){
        //si tiene suficiente GLP
        if(this.cargaGLP < custumor.getCantidad()){
            return false;
        }
        //int distancia = distanceToANode(custumor);

        //si puede llegar antes de que termine el dia
        *//*if(totalTime + timeToANode(distancia) > MINUTES_IN_A_DAY){
            return false;
        }
        //si puede llegar a tiempo
        if(totalTime + timeToANode(distancia) > (Duration.between(custumor.getFechaInicio(), custumor.getFechaFinal()).toMinutes())){
            return false;
        }
        //si tiene suficiente petroleo
        if(this.cargaPetroleo < consumoGLP(distancia)){
            return false;
        }
        *//*
        return true;
    }

    *//*
    public int distanceToANode(Node node){
        return (int) Math.sqrt(Math.pow(node.getX() - this.route.get(this.route.size()-1).getX(), 2) + Math.pow(node.getY() - this.route.get(this.route.size()-1).getY(), 2));
    }
*//*
    public int timeToANode(int distancia){
        //time to a node in minutes
        return (int)(distancia/this.velocidad * 60);
    }

    public Node bestDepot(ArrayList<Node> depots){
        int shortestDistance = Integer.MAX_VALUE;
        Node bestDepot = null;
        for(Node depot: depots){
            if(canDeliver(depot)){
                //if (distanceToANode(depot) < shortestDistance){
                //    shortestDistance = distanceToANode(depot);
                //    bestDepot = depot;
                //}
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
    // Constructor
    public Vehicle(char type, Date mantenimiento){
        this.type = type;
        switch (type){
            case 'A':
                this.pesoBruto = 2.5;
                this.cargaGLP = 25.0;
                break;
            case 'B':
                this.pesoBruto = 2.0;
                this.cargaGLP = 15.0;
                break;
            case 'C':
                this.pesoBruto = 1.5;
                this.cargaGLP = 10.0;
                break;
            case 'D':
                this.pesoBruto = 1.0;
                this.cargaGLP = 5.0;
                break;
        }
        this.pesoNeto = this.pesoBruto + this.cargaGLP/2;
        this.mantenimiento = mantenimiento;
        //this.route = new ArrayList<>();
        //this.posicion = new Point(12,8);
        this.x=12;
        this.y=8;
    }*/

    // getters and setters

    //public Point getPosicion() {
    //    return posicion;
    //}

    //public void setPosicion(Point posicion) {
     //   this.posicion = posicion;
    //}

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    //public ArrayList<Node> getRoute() {
    //    return route;
    //}

    //public void setRoute(ArrayList<Node> route) {
    //    this.route = route;
    //}
    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
