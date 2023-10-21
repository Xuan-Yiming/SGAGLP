package GeneticAlgorithms.Problem;

import java.util.Date;

public class Vehicle {
    private char type;
    private double pesoBruto; // ton
    private double cargaGLP; // peso carga GLP = carga GLP/2 ton
    private double pesoNeto; // ton
    private double velocidad = 50; // 50 km/h
    private double cargaPetroleo = 25; // 25 Galones
    private Date mantenimiento; // 1 mes

    // Constructor
    public Vehicle(char type, Date mantenimiento){
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
    }

    // Methods
    public double consumoGLP(double distancia){
        return distancia * pesoNeto / 180;
    }

    // getters and setters
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



}
