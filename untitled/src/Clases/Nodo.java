package Clases;

public class Nodo {
    private int x;
    private int y;
    private char tipo;

    public Nodo(int x, int y, char tipo) {
        this.x = x;
        this.y = y;
        this.tipo = tipo;
    }

    public char getTipo() {
        return tipo;
    }

    public void setTipo(char tipo) {
        this.tipo = tipo;
    }

    public Nodo() {
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
}
