package Clases;

public class Pedido {

    private int x;
    private int y;
    private double cantidadSolicitada;
    private int index;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getX() {
        return x;
    }
    public Pedido( int x, int y) {
        this.x = x;
        this.y = y;
    }
    public Pedido( int x, int y,int index) {
        this.x = x;
        this.y = y;
        this.index = index;
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

    public double getCantidadSolicitada() {
        return cantidadSolicitada;
    }

    public void setCantidadSolicitada(double cantidadSolicitada) {
        this.cantidadSolicitada = cantidadSolicitada;
    }
    public double calculateDistanceTo(Pedido other) {
        int deltaX = other.getX() - this.getX();
        int deltaY = other.getY() - this.getY();
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
    @Override
    public String toString() {
        return "(" + getX() + ", " + getY() + ")";
    }
}
