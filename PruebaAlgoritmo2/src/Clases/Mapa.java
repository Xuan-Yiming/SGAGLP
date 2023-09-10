package Clases;

import java.util.ArrayList;

public class Mapa {
    private int x;
    private int y;
    public Planta plantaPrincipal;
    public Planta plantaSecundaria1;
    public Planta plantaSecundaria2;
    private ArrayList<Vehiculo> vehiculos;
    private ArrayList<Pedido> pedidos;

    public Mapa(int x, int y) {
        this.x = x;
        this.y = y;
        plantaPrincipal = new Planta();
        plantaSecundaria1 = new Planta();
        plantaSecundaria2 = new Planta();
        vehiculos = new ArrayList<Vehiculo>();
        pedidos = new ArrayList<Pedido>();
    }
    public void addVehiculo(Vehiculo vehiculo) {
        vehiculos.add(vehiculo);
    }

    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
    }

    public ArrayList<Pedido> getPedidos() {
        return pedidos;
    }

    public void printMap() {

        boolean flag = false;

        for (int y = 0; y <= this.y; y++) {
            for (int x = 0; x <= this.x; x++) {

                flag = false;
                for (Pedido pedido : pedidos) {
                    if(pedido.getX() == x && pedido.getY()==y){
                        System.out.print("O ");
                        flag = true;
                    }
                }

                if(flag)continue;
                for (Vehiculo vehiculo : vehiculos) {
                    if(vehiculo.getX() == x && vehiculo.getY()==y){
                        System.out.print("V ");
                    }else if(plantaPrincipal.getX() == x && plantaPrincipal.getY() == y){
                        System.out.print("P ");
                    }else{
                        if((plantaSecundaria1.getX() == x && plantaSecundaria1.getY()==y)||
                                (plantaSecundaria2.getX() == x && plantaSecundaria2.getY()==y)){
                            System.out.print("S ");
                        }else{
                            System.out.print("* ");
                        }
                    }
                }


            }
            System.out.println(); // Move to the next line after each row
        }
        //System.out.println();
    }

    public Vehiculo getVehiculo(int i){
        return vehiculos.get(i);
    }

}
