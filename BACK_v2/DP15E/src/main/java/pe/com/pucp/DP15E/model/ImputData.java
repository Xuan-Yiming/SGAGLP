package pe.com.pucp.DP15E.model;

import java.util.ArrayList;

public class ImputData {
    private ArrayList<Vehicle> vehiculos;
    private ArrayList<Node> pedidos;

    public ImputData(ArrayList<Vehicle> vehiculos, ArrayList<Node> pedidos) {
        this.vehiculos = vehiculos;
        this.pedidos = pedidos;
    }

    public ArrayList<Vehicle> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(ArrayList<Vehicle> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public ArrayList<Node> getPedidos() {
        return pedidos;
    }

    public void setPedidos(ArrayList<Node> pedidos) {
        this.pedidos = pedidos;
    }
}
