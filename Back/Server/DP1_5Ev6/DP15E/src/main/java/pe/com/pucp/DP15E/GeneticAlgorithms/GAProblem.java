package pe.com.pucp.DP15E.GeneticAlgorithms;

import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class GAProblem implements Cloneable{
    private ArrayList<Vehicle> vehicles;
    private ArrayList<Node> orders;
    private ArrayList<Node> depots;
    private ArrayList<Node> blocks;
    private Date date;

    public int populationSize = 100;
    public double mutationRate = 0.7;
    public int maxGenerations = 5000;
    public double DEPOTRATE = 0.6;

    // Constructors
    public GAProblem(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> depots, ArrayList<Node> blocks) {
        this.orders = orders;
        this.vehicles = vehicles;
        this.depots = depots;
        this.blocks = blocks;

    }

    public GAProblem(ArrayList<pe.com.pucp.DP15E.model.Vehicle> vehicles, ArrayList<pe.com.pucp.DP15E.model.Node> orders, int a){
        int i=0;
        this.date = new Date();
        this.date=Calendar.getInstance().getTime();
        this.orders = new ArrayList<>();

        for (pe.com.pucp.DP15E.model.Node order : orders) {
            if(order.getTipo()=='C'){
                this.orders.add(new Node("C" + order.getId() , order.getX(), order.getY(), order.getCantidad(), Timestamp.valueOf(order.getFechaOrigen()), Timestamp.valueOf(order.getFechaOrigen().plusHours(order.getHoraDemandada()))));
            }
        }
        this.depots = new ArrayList<>();
        for (pe.com.pucp.DP15E.model.Node order : orders) {
            if(order.getTipo()=='D'){
                this.depots.add(new Node( order.getId() , order.getX(), order.getY(), order.getCapacidad()));
            }
        }

        this.blocks = new ArrayList<>();
        for (pe.com.pucp.DP15E.model.Node order : orders) {
            if(order.getTipo()=='B'){
                this.blocks.add(new Node(order.getId(), order.getX(), order.getY(), Timestamp.valueOf(order.getFechaInicio()),  Timestamp.valueOf(order.getFechaFinal())) );
            }
        }

        this.vehicles = new ArrayList<>();
        for (pe.com.pucp.DP15E.model.Vehicle vehicle : vehicles) {
            this.vehicles.add(new Vehicle( vehicle.getId() , vehicle.getType(), vehicle.getX(), vehicle.getY(), vehicle.getPesoBruto(),
                    vehicle.getCargaGLP(),vehicle.getPesoNeto(),vehicle.getVelocidad(),vehicle.getCargaPetroleo(),vehicle.getTotalTime()));

        }



    }


    public GAProblem(){
        //create random problem
        Random random = new Random();

        //create depots
        this.depots = new ArrayList<>();
        this.depots.add(new Node(1,12,8,Double.MAX_VALUE));
        this.depots.add(new Node(2, 42,42,160.0));
        this.depots.add(new Node(3,63,3,160.0));

        //create orders
        this.orders = new ArrayList<>();
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        for (int i = 0; i < 10; i++) {
            calendar.setTime(date);
            calendar.add(Calendar.HOUR_OF_DAY, random.nextInt(24));
            Date finalDate = calendar.getTime();
            this.orders.add(new Node(String.valueOf(i), random.nextInt(70),random.nextInt(50),(double)(random.nextInt(25)),date, finalDate));
        }

        //create blocks
        this.blocks = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            int x = random.nextInt(70);
            int y = random.nextInt(50);
            // if the point is inside a depot, or a order point, then generate another point
            while (x == 12 && y == 8 || x == 42 && y == 42 || x == 63 && y == 3){
                for (int j = 0; j < 50; j++) {
                    if (x == this.orders.get(j).getPosicion().getX() && y == this.orders.get(j).getPosicion().getY()){
                        x = random.nextInt(70);
                        y = random.nextInt(50);
                        j = 0;
                    }
                }
            }

            this.blocks.add(i,new Node(String.valueOf(i), random.nextInt(70),random.nextInt(50),(double)(random.nextInt(25)),date, date));
        }

        //create vehicles
        this.vehicles = new ArrayList<>();


        date = new Date();
        //A - 2
        this.vehicles.add(new Vehicle(1,'A',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(2,'A',date));

        //B - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(3,'B',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(4,'B',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(5,'B',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(6,'B',date));

        //C - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(7,'C',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(8,'C',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(9,'C',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(10,'C',date));


        //D - 10
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(11,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(12,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(13,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(14,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(15,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(16,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(17,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(18,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(19,'D',date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(20,'D',date));


    }

    //Methods
    @Override
    public GAProblem clone() {
        try {
            return (GAProblem) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();  // This should not happen.
        }
    }
    // Getters and Setters

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(ArrayList<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public ArrayList<Node> getOrders() {
        return orders;
    }

    public void setOrders(ArrayList<Node> orders) {
        this.orders = orders;
    }

    public ArrayList<Node> getDepots() {
        return depots;
    }

    public void setDepots(ArrayList<Node> depots) {
        this.depots = depots;
    }

    public ArrayList<Node> getBlocks() {
        return blocks;
    }

    public void setBlocks(ArrayList<Node> blocks) {
        this.blocks = blocks;
    }
}
