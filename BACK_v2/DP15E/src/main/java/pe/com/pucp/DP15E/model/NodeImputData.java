package pe.com.pucp.DP15E.model;

public class NodeImputData {
    private String id;
    private int x;
    private int y;
    private String entrega;

    public NodeImputData(String id, int x, int y, String entrega) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.entrega = entrega;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getEntrega() {
        return entrega;
    }

    public void setEntrega(String entrega) {
        this.entrega = entrega;
    }
}
