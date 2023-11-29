package pe.com.pucp.DP15E.GeneticAlgorithms;

import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Solucion;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class GAProblem implements Cloneable {
    private ArrayList<Vehicle> vehicles;
    private ArrayList<Node> orders;
    private ArrayList<Node> depots;
    private ArrayList<Node> blocks;

    public int populationSize = 10;
    public double mutationRate = 0.6;
    public int maxGenerations = 100000;
    public double depotRate = 0.2;

    private int numOfOrders = 200;
    private int numOfBlocks = 0;
    // Constructors

    //simulacion
    public GAProblem(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> blocks) {

        this.depots = new ArrayList<>();
        this.depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        this.depots.add(new Node(2, 42, 42, Double.MAX_VALUE));
        this.depots.add(new Node(3, 63, 3, Double.MAX_VALUE));


        this.orders = orders;
        this.vehicles = vehicles;
        this.blocks = blocks;
    }
    // Test
    public GAProblem() {
        // create random problem
        Random random = new Random();

        // create depots
        this.depots = new ArrayList<>();
        this.depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        this.depots.add(new Node(2, 42, 42, Double.MAX_VALUE));
        this.depots.add(new Node(3, 63, 3, Double.MAX_VALUE));

        // create orders
        this.orders = new ArrayList<>();
        Date date = new Date();
        // set the date to 00:00:00
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        date = calendar.getTime();

        for (int i = 0; i < numOfOrders; i++) {
            calendar.setTime(date);

            calendar.add(Calendar.HOUR_OF_DAY, random.nextInt(24*7));
            Date finalDate = calendar.getTime();
            this.orders.add(new Node(String.valueOf(i), random.nextInt(70), random.nextInt(50),
                    (double) (random.nextInt(25)), date, finalDate));
        }

        // create blocks
        this.blocks = new ArrayList<>();

        for (int i = 0; i < numOfBlocks; i++) {
            int x = random.nextInt(70);
            int y = random.nextInt(50);
            // if the point is inside a depot, or a order point, then generate another point
            while (x == 12 && y == 8 || x == 42 && y == 42 || x == 63 && y == 3) {
                for (int j = 0; j < numOfOrders; j++) {
                    if (x == this.orders.get(j).getPosicion().getX() && y == this.orders.get(j).getPosicion().getY()) {
                        x = random.nextInt(70);
                        y = random.nextInt(50);
                        j = 0;
                    }else {
                        break;
                    }
                }
            }
            this.blocks.add(new Node(i, x, y, date, date));
        }


        // create vehicles
        this.vehicles = new ArrayList<>();

        date = new Date();
        // A - 2
        this.vehicles.add(new Vehicle(1, 'A', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(2, 'A', date));

        // B - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(3, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(4, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(5, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(6, 'B', date));

        // C - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(7, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(8, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(9, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(10, 'C', date));

        // D - 10
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(11, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(12, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(13, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(14, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(15, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(16, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(17, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(18, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(19, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(20, 'D', date));

    }
    // Methods

    public boolean validate() throws Exception {

        // if has no vehicles
        if (this.vehicles.size() == 0) {
            throw new Exception("No vehicles");
        }

        // if has no orders
        if (this.orders.size() == 0) {
            throw new Exception("No orders");
        }

        // if has no depots
        if (this.depots.size() == 0) {
            throw new Exception("No depots");
        }

        // if has no date


        // get the max capacity of the vehicles
        double maxCapacity = 0;
        for (Vehicle vehicle : this.vehicles) {
            if (vehicle.getCargaGLP() > maxCapacity) {
                maxCapacity = vehicle.getCargaGLP();
            }
        }

        // if any of the node out of the bounds, or the date is not valid
        // add one day to the date

        for (Node order : this.orders) {

            if (order.getPosicion().getX() < 0 || order.getPosicion().getX() >=70 || order.getPosicion().getY() < 0
                    || order.getPosicion().getY() >= 50) {
                throw new Exception("Order: " + order.getId() + " - coordinate out of bounds - ("
                        + order.getPosicion().getX() + " , " + order.getPosicion().getY() + ") - ("
                        + order.getPosicion().getY() + " , " + order.getPosicion().getY() + " )");
            }

            if (order.getCantidad() > maxCapacity) {
                throw new Exception("Order: " + order.getId() + " - quantity out of bounds - " + order.getCantidad()
                        + " - " + maxCapacity);
            }
        }

        for (Node block : this.blocks) {
            if (block.getPosicion().getX() < 0 || block.getPosicion().getX() > 70 || block.getPosicion().getY() < 0
                    || block.getPosicion().getY() > 50) {
                throw new Exception("Block: " + block.getId() + " - coordinate out of bounds - ("
                        + block.getPosicion().getX() + " , " + block.getPosicion().getY() + ") - ("
                        + block.getPosicion().getY() + " , " + block.getPosicion().getY() + " )");

            }

        }

        for (Node depot : this.depots) {
            if (depot.getPosicion().getX() < 0 || depot.getPosicion().getX() > 70 || depot.getPosicion().getY() < 0
                    || depot.getPosicion().getY() > 50) {
                throw new Exception("Depot: " + depot.getId() + " - coordinate out of bounds - ("
                        + depot.getPosicion().getX() + " , " + depot.getPosicion().getY() + ") - ("
                        + depot.getPosicion().getY() + " , " + depot.getPosicion().getY() + " )");
            }
        }

        // if any of the block any customer has overlay
        for (Node block : this.blocks) {
            for (Node order : this.orders) {
                if (block.getPosicion().getX() == order.getPosicion().getX()
                        && block.getPosicion().getY() == order.getPosicion().getY()) {
                    throw new Exception("Block and order overlay : " + block.getId() + " - " + order.getId());
                }
            }
        }

        return true;
    }

    @Override
    public GAProblem clone() {
        try {
            return (GAProblem) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // This should not happen.
        }
    }
    // Getters and Setters

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
