package Clases;

public class Vehiculo {

    private int x;
    private int y;
    private double gasolinaActual;
    private double gasolinaMaxima;

    private double cargaActual;
    private double cargaMaxima;
    public Vehiculo( int x, int y) {
        this.x = x;
        this.y = y;
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

    public double getGasolinaActual() {
        return gasolinaActual;
    }

    public void setGasolinaActual(double gasolinaActual) {
        this.gasolinaActual = gasolinaActual;
    }

    public double getGasolinaMaxima() {
        return gasolinaMaxima;
    }

    public void setGasolinaMaxima(double gasolinaMaxima) {
        this.gasolinaMaxima = gasolinaMaxima;
    }

    public double getCargaActual() {
        return cargaActual;
    }

    public void setCargaActual(double cargaActual) {
        this.cargaActual = cargaActual;
    }

    public double getCargaMaxima() {
        return cargaMaxima;
    }

    public void setCargaMaxima(double cargaMaxima) {
        this.cargaMaxima = cargaMaxima;
    }
}
