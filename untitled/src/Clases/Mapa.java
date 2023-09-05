package Clases;

public class Mapa {
    private int largo; //y
    private int ancho; //x

    private Nodo[][] nodos;

    public Mapa(int largo, int ancho) {
        this.largo = largo;
        this.ancho = ancho;
    }

    public Nodo[][] getNodos() {
        return nodos;
    }

    public void setNodos(Nodo[][] nodos) {
        this.nodos = nodos;
    }

    public int getLargo() {
        return largo;
    }

    public void setLargo(int largo) {
        this.largo = largo;
    }

    public int getAncho() {
        return ancho;
    }

    public void setAncho(int ancho) {
        this.ancho = ancho;
    }
}
