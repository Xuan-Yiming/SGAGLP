package Clases;

public class Planta extends Nodo{
    private  int id;
    private double volumen;
    private char tipo;

    public Planta(int x, int y, char tipo, int id, double volumen, char tipo1) {
        super(x, y, tipo);
        this.id = id;
        this.volumen = volumen;
        this.tipo = tipo1;
    }

    public Planta(int id, double volumen, char tipo) {
        this.id = id;
        this.volumen = volumen;
        this.tipo = tipo;
    }

    public int getId() {
        return id;
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

    @Override
    public char getTipo() {
        return tipo;
    }

    @Override
    public void setTipo(char tipo) {
        this.tipo = tipo;
    }
}
