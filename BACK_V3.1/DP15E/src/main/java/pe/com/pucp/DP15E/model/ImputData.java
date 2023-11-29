package pe.com.pucp.DP15E.model;

import java.util.ArrayList;

public class ImputData {
    private ArrayList<VehicleImputData> vehiculos;
    private ArrayList<NodeImputData> pedidos;

    public ImputData(ArrayList<VehicleImputData> vehiculos, ArrayList<NodeImputData> pedidos) {
        this.vehiculos = vehiculos;
        this.pedidos = pedidos;
    }

    public ArrayList<VehicleImputData> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(ArrayList<VehicleImputData> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public ArrayList<NodeImputData> getPedidos() {
        return pedidos;
    }

    public void setPedidos(ArrayList<NodeImputData> pedidos) {
        this.pedidos = pedidos;
    }
}
